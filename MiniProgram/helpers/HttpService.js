import WxRequest from './plugins/wx-request/lib/index'

class HttpService extends WxRequest {
    constructor(options) {
        super(options)
        this.$$prefix = ''
        this.$$path = {
            wechatSignIn: '/wechat/login',
            signIn: '/wechat/login',
            getProfile: '/profile',
            signOut: '/logout',
            getQuestion: '/game/question',
            getHistory: '/game/history',
            submitAnswer: '/game/answer'
        }
        this.interceptors.use({
            request(request) {
                request.header = request.header || {}
                request.header['content-type'] = 'application/json'
                if (wx.getStorageSync('token')) {
                    request.header.Authorization = 'Bearer ' + wx.getStorageSync('token')
                }
                if (request.showLoading) {
                    wx.showLoading({
                        title: '加载中',
                    })
                }
                return request
            },
            requestError(requestError) {
                wx.hideLoading()
                return Promise.reject(requestError)
            },
            response(response) {
                wx.hideLoading()
                if (response.statusCode==200 && response.data.code　>= 4001 && response.data.code <= 4004) {
                    wx.removeStorageSync('token')
                    wx.redirectTo({
                        url: '/pages/login/index'
                    })
                }
                return response
            },
            responseError(responseError) {
                wx.hideLoading()
                return Promise.reject(responseError)
            },
        })
    }

    wechatSignIn(params) {
        return this.postRequest(this.$$path.wechatSignIn, {
            data: params,
        })
    }

    signIn(params) {
        return this.postRequest(this.$$path.signIn, {
            data: params,
        })
    }

    getProfile() {
        return this.getRequest(this.$$path.getProfile, {
            showLoading: false
        })
    }

    signOut() {
        return this.postRequest(this.$$path.signOut)
    }

    getQuestion() {
        return this.getRequest(this.$$path.getQuestion, {
            showLoading: false
        })
    }

    getHistory() {
        return this.getRequest(this.$$path.getHistory, {
            showLoading: false
        })
    }

    submitAnswer(params) {
        return this.postRequest(this.$$path.submitAnswer, {
            data: params,
        })
    }
}

export default HttpService