import { Schema, model } from 'mongoose';
const cardSchema = new Schema({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const Cart = model("Cart", cardSchema);
export default Cart;
//# sourceMappingURL=cardModel.js.map