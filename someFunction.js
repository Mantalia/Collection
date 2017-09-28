// 下载文件
function download(url) {
  var id = arguments.length <= 1 || arguments[1] === undefined ? '__downloadIframe' : arguments[1];
  var iframe = document.getElementById(id);

  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.id = id;
    document.body.appendChild(iframe);
  }
  iframe.src = url;
}

// 根据数值取整百数(支持负数)
function wholeNum(number) {
  var remainder = number % 100;
  if (remainder === 0)
    return number;
  else {
    if (number >= 0)
      return number + 100 - remainder;
    else
      return number - 100 - remainder;
  }
}