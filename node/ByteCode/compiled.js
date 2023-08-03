const vm = require('vm');
const fs = require('fs').promises;
const v8 = require('v8');
v8.setFlagsFromString('--no-lazy');

async function compileFile(filePath) {
    const code = await fs.readFile(filePath, 'utf-8');
    const script = new vm.Script(code);
    const bytecode = script.createCachedData();
    await fs.writeFile(filePath.replace(/\.js$/i, '.bytecode'), bytecode);
}

compileFile(process.argv[2]);