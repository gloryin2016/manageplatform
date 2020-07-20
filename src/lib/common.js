// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'

// 将下划线分割的对象属性转换为驼峰式aBcD属性
export function GetCamelObjectPro (obj) {
  let camelObj = {}
  Object.keys(obj).forEach(key => {
    let camelKey = key
      .replace(/_([a-zA-Z])/g, (match, offset) => offset.toUpperCase())
      .replace('_', '')
      .replace(/^[A-Z]/, s => s.toLowerCase())
    camelObj[camelKey] = obj[key]
  })
  return camelObj
}

export function IsNullOrEmpty (obj) {
  return obj === null || obj === undefined || obj === ''
}

export function OneOf (str, list) {
  if (Array.isArray(list)) {
    let hasStr = false
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i] === str) {
        hasStr = true
        break
      }
    }
    return hasStr
  } else {
    return false
  }
}

export function GetScrollTop () {
  let scrollTop = 0
  let bodyScrollTop = 0
  let documentScrollTop = 0
  if (document.body) {
    bodyScrollTop = document.body.scrollTo
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
  return scrollTop
}

export function GetScrollHeight () {
  let scrollHeight = 0
  let bodyScrollHeight = 0
  let documentScrollHeight = 0
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
  return scrollHeight
}

export function GetWindowHeight () {
  let windowHeight = 0
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight
  } else {
    windowHeight = document.body.clientHeight
  }
  return windowHeight
}

// 日期格式化函数
export function DateFormat (date, fmt) {
  const target = date === '' ? new Date() : new Date(date)
  let o = {
    'M+': target.getMonth() + 1,
    'd+': target.getDate(),
    'h+': target.getHours(),
    'm+': target.getMinutes(),
    's+': target.getSeconds(),
    'q+': Math.floor((target.getMonth() + 3) / 3),
    'S': target.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (target.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt.indexOf('Na') !== -1 ? '' : fmt
}

// export function GetPdf (containterID, pdfName) {
//   var title = pdfName
//   html2Canvas(document.querySelector('#' + containterID), {
//     allowTaint: true
//   }).then(function (canvas) {
//     let contentWidth = canvas.width
//     let contentHeight = canvas.height

//     // 一页pdf显示html页面生成的canvas高度;
//     let pageHeight = contentWidth / 592.28 * 841.89

//     // 未生成pdf的html页面高度
//     let leftHeight = contentHeight

//     // 页面偏移
//     let position = 0

//     // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
//     let imgWidth = 595.28
//     let imgHeight = 592.28 / contentWidth * contentHeight

//     let pageData = canvas.toDataURL('image/jpeg', 1.0)

//     let PDF = new JsPDF('', 'pt', 'a4')

//     // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
//     // 当内容未超过pdf一页显示的范围，无需分页
//     if (leftHeight < pageHeight) {
//       PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
//     } else {
//       while (leftHeight > 0) {
//         PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
//         leftHeight -= pageHeight
//         position -= 841.89
//         if (leftHeight > 0) {
//           PDF.addPage()
//         }
//       }
//     }
//     PDF.save(title + '.pdf')
//   })
// }

// 深拷贝对象
export function DeepCopyObject (obj) {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj))
  } else {
    console && console.log('传入非对象')
    return null
  }
}

// 数字金额大写转换(可以处理整数,小数,负数)
export function RmbToUpper (n) {
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)

  let s = ''

  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }

  s = s || '整'
  n = Math.floor(n)

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}
