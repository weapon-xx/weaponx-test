const express = require('express')
const app = express()
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
app.use('/dist', express.static(resolve('../static')))

app.set('static', path.join(__dirname, './static'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

app.get('/',(req,res) => {
  res.render('data', {
    arr : [1,2,3,4,5,6]
  });
})

app.listen(8080,() => {
  console.log(`app server run in 8080`);
})
