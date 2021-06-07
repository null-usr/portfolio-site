import client from '../config/database';
import bcrypt from 'bcrypt';

export type User = {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
};

export class Userbase {
    //constructor(parameters) {

    //}
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();

            if (result.rowCount === 0) {
                throw 'No user by that ID';
            }

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    //password hashing here ====================================================================
    async create(usr: User): Promise<User> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql =
                'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';

            const saltRounds = parseInt(process.env.SALTROUNDS as string);
            const pepper = process.env.BCRYPT_PASSWORD as string;

            const conn = await client.connect();
            const hash = bcrypt.hashSync(usr.password + pepper, saltRounds);

            const result = await conn.query(sql, [
                usr.first_name,
                usr.last_name,
                hash,
            ]);

            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(
                `Could not add new user ${usr.first_name}. Error: ${err}`
            );
        }
    }

    async delete(id: string): Promise<User> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'DELETE FROM users WHERE id=($1)';

            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const user = result.rows[0];

            conn.release();

            if (result.rowCount === 0) {
                throw 'No product by that ID';
            }

            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async authenticate(id: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT password FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            if (result.rows.length) {
                const user = result.rows[0];
                const pepper = process.env.BCRYPT_PASSWORD as string;

                if (bcrypt.compareSync(password + pepper, user.password)) {
                    return user;
                }
                return null;
            }

            //could be a vulnerability
            //throw "No user with such an ID exists.";
            return null;
        } catch (err) {
            throw new Error(`Could not authenticate user ${id}. Error: ${err}`);
        }
    }
}
