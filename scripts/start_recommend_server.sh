#!/bin/bash

# Start recommend server
cd /home/naruserei/playgroud/web_application/kitchen_compass/kitchen_compass/backend/reccomend_server/
source .venv/bin/activate
python3 api.py &