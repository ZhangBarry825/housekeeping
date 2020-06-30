// pages/append/append.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renlist: {},
    amount: ""
  },
  getCode (e) {
    console.log(e.detail.value)
    this.setData({
      amount: e.detail.value
    })
  },
  goMaster (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/master-details/master-details?master_user_id=' + id
    })
  },
  // 确认支付
  weChatPay () {
    // if(this.data.amount)
    let that = this
    api.post({
      url: `/Order/insert_order_amount`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: that.data.renlist.order_id,
        amount: that.data.amount
      },
      success: resda => {
        wx.requestPayment({
          timeStamp: resda.Payment.timeStamp,
          nonceStr: resda.Payment.nonceStr,
          package: resda.Payment.package,
          signType: resda.Payment.signType,
          paySign: resda.Payment.paySign,
          success (res) {
            console.log(res, "成功")
            that.pay(resda.data)
          },
          fail (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'nona',
              duration: 2000
            })
            console.log(res, "失败")
          }
        })

      }
    })
  },
  pay (dataa) {
    api.post({
      url: `/Order/order_amount_payment`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: dataa.order_id,
        master_user_id: dataa.master_user_id,
      },
      success: resa => {
        if (resa.code == 200) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
        console.log(resa, "zhifu")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.renlist = JSON.parse(options.renlist);
    console.log(options)
    this.setData({
      renlist: options.renlist
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
