const fs = require('fs')
const vm = require('vm');
const v8 = require('v8');
v8.setFlagsFromString('--no-flush-bytecode');

const HeaderOffsetMap = {
  'magic': 0,
  'version_hash': 4,
  'source_hash': 8,
  'flag_hash': 12
};

let _flag_buf;

function getFlagBuf() {
  if (!_flag_buf) {
    const script = new vm.Script("");
    _flag_buf = getHeader(script.createCachedData(), 'flag_hash');
  }
  return _flag_buf;
}

function getHeader(buffer, type) {
  const offset = HeaderOffsetMap[type];
  return buffer.slice(offset, offset + 4);
}

function setHeader(buffer, type, vBuffer) {
  vBuffer.copy(buffer, HeaderOffsetMap[type]);
}

function buf2num(buf) {
  // 注意字节序问题
  let ret = 0;
  ret |= buf[3] << 24;
  ret |= buf[2] << 16;
  ret |= buf[1] << 8;
  ret |= buf[0];

  return ret;
}

function loadBytecode(filePath) {
  const bytecode = fs.readFileSync(filePath, null);

  setHeader(bytecode, 'flag_hash', getFlagBuf());

  const sourceHash = buf2num(getHeader(bytecode, 'source_hash'));
  const script = new vm.Script(' '.repeat(sourceHash), {
    filename: filePath,
    cachedData: bytecode,
    lineOffset: 0,
    displayErrors: true
  });

  if (script.cachedDataRejected) {
    throw new Error('something is wrong');
  }
  return script;
}

if (process.mainModule && process.mainModule.filename === __filename) {
  const scirpt = loadBytecode(process.argv[2]);
  scirpt.runInThisContext({
    filename: process.argv[2],
    displayErrors: true,
    lineOffset: 0,
    columnOffset: 0,
  });
}

module.exports.loadBytecode = loadBytecode;