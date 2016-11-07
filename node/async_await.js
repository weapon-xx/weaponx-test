const git = require('shell').git;

(async function(){
  const commitMsg = '...';      

  try{
    await git.add('pattern/for/some/files/*');
    await git.commit(commitMsg);
    await git.push();
  }catch(err){
    console.log(err);
  }
})();
