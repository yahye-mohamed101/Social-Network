import mongoose, { Schema, model, Document, Types } from 'mongoose';


// Define IThought as an interface that extends Document
interface IThought extends Document {
  thoughtText: string;
  username: string;
  createdAt: String;
  reactions: Types.DocumentArray<any>;
}

const ReactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },

    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true } }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema], // Embed reactions in the Thought schema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


const Thought = model<IThought>('Thought', ThoughtSchema);
export default Thought
