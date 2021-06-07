npx tsc 
cp -R src/assets dist/assets
cp -R src/public dist/public
cp -R src/database dist/database
cp -R src/views dist/views
cp package.json dist/package.json && cd dist && 7z a Archive.zip -r . && cd ..