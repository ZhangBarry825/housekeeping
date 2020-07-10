// pages/publish-task/three/three.js
import { numToTime } from "../../../utils/util";

const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShow: false,
    order_id: '',
    renlist: {},
    qrCode: "",
    verification_code: ''
  },
  retrieveData () {

    api.post({
      url: `/Order/order_info`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: this.data.order_id
      },
      success: res => {
        res.list.create_time = numToTime(res.list.create_time)
        if (res.list.demand_time != null && res.list.demand_time != undefined) {
          res.list.demand_time0 = true
          res.list.demand_time1 = numToTime(res.list.demand_time).split(' ')[0]
          res.list.demand_time2 = numToTime(res.list.demand_time).split(' ')[1]
        } else {
          res.list.demand_time0 = false
        }
        if (res.list.booking_date != null && res.list.booking_date != undefined) {
          res.list.booking_date0 = true
          res.list.booking_date1 = numToTime(res.list.booking_date).split(' ')[0]
        } else {
          res.list.booking_date0 = false
        }
        if (res.list.demand_time != null && res.list.demand_time != undefined) {
          res.list.demand_time0 = true
          res.list.demand_time1 = numToTime(res.list.demand_time).split(' ')[0]
          res.list.demand_time2 = numToTime(res.list.demand_time).split(' ')[1]
        } else {
          res.list.demand_time0 = false
        }
        if (res.list.door_in_time != null && res.list.door_in_time != undefined) {
          res.list.door_in_time0 = true
          res.list.door_in_time1 = numToTime(res.list.demand_time).split(' ')[0]
          res.list.door_in_time2 = numToTime(res.list.demand_time).split(' ')[1]
        } else {
          res.list.door_in_time0 = false
        }

        this.setData({
          renlist: res.list
        })
        console.log(res, "111")
      }
    })
  },
  goMaster (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/master-details/master-details?master_user_id=' + id
    })
  },
  // 跳转需求
  goToDetail () {
    console.log(this.data.renlist)
    wx.navigateTo({
      url: '/pages/publish-task/detail/detail?demand_id=' + this.data.renlist.demand_id
    })
  },
  checkService () {
    api.post({
      url: `/Order/acceptance_service/`,
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: this.data.order_id,
      },
      success: res => {
        this.setData({
          qrCode: api.HOST + `/wxapi.php/Home/qrcode/?data=${res.data.verification_code}` + '&client_id=' + api.client_id + "&client_secret=" + api.client_secret,
          verification_code: res.data.verification_code
        })
        console.log(res.data.verification_code)
        // api.post({
        //   url: `/Home/qrcode/?data=${res.data.verification_code}`,
        //   noNeed:true,
        //   // +'/&client_id='+api.client_id+ "&client_secret=" + api.client_secret
        //   data: { },
        //   success: resd => {
        //     console.log(resd,"zhifu")
        //   }
        // })
      }
    })
    this.setData({
      ifShow: true
    })
  },
  // 跳转投诉
  complaint () {
    let complain = this.data.renlist.complaints_status
    if(complain==null){
      wx.navigateTo({
        url: '/pages/publish-task/five/five?order_id=' + this.data.order_id + '&renlist=' + JSON.stringify(this.data.renlist)
      })
    }else {
      wx.navigateTo({
        url: '/pages/complaintDetails/complaintDetails?orderid=' + this.data.order_id
      })
    }

  },
  refund () {
    wx.navigateTo({
      url: '/pages/refund/refund?order_id=' + this.data.order_id + '&order_amount' + this.data.renlist.offer_price + '&renlist=' + JSON.stringify(this.data.renlist)
    })
  },
  cancelCheck () {
    this.setData({
      ifShow: false
    })
  },
  appendMoney () {
    wx.navigateTo({
      url: '/pages/append/append?renlist=' + JSON.stringify(this.data.renlist)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.orderid
    })
    this.retrieveData()
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
