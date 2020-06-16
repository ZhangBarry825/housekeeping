// pages/publish-task/four/four.js
import {numToTime} from "../../../utils/util";

const api = require('../../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_id:'',
        descLength:0,
        desc:'',
        tags: {
            one: true,
            two: false,
            three: true,
            four: false
        },
        commentTags:[],
        checkTags:[],
        starNum:4,
        anonymous:false,
        orderDetail:{}
    },
    updateDesc(e){
        this.setData({
            descLength:e.detail.value.length,
            desc:e.detail.value
        })
    },
    selectStar(e){
        console.log(e.currentTarget.dataset.number)
        let num=e.currentTarget.dataset.number
        this.setData({
            starNum:num
        })
    },
    selectTag(e) {
        let item = e.currentTarget.dataset.item
        let id = item.options_id
        let index = e.currentTarget.dataset.index
        let up = "commentTags[" + index + "].checked";
        let pushCheck=this.data.checkTags

        if (item.checked == false) {
            pushCheck.push(id)
            this.setData({
                [up]:true,
                checkTags:pushCheck
            })
        }else {
            let newArr=[]
            for (let i = 0; i < this.data.checkTags.length; i++) {
                if(this.data.checkTags[i]!=id){
                    newArr.push(this.data.checkTags[i])
                }
            }
            this.setData({
                [up]:false,
                checkTags:newArr
            })
        }
        console.log(this.data.commentTags,1)
        console.log(this.data.checkTags,2)

    },
    changHidden(){
        this.setData({
            anonymous:!this.data.anonymous
        })
    },
    goDetail(){
        wx.navigateTo({
                url:'/pages/publish-task/detail/detail?demand_id='+this.data.orderDetail.demand_id
        })
    },
    fetchData(id){
        let that = this
        api.get({
            url: '/Home/options_list/5',
            success: res => {

                for (let i = 0; i < res.list.length; i++) {
                    res.list[i].checked=false
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
            data:{
                user_id:wx.getStorageSync('userid'),
                user_token:wx.getStorageSync('token'),
                order_id:id
            },
            success: res => {
                console.log(res,789)
                res.list.order_end_time=numToTime(res.list.order_end_time)
                that.setData({
                    orderDetail:res.list
                })
            }
        })

    },
    submitForm(){
        let that = this
        let formData={
            user_id:wx.getStorageSync('userid'),
            user_token:wx.getStorageSync('token'),
            order_id:this.data.order_id,
            score:this.data.starNum,
            content:this.data.desc,
            options_id:this.data.checkTags,
            anonymous:this.data.anonymous,
        }
        console.log(formData,975)
        if(formData.content==''){
            wx.showToast({
                title: '请输入评价内容',
                icon: 'none',
                duration: 2000
            })
        }else {
            api.post({
                url: '/Order/insert_evaluation',
                data:formData,
                success: res => {
                    console.log(res,852)
                    if (res.code == 200) {
                        wx.showToast({
                            title: '评价成功',
                            icon: 'success',
                            duration: 2000
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchData(options.id)
        console.log(options,9090)
        this.setData({
            order_id:options.id
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