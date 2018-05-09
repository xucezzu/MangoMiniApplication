/**
 * 公共JS
 */

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 获取当前日期的具体值
 */
function dateNow() {
  const date = new Date();
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  /**
   * 如果月份的长度为1且不为0，则前面补0
   */
  if (1 == month.toString.length && 0 != month.toString.length) {
    month = '0' + month
  }

  if (1 == day.toString.length && 0 != day.toString.length) {
    day = '0' + day
  }

  return year + '-' + month + '-' + day
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 异步处理
 */
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

/**
 * 模块只有通过 module.exports 才能对外暴露接口
 */
module.exports = {
  formatTime: formatTime,
  dateNow : dateNow,
  wxPromisify: wxPromisify
}

