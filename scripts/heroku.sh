#!/usr/bin/sh

tsc
mv src/assets dist/assets
mv src/public dist/public
mv src/database dist/database
mv src/views dist/views
rm -r src
rm -r docs
# cp package_standalone.json dist/package.json
# cp package.json dist/package.json && cd dist && zip -r Archive.zip . && cd ..