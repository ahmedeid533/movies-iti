import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Set your MongoDB connection string in .env
const dbName = 'moviesDB';
const collectionName = 'wishlists';

let client;
async function getClient() {
	if (!client) {
		client = new MongoClient(uri);
		await client.connect();
	}
	return client;
}

// POST /api/whishlist
// Body: { userId: string, movie: { id: string, title: string, ... } }
export async function POST(request) {
	const { userId, movie } = await request.json();

	if (!userId || !movie || !movie.id) {
		return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
	}

	const client = await getClient();
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	// Upsert user's wishlist and prevent duplicates
	await collection.updateOne(
		{ userId },
		{ $addToSet: { movies: movie } },
		{ upsert: true }
	);

	const userWishlist = await collection.findOne({ userId });
	return NextResponse.json({ wishlist: userWishlist?.movies || [] });
}

// GET /api/whishlist?userId=xxx
export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');

	if (!userId) {
		return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
	}

	const client = await getClient();
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const userWishlist = await collection.findOne({ userId });
	return NextResponse.json({ wishlist: userWishlist?.movies || [] });
}