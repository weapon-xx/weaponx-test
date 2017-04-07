const express= require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/300ms_delay.html')
})

app.listen(8000, function() {
  console.log(`web server running in 8000`);
})
