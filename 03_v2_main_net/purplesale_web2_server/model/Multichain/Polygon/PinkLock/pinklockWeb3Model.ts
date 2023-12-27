import {Model, model, Schema } from 'mongoose';
import {IPinkLockWeb3} from "../../../../types/PinkLock/pinkLockDataWeb3.js";

const pinkLockWeb3SchemaPolygon:Schema = new Schema<IPinkLockWeb3 >({
    title: String,
});

const PinkLockWeb3Polygon: Model<IPinkLockWeb3 > = model<IPinkLockWeb3>('PinkLockWeb3Polygon', pinkLockWeb3SchemaPolygon);

export default PinkLockWeb3Polygon;