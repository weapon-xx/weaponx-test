const superagent = require('superagent')
const url = 'https://www.taobao.com/'

for(var i = 0; i<100000000;i++){
  superagent.get(url)
            .end((err, data) =>{
              if(err){
                console.log(err)
                return
              }
              // console.log(1)
              console.log(data);
            })
}
