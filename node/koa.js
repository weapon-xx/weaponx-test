const koa = require('koa')
const route = require('koa-route')

const app = new koa()

app.use(route.get('/', ctx => {
  this.body = 'Hello World'
  ctx.response.body = 'Hello ' + 'xx';
}))

app.listen(3000)
