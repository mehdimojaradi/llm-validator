const ApiConnector = require('../providers/api-connector')
const equipmentFixture = require('../fixtures/equipment');

const apiConnector = new ApiConnector();

const getTotalNumberOfEquipment = async (output) => {
    const data = await apiConnector.request(equipmentFixture.EQUIPMENT_ATOMIC_URL);
    const totalItems = data['hydra:totalItems'];

    const numberOfEquipment = typeof output === 'string' ? output : JSON.stringify(output);

    // return textToSearch.includes(String(totalItems));
    return Number(numberOfEquipment) == totalItems;
}

module.exports = {
    getTotalNumberOfEquipment,
};