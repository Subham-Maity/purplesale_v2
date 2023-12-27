import { Schema, model } from 'mongoose';
const privateSaleDataSchemaAvalanche = new Schema({
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
const PrivateSaleDataAvalanche = model("PrivateSaleDataAvalanche", privateSaleDataSchemaAvalanche);
export default PrivateSaleDataAvalanche;
//# sourceMappingURL=privateSaleModel.js.map