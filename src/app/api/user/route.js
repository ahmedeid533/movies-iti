import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Set your MongoDB URI in .env.local
const client = new MongoClient(uri);

async function connectDB() {
	if (!client.topology?.isConnected()) {
		await client.connect();
	}
	return client.db('movies'); // Use your DB name
}

export async function POST(request) {
	try {
		const { email, name } = await request.json();

		if (!email) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		const db = await connectDB();
		const users = db.collection('users');

		// Check if user already exists
		let user = await users.findOne({ email });
		console.log("user ==> ", user);
		if (!user) {
			// Insert new user
			const result = await users.insertOne({ email, name, createdAt: new Date() });
			user = await users.findOne({ _id: result.insertedId });
		}
		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}