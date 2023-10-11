/**
 * 确认弹窗
 * @param msg string
 * @param callBackFun function | undefined
 */
export function zconfirm(msg: string, callBackFun?: any) {
  uni.showModal({
    content: msg,
    success: function (res) {
      if (res.confirm) {
        callBackFun(true)
      } else if (res.cancel) {
        callBackFun(false)
      }
    },
  })
}
/**
 * 弹窗
 * @param msg string
 * @param callBackFun function | undefined
 */
export function zalert(msg: string, callBackFun?: any) {
  uni.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function () {
      if (callBackFun) {
        callBackFun()
      }
    },
  })
}

/**
 * 轻提示
 * @param msg string
 */
export function toast(msg: string) {
  uni.showToast({
    title: msg,
    duration: 2000,
    mask: false,
    icon: 'none',
  })
}

/**
 * 深拷贝
 * @param origin Object
 * @param target Object
 */
export const deepClone = function (origin, target: object = {}) {
  for (const prop in target) {
    if (target[prop] !== null && typeof target[prop] === 'object') {
      origin[prop] = Object.prototype.toString.call(target[prop]) === '[object Array]' ? [] : {}
      deepClone(origin[prop], target[prop])
    } else {
      origin[prop] = target[prop]
    }
  }
}
