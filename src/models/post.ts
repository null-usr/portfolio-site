import client from '../config/database'
import bcrypt from 'bcrypt'

export type Post = {
    id?: number
    createdAt: Date
    title: string
    summary: string
    content: string
    tags?: string[]
    thumb?: string
    hide?: boolean
    slug: string
}

export class PostBase {
    async index(): Promise<Post[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM Posts'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get Posts: ${err}`)
        }
    }

    async show(id: number): Promise<Post> {
        try {
            const sql = 'SELECT * FROM Posts WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])

            conn.release()

            if (result.rowCount === 0) {
                throw 'No Post by that ID'
            }

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find Post ${id}. Error: ${err}`)
        }
    }

    //password hashing here ====================================================================
    async create(pst: Post): Promise<Post> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql =
                'INSERT INTO Posts (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *'

            const saltRounds = parseInt(process.env.SALTROUNDS as string)
            const pepper = process.env.BCRYPT_PASSWORD as string

            const conn = await client.connect()

            const result = await conn.query(sql, [
                pst.title,
                pst.summary,
                pst.content,
            ])

            const Post = result.rows[0]

            conn.release()

            return Post
        } catch (err) {
            throw new Error(
                `Could not add new Post ${pst.title}. Error: ${err}`
            )
        }
    }

    async delete(id: string): Promise<Post> {
        try {
            //SERIAL PRIMARY KEY? figure out how to factor that in
            const sql = 'DELETE FROM Posts WHERE id=($1)'

            const conn = await client.connect()

            const result = await conn.query(sql, [id])

            const Post = result.rows[0]

            conn.release()

            if (result.rowCount === 0) {
                throw 'No product by that ID'
            }

            return Post
        } catch (err) {
            throw new Error(`Could not delete Post ${id}. Error: ${err}`)
        }
    }

    async authenticate(id: string, password: string): Promise<Post | null> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT password FROM Posts WHERE id=($1)'
            const result = await conn.query(sql, [id])

            if (result.rows.length) {
                const Post = result.rows[0]
                const pepper = process.env.BCRYPT_PASSWORD as string

                if (bcrypt.compareSync(password + pepper, Post.password)) {
                    return Post
                }
                return null
            }

            //could be a vulnerability
            //throw "No Post with such an ID exists.";
            return null
        } catch (err) {
            throw new Error(`Could not authenticate Post ${id}. Error: ${err}`)
        }
    }
}
