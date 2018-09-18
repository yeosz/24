import Page from '../../zanui/common/page';
import Notify from '../../zanui/notify/notify';
const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sysWidth: 0
    },
    showNotify(message) {
        Notify(message);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.setData({
            sysWidth: App.globalData.sysWidth / 2 - 10
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    getUserInfo() {
        const userInfo = App.globalData.userInfo

        if (userInfo) {
            this.setData({
                userInfo: userInfo
            })
            return
        }

        App.getUserInfo()
            .then(data => {
                this.setData({
                    userInfo: data
                })
            })
    }
})