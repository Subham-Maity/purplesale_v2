import {Model, model, Schema } from 'mongoose';
import {IPinkLockWeb3} from "../../../../types/PinkLock/pinkLockDataWeb3.js";

const pinkLockWeb3SchemaArbitrum:Schema = new Schema<IPinkLockWeb3 >({
    title: String,
});

const PinkLockWeb3Arbitrum: Model<IPinkLockWeb3 > = model<IPinkLockWeb3>('PinkLockWeb3Arbitrum', pinkLockWeb3SchemaArbitrum);

export default PinkLockWeb3Arbitrum;