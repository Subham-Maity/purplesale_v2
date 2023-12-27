import { Schema, model } from 'mongoose';
const IAirDropDataSchemaAvalanche = new Schema({
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
const IAirDropDataAvalanche = model("AirDropDataAvalanche", IAirDropDataSchemaAvalanche);
export default IAirDropDataAvalanche;
//# sourceMappingURL=airDropModel.js.map