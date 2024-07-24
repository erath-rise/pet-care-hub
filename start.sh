#!/bin/sh


cd /app/api && npm start &


cd /app/socket && npm start &


wait