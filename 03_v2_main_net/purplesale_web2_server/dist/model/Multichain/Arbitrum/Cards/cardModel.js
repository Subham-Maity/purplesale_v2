import { Schema, model } from 'mongoose';
const cardSchemaArbitrum = new Schema({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartArbitrum = model("CartArbitrum", cardSchemaArbitrum);
export default CartArbitrum;
//# sourceMappingURL=cardModel.js.map