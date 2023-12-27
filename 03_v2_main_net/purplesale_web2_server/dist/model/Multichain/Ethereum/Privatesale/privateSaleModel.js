import { Schema, model } from 'mongoose';
const privateSaleDataSchemaEthereum = new Schema({
    id: Number,
    title: String,
    logoUrl: String,
    bgLogoUrl: String,
    websiteUrl: String,
    facebook: String,
    twitter: String,
    github: String,
    instagram: String,
    discord: String,
    reddit: String,
    youtube: String,
    description: String,
});
const PrivateSaleDataEthereum = model("PrivateSaleDataEthereum", privateSaleDataSchemaEthereum);
export default PrivateSaleDataEthereum;
//# sourceMappingURL=privateSaleModel.js.map