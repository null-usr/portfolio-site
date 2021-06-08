import client from '../config/database';
import bcrypt from 'bcrypt';
import { default as slug } from 'slug';

export type Project = {
    id?: number;
    name: string;
    summary: string;
    content: string; //path to md file
    thumb?: string;
    tags?: string[];
    hide?: boolean;
    slug: string;
};

/* for pgdb */
export class ProjectBase {
    async index(): Promise<Project[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM Projects';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get Projects: ${err}`);
        }
    }

    async show(id: number): Promise<Project> {
        try {
            const sql = 'SELECT * FROM Projects WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();

            if (result.rowCount === 0) {
                throw 'No Project by that ID';
            }

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find Project ${id}. Error: ${err}`);
        }
    }

    //password hashing here ====================================================================
    async create(prj: Project): Promise<Project> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql =
                'INSERT INTO Projects (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';

            const saltRounds = parseInt(process.env.SALTROUNDS as string);
            const pepper = process.env.BCRYPT_PASSWORD as string;

            const conn = await client.connect();

            const result = await conn.query(sql, [
                prj.name,
                prj.summary,
                prj.content,
                //hash,
            ]);

            const Project = result.rows[0];

            conn.release();

            return Project;
        } catch (err) {
            throw new Error(
                `Could not add new Project ${prj.name}. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<Project> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'DELETE FROM Projects WHERE id=($1)';

            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const Project = result.rows[0];

            conn.release();

            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }

            return Project;
        } catch (err) {
            throw new Error(`Could not delete Project ${id}. Error: ${err}`);
        }
    }

    async authenticate(id: string, password: string): Promise<Project | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT password FROM Projects WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            if (result.rows.length) {
                const Project = result.rows[0];
                const pepper = process.env.BCRYPT_PASSWORD as string;

                if (bcrypt.compareSync(password + pepper, Project.password)) {
                    return Project;
                }
                return null;
            }

            //could be a vulnerability
            //throw "No Project with such an ID exists.";
            return null;
        } catch (err) {
            throw new Error(
                `Could not authenticate Project ${id}. Error: ${err}`
            );
        }
    }
}
