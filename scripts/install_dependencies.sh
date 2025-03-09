#!/bin/bash

# パッケージのインストール
sudo apt-get update
sudo apt install -y python3.10-venv python3-pip

# frontendのビルドに必要なパッケージをインストール
cd /home/ubuntu/kitchen_compass/frontend
npm install

# backendのビルドに必要なパッケージをインストール
cd /home/ubuntu/kitchen_compass/backend
npm install

# recommend_serverのビルドに必要なパッケージをインストール
cd /home/ubuntu/kitchen_compass/backend/reccomend_server/
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

