/* pages/mine/mine.js */
const app = getApp()
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showContact: false,
        phone: '',
        status: 0,
        avatarUrl: "../../images/avatar.png"
    },
    contactUs () {
        this.setData({
            showContact: true
        })
    },
    cancelShow () {
        this.setData({
            showContact: false
        })
    },
    handleContact (e) {
        console.log(e.detail.path)
        console.log(e.detail.query)
        this.setData({
            showContact: false
        })
    },
    joinUs () {
        if(this.data.status==0){
            wx.navigateTo({
                url: "/pages/join/join"
            })
        }else {
            wx.showToast({
                title:this.data.status==1?'待审核':this.data.status==2?'审核通过':this.data.status==3?'审核未通过':'',
                icon: 'none',
                duration: 2000
            })
        }

    },
    fetchData () {
        let that = this
        api.get({
            url: '/User/contact_service',
            success: res => {
                console.log(res, 765)
                if (res.code == 200) {
                    that.setData({
                        phone: res.data.service_phone
                    })
                } else {
                    console.log('获取数据失败');
                }
            }
        })

    },
    fetchStatus(){
        let that = this
        api.post({
            url: '/User/update_user_info/status',
            data: {
                user_id: wx.getStorageSync('userid'),
                user_token: wx.getStorageSync('token'),
            },
            success: res => {
                console.log(res, 852)
                if (res.code == 200) {
                    that.setData({
                        status: res.status
                    })
                } else {
                    console.log('获取数据失败');
                }
            }
        })
    },
    callPhone () {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
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
        var userid = wx.getStorageSync('userid');
        this.fetchStatus()
        console.log(userid, 'userid');
        if (userid == '' || userid == undefined) {
            wx.navigateTo({
                url: '/pages/shouquan/shouquan',
            })
        }
        if(wx.getStorageSync('avatar').length>0){
            this.setData({
                avatarUrl:wx.getStorageSync('avatar')
            })
        }else {
            this.setData({
                avatarUrl: "../../images/avatar.png"
            })
        }
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
