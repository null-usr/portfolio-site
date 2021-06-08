#!/usr/bin/sh

cd dist
git init
heroku repo:reset --app n-clarke && heroku git:remote -a n-clarke
git add . && git commit -m "Deploying" && git push heroku master
cd ..