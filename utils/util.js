const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeMS = date => {
  var s;
  var hours = parseInt((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = hours*60+parseInt((date % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((date % (1000 * 60)) / 1000);
  s = (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
  return s;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeMS: formatTimeMS,
}
