const git = require('shell').git;

(async function(){
  const commitMsg = '...';

  try{
    await setTimeout(()=>{
      console.log('任务1');
    },1000);
  }catch(err){
    console.log(err);
  }
})();
