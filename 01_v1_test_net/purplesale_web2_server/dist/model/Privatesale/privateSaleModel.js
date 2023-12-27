import { Schema, model } from 'mongoose';
const privateSaleDataSchema = new Schema({
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
const PrivateSaleData = model("PrivateSaleData", privateSaleDataSchema);
export default PrivateSaleData;
//# sourceMappingURL=privateSaleModel.js.map