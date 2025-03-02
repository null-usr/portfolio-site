import axios from 'axios'
import express, { Request, Response } from 'express'
import { ValidationError, check, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
// import { Project } from '../models/project'
// import { ResourceLoader } from '../config/resourceLoader'
// import { Post } from '../models/post'

//const router = express.Router();
// const store = new ResourceLoader()

/* GET home page. */
/*const index_route = router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

const index = async (_req: Request, res: Response) => {
    try {
        let response = await fetch(
            'https://api.nclarke.dev/api/blogs?populate[Thumbnail][fields][0]=url'
        )
        let data = await response.json()
        const posts = data.data.map((d: any) => ({
            id: d.id,
            createdAt: d.createdAt,
            title: d.Title,
            summary: d.Summary,
            content: d.Content,
            thumb: d.Thumbnail ? d.Thumbnail.url : undefined,
            tags: d.tags ? d.tags.map((t: { Name: string }) => t.Name) : [],
            slug: d.slug,
        }))

        response = await fetch(
            'https://api.nclarke.dev/api/projects?populate[Thumbnail][fields][0]=url&populate[tags]=*'
        )
        data = await response.json()
        const projects = data.data.map((d: any) => ({
            id: d.id,
            createdAt: d.createdAt,
            title: d.Title,
            summary: d.Summary,
            content: d.Content,
            thumb: d.Thumbnail ? d.Thumbnail.url : undefined,
            tags: d.tags.map((t: { Name: string }) => t.Name),
            slug: d.slug,
        }))

        // const posts = store.index<Post>('blog').sort((a: Post, b: Post) => {
        //     return a.createdAt < b.createdAt ? 1 : -1
        // })

        const featured_post = posts[0]
        featured_post.createdAt = new Date(
            featured_post.createdAt as unknown as string
        )

        // const projects = store.index<Project>('projects')
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
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

const resume = async (_req: Request, res: Response) => {
    try {
        const response = await fetch(
            'https://api.nclarke.dev/api/CV?populate[CV][fields][0]=url'
        )
        const data = await response.json()
        const url = data.data.CV.url

        res.render('resume', { title: 'Resume', root: '/resume', url })
    } catch (err) {
        res.status(500).json(err)
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
            check('g-recaptcha-response')
                .notEmpty()
                .withMessage('please complete the captcha'),
        ],
        async (request: Request, response: Response) => {
            try {
                const errors = validationResult(request)

                if (!errors.isEmpty()) {
                    console.log('FORM ERRORS')
					console.log(errors)
                    response.render('about', {
                        title: 'About',
                        root: '/about',
                        errors: errors.mapped(),
                        success: false,
                    })
                    return
                } else {
                    // recheck captcha
                    const recaptchaResponse =
                        request.body['g-recaptcha-response']

                    try {
                        // Send the response to Google's reCAPTCHA verification API
                        const verificationURL = `https://www.google.com/recaptcha/api/siteverify`
                        const secretKey = process.env.RECAPTCHA_SECRET_KEY

                        const { data } = await axios.post(
                            verificationURL,
                            null,
                            {
                                params: {
                                    secret: secretKey,
                                    response: recaptchaResponse,
                                },
                            }
                        )

                        if (data.success) {
                            const transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: process.env.SENDER_EMAIL,
                                    pass: process.env.SENDER_PASS,
                                    // pass: 'write your Google App Password',
                                },
                            })

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
                                    console.log(error)
                                    response.render('about', {
                                        title: 'About',
                                        root: '/about',
                                        success: false,
                                        errors: { email: error },
                                    })
                                } else {
                                    response.render('about', {
                                        title: 'About',
                                        root: '/about',
                                        success: true,
                                        errors: {},
                                    })
                                }
                            })
                        } else {
							response.render('about', {
								title: 'About',
								root: '/about',
								success: false,
								errors: { 'g-recaptcha-response': 'reCAPTCHA verification failed' },
							})
                        }
                    } catch (error) {
                        console.error('reCAPTCHA verification error:', error)
                        return response.status(500).json({
                            success: false,
                            message: 'Internal server error',
                        })
                    }
                }
            } catch (err) {
                response.status(500).json(err)
            }
        }
    )
}

export default static_pages
