const superagent = require('superagent')
const url = 'http://wisdomsports.com.cn/'

for(var i = 0; i<1000;i++){
  superagent.get(url)
            .end((err, data) =>{
              if(err){
                console.log(err)
                return
              }
              // console.log(data)
            })
}
