#!/usr/bin/env bash
set -e
echo "🚀 Starting Faresw_Bot (Multi-Session + KnightBot-Mini)"
node --check lib/pairingBridge.js && echo "  pairingBridge OK"
node --check lib/kmLoader.js      && echo "  kmLoader OK"
node --check lib/kmDatabase.js    && echo "  kmDatabase OK"
node --check lib/kmDispatcher.js  && echo "  kmDispatcher OK"
node --check index.js             && echo "  index.js OK"
exec node index.js
