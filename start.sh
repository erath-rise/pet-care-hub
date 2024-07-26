#!/bin/sh

export API_PORT=8800
export SOCKET_PORT=4000

cd /app/api && npx prisma generate && npx prisma db push && API_PORT=$API_PORT npm start &


cd /app/socket && SOCKET_PORT=$SOCKET_PORT npm start &


wait