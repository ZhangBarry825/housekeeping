// pages/order/order.js
const app = getApp()
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: 0,
    datalist:[]
  },
  // 获取数据
  retrieveData (status) {
    let that=this
    let user_id = wx.getStorageSync('userid')
    let page = 1
    let limit = 100
    api.get({
      // url: `/Home/demand/${user_id}/${status}/${page}/${limit}`,
      url: '/Home/demand/' + user_id + '/' + that.data.menu + '/' + page + '/' + limit,
      data: {},
      success: data => {
        that.setData({
          datalist:data.list
        })
        console.log(that.setData())
        console.log(data)
      }
    });
  },
  // 点击操作
  goToPage(e){
    console.log(e.currentTarget.dataset.status,"12")
    let status=e.currentTarget.dataset.status
    if(status==0||status==12||status==11){
      wx.navigateTo({
        url: '/pages/publish-task/three/three?demandid='+e.currentTarget.dataset.demandid
      })
      wx.showToast({
        title: '当前不可操作',
        icon: 'none',
        duration: 2000
      })
    }else if(status==1){
      wx.navigateTo({
        url: '/pages/publish-task/two/two?demandid='+e.currentTarget.dataset.demandid
      })
    } 
    
  },
  // 判断状态
  gingStatus(val){
     let ad=val==0?'没的报价':val==1?'选择师傅':'0'
     return ad
  },
  // 点击状态(全部,退款,投诉)
  changeMenu (e) {
    console.log(e)
    this.setData({
      menu: e.currentTarget.dataset.type
    })
    this.retrieveData()

  },
  goToSelect () {
    wx.navigateTo({
      url
    })
  },
  goToCheck () {
    wx.navigateTo({
      url: '/pages/publish-task/three/three'
    })
  },
  goToComment () {
    wx.navigateTo({
      url: '/pages/publish-task/four/four'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this)
    this.retrieveData(0)
    // console.log(options,'23')
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
