/*
	This is going to be our reseource loader for local project and blog md files
	What this needs to do is properly fetch the md file from the project
	or blog folders and load their images based on their slug name
*/
import fs from 'fs';
import path from 'path';
import marked from 'marked';
import DOMpurify from 'dompurify';
import { findFileType } from '../util/findFileType';

export class ResourceLoader {
    /*
		so this will receive input like "project, project-name"
		or blog, post-name, it it should check in the database
		foler for > [projects/blog] > project-name.md
		and return sanitized body content
	*/
    get<T>(type: string, name: string): [T, string] {
        const raw = fs.readFileSync(
            path.join(__dirname, '..', 'database', type, name + '.json'),
            'utf-8'
        );

        const data: T = JSON.parse(raw) as T;

        const content = fs.readFileSync(
            path.join(__dirname, '..', 'database', type, name + '.md'),
            'utf8'
        );
        const output = marked(content);
        //output = DOMpurify.sanitize(output);

        //console.log(output);

        return [data, output];
    }

    /*
		return an array of all the loaded json content from the directory
		maybe make this recursive later on?
	*/
    index<T>(type: string): T[] {
        const out = Array<T>();

        findFileType(
            path.join(__dirname, '..', 'database', type),
            /\.json$/,
            (filename) => {
                const data = fs.readFileSync(filename, 'utf-8');
                const content = JSON.parse(data) as T;
                out.push(content);
            }
        );

        /*const dir = fs.readdirSync(path.join(__dirname, "..", 'database', type));
		const help_me = dir.filter( (file: string) => {
			return file.includes('.json');
			}).forEach((file) => {
				const data = fs.readFileSync(
					path.join(
						__dirname, "..", 'database', type, file),
						 'utf8');
				
				const content = JSON.parse( data ) as T;
				out.push( content );
			});*/

        return out;
    }
}
