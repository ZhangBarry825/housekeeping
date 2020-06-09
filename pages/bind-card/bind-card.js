// pages/bind-card/bind-card.js
const app = getApp()
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    array: [],
    current:'请选择银行',
    bank_id:'',
    bankarr:[],
    opening_branch:'',
    cardid:'',
    real_name:'',
    id_card_number:''
  },
  // 获取银行下拉列表
  getBank(){
    api.get({
      url: `/User/bank_list/${1}/${100}`,
      data: {},
      success: res => {
        console.log(res)
        let datalist=[]
        for (let i = 0; i < res.data.length; i++) {
          datalist.push(res.data[i].title);
        }
        console.log(datalist,"shu ")
        this.setData({
          array:datalist,
          bankarr:res.data
        })
        
      }
    });
  },
  // 确认提交
  confirmSubmission(){
    console.log(this.data)
  },
  // 赋值选择银行
  bindPickerChange(e){
    let bank=this.data.array[e.detail.value]
    let bankid=this.data.bankarr[e.detail.value].id
    this.setData({
      current:bank,
      bank_id:bankid
    })
    console.log(this.data)
  },
  // 开户分行
  openingvalue(e){
    this.setData({
      opening_branch:e.detail.value,
    })
    console.log(e.detail.value)
  },
  // 卡号
  cardidvalue(e){
    this.setData({
      cardid:e.detail.value,
    })
  },
  // 姓名
  realnamevalue(e){
    this.setData({
      real_name:e.detail.value,
    })
  },
  // 身份证
  cardvalue(e){
    this.setData({
      id_card_number:e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBank()
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
