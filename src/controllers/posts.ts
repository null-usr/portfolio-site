/* For the blog */
import express, { Request, Response } from 'express';
import { Post } from '../models/post';
import { ResourceLoader } from '../config/resourceLoader';
import slug from 'slug';

//const store = new PostBase();
const store = new ResourceLoader();

const index = async (_req: Request, res: Response) => {
  try{
	  const posts = store.index<Post>('blog').sort( (a: Post, b: Post) => {
		  return a.createdAt < b.createdAt ? 1 : -1;
	  });

    posts.forEach(post => {
      post.createdAt = new Date((post.createdAt as unknown) as string);
    });

    res.render('posts/index', {title: "Blog", posts: posts, root: '/blog'});
  } catch (err) {
    res.status(500).json(err);
  }
};

const show = async (req: Request, res: Response) => {
    try {
      const data: [Post, string] = store.get<Post>('blog', req.params.id);
      //res.json(data[0]);
	    res.render('posts/show', {title: data[0].title, post: data[0], content: data[1], root: '/blog'});
  } catch (err) {
      //res.status(400).json(err);
	    res.redirect('/posts');
  }
};

const new_post = async(req: Request, res: Response) => {
	res.render('posts/new', { post: {
		title: "",
		summary: "",
		content: "",
	} });
};

const create = async (req: Request, res: Response) => {
	const post: Post = {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
		    createdAt: new Date(),
        slug: slug(req.body.title)
    };

  try {

    //const newPost = await store.create(post);
    /*const token = jwt.sign(
        { user: newUser },
        process.env.TOKEN_SECRET as string
    );*/

    //return token instead of user
    //res.json({ token: token });
	//res.redirect(`/blog/${newPost.id}`);
	} catch (err) {
		//res.status(400);
		//res.json(err);
		res.render('posts/new', {title: "New Blog Post", post: post});
	}
};

const destroy = async (req: Request, res: Response) => {
    try {
      //const post = await store.delete(req.params.id);
      //res.json(post);
	    res.redirect(`/blog`);
  } catch (err) {
      res.status(400).json(err);
  }
};

//disabling crud for now until i get some login stuff done
const posts_controller = (app: express.Application): void => {
	app.get('/blog', index); 
	//app.get('/blog/new', new_post); 
	//app.post('/blog', create);
	app.get('/blog/:id', show);
	//app.delete('/blog/:id', destroy);
};

export default posts_controller;