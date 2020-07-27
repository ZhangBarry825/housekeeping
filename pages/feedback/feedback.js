// pages/feedback/feedback.js
const api = require('../../utils/api.js');
import {checkPhone} from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion:'',
    sugLength:0,
    files:[],
    typeList:[],
    types:'',
    selectedTypeId:0,
    desc:'',
    images:[],
    imagesUrl:[],
    mobile:'',
  },
  updateMobile(e){
    this.setData({
      mobile:e.detail.value
    })
  },
  updateDesc(e){
    this.setData({
      sugLength:e.detail.value.length,
      desc:e.detail.value
    })
  },
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [ 'album','camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // that.setData({
        //   files: that.data.files.concat(res.tempFilePaths)
        // });
        that.uploadImg(res.tempFilePaths[0])
      }
    })
  },
  uploadImg(p) {
    wx.showLoading({
      title: '上传中',
    })
    let that = this;
    console.log(wx.getStorageSync('userid'), 'user_id')
    console.log(wx.getStorageSync('token'), 'token')
    wx.uploadFile({
      url: api.HOST + "/wxapi.php?/Home/upload_img?client_id=" + api.client_id + "&client_secret=" + api.client_secret, //此处换上你的接口地址
      filePath: p,
      name: 'images_' + wx.getStorageSync('userid'),
      formData: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token')
      },     //需要传的关于这个图片的信息，比如这个图片属于哪个用户的
      success(res) {
        console.log(JSON.parse(res.data), 333)
        console.log(api.HOST + "/" + JSON.parse(res.data).files)
        if (JSON.parse(res.data).code == 200) {
          that.setData({
            imagesUrl: that.data.imagesUrl.concat(api.HOST + "/" + JSON.parse(res.data).files),
            images: that.data.images.concat(JSON.parse(res.data).files)
          });
        }
        wx.hideLoading()
      },
      fail(res) {
        console.log(res, 888)
        wx.showToast({
          title: '网络异常,请稍后重试',
          icon: "none",
          duration: 1000
        })
        that.setData({
          images: []
        })
        wx.hideLoading()
      }

    })

  },
  deleteImg(e) {

    var that = this;
    var nowList = []; /*新数据*/
    var images = that.data.images; /*原数据*/

    for (let i = 0; i < images.length; i++) {
      if (i != e.currentTarget.dataset.index) {
        nowList.push(images[i])
      }
    }
    this.setData({
      images: nowList,
      imagesUrl:nowList
    })
    console.log(this.data.images, 987)
  },
  previewImage(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imagesUrl // 需要预览的图片http链接列表
    })
  },
  fetchData(){
    let that = this
    api.get({
      url: 'Home/options_list/7',
      data: {},
      success: res => {
        console.log(res,765)
        if(res.code == 200){
          that.setData({
            typeList:res.list
          })
        }else{
          console.log('获取数据失败');
        }
      }
    })
  },
  selectType(e){
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    this.setData({
      selectedTypeId:index+1,
      types:item.options_id
    })

  },
  submitForm(){
    let formData={
      user_id: wx.getStorageSync('userid'),
      user_token: wx.getStorageSync('token'),
      types:this.data.types,
      desc:this.data.desc,
      images:this.data.images,
      mobile:this.data.mobile,
    }
    let tip=''
    let ifShow=true
    if(formData.types==''){
      tip='请选择问题类型'
    }else if(formData.desc==''){
      tip='请输入详细意见'
    }else if(formData.mobile==''||!checkPhone(formData.mobile)){
      tip='请检查手机号'
    }else {
      ifShow=false
      api.post({
        url: '/User/insert_feedback',
        data: formData,
        success: res => {
          console.log(res, 999)
          if(res.code==200){
            wx.showToast({
              title:'提交成功',
              icon:"success",
              duration:1000
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta:1
              })
            },1000)
          }
        }
      })
    }
    if(ifShow){
      wx.showToast({
        title:tip,
        icon:'none',
        duration:1000
      })
    }


    console.log(formData,'提交')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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