const express = require('express')
const app = new express()

app.get('/test1', (req, res) => {
    res.sendFile(__dirname + '/test-1.html');
})

app.get('/test2', (req, res) => {
    res.sendFile(__dirname + '/test-2.html');
})

app.get('/test3', (req, res) => {
    res.sendFile(__dirname + '/test-3.html');
})

app.get('/test4', (req, res) => {
    res.sendFile(__dirname + '/test-4.html');
})

app.get('/Css1.css', (req, res) => {
    res.sendFile(__dirname + '/css1.css');
})

app.get('/sleepCss1.css', (req, res) => {
  console.log('css: ' + new Date().getTime())

  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    console.log('css: ' + new Date().getTime())
    res.sendFile(__dirname + '/css1.css');
  })
})

app.get('/js1.js', (req, res) => {
    res.sendFile(__dirname + '/js1.js');
})

app.get('/sleepJs1.js', (req, res) => {
  console.log('js: ' + new Date().getTime())
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    console.log('js: ' + new Date().getTime())
    res.sendFile(__dirname + '/js1.js');
  })
})


function sleep(time) {
  return new Promise(res => {
    setTimeout(res(), time);
  })
}

app.listen(8000, () => {
  console.log('test start')
});
