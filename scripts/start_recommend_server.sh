#!/bin/bash

# Start recommend server
cd /home/ubuntu/kitchen_compass/backend/reccomend_server/
source .venv/bin/activate
nohup python3 api.py > recommendserver.log 2>&1 &
echo $! > /home/ubuntu/kitchen_compass/backend/reccomend_server/recommendserver.pid