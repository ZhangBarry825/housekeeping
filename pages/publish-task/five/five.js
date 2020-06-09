// pages/publish-task/five/five.js
const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryIndex: 0,
    countries: ["视频", "音频", "图片"],
    picker:false
  },
  bindCountryChange(e){
         console.log('picker country 发生选择改变，携带值为', e.detail.value);
            this.setData({
                countryIndex: e.detail.value
            })
  },
  // 上传音频
  uploadAudio(){
    this.setData({
      picker:true
    })
    // wx.chooseImage({
    //   success (res) {
    //     const tempFilePaths = res.tempFilePaths
    //     wx.uploadFile({
    //       url:  api.HOST + "/wxapi.php/Home/upload_voice?client_id=" + api.client_id + "&client_secret=" + api.client_secret, //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData: {
    //         'user': 'test'
    //       },
    //       success (res){
    //         const data = res.data
    //         //do something
    //       }
    //     })
    //   }
    // })
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
