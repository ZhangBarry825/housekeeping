// pages/address/update/update.js
import {checkPhone} from "../../../utils/util";

const api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"河南省郑州市中原区中原西路233号",
    androidDialog1: false,
  },
  deleteForm(){
    this.setData({
      androidDialog1: false
    });
    let formData = {
      user_id: wx.getStorageSync('userid'),
      user_token: wx.getStorageSync('token'),
      id: this.data.id,
    }
    api.post({
      url: '/User/del_address',
      data: formData,
      success: res => {
        console.log(res, 'delete')
        if(res.code == 200){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  openTip(){
    this.setData({
      androidDialog1: true
    });
  },
  closeTip(){
    this.setData({
      androidDialog1: false
    });
  },
  selectMap(){
    let that = this
    console.log('123123')
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res)
      },
      fail(){
        console.log('获取地图失败', e)
        wx.navigateTo({url:'/pages/getAuthority/getAuthority?type=location'})
      }
    })
    wx.chooseLocation({
      success(res) {
        console.log(res)
        that.setData({
          address:res.address
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item =JSON.parse(options.item)
    let address=item.province+item.city+item.area+item.address
    let {id,addresses,name,sex,mobile,status}=item
    if(status=='1'){
      status=true
    }else {
      status=false
    }
    this.setData({
      id:id,
      address:address,
      addresses:addresses,
      name:name,
      sex:sex,
      mobile:mobile,
      status:status,
    })
    console.log(item)
  },
  switchDefault(e) {
    console.log(e.detail)
    if (e.detail.value) {
      this.setData({
        status: 1
      })
    } else {
      this.setData({
        status: 0
      })
    }
  },
  selectSex(e) {
    this.setData({
      sex: e.currentTarget.dataset.sex
    })
  },
  updatePhone(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  updateAddresses(e) {
    this.setData({
      addresses: e.detail.value
    })
  },
  updateName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  saveForm() {
    let status;
    if(this.data.status){
      status='1'
    }else {
      status='0'
    }

    let formData = {
      user_id: wx.getStorageSync('userid'),
      user_token: wx.getStorageSync('token'),
      id: this.data.id,
      address: this.data.address,
      addresses: this.data.addresses,
      name: this.data.name,
      sex: this.data.sex,
      mobile: this.data.mobile,
      status: status,
    }
    console.log(formData)
    console.log(status)
    let tip=''
    if(formData.address==''){
      tip='地址'
    }else if(formData.addresses==''){
      tip='门牌号'
    }else if(formData.name==''){
      tip='联系人'
    }else if(formData.mobile==''|| !checkPhone(formData.mobile)){
      tip='手机号码'
    }else if(formData.sex==''){
      tip='性别'
    }else {
      api.post({
        url: '/User/update_address',
        data: formData,
        success: res => {
          console.log(res, 98)
          if(res.code == 200){
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          }

        }
      })
      return
    }
    wx.showToast({
      title: "请输入正确的"+tip ,
      icon: 'none',
      duration: 2000
    })

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