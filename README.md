# PORTFOLIO SITE

Following my Udacity Nanodegree in Full Stack Web Development using JavaScript and TypeScript, I thought it would be a good idea to apply what I learned in the course along with what I learned using Ruby on Rails to build my own portfolio website seeing as I have never had a proper one.

Most of the courses and tutorials I've seen tend to use a database like SQLite3 or PostgreSQL to store their content, but that felt a bit excessive in this case and I was curious about how you'd accomplish content management without SQL.<br>
I had seen videos about making a blog with the articles written in markdown and so far I'm pretty pleased with how it's going. Editing my projects feels like a lot less of a hassle than it would have been.

## Prerequisites

* Node 14.15.4


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

* scripts contains bash scripts used inside of package.json

## Build & Usage

```
yarn 
yarn dev
```
or
```
npm i
npm run dev
```

To install dependencies and run the project in dev mode using tsnode.
In another terminal you can run

```
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

- [ ] Docs
- [ ] User Authentication (just me)
- [ ] Filters for tags
- [ ] Open API routes so I can update the project files without needing to shut down the server and push anything

------------

## Links

- [github project](https://github.com/null-usr/portfolio-site)