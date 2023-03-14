import express from 'express'

const routerLogin = express.Router();

routerLogin.post('/',(req, res)=>{
  res.send('desde login')
});

export default routerLogin