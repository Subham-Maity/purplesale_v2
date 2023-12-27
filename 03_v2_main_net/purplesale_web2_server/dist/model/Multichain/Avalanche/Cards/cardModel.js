import { Schema, model } from 'mongoose';
const cardSchemaAvalanche = new Schema({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartAvalanche = model("CartAvalanche", cardSchemaAvalanche);
export default CartAvalanche;
//# sourceMappingURL=cardModel.js.map