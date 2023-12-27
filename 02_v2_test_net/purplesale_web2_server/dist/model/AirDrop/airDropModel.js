import { Schema, model } from 'mongoose';
const IAirDropDataSchema = new Schema({
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
const IAirDropData = model("AirDropData", IAirDropDataSchema);
export default IAirDropData;
//# sourceMappingURL=airDropModel.js.map