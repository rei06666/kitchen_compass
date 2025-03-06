import numpy as np
import pandas as pd
import torch
from transformers import AutoTokenizer, AutoModel

MODEL_NAME = 'cl-tohoku/bert-base-japanese-whole-word-masking'
MAX_LENGTH = 64

np.random.seed(20221024)
torch.manual_seed(20221025)


def encode_single_sentences(sentences: pd.Series, tokenizer: AutoTokenizer) -> list[dict[str, torch.Tensor]]:
    encoded_input = tokenizer(
        sentences.tolist(),
        max_length=MAX_LENGTH,
        padding='max_length',
        truncation=True,
        return_tensors='pt',
    )
    return encoded_input


class SentenceBert(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.bert = AutoModel.from_pretrained(MODEL_NAME)
    
    def forward(self, batch: dict[str, torch.Tensor]):
        # vector1
        batch1 = {k[:-2]: v for k, v in batch.items() if k.endswith('_1')}
        output1 = self.bert(**batch1)
        vector1 = self._mean_pooling(output1, batch1['attention_mask'])

        # vector2
        batch2 = {k[:-2]: v for k, v in batch.items() if k.endswith('_2')}
        output2 = self.bert(**batch2)
        vector2 = self._mean_pooling(output2, batch2['attention_mask'])

        cosine_similarity = torch.nn.functional.cosine_similarity(vector1, vector2)
        return cosine_similarity
    
    def _mean_pooling(self, bert_output, attention_mask):
        token_embeddings = bert_output.last_hidden_state
        attention_mask = attention_mask.unsqueeze(-1)
        return torch.sum(token_embeddings * attention_mask, 1) / torch.clamp(attention_mask.sum(axis=1), min=1)