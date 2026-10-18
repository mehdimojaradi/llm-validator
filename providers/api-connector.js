class ApiConnector {
    constructor() {
        this._token = null;
        this.apiBaseUrl = process.env.BASE_URL;
    }

    async connect() {
        const authResponse = await fetch(`${this.apiBaseUrl}/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client: process.env.CLIENT,
                password: process.env.PASSWORD
            })
        });
        const authData = await authResponse.json();
        this._token = authData.token || authData.accessToken || authData.jwt;
        
        return this._token;
    }

    async request(endpoint, method = 'GET', body = null) {
        await this.connect();
        const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._token}`
            },
            body: body ? JSON.stringify(body) : null
        });
        
        const data = await response.json();
        return data;
    }
}

module.exports = ApiConnector;