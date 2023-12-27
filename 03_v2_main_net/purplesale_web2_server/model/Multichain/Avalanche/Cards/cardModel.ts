import { Schema, Model, model } from 'mongoose';
import {ICart} from "../../../../types/Cards/card.js";

const cardSchemaAvalanche:Schema = new Schema<ICart>({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartAvalanche: Model<ICart> = model<ICart>("CartAvalanche", cardSchemaAvalanche);

export default CartAvalanche;
