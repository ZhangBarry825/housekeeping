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
        console.log(res, 852)
        if (res.code == 200) {
          res.data.create_time = numToTime(res.data.create_time)
          res.data.options_title = res.data.options_title.split(',')
          that.setData({
            dataDetail: res.data,
            starNum: parseInt(res.data.score),
            starLeft: 5 - parseInt(res.data.score)
          })
        } else {
          console.log('获取数据失败');
        }
      }
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
