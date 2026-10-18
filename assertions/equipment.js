const ApiConnector = require('../providers/api-connector')

const apiConnector = new ApiConnector();

const getTotalNumberOfEquipment = async (output) => {
    const data = await apiConnector.request('equipment-atomic?order%5BupdatedAt%5D=desc&isActive=true&pagination=true&page=1&itemsPerPage=20');
    const totalItems = data['hydra:totalItems'];

    const textToSearch = typeof output === 'string' ? output : JSON.stringify(output);

    return textToSearch.includes(String(totalItems));
}

module.exports = getTotalNumberOfEquipment;