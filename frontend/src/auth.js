class Auth {
	/**
	* Authenticate a user. Save a token string in Local Storage
	*
	* @param {string} token
	*/
	/* eslint-disable no-undef */
	static authenticateUser (token, email) {
		localStorage.setItem('@FinMan/token', token)
		localStorage.setItem('@FinMan/userEmail', email)
	}

	static authNotified () {
		localStorage.setItem('authNotified', true)
	}

	static getAuthNotified () {
		return localStorage.getItem('authNotified')
	}

	static storeReferer (path) {
		localStorage.setItem('referer', path)
	}

	static getReferer () {
		return localStorage.getItem('referer')
	}

	/**
	* Check if a user is authenticated - check if a token is saved in Local Storage
	*
	* @returns {boolean}
	*/
	static isAuthenticated () {
		return localStorage.getItem('@FinMan/token') ? true : false
	}

	/**
	* Deauthenticate a user. Remove a token from Local Storage.
	*
	*/
	static deauthenticateUser () {
		localStorage.removeItem('@FinMan/token')
		localStorage.removeItem('@FinMan/userEmail')
	}

	/**
	* Get a token value.
	*
	* @returns {string}
	*/

	static getToken () {
		return localStorage.getItem('@FinMan/token')
	}

	static getUserEmail () {
		return localStorage.getItem('@FinMan/userEmail')
	}
}

export default Auth