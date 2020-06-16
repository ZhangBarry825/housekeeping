// pages/publish-task/detail/detail.js
const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hostUrl: '',
    demand_id: '',
    detailData: {},
    innerAudioContext: '',
    voiceImg: '../../../images/voice1.png',
    show: false,
    hasVoice: false
  },
  previewImg () {
    this.setData({
      show: true
    })
  },
  change (e) {
    console.log('current index has changed', e.detail)
  },
  hide (e) {
    console.log('component hide')
  },
  // 需求详情
  getDemand () {
    let that = this
    api.post({
      url: '/Demand/demand_info',
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        demand_id: this.data.demand_id,
      },
      success: res => {
        let images = []
        for (let i = 0;i < res.data.images.length;i++) {
          images.push(api.HOST + '/' + res.data.images[i])
        }
        console.log(res.data.voice, '7777777777777777777777777777777777777')
        if (res.data.voice !== "" && res.data.voice != null && res.data.voice != ' ') {
          this.setData({
            hasVoice: true
          })
          res.data.voice = that.data.hostUrl + '/' + res.data.voice
        } else {
          this.setData({
            hasVoice: false
          })
        }
        console.log(res.data.voice, '88888888888888888888888888888888888888888888888')
        res.data.images = images
        that.setData({
          detailData: res.data
        })
        console.log(images, 888)
        console.log(api.HOST, 998)
        console.log(res.data, 99999999)
      }
    })
  },
  playRecord () {
    console.log(this.data.voice)
    console.log('play')
    let that = this
    let ACT = this.data.innerAudioContext
    ACT.src = this.data.detailData.voice
    ACT.play()
    ACT.onPlay(() => {
      that.setData({
        voiceImg: '../../../images/voice1.gif'
      })
      console.log('开始播放')
    })
    ACT.onEnded((res) => {
      console.log('播放停止')
      that.setData({
        voiceImg: '../../../images/voice1.png'
      })
    })
    ACT.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 998)
    this.setData({
      demand_id: options.demand_id,
      hostUrl: api.HOST,
      innerAudioContext: wx.createInnerAudioContext(),
    })
    this.getDemand()
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
