#!/usr/bin/env bash
# Retry wrapper around `bun install` for intermittent registry failures.
#
# BUN_INSTALL_TIMEOUT (default 300s) kills an attempt that hangs on the network
# instead of letting it burn the job timeout. The first failure also wipes
# node_modules, because a half-written layout survives a retry and poisons it.
set -euo pipefail

max_attempts=3
timeout_sec="${BUN_INSTALL_TIMEOUT:-300}"

for attempt in $(seq 1 "$max_attempts"); do
  echo "bun install: attempt ${attempt}/${max_attempts} (timeout ${timeout_sec}s)"

  if timeout "$timeout_sec" bun install --frozen-lockfile "$@"; then
    exit 0
  fi

  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "ERROR: bun install failed after ${max_attempts} attempts"
    exit 1
  fi

  echo "WARNING: attempt ${attempt} failed — clearing node_modules, retrying in 10s"
  rm -rf node_modules
  sleep 10
done
