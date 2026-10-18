const Equipment = require('./endpoints/equipment');

(async () => {
    const totalEquipment = await new Equipment().getTotalNumberOfEquipment();
    console.log(`Total number of equipment: ${totalEquipment}`);
})();