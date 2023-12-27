import {Model, model, Schema } from 'mongoose';
import {IPinkLock} from "../../../../types/PinkLock/pinkLockData.js";

const pinkLockSchemaArbitrum:Schema = new Schema<IPinkLock >({
    id : Number,
    title: String,
});

const PinkLockArbitrum: Model<IPinkLock > = model<IPinkLock >('PinkLockArbitrum', pinkLockSchemaArbitrum);

export default PinkLockArbitrum;