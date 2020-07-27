import "./date";
var app = getApp();
var tryingLogin = false;
var host = "https://jz2020.njflwlkj.com";
var appid = "wx1802f78e06cf3960";
var secret = "a4ba79593c89112ad88889801640d5f4";
var client_id = "wxapp";
var client_secret = "KISY7H8MK2DU9AGe3d";

module.exports = {
    HOST: host,
    client_id: client_id,
    client_secret: client_secret,
    API_ROOT: host + '/wxapi.php?',
    API_VERSION: '1.1.0',
    AppID: appid,
    AppSecret: secret,
    post (options) {
        this.request(options);
    },
    get (options) {
        options.method = 'GET';
        this.request(options);
    },
    delete (options) {
        options.method = 'DELETE';
        this.request(options);
    },
    put (options) {
        options.method = 'PUT';
        this.request(options);
    },
    request (options) {
        let that = this;
        let apiRoot = that.API_ROOT;
        let token = '';
        try {
            token = wx.getStorageSync('token');
        } catch (e) {
            // Do something when catch error
        }

        var userid = '';
        try {
            userid = wx.getStorageSync('userid');
        } catch (e) {
            // Do something when catch error
        }

        var requireLogin = true;
        console.log(options.login, 'options.login')
        if (typeof options.login == 'undefined' || options.login == true) {
            requireLogin = true;
        } else {
            requireLogin = false;
        }
        wx.request({
            url: apiRoot + options.url + '/?client_id=' + client_id + '&client_secret=' + client_secret,
            data: options.data,
            method: options.method ? options.method : 'POST',
            header: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'XX-Token': token,
                'XX-Device-Type': 'wxapp',
                'XX-Api-Version': that.API_VERSION
            },
            success: res => {
                let data = res.data;
                if (userid == '' && requireLogin) {
                    console.log(tryingLogin);
                    if (!tryingLogin) {
                        tryingLogin = true;
                        console.log('去授权')
                        wx.navigateTo({
                            url: '/pages/shouquan/shouquan',
                        })
                    }
                    /* 登录注册 */
                    let currentPages = getCurrentPages();
                    let currentRoute = currentPages.pop()['__route__'];
                    if (currentRoute != 'pages/home/home') {
                        wx.navigateTo({
                            url: '/pages/home/home'
                        });
                    }

                } else {
                    options.success(data);
                }

            },
            fail: function (res) {
                if (options.fail) {
                    options.fail(res)
                }
            },
            complete: options.complete ? options.complete : null
        });
    },


    loginTwo: function () {

    },

    login: function (options) {
        var that = this;
        wx.login({
            success: loginRes => {
                if (loginRes.code) {
                    console.log(loginRes.code,8)
                    wx.request({
                        url: that.API_ROOT + '/User/login/?client_id=' + client_id + '&client_secret=' + client_secret,
                        data: {
                            code: loginRes.code,
                            iv: options.detail.iv,
                            encryptedData: options.detail.encryptedData,
                            nickName: options.detail.userInfo.nickName,
                            avatarUrl: options.detail.userInfo.avatarUrl,
                            invite_id: 0,   /* 邀请用户id */
                            city: options.detail.userInfo.city,
                            province: options.detail.userInfo.province,
                            country: options.detail.userInfo.country,
                            signature: options.detail.signature
                        },
                        method: 'POST',
                        header: {
                            'Cache-Control': 'no-cache',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'XX-Token': '',
                            'XX-Device-Type': 'wxapp',
                            'XX-Api-Version': '1.1.0'
                        },
                        success: res => {
                            console.log(res, 789)
                            var data = res.data;
                            var da = data.replace('{', '').replace('}', '').split(",");
                            var dco = da[0].split(":");
                            var user = da[2].split(":");
                            var token = da[3].split(":");

                            var dcod = dco[1].replace('"', '').replace('"', '');
                            var user_id = user[1].replace('"', '').replace('"', '');
                            var user_token = token[1].replace('"', '').replace('"', '');
                            if (dcod == 200) {
                                wx.showToast({
                                    title: '登录成功!',
                                    icon: 'success',
                                    duration: 1000
                                });
                                wx.setStorageSync('login', '1');
                                // wx.setStorageSync('token', user_token);
                                // wx.setStorageSync('userid', user_id);
                                wx.setStorageSync('token', user_token);
                                wx.setStorageSync('userid', user_id);


                                wx.getUserInfo({
                                    lang: 'zh_CN',
                                    success: function (res) {
                                        console.log(JSON.parse(res.rawData), '333');
                                        wx.setStorageSync('avatar', JSON.parse(res.rawData).avatarUrl);
                                    }
                                })



                                wx.reLaunch({
                                    url: '/pages/home/home',
                                });
                            }

                        }
                    })


                    // this.post({
                    // 	url: '/User/login/?client_id=' + client_id + '&client_secret=' + client_secret,
                    // 	data: {
                    // 		code: loginRes.code,
                    // 		iv: options.detail.iv,
                    // 		encryptedData: options.detail.encryptedData,
                    // 		nickName: options.detail.userInfo.nickName,
                    // 		avatarUrl: options.detail.userInfo.avatarUrl,
                    // 		invite_id: 0,   /* 邀请用户id */
                    // 		city: options.detail.userInfo.city,
                    // 		province: options.detail.userInfo.province,
                    // 		country: options.detail.userInfo.country,
                    // 		signature: options.detail.signature
                    // 	},
                    // 	success: data => {
                    // 		console.log(data,'22222333333')
                    // 		// if (data.code == 200) {
                    // 		// 	wx.showToast({
                    // 		// 		title: '登录成功!',
                    // 		// 		icon: 'success',
                    // 		// 		duration: 1000
                    // 		// 	});
                    // 		// 	wx.setStorageSync('login', '1');
                    // 		// 	wx.setStorageSync('token', data.user_token);
                    // 		// 	wx.setStorageSync('userid', data.user_id);
                    // 		// 	// wx.switchTab({
                    // 		// 	// 	url: '/pages/home/home',
                    // 		// 	// });
                    // 		// }
                    // 	}
                    // });
                }
            },
            fail: () => {
                tryingLogin = false;
            }
        });
    },

};
