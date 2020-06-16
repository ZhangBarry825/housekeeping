// pages/encash/encash.js
import {checkDigit} from "../../utils/util";

const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip:'请选择提现账户',
    index: 0,
    array: [],
    pageNum:1,
    pageSize:20,
    cardList:[],
    withdrawal_amount:'',
    bankcard_id:'',
    available_balance:0
  },
  bindPickerChange(e){
    console.log(this.data.array[e.detail.value],76)
    console.log(this.data.cardList[e.detail.value].bankcard_id,67)
    this.setData({
      tip:this.data.array[e.detail.value],
      bankcard_id:this.data.cardList[e.detail.value].bankcard_id
    })
  },
  selectCard(e){

  },
  updateWithdraw(e){
    console.log(e.detail.value)
    this.setData({
      withdrawal_amount:e.detail.value
    })
  },
  setAll(){
    console.log('set all')
    console.log(this.data.available_balance)
    this.setData({
      withdrawal_amount:this.data.available_balance
    })
  },
  submitForm(){
    let that = this
    let formData={
      user_id:wx.getStorageSync('userid'),
      user_token:wx.getStorageSync('token'),
      bankcard_id:this.data.bankcard_id,
      withdrawal_amount:parseInt(this.data.withdrawal_amount),
    }
    console.log(formData)
    console.log(typeof formData.withdrawal_amount)
    if(formData.bankcard_id==''){
      wx.showToast({
        title:'请选择提现账户',
        icon:'none',
        duration:1000
      })
    }else if(formData.withdrawal_amount==''|| !checkDigit(formData.withdrawal_amount)){
      wx.showToast({
        title:'输入正确的提现金额',
        icon:'none',
        duration:1000
      })
    }else {
      api.post({
        url: '/User/insert_withdrawal',
        data: formData,
        success: res => {
          console.log(res, 765)
          if (res.code == 200) {

          } else {
            console.log('获取数据失败');
          }
        }
      })
    }
  },
  fetchData(){
    let that = this
    api.post({
      url: '/User/bankcard_list/'+this.data.pageNum+'/'+this.data.pageSize,
      data:{
        user_id:wx.getStorageSync('userid'),
        user_token:wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res, 765)
        if (res.code == 200) {
          let arr=[]
          for (let i = 0; i <res.list.length ; i++) {
            arr.push(res.list[i].title+" "+res.list[i].cardid.substring(res.list[i].cardid.length-4))
          }
          that.setData({
            cardList: res.list,
            array:arr
          })
        } else {
          console.log('获取数据失败');
        }
      }
    })

    api.post({
      url: '/Distribution/distribution',
      data: {
        user_id:wx.getStorageSync('userid'),
        user_token:wx.getStorageSync('token'),
      },
      success: res => {
        console.log(res, 765)
        if (res.code == 200) {
          that.setData({
            balance: res.data,
            available_balance:res.data.available_balance
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.fetchData()
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