import {Model, model, Schema } from 'mongoose';
import {IPinkLockWeb3} from "../../types/PinkLock/pinkLockDataWeb3.js";

const pinkLockWeb3Schema:Schema = new Schema<IPinkLockWeb3 >({
    title: String,
});

const PinkLockWeb3: Model<IPinkLockWeb3 > = model<IPinkLockWeb3>('PinkLockWeb3', pinkLockWeb3Schema);

export default PinkLockWeb3;