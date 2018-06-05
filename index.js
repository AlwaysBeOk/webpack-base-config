const test = 'test';
require('./index.css');
var a = require('./src/addClassList');
var utilA = require('./common/util.a');
var utilB = require('./common/util.b');
a();
utilA();
utilB();


var oImg = new Image();
oImg.src = require('./img/baidu.png');//当成模块引入图片
document.querySelector('.main').appendChild(oImg);

