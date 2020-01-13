const app = getApp();

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        baseUser: wx.getStorageSync("baseUser"),
        hasWork: false,
    },
    onReady() {
        // 设置初始透明度
        setRemarkOpecity(this);
        console.log(this.data.hasWork)
    },

    // 开始计时了
    startTime() {
        this.setData({hasWork: true});
        startTime(this) // 字体变化
    },

    // 结束计时
    endTime() {
        this.setData({hasWork: false});
        endTime(this)   // 字体变化
    },
});

function setRemarkOpecity(that) {
    // 设置初始透明度
    that.animate('#am-home-remark-end', [
        {opacity: 1},
    ], 1);
}

/**
 * 计时字体变化(开始)
 * 1.颜色变深
 * 2.字体变大
 */
function startTime(that) {

    // 1.计时字体变化
    that.animate('#am-home-date', [
        {scale: [1, 1], opacity: 0.5},
        {scale: [1.2, 1.2], opacity: 0.8},
    ], 150);

    // 2.计时备注变化1
    that.animate('#am-home-remark', [
        {translate: [0, 0], opacity: 0, scale: [1, 1]},
        {translate: [-5, 12], opacity: 1, scale: [0.9, 0.9]},
    ], 150);

    // 3.标签变化
    that.animate('#am-home-tag', [
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
        {translate: [12, 12], opacity: 0.3, scale: [0.8, 0.8]},
    ], 150);

    // 4.计时备注变化2
    that.animate('#am-home-remark-end', [
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
        {translate: [-5, 12], opacity: 0, scale: [0.9, 0.9]},
    ], 150);
}

/**
 * 计时字体变化(结束)
 * 和开始相反
 */
function endTime(that) {
    that.animate('#am-home-date', [
        {scale: [1.2, 1.2], opacity: 0.8},
        {scale: [1, 1], opacity: 0.5},
    ], 150);
    that.animate('#am-home-remark', [
        {opacity: 1, scale: [0.9, 0.9]},
        {opacity: 0, scale: [1, 1]},
    ], 150);
    that.animate('#am-home-tag', [
        {translate: [12, 12], opacity: 0.3, scale: [0.8, 0.8]},
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
    ], 150);
    that.animate('#am-home-remark-end', [
        {translate: [-5, 12], opacity: 0, scale: [0.9, 0.9]},
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
    ], 150);
}