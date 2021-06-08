import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    /*AWS_DB_HOST,
    AWS_DB_NAME,
    AWD_DB_USER,
    AWS_DB_PASSWORD,
    AWS_DB_PORT,*/
    ENV,
    SETUP,
} = process.env;

let port;
if (process.env.POSTGRES_PORT && (ENV === 'test' || ENV === 'dev')) {
    port = parseInt(process.env.POSTGRES_PORT) || 5432;
}
/*else if (AWS_DB_PORT)
{
    port = parseInt(AWS_DB_PORT) || 5432;
}
else
{
    port = 5432;
}*/

//to get typescript off my back..
let client: Pool = new Pool();

if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: port || 5432,
    });
} else if (ENV === 'prod') {
    /*client = new Pool({
        host: AWS_DB_HOST,
        database: AWS_DB_NAME,
        user: AWD_DB_USER,
        password: AWS_DB_PASSWORD,
        port: port || 5432,
    });*/
} else {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: port || 5432,
    });
}

export default client;
