const express= require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/jsonp', function(req, res){
  const cb = req.query.callback
  const data = {
    name: 'xx',
    age: 20
  }
  res.end('cb(' + JSON.stringify(data) + ')')
})

app.post('/cors' ,(req, res)=>{
  console.log(req.query);
  console.log(req.body);

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8000'
  })

  res.end(JSON.stringify(req.body))
})

app.listen(8080, function(){
  console.log(`web server running in 8080`);
})
