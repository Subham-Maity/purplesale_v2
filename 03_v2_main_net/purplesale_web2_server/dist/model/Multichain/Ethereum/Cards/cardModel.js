import { Schema, model } from 'mongoose';
const cardSchemaEthereum = new Schema({
    Name: String,
    Symbol: String,
    Link: String,
    WalletAddress: String,
    imgHref: String,
    bgLogoUrl: String,
});
const CartEthereum = model("CartEthereum", cardSchemaEthereum);
export default CartEthereum;
//# sourceMappingURL=cardModel.js.map