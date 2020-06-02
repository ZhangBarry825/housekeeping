// pages/publish-task/four/four.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden:false,
        tags: {
            one: true,
            two: false,
            three: true,
            four: false
        }
    },
    selectTag(e) {
        let tag = e.currentTarget.dataset.item
        console.log(tag,9)
        if (tag == 'one') {
            this.setData({
                "tags.one":!this.data.tags.one
            })
        }else if(tag=='two'){
            this.setData({
                "tags.two":!this.data.tags.two
            })
        }else if(tag=='three'){
            this.setData({
                "tags.three":!this.data.tags.three
            })
        }else if(tag=='four'){
            this.setData({
                "tags.four":!this.data.tags.four
            })
        }

    },
    changHidden(){
        this.setData({
            hidden:!this.data.hidden
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    }
})