const TokenAccount = {
    getToken() {
        return localStorage.getItem('token')
    },

    saveToken(accessToken) {
        localStorage.setItem('token', accessToken)
    },

    removeToken() {
        localStorage.removeItem('token')
    },

    // getRefreshToken() {
    //     return localStorage.getItem(REFRESH_TOKEN_KEY)
    // },

    // saveRefreshToken(refreshToken) {
    //     localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    // },

    // removeRefreshToken() {
    //     localStorage.removeItem(REFRESH_TOKEN_KEY)
    // }

}

const SetUser = {
    getUser() {
        let user = localStorage.getItem('user');
        return JSON.parse(user)
    },
    isAdmin(){
        let user = this.getUser();
        return user != null ? user.role == 'admin' : false
    },
    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    removeUser() {
        localStorage.removeItem('user')
    }
}

const SetUserGoogle = {
    getUserGoogle() {
        let user = localStorage.getItem('userGoogle');
        return JSON.parse(user)
    },
    saveUserGoogle(user) {
        localStorage.setItem('userGoogle', JSON.stringify(user));
    },

    removeUserGoogle() {
        localStorage.removeItem('userGoogle')
    },

    saveRefreshUserGoogle(refreshToken) {
        localStorage.setItem('userGoogle', JSON.stringify(refreshToken))
    },
}

const SetPriceVoucher = {

    getPriceVoucher() {
        let priceVoucher = localStorage.getItem('prireVoucher');
        return JSON.parse(priceVoucher)
    },

    getVoucher() {
        let voucher = localStorage.getItem('voucher');
        return JSON.parse(voucher)
    },

    saveRefreshPriceVoucher(value) {
        localStorage.setItem('prireVoucher', JSON.stringify(value))
    },

    saveRefreshVoucher(data) {
        localStorage.setItem('voucher', JSON.stringify(data))
    },

    removePriceVoucher() {
        localStorage.removeItem('prireVoucher')
    },

    removeVoucher() {
        localStorage.removeItem('voucher')
    },
}

const SetResetEmail = {

    getResetEmail() {
        let resetEmail = localStorage.getItem('resetEmail');
        return JSON.parse(resetEmail)
    },

    saveResetEmail(value) {
        localStorage.setItem('resetEmail', JSON.stringify(value))
    },

    removeResetEmail() {
        localStorage.removeItem('resetEmail')
    },
}

export { TokenAccount, SetUser, SetUserGoogle, SetPriceVoucher, SetResetEmail }