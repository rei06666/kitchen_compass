#!/bin/bash

# パッケージのインストール
sudo apt-get update
sidp apt install -y python3-venv

# frontendのビルドに必要なパッケージをインストール
cd /home/naruserei/playgroud/web_application/kitchen_compass/kitchen_compass/frontend
npm install

# backendのビルドに必要なパッケージをインストール
cd /home/naruserei/playgroud/web_application/kitchen_compass/kitchen_compass/backend
npm install

# recommend_serverのビルドに必要なパッケージをインストール
cd /home/naruserei/playgroud/web_application/kitchen_compass/kitchen_compass/backend/reccomend_server/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

