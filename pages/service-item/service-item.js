// pages/service-item/service-item.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    menuList:[],
    host:'',
    title:''
  },

  fetchData(){
    var that = this;
    api.get({
      url: '/Home/demand_category/'+this.data.id+"/",
      data: {},
      success: res => {
        console.log(res,987)
        if(res.code == 200){
          this.setData({
            menuList:res.list
          })
        }else{
          console.log('获取数据失败');
        }
      }
    });
  },
  goDetail(e){
    let path = '/pages/publish-task/one/one?id=' + e.currentTarget.dataset.item.id+"&pid="+e.currentTarget.dataset.item.pid
    console.log(path,89)
    wx.navigateTo({
      url: path
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.title,'title')
    this.setData({
      title:options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    console.log(options.id,9090)
    this.setData({
      id:options.id
    })
    this.fetchData()
    this.setData({
      host:api.HOST
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