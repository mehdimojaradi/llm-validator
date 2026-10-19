class ApiConnector {
    constructor() {
        this._token = null;
        this.apiBaseUrl = process.env.BASE_URL;
    }

    async connect() {
        try {
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
        } catch (error) {
            console.error('Failed to connect to API:', error);
            throw error;
        }
    }

    async request(endpoint, method = 'GET', body = null) {
        await this.connect();
        
        try {
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
        } catch (error) {
            console.error(`Failed to ${method} ${endpoint}:`, error);
            throw error;
        }
    }
}

module.exports = ApiConnector;