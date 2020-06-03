import "./date";
var app = getApp();
var tryingLogin = false;
var host = "https://jz2020.njflwlkj.com";
var appid="wx6533831d98a6b7de";
var secret = "18d7d3612709192105cf3ee5008e13a2";
var client_id = "wxapp";
var client_secret = "KISY7H8MK2DU9AGe3d";

module.exports = {
    HOST: host,
    API_ROOT: host + '/wxapi.php',
    API_VERSION: '1.1.0',
    post(options) {
        this.request(options);
    },
    get(options) {
        options.method = 'GET';
        this.request(options);
    },
    delete(options) {
        options.method = 'DELETE';
        this.request(options);
    },
    put(options) {
        options.method = 'PUT';
        this.request(options);
    },
    request(options) {
		var that = this;
        var apiRoot = that.API_ROOT;
        var token   = '';
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
        if (typeof options.login == 'undefined' || options.login == true) {
            requireLogin = true;
        } else {
            requireLogin = false;
        }
        wx.request({
            url: apiRoot + options.url + '/?client_id='+client_id+'&client_secret='+client_secret,
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
                var data = res.data;
                if (userid == '' && requireLogin) {
				
                    if (!tryingLogin) {
                        tryingLogin        = true;
                        var hasGetUserInfo = wx.getStorageSync('hasGetUserInfo');
                        if (hasGetUserInfo) {
                            wx.showToast({
                                title: '正在重新登录',
                                icon: 'success',
                                duration: 1000
                            });
                            setTimeout(() => {
                                wx.navigateTo({
                                  url: '/pages/shouquan/shouquan',
                                })
                            }, 1000);
                        } else {
                            wx.navigateTo({
                              url: '/pages/shouquan/shouquan',
                            })
                        }
                    }
                    // 登录注册
                    let currentPages = getCurrentPages();

                    console.log('-------no login!---------');

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
	
	
	login: function(options) {
		console.log(options)
		var that = this;
		wx.login({
			success: loginRes => {
				if (loginRes.code) {
					var avatarUrl = encodeURIComponent(options.detail.userInfo.avatarUrl);
					console.log(loginRes.code)
					console.log(options.detail.iv)
					console.log(options.detail.encryptedData)
					console.log(options.detail.userInfo.nickName)
					console.log(options.detail.userInfo.avatarUrl)
					console.log(options.detail.userInfo.city)
					console.log(options.detail.userInfo.province)
					console.log(options.detail.userInfo.country)
					console.log(options.detail.signature)
					return false;
					that.post({
						url: '/User/login/?client_id=' + client_id + '&client_secret=' + client_secret,
						data: {
							code: loginRes.code,
							iv: options.detail.iv,
							encryptedData: options.detail.encryptedData,
							nickName: options.detail.userInfo.nickName,
							avatarUrl: options.detail.userInfo.avatarUrl,
							invite_id: 0,/* 邀请用户id */
							city: options.detail.userInfo.city,
							province: options.detail.userInfo.province,
							country: options.detail.userInfo.country,
							signature: options.detail.signature
						},
						success: data => {
							console.log(data, '<回调用户信息')
							if (data.code == 200) {
								wx.showToast({
									title: '登录成功!',
									icon: 'success',
									duration: 1000
								});
								wx.setStorageSync('login', '1');
								wx.setStorageSync('token', data.user_token);
								wx.setStorageSync('userid', data.user_id);
								wx.switchTab({
									url: '/pages/home/home',
								});
							}
						}
					});
				}
			},
			fail: ()=> {
				tryingLogin = false;
			}
		});
	},

    uploadFile(options) {
		let that = this;
        options.url = that.API_ROOT + options.url;
        let token = that.getToken();
        
        let oldSuccess  = options.success;
        options.success = function (res) {
            console.log(res.data);
            let data = JSON.parse(res.data);
            console.log(data);
            if (data.code == 0 && data.data && data.data.code && data.data.code == 10001) {
                // wx.navigateTo({
                //     url: '/pages/login/login'
                // });
                that.login();
            } else {
                oldSuccess(data);
            }
        }

        options.header = {
            'Content-Type': 'multipart/form-data',
            'XX-Token': token,
            'XX-Device-Type': 'wxapp',
            'XX-Api-Version': that.API_VERSION
        };
        wx.uploadFile(options);

    },
    getToken() {
        var token = '';
        try {
            token = wx.getStorageSync('token')
        } catch (e) {
            // Do something when catch error
        }

        return token;
    },
    json2Form(json) {
        var str = []
        for (var p in json) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
        }
        return str.join("&")
    },
    timeFormat(second, fmt) {
        let mDate = new Date();
        mDate.setTime(second * 1000);
        return mDate.Format(fmt);
    },
    getCurrentPageUrl() {
        let currentPages = getCurrentPages();
        let currentPage  = currentPages.pop();
        let page         = currentPage['__route__'];
        let pageParams   = [];

        if (currentPage.params) {
            for (let key in currentPage.params) {
                pageParams.push(key + "=" + currentPage.params[key]);
            }
        }

        if (pageParams.length > 0) {
            page = page + '?' + pageParams.join("&");
        }

        return page;
    },
    /**
     *
     * @param itemKey
     * @param newItems
     * @param formatCallback
     * @param replace
     * @param listKey
     * @returns {Array}
     */
    updatePageList(itemKey, newItems, formatCallback, replace, listKey) {
		var that = this;
        let page = that.getCurrentPageUrl();

        console.log(page + "ddd");

        return that.updatePageListByPage(page, itemKey, newItems, formatCallback, replace, listKey);
    },
    /**
     *
     * @param page
     * @param itemKey
     * @param newItems
     * @param formatCallback
     * @param replace
     * @param listKey
     * @returns {Array}
     */
    updatePageListByPage(page, itemKey, newItems, formatCallback, replace, listKey) {
        listKey = listKey ? listKey : 'list';

        console.log(page);

        if (!app.pagesData.hasOwnProperty(page)) {
            app.pagesData[page] = {};
        }

        if (!app.pagesData[page][listKey] || replace) {
            app.pagesData[page][listKey] = {};
        }

        if (newItems) {
            newItems.forEach(item => {
                let uniqueValue = '_' + item[itemKey];
                if (formatCallback && typeof formatCallback == "function") {
                    item = formatCallback(item);
                }
                app.pagesData[page][listKey][uniqueValue] = item;
            });
        }


        let list = [];

        for (let key in app.pagesData[page][listKey]) {
            list.push(app.pagesData[page][listKey][key]);
        }

        console.log(list);

        return list;
    },
    /**
     *
     * @param key
     * @param newItem
     * @param listKey
     * @returns {*|Array}
     */
    updatePageListItem(key, newItem, formatCallback, listKey) {
		var that = this;
        let page = that.getCurrentPageUrl();

        return that.updatePageListItemByPage(page, key, newItem, formatCallback, listKey);
    },
    /**
     *
     * @param page
     * @param key
     * @param newItem
     * @param listKey
     * @returns {Array}
     */
    updatePageListItemByPage(page, key, newItem, formatCallback, listKey) {
        listKey = listKey ? listKey : 'list';

        if (!app.pagesData.hasOwnProperty(page)) {
            app.pagesData[page] = {};
        }

        if (!app.pagesData[page][listKey]) {
            app.pagesData[page][listKey] = {};
        }

        if (formatCallback && typeof formatCallback == "function") {
            newItem = formatCallback(newItem);
        }

        key = '_' + key;

        app.pagesData[page][listKey][key] = Object.assign(app.pagesData[page][listKey][key], newItem);


        let list = [];

        for (let key in app.pagesData[page][listKey]) {
            list.push(app.pagesData[page][listKey][key]);
        }

        console.log(list);

        return list;
    },
    /**
     *
     * @param key
     * @param listKey
     * @returns {*|Array}
     */
    deletePageListItem(key, listKey) {
		var that = this;
        let page = that.getCurrentPageUrl();

        return that.deletePageListItemByPage(page, key, listKey);
    },
    /**
     *
     * @param page
     * @param key
     * @param listKey
     * @returns {Array}
     */
    deletePageListItemByPage(page, key, listKey) {
        listKey = listKey ? listKey : 'list';

        if (!app.pagesData.hasOwnProperty(page)) {
            app.pagesData[page] = {};
        }

        if (!app.pagesData[page][listKey]) {
            app.pagesData[page][listKey] = {};
        }

        key = '_' + key;

        delete app.pagesData[page][listKey][key];


        let list = [];

        for (let key in app.pagesData[page][listKey]) {
            list.push(app.pagesData[page][listKey][key]);
        }

        console.log(list);

        return list;
    },
    pageNeedUpdate(page, needUpdate) {
        app.pagesNeedUpdate[page] = needUpdate;
    },
    getUploadUrl(file) {
		var that = this;
        if (file && file.indexOf('http') === 0) {
            return file;
        }
        return that.HOST + '/upload/' + file;
    },
    getCuraddress: function (lat, lng) {
      
    }
};
