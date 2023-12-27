import { Schema, model } from 'mongoose';
const cardSchemaPolygon = new Schema({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartPolygon = model("CartPolygon", cardSchemaPolygon);
export default CartPolygon;
//# sourceMappingURL=cardModel.js.map