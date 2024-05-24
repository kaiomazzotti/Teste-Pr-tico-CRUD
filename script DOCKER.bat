#!/bin/bash

cd "$(dirname "$0")"

docker compose up -d sqlserver
docker compose build estabelecimentos
docker compose up -d estabelecimentos