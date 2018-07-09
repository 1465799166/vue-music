export function addClass (el, className) {
  if (!el.hasClass) {
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 获取指定el的指定data
export function getData (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  // 当el没有该属性的值时，set该值为val，否则get
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
