#!/bin/bash

# Start backend server
cd /home/ubuntu/kitchen_compass/backend
sudo npm install -g --force nodemon
nohup npm run start > backend.log 2>&1 &
echo $! > /home/ubuntu/kitchen_compass/backend/backend.pid