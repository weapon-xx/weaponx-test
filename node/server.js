const express = require('express');
const app = express();
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 指定静态资源路径
app.use(express.static('../'));      

// 设置渲染引擎
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

// 使用 cookieParser 中间件;
app.use(cookieParser());

// 设置 session
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 },
  resave: false,
  saveUninitialized: false,
}));

app.get('/', (req, res) => {
  if (req.session.userId || req.cookies.userId) {
      res.send('welcome');
      console.log(`session: ${req.session.userId}`);
  } else {
    const sessionId =  1;
    req.session.userId = sessionId;
    res.cookie('userId', sessionId, { maxAge: 60 * 1000, singed: true});
    res.send('First Time Login');
  }
});

app.get('/data', (req, res) => {
  res.render('data', {
    arr: [1, 2, 3, 4, 5, 6],
  });
});

app.get('/cookie', (req, res) => {
  res.sendFile(__dirname + '/cookie.html');
});

app.get('/localStorage1', (req, res) => {
  res.sendFile(path.resolve('../js/localStorage1.html'));
});

app.get('/localStorage2', (req, res) => {
  res.sendFile(path.resolve('../js/localStorage2.html'));
});

app.get('/webWorker', (req, res) => {
  res.sendFile(path.resolve('../js/webWorker.html'));
});

app.listen(8080, () => {
  console.log(`app server run in 8080`);
});
