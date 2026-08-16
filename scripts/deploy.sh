#!/bin/bash
echo "=== Earcraft Production Deployment Script ==="
cd docker
docker-compose down
docker-compose up --build -d
echo "Production services deployed successfully."
