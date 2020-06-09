// pages/publish-task/five/five.js
const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryIndex: 0,
    order_id:'',
    array: [],
    current:'请选择类型',
    bankarr:[]
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

  },
  getAChoice(){
    api.get({
      url: '/Home/options_list/6',
      data: {},
      success: res => {
        let datalist=[]
        for (let i = 0; i < res.list.length; i++) {
          datalist.push(res.list[i].title);
        }
        this.setData({
          array:datalist,
          bankarr:res.list
        })
        console.log(res,"类型")
      }
    })
  },
  // 赋值选择银行
  bindPickerChange(e){
    console.log(this.data)
    console.log(e,"111")
    let bank=this.data.array[e.detail.value]
    let bankid=this.data.bankarr[e.detail.value].options_id
    this.setData({
      current:bank,
      options_id:bankid
    })
    console.log(this.data)
  },
  openingvalue(e){
    this.setData({
      opening_branch:e.detail.value,
    })
    console.log(e.detail.value)
  },
  placehvalue(e){
    this.setData({
      opening_branch:e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAChoice()
    this.setData({
      order_id:options.order_id,
    })
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
