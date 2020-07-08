// pages/comment_detail/comment_detail.js
import { numToTime } from "../../utils/util";

const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    dataDetail: {},
    starNum: 0,
    starLeft: 5,
  },
  changHidden () {
    this.setData({
      hidden: !this.data.hidden
    })
  },
  goMaster (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/master-details/master-details?master_user_id=' + id
    })
  },
  fetchData () {
    let that = this
    api.post({
      url: '/Order/evaluation_info',
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: that.data.id
      },
      success: res => {

        if (res.code == 200) {
          res.data.create_time = numToTime(res.data.create_time)
          res.data.options_title = res.data.options_title.split(',')
          if(res.data.options_title[0]==""){
            res.data.options_title=[]
          }
          res.data.images=JSON.parse(res.data.images)
          for (let i = 0; i < res.data.images.length; i++) {
            res.data.images[i]=api.HOST+"/"+res.data.images[i]
          }

          console.log(res.data.options_title,9977)
          res.data.complete_rendering = JSON.parse(res.data.complete_rendering)
          for (let i = 0; i < res.data.complete_rendering.length; i++) {
            res.data.complete_rendering[i]=api.HOST+"/"+res.data.complete_rendering[i]
          }
        console.log(api.HOST)
          that.setData({
            dataDetail: res.data,
            starNum: parseInt(res.data.score),
            starLeft: 5 - parseInt(res.data.score)
          })
          console.log(res.data, 852)
        } else {
          console.log('获取数据失败');
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
