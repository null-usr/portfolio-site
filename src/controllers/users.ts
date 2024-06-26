import express, { Request, Response } from 'express'
import { User, Userbase } from '../models/user'
//import jwt from 'jsonwebtoken';
//import { verifyAuthToken } from '../jwt_middleware';

const store = new Userbase()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(parseInt(req.params.id))
        res.json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        }

        const newUser = await store.create(user)
        /*const token = jwt.sign(
            { user: newUser },
            process.env.TOKEN_SECRET as string
        );*/

        //return token instead of user
        //res.json({ token: token });
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const user = await store.delete(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(400).json(err)
    }
}

const user_routes = (app: express.Application): void => {
    //app.get('/users', verifyAuthToken, index);
    //app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create)
    //app.delete('/users/:id', verifyAuthToken, destroy);
}

export default user_routes
