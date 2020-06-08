// pages/publish-task/one/one.js
const app = getApp()
import {formatTimeMS} from "../../../utils/util";

const api = require('../../../utils/api.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        checkAgreement: {
            value:'',
            checked:false
        },
        address: '请选择',
        user_address_id: '',
        time: '请选择',
        updoor_time: '请选择',
        category_pid: '',		/* 分类id */
        images: [],		/*保存上传图片url的数组*/
        imagesUrl: [],		/*展示上传图片url的数组*/
        desc: '',
        desLength: 0,
        voiceImg: '../../../images/voice2.png',
        innerAudioContext: wx.createInnerAudioContext(),//音频播放上下文

        recordStatus: false,
        recorderManager: '', //录音管理上下文
        recordVoice: {},
        hasRecord: false,
        voice: '',
        canStop: false,
    },
    goTo() {
        wx.navigateTo({
            url: '/pages/address/list/list'
        })
    },
    bindinput(e) {
        this.setData({
            desc:e.detail.value,
            desLength: e.detail.value.length
        })
    },
    chooseImage(e) {
        var that = this;
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
    },
    /* 预览图片 */
    previewImage(e) {
        wx.previewImage({
            current: e.currentTarget.id,
            // 当前显示图片的http链接
            urls: this.data.images // 需要预览的图片http链接列表
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
    bindTimeChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    bindDateChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            updoor_time: e.detail.value
        })
    },
    playRecord() {
        console.log('play')
        let that = this
        let ACT = this.data.innerAudioContext
        ACT.src = this.data.recordVoice.tempFilePath
        ACT.play()
        ACT.onPlay(() => {
            that.setData({
                voiceImg: '../../../images/voice.gif'
            })
            console.log('开始播放')
        })
        ACT.onEnded((res) => {
            console.log('播放停止')
            that.setData({
                voiceImg: '../../../images/voice2.png'
            })
        })
        ACT.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
        })
    },
    pressButton() {
        console.log('press')
        setTimeout(() => {
            this.setData({
                canStop: true
            })
        }, 1000)
        let that = this
        var recordStatus = that.data.recordStatus;
        if (recordStatus) {
            wx.getSetting({
                success(res) {
                    console.log(res, 890)
                    if (!res.authSetting['scope.record']) {
                        console.log(111)
                        wx.authorize({
                            scope: 'scope.record',
                            success() {
                                console.log(222)
                                that.setData({
                                    recordStatus: true
                                })
                            }
                        })
                    }
                }
            })
        } else {
            that.data.recorderManager.start();//开始录音
            wx.showToast({
                title: "正在录音",
                icon: "loading",
                duration: 60000//先定义个60秒，后面可以手动调用wx.hideToast()隐藏
            });
        }

    },
    looseButton() {
        console.log('loose')
        if (this.data.canStop) {
            wx.hideToast();//结束录音、隐藏Toast提示框
            this.data.recorderManager.stop();//结束录音

            this.setData({
                hasRecord: true
            })
            setTimeout(() => {
                console.log(this.data.recordVoice, 89)
                this.uploadRecord()
            }, 1000)


        } else {
            wx.showToast({
                title: "录音时间太短",
                icon: "none",
                duration: 1000
            });
            this.setData({
                hasRecord: false,
                canStop: false
            })
        }
    },
    uploadRecord(){
        let that = this;
        console.log(wx.getStorageSync('userid'), 'user_id')
        console.log(wx.getStorageSync('token'), 'token')
        console.log('正在上传',this.data.recordVoice.tempFilePath)
        wx.uploadFile({
            url: api.HOST + "/wxapi.php/Home/upload_voice?client_id=" + api.client_id + "&client_secret=" + api.client_secret, //此处换上你的接口地址
            filePath: this.data.recordVoice.tempFilePath,
            name: 'voice_' + wx.getStorageSync('userid'),
            formData: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token')
            },     //需要传的关于这个图片的信息，比如这个图片属于哪个用户的
            success(res) {
                console.log(JSON.parse(res.data), 333)
                that.setData({
                    voice:JSON.parse(res.data).files
                })
            },
            fail(res) {
                console.log(res, 888)
                wx.showToast({
                    title: '网络异常,请稍后重试',
                    icon: "none",
                    duration: 1000
                })
                that.setData({
                    voice: '',
                    hasRecord:false
                })
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
            url: api.HOST + "/wxapi.php/Home/upload_img?client_id=" + api.client_id + "&client_secret=" + api.client_secret, //此处换上你的接口地址
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('user-id', wx.getStorageSync('userid'))
        console.log('token', wx.getStorageSync('token'))
        console.log(options,96)
        this.setData({
            category_id:options.id,
            category_pid:options.pid,
            innerAudioContext: wx.createInnerAudioContext(),
            recorderManager: wx.getRecorderManager(),
        })
        this.data.recorderManager.onStop(res => {
            res.duration = formatTimeMS(res.duration)
            console.log(res.duration, 9090)
            this.setData({
                recordVoice: res,//contents是存储录音结束后的数据结构,用于渲染.
            })
            console.log(res, 98)
        });
    },
    checkChange(e){
      console.log(e)
      console.log('bind change')
        this.setData({
            'checkAgreement.checked':!this.data.checkAgreement.checked
        })
    },
    publishForm() {
        console.log(this.data.checkAgreement)
        let category_pid=this.data.category_pid
        let category_id=this.data.category_id
        let formData = {
            user_id: wx.getStorageSync('userid'),
            user_token: wx.getStorageSync('token'),
            user_address_id: this.data.user_address_id,
            updoor_time: this.data.updoor_time,
            desc: this.data.desc,
            images: this.data.images,
            voice: this.data.voice,
        }
        let tip='请填写数据'
        let ifShow=true
        if(formData.user_address_id==''){
            tip='请选择地址'
        }else if(formData.updoor_time=='请选择'){
            tip='请选择上门时间'
        }else if(formData.images.length<1){
            tip='请上传图片'
        }else if(formData.desc==''){
            tip='请填写描述需求'
        }else if(!this.data.checkAgreement.checked){
            tip='请阅读并同意相关协议'
        }else {
            ifShow=false
            api.post({
                url: '/Demand/insert/'+category_pid+"/"+category_id,
                data: formData,
                success: res => {
                    console.log(res, 999)
                    if(res.code==200){
                        wx.showToast({
                            title:'发布成功',
                            icon:"none",
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
                icon:"none",
                duration:1000
            })
        }


        console.log(formData)
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
        this.setData({
            canStop: false
        })
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