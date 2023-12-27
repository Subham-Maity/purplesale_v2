import {Model, model, Schema } from 'mongoose';
import {IPinkLock} from "../../../../types/PinkLock/pinkLockData.js";

const pinkLockSchemaEthereum:Schema = new Schema<IPinkLock >({
    id : Number,
    title: String,
});

const PinkLockEthereum: Model<IPinkLock > = model<IPinkLock >('PinkLockEthereum', pinkLockSchemaEthereum);

export default PinkLockEthereum;