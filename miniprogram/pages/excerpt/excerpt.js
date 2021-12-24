// pages/excerpt/excerpt.js
const jinrishici = require("../../utils/jinrishici.js")
const textUtil = require("../../utils/text.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: {},
        verse: [],
        hasData: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getShiCi()
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
    refresh: function () {
        this.getShiCi(() => {
            console.log("回调")
        })
    },
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //启用标题栏显示加载状态
        this.getShiCi(() => {
            wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
            wx.stopPullDownRefresh() //结束刷新
            console.log("onPullDownRefresh 回调")
        })
    },
    goToDetail: function (e) {
        if (this.data.hasData) {
            const myData = textUtil.transJinri(this.data.data)
            wx.navigateTo({
                url: `/pages/detail/detail`,
                success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('acceptDataFromOpenerPage', myData)
                }
            });
        }
    },
    getShiCi: function (callback) {
        jinrishici.load(result => {
            const array = textUtil.splitByComma(result.data.content)
            console.log(`完整诗句 ${result.data.origin.content.length} :${result.data.origin.content}`)
            this.setData({
                data: result.data,
                verse: array,
                hasData: true
            })
            if (typeof (callback) == "function") {
                callback()
            }
        })
    }
})