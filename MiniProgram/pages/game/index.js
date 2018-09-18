import Page from '../../zanui/common/page';
import Notify from '../../zanui/notify/notify';
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        intId: 0,
        question_id: 0,
        btnHeight: '75px',
        numbers: [1, 4, 7, 10],
        numbersUsed: [0, 0, 0, 0],
        expression: '',
        result: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let btnHeight = Math.ceil(App.globalData.sysHeight / 8);
        btnHeight = btnHeight + 'px';
        this.setData({
            btnHeight: btnHeight
        });
        let intId = setInterval(this.setNumberUp, 200);
        this.setData({
            intId: intId
        });
        App.HttpService.getQuestion().then(res => {
            let response = res.data;
            this.setNumberDown();
            if (response.code == 200) {
                if (response.message == 'question') {
                    this.initForm(response.data);
                } else {
                    this.showNotify(response.message);
                }
            } else {
                this.showNotify(response.message);
            };
        });
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
    showNotify(message) {
        Notify(message);
    },
    initForm: function(question) {
        this.setData({
            question_id: question.id,
            numbers: [question.number1, question.number2, question.number3, question.number4],
            numbersUsed: [0, 0, 0, 0],
            expression: '',
            result: [],
        });
    },
    chearForm: function() {
        this.setData({
            numbersUsed: [0, 0, 0, 0],
            result: [],
            expression: ''
        });
    },
    submitForm: function() {
        let used = this.data.numbersUsed;
        if (used[0] == 0 || used[1] == 0 || used[2] == 0 || used[3] == 0) {
            this.showNotify('未使用到所有的数字！');
            return;
        }
        let requestData = {
            question_id: this.data.question_id,
            answer: this.data.expression
        };

        App.HttpService.submitAnswer(requestData).then(res => {
            let response = res.data;
            if (response.code == 200) {
                if (response.message == 'question') {
                    this.showNotify('恭喜您！回答正确，进入下一题！！');
                    this.initForm(response.data);
                } else {
                    this.showNotify(response.message);
                }
            } else {
                this.showNotify(response.message);
            };
        });

    },
    clickNumber: function(event) {
        let index = event.currentTarget.dataset.item;
        let used = this.data.numbersUsed;
        let result = this.data.result;
        if (used[index] == 1) {
            return;
        }
        if (result.length) {
            let end = result[result.length - 1];
            let re = /^[0-9]+.?[0-9]*$/;
            if (re.test(end)) {
                return;
            }
        }
        used[index] = 1;
        result.push(this.data.numbers[index]);
        this.setData({
            numbersUsed: used,
            result: result,
            expression: result.join('')
        });
    },
    clickOperator: function(event) {
        let item = event.currentTarget.dataset.item;
        let result = this.data.result;
        result.push(item);
        this.setData({
            result: result,
            expression: result.join('')
        });
    },
    setNumberUp: function() {
        let numbers = [];
        for (let i = 0; i < 4; i++) {
            numbers[i] = this.data.numbers[i] == 13 ? 1 : (1 + this.data.numbers[i]);
        }
        this.setData({
            numbers: numbers
        });
    },
    setNumberDown: function() {
        clearInterval(this.data.intId);
    }
})