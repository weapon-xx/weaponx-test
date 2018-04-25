const express= require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/FE.html')
})

app.get('/ajax', (req, res) => {
  res.sendFile(__dirname + '/ajax.html')
})

app.get('/iframe', (req, res) => {
  res.sendFile(__dirname + '/iframe.html')
})

app.get('/server', (req, res) => {
  res.json({name: 'xx'})
})

app.listen(8000, () => {
  console.log(`web server running in 8000`);
})
