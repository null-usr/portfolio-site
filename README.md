# PORTFOLIO SITE

Following my Udacity Nanodegree in Full Stack Web Development using JavaScript and TypeScript, I thought it would be a good idea to apply what I learned in the course along with what I learned using Ruby on Rails to build my own portfolio website seeing as I have never had a proper one.

Most of the courses and tutorials I've seen tend to use a database like SQLite3 or PostgreSQL to store their content, but that felt a bit excessive in this case and I was curious about how you'd accomplish content management without SQL so I use a faux database in the form of JSON files which direct the controllers to the content required.<br>
I had seen videos about making a blog with the articles written in markdown and so far I'm pretty pleased with how it's going. Editing my projects feels like a lot less of a hassle than it would have been.

## Technology

* Node 14.15.4+
* Express
* [EJS](https://ejs.co/)
* [Marked](https://marked.js.org/)


## Project Structure

```

├───dist
├───docs
├───node_modules
|   ├─── ...                    
├───scripts                        
└───src                            
    ├───assets                     
    │   ├───css                    
    │   ├───img                    
    │   │   └───portfolio          
    │   ├───js                     
    │   └───mail                   
    ├───config                     
    ├───controllers                
    ├───database                   
    │   ├───blog                   
    │   └───projects               
    ├───models                     
    ├───public                     
    │   ├───blog                   
    │   ├───css                    
    │   ├───favicon_io             
    │   ├───images                 
    │   ├───js                     
    │   ├───pdf                    
    │   └───projects               
    │       ├───amboss-extension   
    │       ├───dungeon-generator  
    │       ├───orbital            
    │       ├───portfolio-site     
    │       └───property-app       
    ├───routes                     
    ├───scss                       
    │   ├───components             
    │   └───includes               
    ├───util                       
    └───views              
        ├───layouts                
        ├───partials               
        │   └───nav                
        ├───posts                  
        └───projects       

```

* src contains all of the assets, TypeScript, project files, etc... Upon building, these folders and files are copied over into the dist directory and archived in a .zip file
  * server.ts is our main entry file
    * this is where all of our controllers are hooked up as well as where our static files and directory paths are defined so we can use them in our html files and typescript. 
    * Here we also set our express app to use ejs layouts, set our view engine to ejs and set our views' root path
    * We also define our error path
  * Assets/Public contain all of the static content
  * Config contains our database and resource loader. 
    * The resource loader's templated get function receives the type and name of resource being requested (project or blog)
    * The index function returns an array of all the given type's files ie) all of the project or blog files
  * Models contains our types and database models that may be implemented in the future
  * Controllers are where we break down the paths that the app can accept. We try to fetch any data from the database that we need then feed the variables to ejs through express' render functions options. If we fail to fetch the data we either redirect or return an error
  * Views are where all of our EJS HTML pages and partials live. The main layout is in layouts/main_layout.ejs where the "body" which is whichever view we render with express' render function is inserted 
    * Partials can take parameters of their own like in the case of projects/index.ejs which loops over all of the projects and creates project_thumbs.ejs with each individual project as the parameter

* scripts contains bash scripts used inside of package.json

## Build & Usage

To install dependencies and run the project in dev mode using tsnode.
```
yarn 
yarn dev
```
or
```
npm i
npm run dev
```

In another terminal you can run
```
npm i -g sass
yarn sass
```

to run a sass watcher so updates to any of the scss files are automatically compiled to css

## Build & Deploy

```
yarn build
yarn build:windows
```
to build on linux and windows respectively

```
yarn prod
yarn prod:windows
```
to run the project in production mode

```
yarn deploy
yarn deploy:windows
```
To deploy

## To Do

- [ ] User Authentication (just me)
- [ ] Filters for tags
- [ ] Open API routes so I can update the project files without needing to shut down the server and push anything

------------

## Links

- [Website](https://nclarke.dev)
- [Github Project](https://github.com/null-usr/portfolio-site)