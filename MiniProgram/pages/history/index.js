import Page from '../../zanui/common/page';
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logs: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        App.HttpService.getHistory().then(res => {
            var data = res.data;
            if (data.code == 200) {
                this.setData({
                    logs: data.data
                });
            } else {
                // 
            };
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    }
})