// pages/order/order.js
import {numToTime} from "../../utils/util";

const app = getApp()
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        menu: 0,
        datalist:[],
        page:1,
        limit:20
    },
    // 获取数据
    retrieveData (status) {
        let that=this
        let user_id = wx.getStorageSync('userid')
        api.get({
            // url: `/Home/demand/${user_id}/${status}/${page}/${limit}`,
            url: '/Home/demand/' + user_id + '/' + that.data.menu + '/' + that.data.page + '/' + that.data.limit,
            data: {},
            success: data => {
                let current=[]
                data.list.forEach(item=>{
                    current.push(item)
                })
                let datasnd=this.data.datalist
                current.forEach(item=>{
                    item.create_time=numToTime(item.create_time)
                    item.offer_endtime=numToTime(item.offer_endtime)
                    if(item.offer_price==null){
                        item.offer_price=0
                    }
                    datasnd.push(item)
                })
                that.setData({
                    datalist:datasnd
                })
                console.log(that.data)
            }
        });
    },
    // 点击操作
    goToPage(e){
        console.log(e.currentTarget.dataset,"12")
        let status=e.currentTarget.dataset.status
        let orderid=e.currentTarget.dataset.orderid
        if(status==1){
            wx.navigateTo({
                url: '/pages/publish-task/two/two?demandid='+e.currentTarget.dataset.demandid
            })
        } else if(orderid){
            wx.navigateTo({
                url: '/pages/publish-task/three/three?orderid='+orderid
            })
        } else  if(status==0||status==12||status==11){
            wx.showToast({
                title: '当前不可操作',
                icon: 'none',
                duration: 2000
            })
        }
    },
    // 判断状态
    gingStatus(val){
        let ad=val==0?'没的报价':val==1?'选择师傅':'0'
        return ad
    },
    // 点击状态(全部,退款,投诉)
    changeMenu (e) {
        console.log(e)
        this.setData({
            page:1,
            datalist:[]
        })
        this.setData({
            menu: e.currentTarget.dataset.type
        })
        this.retrieveData()

    },
    goToSelect () {
        wx.navigateTo({
            url
        })
    },
    goToCheck () {
        wx.navigateTo({
            url: '/pages/publish-task/three/three'
        })
    },
    goToComment () {
        wx.navigateTo({
            url: '/pages/publish-task/four/four'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this)
        // this.retrieveData(0)
        // console.log(options,'23')
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
        console.log(userid,'userid');
        if(userid=='' || userid==undefined){
            wx.navigateTo({
                url: '/pages/shouquan/shouquan',
            })
        }
        this.setData({
            page:1,
            datalist:[]
        })
        this.retrieveData()
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
        this.setData({
            page:1,
            datalist:[]
        })
        this.retrieveData()
        console.log("111");
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let count=this.data.page
        count++
        this.setData({
            page:count
        })
        this.retrieveData()
        console.log("222");
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
