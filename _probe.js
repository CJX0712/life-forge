// Probe: dump readable sample grids + checksums to _probe.txt
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const m = html.match(/<script id="engine">([\s\S]*?)<\/script>/);
const ctx = { console, Math, Object, Array, JSON, String, globalThis: {} }; ctx.globalThis = ctx;
vm.createContext(ctx);
const Life = vm.runInContext(m[1] + '\nLife;', ctx, { filename: 'engine.js' });

function show(s, label){
  const lines = [];
  for (let y = 0; y < s.h; y++){
    let row = '';
    for (let x = 0; x < s.w; x++) row += s.grid[y * s.w + x] ? '█' : '·';
    lines.push(row);
  }
  return label + '\n' + lines.join('\n');
}

const out = [];
let s;

s = Life.create(11, 11); Life.putPattern(s, 'block');
out.push(show(s, 'block (gen ' + s.gen + ', pop=' + Life.pop(s) + '):'));
Life.step(s);
out.push(show(s, 'block after 1 gen (pop=' + Life.pop(s) + '):'));

s = Life.create(11, 11); Life.putPattern(s, 'blinker');
out.push(show(s, 'blinker (gen ' + s.gen + ', pop=' + Life.pop(s) + '):'));
Life.step(s);
out.push(show(s, 'blinker after 1 gen (pop=' + Life.pop(s) + '):'));

s = Life.create(11, 11); Life.putPattern(s, 'glider');
out.push(show(s, 'glider (gen ' + s.gen + ', pop=' + Life.pop(s) + '):'));
for (let i = 0; i < 4; i++) Life.step(s);
out.push(show(s, 'glider after 4 gens (pop=' + Life.pop(s) + '):'));

s = Life.create(40, 20); Life.random(s, '晨星', 0.33);
out.push('seed "晨星" (40x20, pop=' + Life.pop(s) + ', fp=' + Life.fingerprint(s) + '): sample top-left 20x20');
for (let y = 0; y < 20; y++){
  let row = '';
  for (let x = 0; x < 20; x++) row += s.grid[y * 40 + x] ? '█' : '·';
  out.push(row);
}

fs.writeFileSync(path.join(__dirname, '_probe.txt'), out.join('\n\n') + '\n', 'utf8');
console.log('probe written: ' + out.join('\n\n').length + ' chars');
