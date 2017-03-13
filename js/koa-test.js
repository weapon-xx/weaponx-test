const koa = require('koa')
const app = new koa()
const port = 3000

function Router() {
  this.route = {
    index: function(){
      return 'this is index page'
    },
    test: function(){
      return 'this is test page'
    },

  }
}

const router = new Router()

app.use(ctx => {
  ctx.body = router.route[ctx.url.substring(1, ctx.url.length)]()
})

app.listen(port, ()=>{
  console.log(`web server is running at port ${port}`);
})
