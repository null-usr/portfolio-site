import express, { Request, Response } from 'express';
import { Project } from '../models/project';
import { ResourceLoader } from '../config/resourceLoader';
import { Post } from '../models/post';

//const router = express.Router();
const store = new ResourceLoader();

/* GET home page. */
/*const index_route = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

const index = async (_req: Request, res: Response) => {
  try{
    const posts = store.index<Post>('blog').sort( (a: Post, b: Post) => {
		  return a.createdAt < b.createdAt ? 1 : -1;
	  });

    const featured_post = posts[0];
    featured_post.createdAt = new Date((featured_post.createdAt as unknown) as string);

    const projects = store.index<Project>('projects');
    const featured_project = projects[Math.floor(Math.random() * projects.length)];


    res.render('index', {title: "Home", root: '/', featured_post: featured_post, featured_project: featured_project});
  } catch (err) {
    res.status(500).json(err);
  }
};

const about = async (_req: Request, res: Response) => {
  try{
    res.render('about', {title: "About", root: '/about'});
  } catch (err) {
    res.status(500).json(err);
  }
};

const resume = async (_req: Request, res: Response) => {
  try{
    res.render('resume', {title: "Resume", root: '/resume'});
  } catch (err) {
    res.status(500).json(err);
  }
};

const static_pages = (app:express.Application): void => {

  app.get('/about', about);
  app.get('/', index);
  app.get('/resume', resume);
}

export default static_pages;
