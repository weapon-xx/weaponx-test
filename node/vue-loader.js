const compiler = require('vue-template-compiler/build')
const fs = require('fs')

const html = `<div class="container">
  <div class="">
    {{title}}
  </div>
  <ul>
    <li v-for="(item, index) in list" @click="click(index)">
      {{item.text}}
    </li>
  </ul>
</div>`;

const compiled = compiler.compile(html);

function toFunction (code) {
  return (
    'function () {' + code + '}'
  )
}

fs.writeFile('compiled.js', 'var render = ' +
  toFunction(compiled.render ) +
  '\n' +
  'var staticRenderFns = [' +
    compiled.staticRenderFns.map(toFunction).join(',') +
  ']');

// console.log(compiled.render);
// console.log(compiled.staticRenderFns);
