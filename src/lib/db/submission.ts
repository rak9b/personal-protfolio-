import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  personalInfo: string;
  personality: string;
  relationship: string;
  lifestyle: string;
  mediaPreferences: string;
  selfGrowth: string;
  values: string;
  family: string;
  conflict: string;
  finalReflection: string;
  submittedAt: Date;
  ipHash: string;
}

const SubmissionSchema = new Schema<ISubmission>({
  personalInfo: { type: String, required: true },
  personality: { type: String, required: true },
  relationship: { type: String, required: true },
  lifestyle: { type: String, required: true },
  mediaPreferences: { type: String, required: true },
  selfGrowth: { type: String, required: true },
  values: { type: String, required: true },
  family: { type: String, required: true },
  conflict: { type: String, required: true },
  finalReflection: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  ipHash: { type: String, required: true },
});

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
