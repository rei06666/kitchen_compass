from pathlib import Path
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import torch
from torch.utils.data import DataLoader
from transformers import AutoTokenizer
from sentencebert import SentenceBert, encode_single_sentences
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db import Recipe

USE_CUDA = False
BATCH_SIZE = 64
MODEL_NAME = 'cl-tohoku/bert-base-japanese-whole-word-masking'


# SQLiteのDB接続
DATABASE_URL = "sqlite:///../db/recipes.db"
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

class SentenceBertSearcher:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.sentence_bert = SentenceBert()
        self.sentence_bert.load_state_dict(torch.load('vector_model/best_sentence_bert_model.bin', map_location=torch.device('cpu')))
        if USE_CUDA:
            self.sentence_bert = self.sentence_bert.cuda()
        self.sentence_bert.eval()

    
    def make_sentence_vectors(self, texts):
        encoded = encode_single_sentences(texts, self.tokenizer)
        dataset_for_loader = [
            {k: v[i] for k, v in encoded.items()}
            for i in range(len(texts))
        ]
        sentence_vectors = []
        for batch in DataLoader(dataset_for_loader, batch_size=BATCH_SIZE):
            if USE_CUDA:
                batch = {k: v.cuda() for k, v in batch.items()}
            with torch.no_grad():
                bert_output = self.sentence_bert.bert(**batch)
                sentence_vector = self.sentence_bert._mean_pooling(bert_output, batch['attention_mask'])
                sentence_vectors.append(sentence_vector.cpu().detach().numpy())
        sentence_vectors = np.vstack(sentence_vectors)
        return sentence_vectors

searcher = SentenceBertSearcher()

def search_similar_recipes(query, menucount):
    # DBから全てのレシピを取得
    recipes = session.query(Recipe).all()
    menucount = int(menucount)

    vectors = [np.frombuffer(recipe.vector, dtype=np.float32) for recipe in recipes if recipe.vector]
    if not vectors:
        raise ValueError("No recipe vectors found in the database.")
    
    # クエリのベクトルを生成
    query_vector = searcher.make_sentence_vectors(pd.Series([query]))
    
    # 類似度を計算
    similarities = cosine_similarity(query_vector, vectors)
    df_result = pd.DataFrame({'recipe_id': [recipe.recipe_id for recipe in recipes if recipe.vector], 'similarity': similarities[0]})
    df_result = df_result.sort_values('similarity', ascending=False).head(menucount)
    similar_recipeids = df_result['recipe_id'].tolist()

    return similar_recipeids