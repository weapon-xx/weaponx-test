const express= require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/FE.html')
})

app.listen(8000, () => {
  console.log(`web server running in 8000`);
})
