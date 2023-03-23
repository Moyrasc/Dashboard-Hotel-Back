import mysql from 'mysql2'
import 'dotenv/config'

const {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT}= process.env

const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: Number(MYSQL_PORT)

})
export async function dbQuery (query: string, params?: any[]): Promise<any[]> {
  return await new Promise((resolve, reject) => {
    connection.query(query, params, (error, results: any) => {
      if (error != null) { reject(error) }
      resolve(results)
    })
  })
}


export default connection