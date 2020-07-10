// pages/complaintDetails/complaintDetails.js
import { numToTime } from "../../utils/util";
const app = getApp()
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    detailData: [],
    renlist: {}
  },
  goMaster (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/master-details/master-details?master_user_id=' + id
    })
  },
  retrieveData () {
    let that = this
    api.post({
      url: `/Order/complaints_info`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: this.data.order_id
      },
      success: res => {
        res.list.complaints_files = JSON.parse(res.list.complaints_files)
        res.list.complaints_content = JSON.parse(res.list.complaints_content)
        res.list.service_in_time = JSON.parse(res.list.service_in_time)
        res.list.end_time = JSON.parse(res.list.end_time)
        let images = []
        res.list.complaints_time = numToTime(res.list.complaints_time)
        console.log(res)
        for (let i = 0;i < res.list.complaints_files.length;i++) {
          images.push(api.HOST + '/' + res.list.complaints_files[i])
        }
        console.log(images)
        that.setData({
          renlist: res.list,
          detailData: images
        })
        console.log(res)
      }
    })
  },
  previewImg () {
    this.setData({
      show: true
    })
  },
  change (e) {
    console.log('current index has changed', e.detail)
  },
  hide () {
    console.log('component hide')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.orderid
    })
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
