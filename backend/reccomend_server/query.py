import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import torch
from transformers import BertJapaneseTokenizer, BertModel
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import Recipe

# パラメータ
# BERTのモデル名
MODEL_NAME = 'sonoisa/sentence-bert-base-ja-mean-tokens'


# SQLiteのDB接続
DATABASE_URL = "sqlite:///../db/recipe/recipes.db"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

class SentenceBertJapanese:
    def __init__(self, model_name_or_path, device=None):
        self.tokenizer = BertJapaneseTokenizer.from_pretrained(model_name_or_path)
        self.model = BertModel.from_pretrained(model_name_or_path)
        self.model.eval()

        if device is None:
            device = "cuda" if torch.cuda.is_available() else "cpu"
        self.device = torch.device(device)
        self.model.to(device)

    def _mean_pooling(self, model_output, attention_mask):
        token_embeddings = model_output[0] #First element of model_output contains all token embeddings
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
        return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

    @torch.no_grad()
    def encode(self, sentences, batch_size=8):
        all_embeddings = []
        iterator = range(0, len(sentences), batch_size)
        for batch_idx in iterator:
            batch = sentences[batch_idx:batch_idx + batch_size]

            encoded_input = self.tokenizer.batch_encode_plus(batch, padding="max_length", max_length=512,
                                           truncation=True, return_tensors="pt").to(self.device)
            model_output = self.model(**encoded_input)
            sentence_embeddings = self._mean_pooling(model_output, encoded_input["attention_mask"]).to('cpu')

            all_embeddings.extend(sentence_embeddings)

        return torch.stack(all_embeddings)
    

# SentenceBertのモデルを読み込み
sentenceBert = SentenceBertJapanese(MODEL_NAME)

def search_similar_recipes(query, menucount):
    # DBから全てのレシピを取得
    recipes = session.query(Recipe).all()
    menucount = int(menucount)

    vectors = [np.frombuffer(recipe.vector, dtype=np.float32) for recipe in recipes if recipe.vector]
    if not vectors:
        raise ValueError("No recipe vectors found in the database.")
    
    # クエリのベクトルを生成
    query_vector = sentenceBert.encode([query]).numpy()
    
    # 類似度を計算
    similarities = cosine_similarity(query_vector, vectors)
    df_result = pd.DataFrame({'recipe_id': [recipe.recipe_id for recipe in recipes if recipe.vector], 'similarity': similarities[0]})
    df_result = df_result.sort_values('similarity', ascending=False).head(menucount)
    print(df_result)
    similar_recipeids = df_result['recipe_id'].tolist()

    return similar_recipeids