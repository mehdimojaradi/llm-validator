const ApiConnector = require('../providers/api-connector')
const equipmentFixture = require('../fixtures/equipment');

const apiConnector = new ApiConnector();

const getTotalNumberOfEquipment = async (output) => {
    try {
        const data = await apiConnector.request(equipmentFixture.EQUIPMENT_ATOMIC_URL);
        const apiResponse = data['hydra:totalItems'];

        const kaiResponse = typeof output === 'string' ? output : JSON.stringify(output);

        // return textToSearch.includes(String(apiResponse));
        return Number(kaiResponse) == apiResponse;
    } catch (error) {
        console.error('Failed to get total number of equipment:', error);
        throw error;
    }
}

module.exports = {
    getTotalNumberOfEquipment,
};