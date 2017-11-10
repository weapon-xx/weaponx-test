const express = require('express')
const app = new express()

app.get('/test/:num', (req, res) => {
  const fileNum = req.params.num;
  res.sendFile(__dirname + `/test-${fileNum}.html`);
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

app.get('/sleepJs.js', (req, res) => {
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

app.get('/sleepJs2.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })
})

app.get('/sleepJs3.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

app.get('/sleepJs4.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

app.get('/sleepJs5.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

app.get('/sleepJs6.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

app.get('/sleepJs7.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

app.get('/sleepJs8.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

app.get('/sleepJs9.js', (req, res) => {
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3e3);
  }).then(() => {
    res.sendFile(__dirname + '/js1.js');
  })})

function sleep(time) {
  return new Promise(res => {
    setTimeout(res(), time);
  })
}

app.listen(8000, () => {
  console.log('test start')
});
