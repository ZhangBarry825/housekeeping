// pages/masterDetails/masterDetails.js
import { numToTime } from "../../utils/util";

const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        master_user_id: '',
        dataDetail: {},
        masterList: [],
        pageSize: 50,
        pageNum: 1,

    },
    countStar (n) {
        return 5 - n
    },

    fetchData (master_user_id) {
        let that = this
        api.post({
            url: '/Order/master_user_evaluation/1/' + that.data.pageSize,
            data: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token'),
                master_user_id: master_user_id,
            },
            success: res => {
                console.log(res.list, 765)
                if (res.code == 200) {
                    that.setData({
                        dataDetail: res.data
                    })
                    if (res.list.length > 0) {
                        console.log(JSON.parse(res.list[0].complete_rendering), 963)
                        for (let i = 0;i < res.list.length;i++) {
                            res.list[i].complete_rendering = JSON.parse(res.list[i].complete_rendering)
                            res.list[i].complete_rendering[0] = res.list[i].complete_rendering[0].split(",")
                            console.log(res.list[i].complete_rendering[0], "iii")
                            res.list[i].score = parseInt(res.list[i].score)
                            res.list[i].left = 5 - parseInt(res.list[i].score)
                            res.list[i].create_time = numToTime(res.list[i].create_time)
                            res.list[i].options = res.list[i].options.split(",")
                            //添加host
                            let img = res.list[i].complete_rendering[0]
                            if (res.list[i].complete_rendering && res.list[i].complete_rendering != null && res.list[i].complete_rendering.length > 0) {
                                for (let j = 0;j < img.length;j++) {
                                    console.log(img, "0120")
                                    img[j] = api.HOST + '/' + img[j]
                                    img[j]
                                    // res.list[i].complete_rendering[j] = api.HOST + '/' + res.list[i].complete_rendering[j]
                                }
                                res.list[i].complete_rendering = img
                            } else {
                                res.list[i].complete_rendering = []
                            }
                        }
                        console.log(res.list, "00")
                        that.setData({
                            masterList: res.list,
                        })
                        console.log(that.data.masterList, 666)
                    }
                }

            }
        })
    },
    previewImg (e) {
        let items = e.currentTarget.dataset.items
        let item = e.currentTarget.dataset.item
        wx.previewImage({
            current: item,
            // 当前显示图片的http链接
            urls: items // 需要预览的图片http链接列表
        })
    },
    appendData () {
        let that = this
        let pageNum = that.data.pageNum + 1
        wx.showLoading({
            title: '加载中',
        })
        api.post({
            url: '/Order/master_user_evaluation/' + pageNum + '/' + that.data.pageSize,
            data: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token'),
                master_user_id: that.data.master_user_id,
            },
            success: res => {
                // console.log(res.list, 765)
                if (res.code == 200) {
                    if (res.list.length > 0) {
                        // console.log(JSON.parse(res.list[0].complete_rendering), 963)
                        for (let i = 0;i < res.list.length;i++) {
                            res.list[i].complete_rendering = JSON.parse(res.list[i].complete_rendering)
                            console.log(res.list[i].complete_rendering, "iii")
                            res.list[i].score = parseInt(res.list[i].score)
                            res.list[i].left = 5 - parseInt(res.list[i].score)
                            res.list[i].create_time = numToTime(res.list[i].create_time)
                            res.list[i].options = res.list[i].options.split(",")
                            //添加host
                            if (res.list[i].complete_rendering && res.list[i].complete_rendering != null && res.list[i].complete_rendering.length > 0) {
                                for (let j = 0;j < res.list[i].complete_rendering.length;j++) {
                                    res.list[i].complete_rendering[j] = api.HOST + '/' + res.list[i].complete_rendering[j]
                                }
                            } else {
                                res.list[i].complete_rendering = []
                            }
                        }
                        console.log(res.list, "0")
                        that.setData({
                            masterList: that.data.masterList.concat(res.list),
                            pageNum: pageNum
                        })
                    } else {
                        setTimeout(() => {
                            wx.showToast({
                                title: '加载完毕',
                                icon: 'none',
                                duration: 1000
                            })
                        }, 200)
                    }
                }

            },
            complete: () => {
                wx.hideLoading();
            }
        })
    },
    retrieveData () {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options, "aaaa")
        this.setData({
            master_user_id: options.master_user_id
        })
        this.fetchData(options.master_user_id)
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
        this.appendData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
