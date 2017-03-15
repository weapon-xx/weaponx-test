const express= require('express')
const app = express()
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/login' ,(req, res)=>{

  res.cookie('name', 'xx', { domain: '127.0.0.1', expires: new Date(Date.now() + 900000000)})

  res.end('login success')
})

app.post('/test', (req, res)=>{
  console.log(req.hostname)
  console.log(req.cookies.name)

  res.end('success')
})

app.listen(8080, function(){
  console.log(`web server running in 8080`);
})
