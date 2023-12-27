import { Schema, Model, model } from 'mongoose';
import {ICart} from "../../types/Cards/card.js";

const cardSchema:Schema = new Schema<ICart>({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const Cart: Model<ICart> = model<ICart>("Cart", cardSchema);

export default Cart;
