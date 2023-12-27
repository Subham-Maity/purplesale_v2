import { Schema, model } from 'mongoose';
const IAirDropDataSchemaPolygon = new Schema({
    id: Number,
    airdropTitle: String,
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
const IAirDropDataPolygon = model("AirDropDataPolygon", IAirDropDataSchemaPolygon);
export default IAirDropDataPolygon;
//# sourceMappingURL=airDropModel.js.map