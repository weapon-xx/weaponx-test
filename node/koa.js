const koa = require('koa')
const route = require('koa-route')

const app = new koa()

app.use(route.get('/', function *(){
  this.body = 'Hello World'
}))

app.listen(3000)
