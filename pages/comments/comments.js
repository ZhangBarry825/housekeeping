// pages/comments/comments.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:1,
  },
  changeMenu(e){
    this.setData({
      menu:e.currentTarget.dataset.type
    })

  },
  goToSelect(){
    wx.navigateTo({
      url
    })
  },
  goToCheck(){
    wx.navigateTo({
      url:'/pages/publish-task/three/three'
    })
  },
  goToComment(){
    wx.navigateTo({
      url:'/pages/publish-task/four/four'
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