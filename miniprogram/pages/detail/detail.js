// pages/detail/detail.js
const { envList } = require('../../envList.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        "data": {
            "title": "夜雨寄北",
            "dynasty": "唐代",
            "author": "李商隐",
            "content": [
                "两种风流，一家制作。雪花全似梅花萼。细看不是雪无香，天风吹得香零落。",
                "虽是一般，惟高一着。雪花不似梅花薄。梅花散彩向空山，雪花随意穿帘幕。"
            ],
            "translate": [
                "您问归期，归期实难说准，巴山连夜暴雨，涨满秋池。",
                "何时归去，共剪西窗烛花，当面诉说，巴山夜雨况味。"
            ]
        },
        "detail": "",
        "flod": 'flod'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel()
        const that = this
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        eventChannel.on('acceptDataFromOpenerPage', data => {
            console.log(`页面数据：${data}`)
            that.setData({ data: data })
            // wx.setNavigationBarTitle({
            //     title: data.origin.title,
            // })

            const quertAuthor = data.author
            console.log("quertAuthor:" + quertAuthor)
            wx.cloud.callFunction({
                name: 'quickstartFunctions',
                data: {
                    type: 'queryAuthor',
                    data: quertAuthor
                }
            }).then((resp) => {
                console.log("cloud function resp1:" + resp.result.data[0].desc)
                this.setData({
                    detail: resp.result.data[0].desc
                });
            }).catch((e) => {
                console.log(e);
            });
        })
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

    foldAuthor: function () {
        let flodd
        if (this.data.flod == 'flod') {
            flodd = 'unflod'
        } else {
            flodd = 'flod'
        }
        this.setData({ flod: flodd })
        console.log("flod:" + this.data.flod)
    }
})