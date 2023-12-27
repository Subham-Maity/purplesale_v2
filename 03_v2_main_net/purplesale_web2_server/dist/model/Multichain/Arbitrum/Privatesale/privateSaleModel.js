import { Schema, model } from 'mongoose';
const privateSaleDataSchemaArbitrum = new Schema({
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
const PrivateSaleDataArbitrum = model("PrivateSaleDataArbitrum", privateSaleDataSchemaArbitrum);
export default PrivateSaleDataArbitrum;
//# sourceMappingURL=privateSaleModel.js.map