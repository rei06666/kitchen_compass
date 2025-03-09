#!/bin/bash

# Stop backend server
if [ -f /home/ubuntu/kitchen_compass/backend/backend.pid ]; then
  kill $(cat /home/ubuntu/kitchen_compass/backend/backend.pid)
  rm /home/ubuntu/kitchen_compass/backend/backend.pid
fi