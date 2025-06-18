import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Set your MongoDB connection string in .env
const dbName = 'movies';
const collectionName = 'wishlist';

let client;
async function getClient() {
	if (!client) {
		client = new MongoClient(uri);
		await client.connect();
	}
	return client;
}

// POST /api/wishlist
// Body: { email: string, movie: { id: string, title: string, ... } }
export async function POST(request) {
	const { email, movie } = await request.json();
	console.log("email ==> ", email);

	if (!email || !movie || !movie.id) {
		return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
	}

	const client = await getClient();
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	// Upsert user's wishlist and prevent duplicates
	await collection.updateOne(
		{ email },
		{ $addToSet: { movies: movie } },
		{ upsert: true }
	);

	const userWishlist = await collection.findOne({ email });
	console.log("userWishlist ==> ", userWishlist);
	return NextResponse.json({ wishlist: userWishlist?.movies || [] });
}

// GET /api/wishlist?email=xxx
export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');

	if (!email) {
		return NextResponse.json({ error: 'Missing email' }, { status: 400 });
	}

	const client = await getClient();
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	const userWishlist = await collection.findOne({ email });
	return NextResponse.json({ wishlist: userWishlist?.movies || [] });
}

// DELETE /api/wishlist
// Body: { email: string, movieId: string }
export async function DELETE(request) {
	const { email, movieId } = await request.json();

	if (!email || !movieId) {
		return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
	}

	const client = await getClient();
	const db = client.db(dbName);
	const collection = db.collection(collectionName);

	await collection.updateOne(
		{ email },
		{ $pull: { movies: { id: movieId } } }
	);

	const userWishlist = await collection.findOne({ email });
	return NextResponse.json({ wishlist: userWishlist?.movies || [] });
}