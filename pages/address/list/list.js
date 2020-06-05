// pages/address/list/list.js
const api = require('../../../utils/api.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageSize: 999,
        pageNum: 1,
        selected: true,
        addressList: []
    },
    selectAdd(e) {
        console.log(e.currentTarget.dataset.item)
        let add=e.currentTarget.dataset.item

        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面

//直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            address: add.province+add.city+add.area+add.address+add.addresses,
            user_address_id:add.id
        })
        wx.navigateBack({
            delta: 1
        })

    },
    goEdit(e) {
        let item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '/pages/address/update/update?item='+JSON.stringify(item)
        })
    },
    goAdd(e) {
        wx.navigateTo({
            url: '/pages/address/add/add'
        })
    },
    fetchData() {
        let that = this
        api.post({
            url: '/User/address/' + this.data.pageNum + '/' + this.data.pageSize,
            data: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token'),
            },
            success: data => {
                console.log(data, 987)
                if (data.code == 200) {
                    that.setData({
                        addressList: data.list
                    })
                }
            }
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
        this.fetchData()
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