// pages/agreement/agreement.js
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:20,
    pageNum:1,
    dataList:[],
    appendList:[],
  },

  fetchData(){
    let that = this
    api.get({
      url: '/Article/Article_list/12/'+this.data.pageNum+"/"+this.data.pageSize,
      data: {},
      success: res => {
        console.log(res,765)
        if(res.code == 200){
          that.setData({
            dataList:res.list
          })
        }else{
          console.log('获取数据失败');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
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
      url: '/Article/Article_list/12/' + pageNum + '/' + that.data.pagesize,
      data: {},
      success: res => {
        console.log(res)
        if(res.code == 200 && res.list.length>0){
          that.setData({
            dataList:that.dataList.concat(res.list),
            pageNum:that.data.pageNum+1
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