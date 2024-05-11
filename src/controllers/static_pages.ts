import express, { Request, Response } from 'express'
import {
    ValidationError,
    check,
    validationResult,
} from 'express-validator'
import nodemailer from 'nodemailer'
import { Project } from '../models/project'
import { ResourceLoader } from '../config/resourceLoader'
import { Post } from '../models/post'

//const router = express.Router();
const store = new ResourceLoader()

/* GET home page. */
/*const index_route = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

const index = async (_req: Request, res: Response) => {
    try {
        const posts = store.index<Post>('blog').sort((a: Post, b: Post) => {
            return a.createdAt < b.createdAt ? 1 : -1
        })

        const featured_post = posts[0]
        featured_post.createdAt = new Date(
            featured_post.createdAt as unknown as string
        )

        const projects = store.index<Project>('projects')
        const featured_project =
            projects[Math.floor(Math.random() * projects.length)]

        res.render('index', {
            title: 'Home',
            root: '/',
            featured_post: featured_post,
            featured_project: featured_project,
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const about = async (req: Request, res: Response) => {
    try {
        res.render('about', {
            title: 'About',
            root: '/about',
            errors: null,
            success: null,
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

const resume = async (_req: Request, res: Response) => {
    try {
        res.render('resume', { title: 'Resume', root: '/resume' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const static_pages = (app: express.Application): void => {
    app.get('/about', about)
    app.get('/', index)
    app.get('/resume', resume)

    app.post(
        '/send',
        [
            check('name').notEmpty().withMessage('Name is required'),
            check('email').isEmail().withMessage('Invalid Email Address'),
            check('subject').notEmpty().withMessage('Subject is required'),
            check('message').notEmpty().withMessage('Message is required'),
        ],
        (request: Request, response: Response) => {
            try {

                const errors = validationResult(request);
    
                if (!errors.isEmpty()) {
                    console.log('FORM ERRORS');
                    response.render('about', {
                        title: 'About',
                        root: '/about',
                        errors: errors.mapped(),
                        success: false,
                    });
                    return;
                } else {
                    const transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: process.env.SENDER_EMAIL,
                            pass: process.env.SENDER_PASS,
                            // pass: 'write your Google App Password',
                        },
                    });
    
                    const mail_option = {
                        from: request.body.email,
                        to: process.env.EMAIL,
                        subject: request.body.subject,
                        text:
                            'new message from: ' +
                            request.body.name +
                            '(' +
                            request.body.email +
                            '): ' +
                            request.body.message,
                    }
    
                    transporter.sendMail(mail_option, (error, info) => {
                        if (error) {
                            console.log(error);
                            response.render('about', {
                                title: 'About',
                                root: '/about',
                                success: false,
                                errors: { email: error },
                            });
                        } else {
                            response.render('about', {
                                title: 'About',
                                root: '/about',
                                success: true,
                                errors: {},
                            });
                        }
                    });
                }
            } catch (err) {
                response.status(500).json(err);
            }
        }
    )
}

export default static_pages
