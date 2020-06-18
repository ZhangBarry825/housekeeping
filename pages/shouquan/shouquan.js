const api = require('../../utils/api.js');
Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		hide: 1,
		phone: '',
		userid: ''
	},
	onLoad: function() {

	},
	/* 点击授权 */
	bindGetUserInfo: function(e) {
		var that = this;
		// that.btntap();
		console.log(e.detail,9)
		api.login(e);
	},
	btntap: function() {
		/* 查看是否授权 */
		wx.getSetting({
			success: function(res) {
				if (res.authSetting['scope.userInfo']) {
					/* 已经授权，可以直接调用 getUserInfo 获取头像昵称 */
					wx.getUserInfo({
						lang: 'zh_CN',
						success: function(res) {
							console.log(res,'333');
						}
					})
				}
			}
		});
	}
})