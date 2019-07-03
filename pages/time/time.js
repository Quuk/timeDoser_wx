const app = getApp();

Page({
    data: {
        timeDisable: false,
        second: 59,
        minute: 25,
        userInfo: app.globalData.userInfo
    },
    onLoad() {
        this.setData({
            minute: app.globalData.minute - 1,
        });


    },
    setTime() {

        const animationImg = wx.createAnimation({
            duration: 1000,
            timingFunction: "ease"
        });
        animationImg.scale(4).translateY(20).step();

        this.setData({
            animationImg: animationImg.export(),
            timeDisable: true,
        });

        clear(this);
        setTime(this);
    },
    stop() {

        const animationImg = wx.createAnimation({
            duration: 1000,
            timingFunction: "ease",
        });
        animationImg.scale(1).translateY(0).step();

        this.setData({
            animationImg: animationImg.export(),
            timeDisable: false,
        });
        clear(this);
    }
});

function clear(that) {
    that.setData({
        second: 59,
        minute: app.globalData.minute - 1
    });
}

function setTime(that) {
    let second = that.data.second;
    let minute = app.globalData.minute;

    if (!that.data.timeDisable) return;

    if (second === 0) {
        if (minute === 0) {
            that.setData({
                timeDisable: false,
            });
            return;
        } else {
            second = 59;
            minute = minute - 1;

            // 延时1s 分钟变化
            setTimeout(function () {
                that.setData({
                    minute: minute,
                });
            }, 1000);
        }
    }

    // -1s 递归
    setTimeout(function () {
        that.setData({
            second: second - 1,
        });
        setTime(that);
    }, 1000);
}
