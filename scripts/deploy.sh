cd dist
git init
#git remote add heroku https://git.heroku.com/n-clarke.git
heroku repo:reset --app n-clarke
heroku git:remote -a n-clarke
git add . && git commit -m "Deploying" && git push heroku master
cd ..