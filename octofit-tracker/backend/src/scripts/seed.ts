import mongoose from 'mongoose';
import { scryptSync } from 'node:crypto';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const demoPassword = 'octofit-demo-only';

const passwordHash = (salt: string) =>
  `$scrypt$${salt}$${scryptSync(demoPassword, salt, 64).toString('hex')}`;

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    const userData = [
      {
        username: 'maya-chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        passwordHash: passwordHash('octofit-maya'),
      },
      {
        username: 'jordan-rivera',
        email: 'jordan.rivera@example.com',
        displayName: 'Jordan Rivera',
        passwordHash: passwordHash('octofit-jordan'),
      },
      {
        username: 'priya-shah',
        email: 'priya.shah@example.com',
        displayName: 'Priya Shah',
        passwordHash: passwordHash('octofit-priya'),
      },
      {
        username: 'alex-morgan',
        email: 'alex.morgan@example.com',
        displayName: 'Alex Morgan',
        passwordHash: passwordHash('octofit-alex'),
      },
    ];

    const userIds = new Map<string, mongoose.Types.ObjectId>();
    for (const user of userData) {
      const savedUser = await User.findOneAndUpdate(
        { email: user.email },
        { $set: user },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).exec();
      if (!savedUser) throw new Error(`Could not seed user ${user.username}`);
      userIds.set(user.username, savedUser._id);
    }

    const mayaId = userIds.get('maya-chen');
    const jordanId = userIds.get('jordan-rivera');
    const priyaId = userIds.get('priya-shah');
    const alexId = userIds.get('alex-morgan');
    if (!mayaId || !jordanId || !priyaId || !alexId) {
      throw new Error('Could not resolve seeded user IDs');
    }

    const teamData = [
      {
        name: 'Dawn Pacers',
        description: 'Early-morning runners building steady weekly mileage.',
        members: [mayaId, jordanId],
      },
      {
        name: 'Harbor Striders',
        description: 'A balanced crew for strength, cycling, and weekend runs.',
        members: [priyaId, alexId],
      },
    ];
    for (const team of teamData) {
      await Team.findOneAndUpdate(
        { name: team.name },
        { $set: team },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).exec();
    }

    const activityData = [
      { userId: mayaId, type: 'run', durationMinutes: 38, calories: 342, date: new Date('2026-09-23T06:30:00Z') },
      { userId: mayaId, type: 'strength', durationMinutes: 42, calories: 218, date: new Date('2026-09-25T17:15:00Z') },
      { userId: jordanId, type: 'run', durationMinutes: 52, calories: 476, date: new Date('2026-09-24T06:45:00Z') },
      { userId: jordanId, type: 'cycling', durationMinutes: 65, calories: 510, date: new Date('2026-09-26T09:00:00Z') },
      { userId: priyaId, type: 'strength', durationMinutes: 46, calories: 255, date: new Date('2026-09-23T18:00:00Z') },
      { userId: priyaId, type: 'walk', durationMinutes: 35, calories: 142, date: new Date('2026-09-27T10:30:00Z') },
      { userId: alexId, type: 'run', durationMinutes: 31, calories: 288, date: new Date('2026-09-24T07:00:00Z') },
      { userId: alexId, type: 'cycling', durationMinutes: 48, calories: 376, date: new Date('2026-09-27T08:15:00Z') },
    ];
    for (const activity of activityData) {
      await Activity.findOneAndUpdate(
        { userId: activity.userId, date: activity.date },
        { $set: activity },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).exec();
    }

    const leaderboardData = [
      { userId: mayaId, points: 860, period: 'all-time' },
      { userId: jordanId, points: 1040, period: 'all-time' },
      { userId: priyaId, points: 735, period: 'all-time' },
      { userId: alexId, points: 690, period: 'all-time' },
    ];
    for (const entry of leaderboardData) {
      await Leaderboard.findOneAndUpdate(
        { userId: entry.userId },
        { $set: entry },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).exec();
    }

    const workoutData = [
      {
        title: 'Tempo Intervals',
        description: 'Warm up, then alternate brisk tempo efforts with easy recovery jogs.',
        category: 'running',
        difficulty: 'intermediate',
      },
      {
        title: 'Full-Body Strength',
        description: 'A balanced circuit of squats, presses, rows, and core work.',
        category: 'strength',
        difficulty: 'intermediate',
      },
      {
        title: 'Low-Impact Recovery',
        description: 'An easy walk and gentle mobility sequence for recovery days.',
        category: 'recovery',
        difficulty: 'beginner',
      },
      {
        title: 'Hill Repeats',
        description: 'Short uphill efforts focused on controlled form and full recovery.',
        category: 'running',
        difficulty: 'advanced',
      },
    ];
    for (const workout of workoutData) {
      await Workout.findOneAndUpdate(
        { title: workout.title },
        { $set: workout },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      ).exec();
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
