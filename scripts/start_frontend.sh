#!/bin/bash

# Start frontend server
cd /home/ubuntu/kitchen_compass/frontend
# バックグラウンド実行
nohup npm run start > frontend.log 2>&1 &
echo $! > /home/ubuntu/kitchen_compass/frontend.pid