import WxValidate from './helpers/plugins/wx-validate/WxValidate'
import WxService from './helpers/plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './config'
App({
  onLaunch: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  globalData: {
    userInfo: null,
    sysWidth: wx.getSystemInfoSync().windowWidth,
    sysHeight: wx.getSystemInfoSync().windowHeight
  },
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }),
  WxService: new WxService,
  __config,
});