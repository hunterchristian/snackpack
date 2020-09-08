import mongoose, { Document, Model, Schema } from 'mongoose';
import { CompactedTransaction } from '../../../types/Transactions';

export interface Expense {
  name: string;
  value: string;
}

export interface UserInterface {
  email: string;
  items?: any[];
  income?: number;
  deletedTransactions?: CompactedTransaction[];
  expenses?: Expense[];
  lastCheckTransDate?: string;
  piggybankValue?: number;
}

/* UserSchema corresponds to a collection in our MongoDB database. */
const UserSchema = new Schema<UserInterface & Document>({
  email: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: false,
  },
  income: {
    type: Number,
    required: false,
  },
  deletedTransactions: {
    type: Array,
    required: false,
  },
  expenses: {
    type: Array,
    required: false,
  },
  lastCheckTransDate: {
    type: String,
    required: false,
  },
  // TODO: Log a "signupDate" field to track the day that a user signed up
  // This is needed to correct any errors that occur with calculating a running piggybank
  // value, since the piggybank value can be recalculated from the sign up date.
  piggybankValue: {
    type: Number,
    required: false,
  },
});

export default (mongoose.models.User as Model<UserInterface & Document>) ||
  mongoose.model<UserInterface & Document>('User', UserSchema);
