const ApiConnector = require('./api-connector');

class ApiProvider {
    constructor(options) {
        this.providerId = options.id || 'api-provider';
        this.baseUrl = process.env.BASE_URL;
    }

    id() {
        return this.providerId;
    }

    async callApi(prompt, context) {
        const apiConnector = new ApiConnector();

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(process.env.TIMEOUT); 

        const apiData = await apiConnector.request('ai-chat-messages', 'POST', {
            conversation: `/ai-chat-conversations/${process.env.CONVERSATION_ID}`,
            text: context.vars.query,
            platform: "web"
        });

        return {
            output: apiData
        };
    }
}

module.exports = ApiProvider;
