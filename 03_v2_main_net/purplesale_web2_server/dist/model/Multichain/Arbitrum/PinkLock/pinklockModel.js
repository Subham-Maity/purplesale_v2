import { model, Schema } from 'mongoose';
const pinkLockSchemaArbitrum = new Schema({
    id: Number,
    title: String,
});
const PinkLockArbitrum = model('PinkLockArbitrum', pinkLockSchemaArbitrum);
export default PinkLockArbitrum;
//# sourceMappingURL=pinklockModel.js.map