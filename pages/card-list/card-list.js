// pages/card-list/card-list.js
const app = getApp()
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        slideButtons: [
             {
                type: 'warn',
                text: '删除',
                extClass: 'test',
            }],
        litedata: []
    },
    addCard () {
        wx.navigateTo({
            url: '/pages/bind-card/bind-card'
        })
    },
    slideButtonTap (e) {
        console.log(e.currentTarget.dataset.current)
     let current= e.currentTarget.dataset.current
            api.post({
                url: `/User/del_bankcard/`,
                data: {
                    user_id: wx.getStorageSync('userid'),
                    user_token: wx.getStorageSync('token'),
                    status:current.status,
                    id:current.cardid,
                },
                success: res => {
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                        duration: 2000
                      })
                      this.retrieveData()
                    console.log(res, "libiao ")
                }
            })
    },
    // 获取列表
    retrieveData () {
        api.post({
            url: `/User/bankcard_list/${1}/${100}/`,
            data: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token'),
            },
            success: res => {
                this.setData({
                    litedata: res.list
                })
                console.log(this.data, "libiao ")
                
                console.log(res, "libiao ")
            }
        })
        // http://{{host}}/User/bank_list/$page/$limit/?client_id=$client_id&client_secret=$client_secret
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.retrieveData()
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
        this.retrieveData()
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
