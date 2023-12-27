import { Schema, Model, model } from 'mongoose';
import {ICart} from "../../../../types/Cards/card.js";

const cardSchemaArbitrum:Schema = new Schema<ICart>({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartArbitrum: Model<ICart> = model<ICart>("CartArbitrum", cardSchemaArbitrum);

export default CartArbitrum;
