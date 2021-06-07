import express, { Request, Response } from 'express';
import { Project } from '../models/project';
import { ResourceLoader } from '../config/resourceLoader';
import { default as slug } from 'slug';

//const router = express.Router();

/* GET home page. */
/*const index_route = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

//if using database
//const store = new ProjectBase();
const store = new ResourceLoader();

const index = async (_req: Request, res: Response) => {
  try{
    const projects = store.index<Project>('projects');
    //res.json(projects);
    res.render('projects/index', {title: "Projects", projects: projects, root: '/projects'});
  } catch (err) {
    res.status(500).json(err);
  }
};

const new_project = async(req: Request, res: Response) => {
	res.render('posts/new', { project: {
		title: "",
		summary: "",
		content: "",
	} });
};

const show = async (req: Request, res: Response) => {
    try {
      //const project = await store.show(parseInt(req.params.id));
      const content: [Project, string]  = store.get<Project>('projects', req.params.id);
      //res.json(content[0]);
      res.render('projects/show', {title: content[0].name, project: content[0], content: content[1], root: '/projects'});
  } catch (err) {
      //res.status(400).json(err);
      res.redirect('/projects');
  }
};

const create = async (req: Request, res: Response) => {
  const project: Project = {
    name: req.body.name,
    summary: req.body.summary,
    content: req.body.content,
    slug: slug(req.body.name)
    };
  try {
    //const newProject = await store.create(project);
    /*const token = jwt.sign(
        { user: newUser },
        process.env.TOKEN_SECRET as string
    );*/

    //return token instead of user
    //res.json({ token: token });
    //res.redirect(`/projects/${newProject.id}`);
} catch (err) {
    //res.status(400);
    //res.json(err);
    res.render('project/new', {title: "New Project", project: project});
}
};

const destroy = async (req: Request, res: Response) => {
    try {
      //const project = await store.delete(req.params.id);
      //res.json(project);
      res.redirect('/projects');
  } catch (err) {
      //res.status(400).json(err);
  }
};

//disabling crud for now, until i get verification up
const projects_controller = (app:express.Application): void => {
  app.get('/projects', index);
  //app.get('/projects/new', new_project);
  //app.post('/projects', create);
  app.get('/projects/:id', show);
  //app.delete('/projects/:id', destroy);
}

export default projects_controller;
