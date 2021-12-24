// pages/library/library.js
const textUtil = require("../../utils/text.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "tabs": ["唐诗", "宋诗", "宋词"],
        "poetTang": [],
        "poetSong": [],
        "ci": [],
        "selectTab": 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("onload")
        this.getTang()
        this.getSong()
        this.getCi()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    getTang: function () {
        console.log("getTang")
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getTang'
            }
        }).then((resp) => {
            console.log("getTang get resp")
            this.setData({
                poetTang: resp.result.data
            });
        }).catch((e) => {
            console.log(e);
        });
    },
    getSong: function () {
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getSong'
            }
        }).then((resp) => {
            this.setData({
                poetSong: resp.result.data
            });
        }).catch((e) => {
            console.log(e);
        });
    },
    getCi: function () {
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            data: {
                type: 'getCi'
            }
        }).then((resp) => {
            this.setData({
                ci: resp.result.data
            });
        }).catch((e) => {
            console.log(e);
        });
    },
    switchTab: function (e) {
        this.setData({
            selectTab: e.currentTarget.dataset.idx
        })
    },
    gotoDetail: function (e) {
        let dynasty = "唐"
        switch (this.data.selectTab) {
            case 1:
            case 2:
                dynasty = "宋"
                break
        }
        const content = textUtil.transDBData(dynasty, e.currentTarget.dataset.content)
        wx.navigateTo({
            url: `/pages/detail/detail`,
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', content)
            }
        });
    }
})