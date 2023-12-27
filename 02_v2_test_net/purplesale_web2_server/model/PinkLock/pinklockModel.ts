import {Model, model, Schema } from 'mongoose';
import {IPinkLock} from "../../types/PinkLock/pinkLockData.js";

const pinkLockSchema:Schema = new Schema<IPinkLock >({
    id : Number,
    title: String,
});

const PinkLock: Model<IPinkLock > = model<IPinkLock >('PinkLock', pinkLockSchema);

export default PinkLock;