#!/bin/sh
npm install
npm run dev &

# Keep container alive
tail -f /dev/null