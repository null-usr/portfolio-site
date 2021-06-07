/* For the terminal */
import express, { Request, Response } from 'express';

const console = async (_req: Request, res: Response) => {
	try{
	  res.render('console', {title: "Console", root: '/console'});
	} catch (err) {
	  res.status(500).json(err);
	}
};

const console_controller = (app: express.Application): void => {
	app.get('/console', console);
};

export default console_controller;