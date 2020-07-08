// pages/publish-task/five/five.js
import {numToTime} from "../../../utils/util";

const api = require('../../../utils/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreementOne: '',
    agreementTwo: '',
    countryIndex: 0,
    order_id: '',
    array: [],
    current: '请选择类型',
    bankarr: [],
    complaints_content: "",
    complaints_mobile: '',
    arrayds: ["视频", "图片"],
    imagesUrl: "",
    images: "",
    video: '',
    checkAgreement: {
      value: '',
      checked: false
    },
    options_id: '',
    renlist: {}
  },
  seeDetail (e) {
    let id = e.currentTarget.dataset.id
    console.log('detail')
    wx.navigateTo({
      url: '/pages/agreement-detail/agreement-detail?id=' + id
    })
  },
  // 确认投诉
  goTo () {
    let imagev = []
    if (this.data.video != "") {
      imagev.push(this.data.video)
    }
    if (this.data.images != "") {
      imagev.push(this.data.images)
    }
    console.log(imagev)
    if (!this.data.checkAgreement.checked) {
      wx.showToast({
        title: '请勾选协议',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    api.post({
      url: '/Order/insert_complaints',
      data: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token'),
        order_id: this.data.order_id,
        options_id: this.data.options_id,
        // complaints_mobile:this.data.complaints_mobile,
        complaints_content: this.data.complaints_content,
        complaints_files: imagev
      },
      success: res => {
        if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
        console.log(res)
      }
    })
  },
  bindPickerupl (e) {
    let that = this
    console.log(e.detail.value)
    if (e.detail.value == '0') {//视频
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success (res) {
          that.uploadvideo(res.tempFilePath)
          console.log(res.tempFilePath)
        }
      })
    } else if (e.detail.value == '1') {//图片
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log(res.tempFilePaths)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // that.setData({
          //     images: that.data.images.concat(res.tempFilePaths)
          // });
          that.uploadImg(res.tempFilePaths[0])
        }
      })
    }
    // if(e.detail.value=='1'){//音频
    //   wx.startRecord({
    //     success (res) {
    //       console.log(res)
    //       const tempFilePath = res.tempFilePath
    //       setTimeout(() => { wx.stopVoice() }, 5000)
    //     }
    //   })
    // }else 
  },
  // 上传图片
  uploadImg (p) {
    wx.showLoading({
      title: '上传中',
    })
    let that = this;
    console.log(wx.getStorageSync('userid'), 'user_id')
    console.log(wx.getStorageSync('token'), 'token')

    wx.uploadFile({
      url: api.HOST + "/wxapi.php/Home/upload_img?client_id=" + api.client_id + "&client_secret=" + api.client_secret, //此处换上你的接口地址
      filePath: p,
      name: 'images_' + wx.getStorageSync('userid'),
      formData: {
        user_id: wx.getStorageSync('userid'),
        user_token: wx.getStorageSync('token')
      },     //需要传的关于这个图片的信息，比如这个图片属于哪个用户的
      success (res) {
        console.log(JSON.parse(res.data), 333)
        console.log(api.HOST + "/" + JSON.parse(res.data).files)
        if (JSON.parse(res.data).code == 200) {
          that.setData({
            imagesUrl: that.data.imagesUrl.concat(api.HOST + "/" + JSON.parse(res.data).files),
            images: that.data.images.concat(JSON.parse(res.data).files)
          });
        }
        console.log(that.data, "sad")
        wx.hideLoading()
      },
      fail (res) {
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
  // 上传视频
  uploadvideo (src) {
    let that = this
    wx.showLoading({
      title: '上传中',
    })
    let user_id = wx.getStorageSync('userid')
    let user_token = wx.getStorageSync('token')
    let usid = wx.getStorageSync('userid')
    wx.uploadFile({
      url: api.HOST + "/wxapi.php/Home/upload_voice?client_id=" + api.client_id + "&client_secret=" + api.client_secret,
      filePath: src,
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: {
        user_id: user_id,
        user_token: user_token
      },     //需要传的关于这个图片的信息，比如这个图片属于哪个用户的
      name: 'voice_' + usid,//服务器定义的Key值
      success: function (res) {
        that.setData({
          video: JSON.parse(res.data).files
        })
        console.log(JSON.parse(res.data), '视频上传成功')
        wx.hideLoading()
      },
      fail (res) {
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
  checkChange (e) {
    console.log(e)
    this.setData({
      'checkAgreement.checked': !this.data.checkAgreement.checked
    })
    console.log(this.data)
  },

  // 上传音频
  uploadAudio () {


  },
  getAChoice () {
    api.get({
      url: `/Home/options_list/6`,
      data: {},
      success: res => {
        let datalist = []
        for (let i = 0;i < res.list.length;i++) {
          datalist.push(res.list[i].title);
        }
        this.setData({
          array: datalist,
          bankarr: res.list
        })
        console.log(res, "类型")
      }
    })
  },
  // 赋值选择银行
  bindPickerChange (e) {
    console.log(this.data)
    console.log(e, "111")
    let bank = this.data.array[e.detail.value]
    let bankid = this.data.bankarr[e.detail.value].options_id
    this.setData({
      current: bank,
      options_id: bankid
    })
    console.log(this.data)
  },
  // 联系qq
  openingvalue (e) {
    this.setData({
      complaints_mobile: e.detail.value,
    })
    console.log(e.detail.value)
  },
  // 
  placehvalue (e) {
    console.log(e, "打 ")
    this.setData({
      complaints_content: e.detail.value,
    })
    console.log(this.data, "打 ")
  },
  fetchData () {
    let that = this
    api.get({
      url: 'Article/advance_payments_agreement',
      success: res => {
        console.log(res, 9090)
        if (res.code == 200) {
          that.setData({
            agreementOne: res.data.article_id
          })
        }
      }
    })
    api.get({
      url: 'Article/privacy_agreement',
      success: res => {
        console.log(res, 9090)
        if (res.code == 200) {
          that.setData({
            agreementTwo: res.data.article_id
          })
        }
      }
    })


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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      order_id: options.order_id,
      // renlist: JSON.parse(options.renlist)
    })
    this.getAChoice()
    this.fetchData()
    // console.log(JSON.parse(options.renlist))
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
