import {Model, model, Schema } from 'mongoose';
import {IPinkLock} from "../../../../types/PinkLock/pinkLockData.js";

const pinkLockSchemaPolygon:Schema = new Schema<IPinkLock >({
    id : Number,
    title: String,
});

const PinkLockPolygon: Model<IPinkLock > = model<IPinkLock >('PinkLockPolygon', pinkLockSchemaPolygon);

export default PinkLockPolygon;