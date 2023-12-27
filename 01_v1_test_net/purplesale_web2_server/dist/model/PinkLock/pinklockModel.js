import { model, Schema } from 'mongoose';
const pinkLockSchema = new Schema({
    id: Number,
    title: String,
});
const PinkLock = model('PinkLock', pinkLockSchema);
export default PinkLock;
//# sourceMappingURL=pinklockModel.js.map