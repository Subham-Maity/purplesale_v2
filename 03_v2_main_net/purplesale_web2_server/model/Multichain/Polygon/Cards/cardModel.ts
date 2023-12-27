import { Schema, Model, model } from 'mongoose';
import {ICart} from "../../../../types/Cards/card.js";

const cardSchemaPolygon:Schema = new Schema<ICart>({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartPolygon: Model<ICart> = model<ICart>("CartPolygon", cardSchemaPolygon);

export default CartPolygon;
