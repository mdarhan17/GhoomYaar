import { Schema, model, models, type InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['traveller', 'admin'], default: 'traveller', immutable: true },
}, { timestamps: true, versionKey: false });

export type UserRecord = InferSchemaType<typeof userSchema>;
export const User = models.User ?? model('User', userSchema);