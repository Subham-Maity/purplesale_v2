import { model, Schema } from 'mongoose';
const pinkLockSchemaAvalanche = new Schema({
    id: Number,
    title: String,
});
const PinkLockAvalanche = model('PinkLockAvalanche', pinkLockSchemaAvalanche);
export default PinkLockAvalanche;
//# sourceMappingURL=pinklockModel.js.map