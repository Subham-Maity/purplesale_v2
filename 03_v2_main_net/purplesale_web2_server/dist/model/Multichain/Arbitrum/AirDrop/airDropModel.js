import { Schema, model } from 'mongoose';
const IAirDropDataSchemaArbitrum = new Schema({
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
const IAirDropDataArbitrum = model("AirDropDataArbitrum", IAirDropDataSchemaArbitrum);
export default IAirDropDataArbitrum;
//# sourceMappingURL=airDropModel.js.map