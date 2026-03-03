#!/bin/sh
set -e

# Fix ownership of the data directory (volume may be owned by root)
chown -R node:node /app/data

# Drop privileges and exec the main process as 'node'
exec su-exec node "$@"
