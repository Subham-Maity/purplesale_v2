import { model, Schema } from 'mongoose';
const pinkLockSchemaEthereum = new Schema({
    id: Number,
    title: String,
});
const PinkLockEthereum = model('PinkLockEthereum', pinkLockSchemaEthereum);
export default PinkLockEthereum;
//# sourceMappingURL=pinklockModel.js.map