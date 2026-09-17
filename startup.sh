#!/bin/sh
# Restart contract: revive the preview on 0.0.0.0:8080.
if curl -sf -o /dev/null http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev > /tmp/shia-dev.log 2>&1 &
sleep 1
exit 0
