import common from "../../../common.js";

const app = getApp();

Page({});
Component({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        baseUser: wx.getStorageSync("baseUser"),
        dayCount: 0,
        weekCount: 0,
        allCount: 0
    },
    attached: function () {
        checkData(this);
        loadBaseData(this);
    },
    methods: {
        toSetting() {
            wx.navigateTo({
                url: "/pages/timeDoser/timeDoser"
            });
        },

        toUserInfo() {
            wx.navigateTo({
                url: "/pages/my/other/other"
            });
        },

        getUserInfo: function (e) {

            // 如果用户同意授权
            if (e.detail.userInfo !== undefined) {
                let that = this;

                // 添加微信资料进缓存
                wx.getUserInfo({
                    success: res => {
                        app.globalData.userInfo = res.userInfo;
                        wx.setStorageSync('userInfo', res.userInfo);
                    }
                });

                // 更新数据库中个人资料
                wx.request({
                    url: `${common.URL}/user/updateUserInfo`,
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X_Auth_Token': app.globalData.token
                    },
                    method: "POST",
                    data: {userInfo: JSON.stringify(e.detail.userInfo)},
                    success(res) {
                        wx.setStorage({
                            key: 'baseUser',
                            data: res.data.data
                        });
                        that.setData({baseUser: res.data.data});
                        app.globalData.baseUser = res.data.data;
                    }
                });
            }
        }
    },
});

// 数据校验
function checkData(that) {
    // 个人主页出现了数据加载异常bug
    if (that.data.baseUser === null || that.data.baseUser === "" || that.data.baseUser.avatarUrl === null || that.data.baseUser.avatarUrl === "") {
        that.setData({baseUser: wx.getStorageSync("baseUser")});
    }
}


// load base data
function loadBaseData(that) {
    wx.request({
        url: `${common.URL}/report/pageData`,
        header: {'X_Auth_Token': app.globalData.token},
        success: data => {
            if (data.statusCode === 200 && data.data.code === 200) {
                that.setData({pageData: data.data.data});
                // 数字增长效果
                addNum(that, data.data.data);
            }
        },
    });
}

// 数字增长效果
function addNum(that, data) {
    setTime(that, 0, data.dayCount, data.weekCount, data.allCount);
}

// 递增
function setTime(that, num, day, week, all) {
    that.setData({
        dayCount: day === undefined || day < 10 ? 0 : num,
        weekCount: week === undefined || week < 10 ? 0 : num,
        allCount: all === undefined || all < 10 ? 0 : num
    });
    num++;
    if (num <= 25) {
        setTimeout(function () {
            setTime(that, num, day, week, all);
        }, 20);
    } else {
        setTimeEnd(that, day, week, all);
    }
}

// 截止
function setTimeEnd(that, day, week, all) {
    that.setData({
        dayCount: day === undefined ? 0 : day,
        weekCount: week === undefined ? 0 : week,
        allCount: all === undefined ? 0 : all
    });
}
