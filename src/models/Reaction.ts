import { Schema, Document, ObjectId, Types } from 'mongoose';

//IReaction interface extends to the Document
interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Define responseSchema as a new Schema with IResponse as the type
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,// Define reactionId as a new ObjectId
      default: () => new Types.ObjectId(),// Set default value to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;