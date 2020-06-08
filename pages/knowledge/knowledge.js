/* pages/knowledge/knowledge.js */
const app = getApp();
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pagesize: 2,     /*每页显示的行数：*/
        pageNum: 1,             /*页码（从1开始）：*/
        order: 'desc',      /*升序或降序：*/
        state: 1,            /*用于标识是否还有更多的状态*/
        addList: [],    /*用于渲染页面的数组*/
        allList: [],      /*用于数组的追加和暂存*/
    },
    fetchData(pageNum =1) {
        console.log(22)
        let that = this
        api.get({
            url: '/Article/Article_list/5/' + pageNum + '/' + that.data.pagesize,
            data: {},
            success: res => {
                console.log(res)
                if(res.code == 200){
                    that.setData({
                        allList:res.list
                    })
                }
            }
        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
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
        var that = this;
        console.log('111')
        that.setData({
            arrayProject: {}
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this
        wx.showLoading({
            title: '加载中...',
        });
        let pageNum=that.data.pageNum+1
        api.get({
            url: '/Article/Article_list/5/' + pageNum + '/' + that.data.pagesize,
            data: {},
            success: res => {
                console.log(res)
                if(res.code == 200 && res.list.length>0){
                    that.setData({
                        allList:that.allList.concat(res.list)
                    })
                }else {
                    wx.hideLoading()
                    wx.showToast({
                        title:'加载完毕',
                        icon:'none',
                        duration:1000
                    })
                }
            },
            complete:()=>{
                wx.hideLoading()
            }
        });

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }


})