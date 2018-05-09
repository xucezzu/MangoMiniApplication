/**
 * 网络请求的方法集
 */

const BaseUrl = 'http://121.43.103.69:9988/'

/**
 * 上传用户数据到服务器
 */
const storageUserInfo = (openId, userNickName, userAvatar, userGender, userCity, userProvince, userCountry, funCome) => {
  console.log('[request.js]调用来自于： ' + funCome)
  wx.request({
    url: BaseUrl + 'storageUserInfo/',
    method: 'POST',
    dataType: 'json',
    header: {
      'content-type': 'application/json'
    },
    data: {
      openId: openId,
      nickName: userNickName,
      avatar: userAvatar,
      gender: userGender,
      city: userCity,
      province: userProvince,
      country: userCountry,
    },
    success: res => {

    }
  })
}

/**
 * 模块只有通过 module.exports 才能对外暴露接口
 */
module.exports = {
  storageUserInfo: storageUserInfo,
}