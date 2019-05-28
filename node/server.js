const express = require('express')
const app = express()
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
app.use('/dist', express.static(resolve('./views')))

app.set('static', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

app.get('/', (req,res) => {
  res.render('data', {
    arr: [1, 2, 3, 4, 5, 6]
  });
})

app.get('/cookie', (req,res) => {
  res.sendFile(__dirname + '/cookie.html')
})

app.get('/localStorage1', (req,res) => {
  res.sendFile(path.resolve('../js/localStorage1.html'))
})

app.get('/localStorage2', (req,res) => {
  res.sendFile(path.resolve('../js/localStorage2.html'))
})

app.listen(8080, () => {
  console.log(`app server run in 8080`);
})
