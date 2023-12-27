import { model, Schema } from 'mongoose';
const pinkLockSchemaPolygon = new Schema({
    id: Number,
    title: String,
});
const PinkLockPolygon = model('PinkLockPolygon', pinkLockSchemaPolygon);
export default PinkLockPolygon;
//# sourceMappingURL=pinklockModel.js.map