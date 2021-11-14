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

export { TokenAccount, SetUser }