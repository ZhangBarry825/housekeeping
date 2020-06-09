// pages/publish-task/selected/selected.js
const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataset:{},
    demand:'',
    order_id:'',
    master_user_id:''
  },
  // 创建订单
  // weChatPayment(){
  //   api.post({
  //     url: `/Demand/insert_order`,
  //     data: {
  //       user_id:wx.getStorageSync('userid'),
  //       user_token: wx.getStorageSync('token'),
  //       demand_id:this.data.demand_id,
  //       master_user_id:this.data.master_user_id,
  //       price:1
  //     },
  //     success: res => {
  //       console.log(res,"111")
  //     }
  // })
  // },
  // 获取数据
  retrieveData(){
    api.post({
      url: `/Order/offer_info`,
      data: {
        user_id:wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        demand_id:this.data.demand_id,
        master_user_id:this.data.master_user_id
      },
      success: res => {
        console.log(res,"111")
      }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataset = JSON.parse(options.dataset);
    this.setData({
      master_user_id:dataset.master_user_id,
      demand_id:options.demand_id
    })
    this.retrieveData()
    console.log(dataset)
    console.log(options)
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