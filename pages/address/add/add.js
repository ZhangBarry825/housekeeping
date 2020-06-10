// pages/address/add/add.js
const api = require('../../../utils/api.js');
import {checkPhone, validateData} from '../../../utils/util'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: "",
        sex: 1,
        addresses: '',
        mobile: '',
        name: '',
        status: 0
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
    selectMap() {
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
            fail(e) {
                console.log('获取地图失败', e)
                wx.navigateTo({url:'/pages/getAuthority/getAuthority?type=location'})
            }
        })
        wx.chooseLocation({
            success(res) {
                console.log(res)
                that.setData({
                    address: res.address + res.name
                })
            }
        })
    },
    saveForm() {
        let formData = {
            user_id: wx.getStorageSync('userid'),
            user_token: wx.getStorageSync('token'),
            address: this.data.address,
            addresses: this.data.addresses,
            name: this.data.name,
            sex: this.data.sex,
            mobile: this.data.mobile,
            status: this.data.status,
        }
        console.log(formData)
        let tip = ''
        if (formData.address == '') {
            tip = '地址'
        } else if (formData.addresses == '') {
            tip = '门牌号'
        } else if (formData.name == '') {
            tip = '联系人'
        } else if (formData.mobile == ''|| !checkPhone(formData.mobile)) {
            tip = '手机号码'
        } else if (formData.sex == '') {
            tip = '性别'
        } else {
            api.post({
                url: '/User/insert_address',
                data: formData,
                success: res => {
                    console.log(res, 98)
                    if (res.code == 200) {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            })

                        }, 2000)
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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