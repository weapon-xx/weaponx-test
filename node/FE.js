const express= require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/FE.html')
})

app.listen(8000, function() {a
  console.log(`web server running in 8000`);
})
