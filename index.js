var c = require('chalk');
var { Noise } = require('noisejs');

var noise = new Noise(Math.random());
var errNoise = new Noise(Math.random());

var width = 100;
var height = 100;
var interval = 100;
var stdoutColorPoints = [
  'blue',
  'blueBright',
  'cyan',
  'cyanBright',
  'green',
  'greenBright',
  'white',
  'whiteBright',
];
var stderrColorPoints = [
  'black',
  'red',
  'redBright',
  'magenta',
  'magentaBright',
  'yellow',
  'yellowBright',
];

var line = 0;
var errLine = 0;

function writeLine() {
  var vals = Array(width)
    .fill(null)
    .map((x, i) => noise.simplex2(i / width, (line % height) / height))
    .map(v => stdoutColorPoints[Math.floor((stdoutColorPoints.length - 1) * Math.abs(v))])
    .map(color => c[color](Math.floor(Math.random() * 36).toString(36)));

  console.log(pad(line) + ' ' + vals.join(''));
  line++;
  if (line % height === 0) {
    noise.seed(Math.random());
  }
}

function writeErrorLine() {
  var vals = Array(width)
    .fill(null)
    .map((x, i) => errNoise.simplex2(i / width, (errLine % height) / height))
    .map(v => stderrColorPoints[Math.floor((stderrColorPoints.length - 1) * Math.abs(v))])
    .map(color => c[color](Math.floor(Math.random() * 36).toString(36)));

  console.error(pad(errLine) + ' ' + vals.join(''));
  errLine++;
  if (errLine % height === 0) {
    errNoise.seed(Math.random());
  }
}

function pad(str) {
  str = str + '';
  var pads = ['     ', '    ', '   ', '  ', ' '];
  if (str.length < pads.length) {
    str = str + pads[str.length];
  }
  return str;
}

setInterval(writeLine, interval);
setInterval(writeErrorLine, interval);
