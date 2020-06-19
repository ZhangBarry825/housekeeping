// pages/publish-task/selected/selected.js
import {checkPhone} from "../../../utils/util";

const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataset: {},
    demand: '',
    order_id: '',
    master_user_id: '',
    phone:'',
  },
  updatePhone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  goMaster(e){
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/master-details/master-details?master_user_id=' + id
    })
  },
  // 创建订单
  weChatPdaayment () {
    if(!checkPhone(this.data.phone)){
      wx.showToast({
        title:'请输入正确的手机号',
        icon:'none',
        duration:2000
      })
    }else {
      let that = this
      api.post({
        url: `/Demand/insert_order`,
        data: {
          user_id: wx.getStorageSync('userid'),
          user_token: wx.getStorageSync('token'),
          demand_id: this.data.demand_id,
          master_user_id: this.data.master_user_id,
          price: this.data.dataset.price,
          mobile: this.data.phone
        },
        success: resda => {
          wx.requestPayment({
            timeStamp: resda.Payment.timeStamp,
            nonceStr: resda.Payment.nonceStr,
            package: resda.Payment.package,
            signType: resda.Payment.signType,
            paySign: resda.Payment.paySign,
            success (res) {
              console.log(res, "成功")
              that.pay(resda.data)
            },
            fail (res) {
              console.log(res, "失败")
            }
          })
        }
      })
    }

  },
  pay (dataa) {
    api.post({
      url: `/Demand/order_payment`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        demand_id: dataa.demand_id,
        order_id: dataa.order_id,
        master_user_id: dataa.master_user_id,
      },
      success: resa => {
        if(resa.code==200 ){
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 2
            })
          },2000)
        }
        console.log(resa, "zhifu")
      }
    })
  },
  // 获取数据
  retrieveData () {
    api.post({
      url: `/Order/offer_info`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        demand_id: this.data.demand_id,
        master_user_id: this.data.master_user_id
      },
      success: res => {
        this.setData({
          dataset: res.list
        })
        console.log(res, "111")
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataset = JSON.parse(options.dataset);
    this.setData({
      master_user_id: dataset.master_user_id,
      demand_id: options.demand_id
    })
    this.retrieveData()
    console.log(dataset)
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
