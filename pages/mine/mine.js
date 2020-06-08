/* pages/mine/mine.js */
const app = getApp()
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showContact:false,
        phone:''
    },
    contactUs(){
        this.setData({
            showContact:true
        })
    },
    cancelShow(){
        this.setData({
            showContact:false
        })
    },

    fetchData() {
        let that = this
        api.get({
            url: '/User/contact_service',
            success: res => {
                console.log(res, 765)
                if (res.code == 200) {
                    that.setData({
                        phone: res.data.service_phone
                    })
                } else {
                    console.log('获取数据失败');
                }
            }
        })
    },
    callPhone(){
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchData()
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})