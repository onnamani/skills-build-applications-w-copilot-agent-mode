import { model, Schema, Types } from 'mongoose';

interface UserRecord {
  username: string;
  email: string;
  displayName: string;
  passwordHash: string;
}

interface TeamRecord {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

interface ActivityRecord {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

interface LeaderboardRecord {
  userId: Types.ObjectId;
  points: number;
  period: string;
}

interface WorkoutRecord {
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

const userSchema = new Schema<UserRecord>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    displayName: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'users',
    toJSON: {
      transform: (_document, returned) => {
        delete (returned as Partial<UserRecord>).passwordHash;
        return returned;
      },
    },
  },
);

const teamSchema = new Schema<TeamRecord>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true, collection: 'teams' },
);

const activitySchema = new Schema<ActivityRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, default: 0, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true, collection: 'activities' },
);

const leaderboardSchema = new Schema<LeaderboardRecord>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0, min: 0 },
    period: { type: String, default: 'all-time', trim: true },
  },
  { timestamps: true, collection: 'leaderboard' },
);

const workoutSchema = new Schema<WorkoutRecord>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, default: 'beginner', trim: true },
  },
  { timestamps: true, collection: 'workouts' },
);

export const User = model<UserRecord>('User', userSchema);
export const Team = model<TeamRecord>('Team', teamSchema);
export const Activity = model<ActivityRecord>('Activity', activitySchema);
export const Leaderboard = model<LeaderboardRecord>('Leaderboard', leaderboardSchema);
export const Workout = model<WorkoutRecord>('Workout', workoutSchema);