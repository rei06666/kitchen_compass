#!/bin/bash

# Stop recommend server
if [ -f /home/ubuntu/kitchen_compass/frontend/frontend.pid ]; then
  kill $(cat /home/ubuntu/kitchen_compass/frontend/frontend.pid)
  rm /home/ubuntu/kitchen_compass/frontend/frontend.pid
fi