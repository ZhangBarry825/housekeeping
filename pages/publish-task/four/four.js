// pages/publish-task/four/four.js
import { numToTime } from "../../../utils/util";

const api = require('../../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_id: '',
        descLength: 0,
        desc: '',
        tags: {
            one: true,
            two: false,
            three: true,
            four: false
        },
        commentTags: [],
        checkTags: [],
        starNum: 4,
        anonymous: false,
        orderDetail: {},
        images: [],		/*保存上传图片url的数组*/
        imagesUrl: [],		/*展示上传图片url的数组*/
    },
    uploadImg (p) {
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
            success (res) {
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
    chooseImage (e) {
        var that = this;
        wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'],
            // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
            // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let tempFile = res.tempFilePaths
                for (let i = 0;i < tempFile.length;i++) {
                    // const element = tempFile[i];
                    that.uploadImg(tempFile[i])
                }
                console.log(res, "选择")
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                // that.setData({
                //     images: that.data.images.concat(res.tempFilePaths)
                // });
                // that.uploadImg(res.tempFilePaths[0])
            }
        })
    },
    /* 预览图片 */
    previewImage (e) {
        let that = this
        console.log('show')
        console.log(e.currentTarget.dataset.index)
        console.log(that.data.imagesUrl)
        wx.previewImage({
            current: that.data.imagesUrl[e.currentTarget.dataset.index],
            // 当前显示图片的http链接
            urls: that.data.imagesUrl // 需要预览的图片http链接列表
        })
    },
    deleteImg (e) {
        var that = this;
        var nowList = []; /*新数据*/
        var images = that.data.images; /*原数据*/

        for (let i = 0;i < images.length;i++) {
            if (i != e.currentTarget.dataset.index) {
                nowList.push(images[i])
            }
        }
        this.setData({
            images: nowList,
            imagesUrl: nowList
        })
        console.log(this.data.images, 987)
    },

    updateDesc (e) {
        this.setData({
            descLength: e.detail.value.length,
            desc: e.detail.value
        })
    },
    goMaster (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/master-details/master-details?master_user_id=' + id
        })
    },
    selectStar (e) {
        console.log(e.currentTarget.dataset.number)
        let num = e.currentTarget.dataset.number
        this.setData({
            starNum: num
        })
    },
    selectTag (e) {
        let item = e.currentTarget.dataset.item
        let id = item.options_id
        let index = e.currentTarget.dataset.index
        let up = "commentTags[" + index + "].checked";
        let pushCheck = this.data.checkTags

        if (item.checked == false) {
            pushCheck.push(id)
            this.setData({
                [up]: true,
                checkTags: pushCheck
            })
        } else {
            let newArr = []
            for (let i = 0;i < this.data.checkTags.length;i++) {
                if (this.data.checkTags[i] != id) {
                    newArr.push(this.data.checkTags[i])
                }
            }
            this.setData({
                [up]: false,
                checkTags: newArr
            })
        }
        console.log(this.data.commentTags, 1)
        console.log(this.data.checkTags, 2)

    },
    changHidden () {
        this.setData({
            anonymous: !this.data.anonymous
        })
    },
    goDetail () {
        wx.navigateTo({
            url: '/pages/publish-task/detail/detail?demand_id=' + this.data.orderDetail.demand_id
        })
    },
    fetchData (id) {
        let that = this
        api.get({
            url: '/Home/options_list/5',
            success: res => {
                console.log(res, '获取数据');
                for (let i = 0;i < res.list.length;i++) {
                    res.list[i].checked = false
                }
                console.log(res, 765)
                if (res.code == 200) {
                    that.setData({
                        commentTags: res.list
                    })
                } else {
                    console.log('获取数据失败');
                }
            }
        })
        api.post({
            url: '/Order/order_info',
            data: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token'),
                order_id: id
            },
            success: res => {
                console.log(res, 789)
                res.list.order_end_time = numToTime(res.list.order_end_time)
                that.setData({
                    orderDetail: res.list
                })
            }
        })

    },
    submitForm () {
        let that = this
        let formData = {
            user_id: wx.getStorageSync('userid'),
            user_token: wx.getStorageSync('token'),
            order_id: this.data.order_id,
            score: this.data.starNum,
            content: this.data.desc,
            options_id: this.data.checkTags,
            anonymous: this.data.anonymous,
            images:this.data.images
        }
        console.log(formData, 975)
        if (formData.content == '') {
            wx.showToast({
                title: '请输入评价内容',
                icon: 'none',
                duration: 2000
            })
        } else {
            api.post({
                url: '/Order/insert_evaluation',
                data: formData,
                success: res => {
                    console.log(res, 852)
                    if (res.code == 200) {
                        wx.showToast({
                            title: '评价成功',
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            })
                        }, 2000)
                    } else {
                        console.log('获取数据失败');
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchData(options.id)
        console.log(options, 9090)
        this.setData({
            order_id: options.id,
            // renlist: JSON.parse(options.renlist)
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
