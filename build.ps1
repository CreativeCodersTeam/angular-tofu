# Build the ci-build app and then run it
# This script is used to build the ci-build app and then run it

npx nx run ci-build:build
node ./dist/build/ci-build/main.js
