import app from './app'
import 'dotenv'

const PORT = (process.env.PORT !== undefined) ? process.env.PORT : 4000

app.listen(PORT,() =>{
  console.log(`Server running on ${PORT}`)
})