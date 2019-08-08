import moment from 'moment'
/*
* 作者：charles
* @param [data]  返回的数据流
* 描述：模拟a标签下载
* 修改人：无
*/
const downFile = (data) => {
  let name = data.headers["content-disposition"];
  let temp_arr = name.split(";"),
    fileName = '';
  temp_arr.forEach(item => {
    if (item.indexOf('filename') > -1) {
      fileName = item.split("=")[1];
      return;
    }
  })
  let blob = new Blob([data.data]);
  const elink = document.createElement("a");
  elink.download = decodeURI(fileName);
  elink.style.display = "none";
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href);
  document.body.removeChild(elink);
}
//初始化tree对象，添加唯一key;
const initTree = (data, flag) => {
  data.forEach((item, idx) => {
    item.unique = item.id;
    item.id = flag + String(idx) + "_";
    item.label = item.key;
    if (item.children) {
      initTree(item.children, item.id);
    }
  })
  return data;
}
/*
* 作者：charles
* @param [falg]  时间段标识
* 描述：utc时间转为YYYY-MM-DD HH:mm
 * @return {字符串类型}
* 修改人：无
*/
const formatTime = (flag) => {
  switch (flag) {
    case '1h':
      return moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm');
    case '24h':
      return moment().subtract(24, 'hours').format('YYYY-MM-DD HH:mm');
    case '7d':
      return moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm');
  }
}
/*
* 作者：charles
* @param [json]  json数据
* 描述：格式化json显示
* 修改人：无
* @return {字符串类型}
*/
const formatJson = (json, options) => {
  let reg = null,
    formatted = '',
    pad = 0,
    PADDING = '    ';
  // optional settings
  options = options || {};
  // remove newline where '{' or '[' follows ':'
  options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
  // use a space after a colon
  options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

  // begin formatting...

  // make sure we start with the JSON as a string
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }
  // parse and stringify in order to remove extra whitespace
  json = JSON.parse(json);
  json = JSON.stringify(json);

  // add newline before and after curly braces
  reg = /([\{\}])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline before and after square brackets
  reg = /([\[\]])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline after comma
  reg = /(\,)/g;
  json = json.replace(reg, '$1\r\n');

  // remove multiple newlines
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, '\r\n');

  // remove newlines before commas
  reg = /\r\n\,/g;
  json = json.replace(reg, ',');

  // optional formatting...
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ':{');
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ':[');
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ': ');
  }
  json.split('\r\n').forEach((node, index) => {
    let i = 0,
      indent = 0,
      padding = '';

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }
    formatted += padding + node + '\r\n';
    pad += indent;
  })
  return formatted;
};
const formatNum = (num) => {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
export default {
  downFile,
  initTree,
  formatJson,
  formatTime,
  formatNum
}
