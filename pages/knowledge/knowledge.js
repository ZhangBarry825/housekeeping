/* pages/knowledge/knowledge.js */
const app = getApp();
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pagesize: 2,     /*每页显示的行数：*/
        p: 1,             /*页码（从1开始）：*/
        paixu: 'viewcount', /*排序方式：*/
        order: 'desc',      /*升序或降序：*/
        state: 1,            /*用于标识是否还有更多的状态*/
        arrayProject:[],    /*用于渲染页面的数组*/
        allProject:[],      /*用于数组的追加和暂存*/
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        getproinfo( that.data.pagesize, this.data.p,that)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        var that = this;
        console.log('111')
        that.setData({
            arrayProject: {}
        });
        getproinfo(that.data.pagesize, this.data.p,that);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this;
        wx.showLoading({
            title: '玩命加载中...',
        });
        that.data.p = mythis.data.p + 1;
        getproinfo(that.data.pagesize, this.data.p,that);
        wx.hideLoading();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }

    
})


/**
 * 获取列表
 */
function getproinfo(pagesize, p, that){
    console.log(22)
    api.get({
        url: '/Article/Article_list/5/'+p+'/'+pagesize,
        data: {},
        success: data => {
            if(data.code == 200){
                var list = data.list;
                if(list.length < 1){
                    that.setData({
                        state: 0
                    });
                }else{
                    var state1 = 1;
                    /*如果有数据，但小于每次期望加载的数据量（pagesize）,将state设为0，表示后面已没有数据可加载*/
                    if (list.length < that.data.pagesize){
                        var state1 = 0;
                    }
                    for (var i = 0; i < list.length; i++) {
                        that.data.allProject.push(list[i]);
                    }
                    that.setData({
                        arrayProject: that.data.allProject,
                        state: state1
                    });
                }
            }else{
                that.setData({
                    state: 0
                });
            }

        }
    });

}