/* For the blog */
import express, { Request, Response } from 'express'
import { Post } from '../models/post'
import { ResourceLoader } from '../config/resourceLoader'
import slug from 'slug'
import marked from 'marked'

//const store = new PostBase();
const store = new ResourceLoader()

const index = async (_req: Request, res: Response) => {
    try {
        const response = await fetch(
            'http://localhost:1337/api/blogs?populate[Thumbnail][fields][0]=url'
        )
        const d = await response.json()
        const posts = d.data.map((d: any) => ({
            id: d.id,
            createdAt: d.createdAt,
            title: d.Title,
            summary: d.Summary,
            content: d.Content,
            thumb: d.Thumbnail ? d.Thumbnail.url : undefined,
            tags: d.tags ? d.tags.map((t: { Name: string }) => t.Name) : [],
            slug: d.slug,
        }))

        // const posts = store.index<Post>('blog').sort((a: Post, b: Post) => {
        //     return a.createdAt < b.createdAt ? 1 : -1
        // })

        posts.forEach((post: { createdAt: unknown }) => {
            post.createdAt = new Date(post.createdAt as unknown as string)
        })

        res.render('posts/index', {
            title: 'Blog',
            posts: posts,
            root: '/blog',
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const response = await fetch(
            'http://localhost:1337/api/blogs?filters[slug][$eq]=' +
                req.params.slug +
                '&populate[Thumbnail][fields][0]=url'
        )
        const o = await response.json()
        if (o.data.length === 0) {
            res.redirect('/blog')
        }
        const d = o.data[0]

        const data = {
            id: d.id,
            createdAt: d.createdAt,
            title: d.Title,
            summary: d.Summary,
            content: marked.parse(d.Content) as string,
            thumb: d.Thumbnail ? d.Thumbnail.url : undefined,
            tags: d.tags ? d.tags.map((t: { Name: string }) => t.Name) : [],
            slug: d.slug,
        }

        // const data: [Post, string] = store.get<Post>('blog', req.params.id)
        //res.json(data[0]);
        res.render('posts/show', {
            title: data.title,
            post: data,
            content: data.content,
            root: '/blog',
        })
    } catch (err) {
        //res.status(400).json(err);
        res.redirect('/blog')
    }
}

const new_post = async (req: Request, res: Response) => {
    res.render('posts/new', {
        post: {
            title: '',
            summary: '',
            content: '',
        },
    })
}

const create = async (req: Request, res: Response) => {
    const post: Post = {
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content,
        createdAt: new Date(),
        slug: slug(req.body.title),
    }

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
        res.render('posts/new', { title: 'New Blog Post', post: post })
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        //const post = await store.delete(req.params.id);
        //res.json(post);
        res.redirect(`/blog`)
    } catch (err) {
        res.status(400).json(err)
    }
}

//disabling crud for now until i get some login stuff done
const posts_controller = (app: express.Application): void => {
    app.get('/blog', index)
    //app.get('/blog/new', new_post);
    //app.post('/blog', create);
    app.get('/blog/:slug', show)
    //app.delete('/blog/:id', destroy);
}

export default posts_controller
