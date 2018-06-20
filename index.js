const test = 'test';
import './index.css';
import { consoleLogHelloWorld } from './common/util.a';
var a = require('./src/addClassList');
require('./src/generateCSV');
// var utilA = require('./common/util.a');
// var utilB = require('./common/util.b');
a();
consoleLogHelloWorld();
console.log($('.main').width());


var oImg = new Image();
oImg.src = require('./img/baidu.png');//当成模块引入图片
document.querySelector('.main').appendChild(oImg);

