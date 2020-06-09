// pages/comments/comments.js
import {numToTime} from "../../utils/util";

const api = require('../../utils/api.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum:1,
        pageSize:20,
        dataList:[]
    },
    changeMenu(e) {
        this.setData({
            menu: e.currentTarget.dataset.type
        })

    },
    goToCheck(e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/publish-task/three/three?id='+id
        })
    },
    goToComment(e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/publish-task/four/four?id='+id
        })
    },
    fetchData() {
        let that = this
        api.post({
            url: '/Order/order_evaluation_list/'+this.data.pageNum+'/'+this.data.pageSize,
            data: {
                user_id:wx.getStorageSync('userid'),
                user_token:wx.getStorageSync('token'),
            },
            success: res => {
                console.log(res, 765)
                if (res.code == 200) {
                    for (let i = 0; i < res.list.length; i++) {
                        res.list[i].demand_time=numToTime(res.list[i].demand_time)
                    }
                    that.setData({
                        dataList: res.list
                    })
                } else {
                    console.log('获取数据失败');
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchData()
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