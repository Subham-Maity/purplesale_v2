import {Model, model, Schema } from 'mongoose';
import {IPinkLockWeb3} from "../../../../types/PinkLock/pinkLockDataWeb3.js";

const pinkLockWeb3SchemaEthereum:Schema = new Schema<IPinkLockWeb3 >({
    title: String,
});

const PinkLockWeb3Ethereum: Model<IPinkLockWeb3 > = model<IPinkLockWeb3>('PinkLockWeb3Ethereum', pinkLockWeb3SchemaEthereum);

export default PinkLockWeb3Ethereum;