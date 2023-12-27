import {Model, model, Schema } from 'mongoose';
import {IPinkLock} from "../../../../types/PinkLock/pinkLockData.js";

const pinkLockSchemaAvalanche:Schema = new Schema<IPinkLock >({
    id : Number,
    title: String,
});

const PinkLockAvalanche: Model<IPinkLock > = model<IPinkLock >('PinkLockAvalanche', pinkLockSchemaAvalanche);

export default PinkLockAvalanche;