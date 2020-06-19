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
        pageSize:10,
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
            url: '/pages/comment_detail/comment_detail?id='+id
        })
    },
    goToComment(e) {
        let id=e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/publish-task/four/four?id='+id
        })
    },
    fetchData(pageNum=1) {
        let that = this
        wx.showLoading({
            title: '加载中',
        })
        api.post({
            url: '/Order/order_evaluation_list/'+pageNum+'/'+this.data.pageSize,
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
                   if(res.list.length>0){
                       that.setData({
                           dataList: that.data.dataList.concat(res.list),
                           pageNum:pageNum
                       })
                   }
                    console.log(that.data.dataList,2)
                } else {
                    console.log('获取数据失败');
                }
            },
            complete: res => {
                wx.hideLoading();
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            dataList:[]
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
        this.setData({
            dataList:[]
        })
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
        this.fetchData(this.pageNum+1)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})