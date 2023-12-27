import { Schema, model } from 'mongoose';
const privateSaleDataSchemaPolygon = new Schema({
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
const PrivateSaleDataPolygon = model("PrivateSaleDataPolygon", privateSaleDataSchemaPolygon);
export default PrivateSaleDataPolygon;
//# sourceMappingURL=privateSaleModel.js.map