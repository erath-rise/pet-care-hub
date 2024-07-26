#!/bin/sh


cd /app/api && npx prisma generate && npx prisma db push && npm start &


cd /app/socket && npm start &


wait