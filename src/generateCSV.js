var people = [
  {
    "name": "Arron",
    "age": "22",
    "sex": "男",
    "birthday": "1993-01-06",
    "phone": "13187890289",
    "hobby": "basketball"
  },
  {
    "name": "Jack",
    "age": "24",
    "sex": "男",
    "birthday": "1991-02-22",
    "phone": "13567454389",
    "hobby": "football"
  },
  {
    "name": "Alice",
    "age": "21",
    "sex": "女",
    "birthday": "1996-11-26",
    "phone": "13187889509",
    "hobby": "reading"
  }
];


//s1. 用一个数组来存一行数据,所以第一行用一个数组来保存字段名
var head = [['name', 'age', 'sex', 'birthday', 'phone', 'hobby']];

//s2. 将数据push到大数组中
var p = people;
for (var i = 0; i < p.length; i++) {
  head.push([p[i].name, p[i].age, p[i].sex, p[i].birthday, p[i].phone, p[i].hobby]);
}

//s3. 按照csv文件内容格式，把每个数组用 , 连接，形成一行，并存入新数组
var csvRows = [];
for (var j = 0; j < head.length; j++) {
  csvRows.push(head[j].join(','))
}

//s4. 把新数组用 \n 回车连接，形成csvString

var csvString = csvRows.join('\n');

//BOM的方式解决EXCEL乱码问题
var BOM = '\uFEFF';
csvString = BOM + csvString;

//s5. 创建a标签
var a = document.getElementById('download');
a.href = 'data:attachment/csv,' + encodeURI(csvString);
a.target = '_blank';
a.download = 'sucaihuo.csv';
