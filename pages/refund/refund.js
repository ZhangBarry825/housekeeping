// pages/refund/refund.js
const api = require('../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renlist: {},
    order_amount: '',
    apply_amount: '',
    apply_desc: '',
    order_id: ""
  },
  goMaster (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/master-details/master-details?master_user_id=' + id
    })
  },
  confirmSubmission () {
    api.post({
      url: `/Order/insert_refund`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: this.data.order_id,
        order_amount: this.data.renlist.price,
        apply_amount: this.data.apply_amount,
        apply_desc: this.data.apply_desc,
      },
      success: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 2
          })
        }, 2000)
        console.log(res, "zhifu")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    JSON.parse(options.renlist);
    this.setData({
      order_id: options.order_id,
      order_amount: options.order_amount,
      renlist: JSON.parse(options.renlist),
    })
    console.log(this.data, "1111111")
  },
  // 退款金额
  openingvalue (e) {
    this.setData({
      apply_amount: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 退款理由
  textgvalue (e) {
    this.setData({
      apply_desc: e.detail.value
    })
    console.log(e.detail.value)
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
