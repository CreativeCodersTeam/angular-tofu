#!/bin/bash

# Build the ci-build app and then run it
# This script is used to build the ci-build app and then run it
# All arguments are passed to the ci-build app

nodeArgs=("./dist/build/ci-build/main.js" "$@")

npx nx run ci-build:build
node "${nodeArgs[@]}"
