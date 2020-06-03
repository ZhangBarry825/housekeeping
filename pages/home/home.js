/* pages/home/home.js */
const app = getApp()
const api = require('../../utils/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        background: {},
        lifeCommonSense: {},
        navigations:{},
        classmenulist: [],
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500
    },
    goItem(item) {
        let path;
        let tn = item.currentTarget.dataset.type;
        if (tn == 'knowledge-list') {
            path = '/pages/knowledge/knowledge?id='
        } else if (tn == 'knowledge-detail') {
            path = '/pages/knowledge-detail/knowledge-detail?id='
        } else if (tn == 'service-item') {
            path = '/pages/service-item/service-item?id=' + item.currentTarget.dataset.id
        } else if (tn == 'publish-task') {
            path = '/pages/publish-task/one/one?id=' + item.currentTarget.dataset.id
        }
        //app.navigateTo(path);
        wx.navigateTo({
            url: path
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        var that = this;
        that.loadBanners();
        that.lifeCommonSense();
        that.navigations();
        that.classMenuList();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var userid = wx.getStorageSync('userid');
        console.log(userid);
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /* 轮播图 */
    loadBanners: function() {
        var that = this;
        api.get({
            url: '/Home/poster/5',
            data: {},
            success: data => {
                if(data.code == 200){
                    var list = data.poster;
                    if(list.length > 0){
                        for(var i=0; i<list.length; i++){
                            list[i].poster_pic = api.HOST +'/'+ list[i].poster_pic;
                        }
                        that.setData({
                            background: list
                        })
                    }
                }else{
                    console.log('获取banner数据失败');
                }
            }
        });
    },

    /* 生活小常识 */
    lifeCommonSense:function(){
        var that = this;
        api.get({
            url: '/Article/Article_list/5/1/4',
            data: {},
            success: data => {
                if(data.code == 200){
                    var list = data.list;
                    console.log(list)
                    if(list.length > 0){
                        that.setData({
                            lifeCommonSense: data.list
                        })
                    }
                }else{
                    console.log('获取生活小常识数据失败');
                }

            }
        });
    },

    /* 导航 */
    navigations: function() {
        var that = this;
        api.get({
            url: '/Home/demand_category/0',
            data: {},
            success: data => {
                if(data.code == 200){
                    var list = data.list;
                    if(list.length > 0){
                        for(var i=0; i<list.length; i++){
                            list[i].icon = api.HOST +'/'+ list[i].icon;
                        }
                        that.setData({
                            navigations: list
                        })
                    }
                }else{
                    console.log('获取导航数据失败');
                }
            }
        });
    },

    /* 分类列表 */
    classMenuList: function() {
        var that = this;
        api.get({
            url: '/Home/demand_category/9999',
            data: {},
            success: data => {
                if(data.code == 200){
                    var list = data.list;
                    if(list.length > 0){
                        for(var i=0; i<list.length; i++){
                            var icon = list[i];
                            icon.icon = api.HOST +'/'+ icon.icon;
                            if(icon.children.length > 0){
                                for(var y=0; y<icon.children.length; y++){
                                    icon.children[y].icon = api.HOST +'/'+ icon.children[y].icon;
                                }
                            }
                        }
                        that.setData({
                            classmenulist: list
                        })
                    }
                }else{
                    console.log('获取导航数据失败');
                }
            }
        });
    },



})