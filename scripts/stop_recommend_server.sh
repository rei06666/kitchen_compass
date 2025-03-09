#!/bin/bash

# Stop recommend server
if [ -f /home/ubuntu/kitchen_compass/backend/reccomend_server/recommendserver.pid ]; then
  kill $(cat /home/ubuntu/kitchen_compass/backend/reccomend_server/recommendserver.pid)
  rm /home/ubuntu/kitchen_compass/backend/reccomend_server/recommendserver.pid
fi