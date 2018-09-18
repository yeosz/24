import Page from '../../zanui/common/page';
const App = getApp()

Page({
    data: {
        logging: 1,
        openid: '',
        userInfo: {}
    },
    onLoad() {},
    onShow() {
        this.wechatSignIn(this.goIndex)
    },
    goIndex() {
        App.WxService.redirectTo('/pages/home/index')
    },
    showModal() {
        App.WxService.showModal({
            title: '友情提示',
            content: '获取用户登录状态失败，请重新登录',
            showCancel: 0,
        })
    },
    wechatSignIn(cb) {
        App.WxService.login()
            .then(data => {
                return App.HttpService.wechatSignIn({
                    code: data.code
                });
            })
            .then(res => {
                const data = res.data;
                if (data.code == 200) {
                    App.WxService.setStorageSync('token', data.data)
                    return App.HttpService.getProfile()
                        .then(res => {
                            const data = res.data
                            if (data.code == 200) {
                                App.globalData.userInfo = data.data
                                cb()
                            } else {
                                wx.showToast({
                                    title: '获取个人信息失败',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        });
                } else if (data.code == 4001) {
                    this.setData({
                        openid: data.message,
                        logging: 0
                    });
                } else {
                    App.showModal();
                }
            })
    },
    wechatSignUp(cb) {
        App.HttpService.signIn({
                openid: this.data.openid,
                name: this.data.userInfo.nickName,
                avatar: this.data.userInfo.avatarUrl,
                gender: this.data.userInfo.gender
            })
            .then(res => {
                const data = res.data
                if (data.code == 200) {
                    App.WxService.setStorageSync('token', data.data)
                    cb()
                } else {
                    wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 4000
                    })
                }
            })
    },
    getUserInfo: function(e) {
        if (e.detail.errMsg != 'getUserInfo:ok') {
            wx.showToast({
                title: '登录失败',
                icon: 'none',
                duration: 4000
            })
            return;
        }
        App.globalData.userInfo = e.detail.userInfo
        let userInfo = e.detail.userInfo
        userInfo.openid = this.data.openid
        this.setData({
            userInfo: userInfo
        })
        this.wechatSignUp(this.goIndex);
    }
})