// pages/refund_detail/refund_detail.js
const api = require('../../utils/api.js');
import { numToTime } from "../../utils/util";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    renlist: {}
  },
  retrieveData () {
    let that = this
    api.post({
      url: `/Order/order_refund_info`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: this.data.order_id
      },
      success: res => {
        console.log(res)
        res.data.create_time = numToTime(res.data.create_time)
        if (res.data.refund_amount == null) {
          res.data.refund_amount = 0
        }
        that.setData({
          renlist: res.data
        })
        console.log(that.data, "赋值数据")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.orderid
    })
    // 
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
