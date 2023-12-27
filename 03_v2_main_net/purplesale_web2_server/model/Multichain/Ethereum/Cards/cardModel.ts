import { Schema, Model, model } from 'mongoose';
import {ICart} from "../../../../types/Cards/card.js";

const cardSchemaEthereum:Schema = new Schema<ICart>({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartEthereum: Model<ICart> = model<ICart>("CartEthereum", cardSchemaEthereum);

export default CartEthereum;
