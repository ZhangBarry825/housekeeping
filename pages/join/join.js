// pages/join/join.js
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkAgreement: {
            value:'',
            checked:false
        },
        imgUrl1: '',
        imgUrl2: '',
        imgUrl3: '',
        imgUrl4: '',
        typeList: [],
        type: '',

        user_nickname: '',
        contact_name: '',
        address: '',
        service_category: '',
        real_name: '',
        id_card_number: '',
        id_positive: '',
        id_opposite: '',
        handheld: '',
        head_portrait:'',


        imagesUrl:[],
    },


    previewImage(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.imagesUrl // 需要预览的图片http链接列表
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


    uploadImg(p,num) {
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
                    if(num == 1){
                        that.setData({
                            imgUrl1: api.HOST + "/" + JSON.parse(res.data).files,
                            id_positive: JSON.parse(res.data).files
                        });
                    }else if(num == 2){
                        that.setData({
                            imgUrl2: api.HOST + "/" + JSON.parse(res.data).files,
                            id_opposite: JSON.parse(res.data).files
                        });
                    }else if(num ==3){
                        that.setData({
                            imgUrl3: api.HOST + "/" + JSON.parse(res.data).files,
                            handheld: JSON.parse(res.data).files
                        });
                    }else if(num ==4){
                        that.setData({
                            imgUrl4: api.HOST + "/" + JSON.parse(res.data).files,
                            head_portrait: JSON.parse(res.data).files
                        });
                    }

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
    checkChange(e){
        console.log(e)
        console.log('bind change')
        this.setData({
            'checkAgreement.checked':!this.data.checkAgreement.checked
        })
    },
    chooseImage1() {
        let that = this
        wx.chooseImage({
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res, 987)
                // that.setData({
                //     imgUrl1: res.tempFilePaths[0]
                // });
                that.uploadImg(res.tempFilePaths[0],1)

            }
        })
    },
    chooseImage2() {
        let that = this
        wx.chooseImage({
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res, 987)
                that.uploadImg(res.tempFilePaths[0],2)
            }
        })
    },
    chooseImage3() {
        let that = this
        wx.chooseImage({
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res, 987)
                that.uploadImg(res.tempFilePaths[0],3)
            }
        })
    },
    chooseImage4() {
        let that = this
        wx.chooseImage({
            sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log(res, 987)
                that.uploadImg(res.tempFilePaths[0],4)
            }
        })
    },
    selectMap() {
        let that = this
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                const speed = res.speed
                const accuracy = res.accuracy
                console.log(res, 99)
            },
            fail(e){
                console.log('获取地图失败', e)
                wx.navigateTo({url:'/pages/getAuthority/getAuthority?type=location'})
            }
        })
        wx.chooseLocation({
            success(res) {
                console.log(res)
                that.setData({
                    address: res.address + res.name,
                })
            }
        })
    },
    submitForm() {
        let that = this
        let formData = {
            user_id: wx.getStorageSync('userid'),
            user_token: wx.getStorageSync('token'),
            contact_name: this.data.contact_name,
            head_portrait: this.data.imgUrl4,
            address: this.data.address,
            service_category: this.data.service_category,
            real_name: this.data.real_name,
            id_card_number: this.data.id_card_number,
            id_positive: this.data.id_positive,
            id_opposite: this.data.id_opposite,
            handheld: this.data.handheld,
        }
        console.log(formData)
        let tip=''
        let ifShow=true

        if(formData.contact_name==''){
            tip='请输入联系人'
        }else if(formData.head_portrait==''){
            tip='请上传头像'
        }else if(formData.address==''){
            tip='请输入联系地址'
        }else if(formData.real_name==''){
            tip='请输入真实姓名'
        }else if(formData.id_card_number==''){
            tip='请输入身份证号码'
        }else if(formData.id_positive==''){
            tip='请上传身份证正面'
        }else if(formData.id_opposite==''){
            tip='请上传身份证反面'
        }else if(formData.handheld==''){
            tip='请上传手持身份证照片'
        }else if(!this.data.checkAgreement.checked){
            tip='请阅读并同意相关协议'
        }else {
            ifShow=false
            api.post({
                url: '/User/update_user_info/in',
                data: formData,
                success: res => {
                    console.log(res, 765)
                    if (res.code == 200) {
                        wx.showToast({
                            title:"申请成功",
                            icon:'success',
                            duration:2000
                        })
                        setTimeout(()=>{
                            wx.navigateBack({
                                delta: 1
                            })
                        },2000)
                    } else {
                        console.log('获取数据失败');
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

    },
    seeDetail(e){
        let id=e.currentTarget.dataset.id
      console.log('detail')
        wx.navigateTo({
            url:'/pages/agreement-detail/agreement-detail?id='+id
        })
    },
    updateNickname(e) {
        console.log(e.detail.value)
        this.setData({
            user_nickname:e.detail.value
        })
    },
    bindRealName(e) {
        console.log(e.detail.value)
        this.setData({
            real_name:e.detail.value
        })
    },
    bindIDCard(e) {
        console.log(e.detail.value)
        this.setData({
            id_card_number:e.detail.value
        })
    },
    updateAddress(e) {
        console.log(e.detail.value)
        this.setData({
            address:e.detail.value
        })
    },
    updateContactName(e) {
        console.log(e.detail.value)
        this.setData({
            contact_name:e.detail.value
        })
    },
    bindPickerChange: function (e) {
        this.setData({
            type: this.data.typeList[e.detail.value],
            service_category: this.data.typeItem[e.detail.value].id
        })
    },
    fetchData() {
        let that = this
        api.get({
            url: '/Home/demand_category/9999',
            success: res => {
                if (res.code == 200) {
                    let typeList = []
                    for (let i = 0; i < res.list.length; i++) {
                        typeList.push(res.list[i].title)
                    }
                    that.setData({
                        typeList: typeList,
                        typeItem: res.list
                    })
                } else {
                    console.log('获取数据失败');
                }
            }
        })
        api.get({
            url: '/Article/user_agreement',
            success: res => {
                that.setData({
                    agreementId:res.data.article_id
                })

            }
        })


    },
    seePhoto(){
        api.get({
            url: 'Article/handheld_sample',
            success: res => {
                if(res.code==200){
                    wx.navigateTo({
                        url:'/pages/agreement-detail/agreement-detail?id='+res.data.article_id+'&title=示例图片'
                    })
                }
            }
        })
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