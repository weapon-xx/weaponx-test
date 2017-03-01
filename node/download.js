const express = require('express')
const app = express()

app.get('/', (req, res)=>{
  res.download('../static/wallpaper.jpg', 'test.jpg', (err)=>{
    if(err){
      console.log(err)
    }else{
      console.log('download jpg');
    }
  })
})

app.listen(8000, () =>{
  console.log(`web server is running on port 8000`);
})
