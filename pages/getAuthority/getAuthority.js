const api = require('../../utils/api.js');
Page({
  data: {
    type:'',
    tip:''
  },
  onLoad: function(options) {
    console.log(options.type)
    let type=options.type
    let tip=''
    if(type=='location'){
      tip='请打开授权获取位置信息，以便相应功能使用'
    }else if(type=='record'){
      tip='请打开授权获取录音信息，以便相应功能使用'
    }

    this.setData({
      tip:tip,
      type:type
    })

  },
  onShow() {
    let that = this
    wx.getSetting({
      success(e){
        if(that.data.type=='location' && e.authSetting["scope.userLocation"]){
          wx.navigateBack({
            delta:1
          })
        }else if(that.data.type=='record' && e.authSetting["scope.record"]){
          wx.navigateBack({
            delta:1
          })
        }

      }
    })

  },
  /* 点击授权 */
  bindGetAuthority: function(e) {
    // wx.openSetting({
    //   success(e){
    //     console.log(e)
    //   }
    // })
  }
})