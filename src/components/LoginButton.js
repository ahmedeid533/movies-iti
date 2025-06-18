'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { addToWishlist, deleteAllFromWishlist } from "@/store/slices/WishListSlice"
import { useDispatch } from "react-redux"

export default function LoginButton() {
	const { data: session } = useSession()
	const [list, setList] = useState([])
	const dispatch = useDispatch();

	useEffect(() => {
		if (!list) return;
		list.map((movie) => {
			dispatch(addToWishlist({ ...movie, type: "movie" }));
		})
	}, [list])

	if (session) {
		if (localStorage.getItem("userEmail") != session.user.email)
		{fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: session.user.email,
				name: session.user.name,
			}),
		})
			.then((res) => {
				res.json()
				localStorage.setItem("userEmail", session.user.email)
			})
			.then((data) => console.log("User data saved:", data))
			.catch((error) => console.error("Error saving user data:", error))
		// Fetch user wishlist
		fetch(`/api/wishlist?email=${session.user.email}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("Wishlist data:", data)
				setList(data?.wishlist || [])
			})
			.catch((error) => console.error("Error fetching wishlist:", error))}
		return (
			<div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-md">
				{session.user.image && (
					<Image
						src={session.user.image}
						alt={session.user.name}
						width={40}
						height={40}
						className="rounded-full border"
					/>
				)}
				<p className="text-gray-700 font-medium text-ellipsis text-nowrap overflow-hidden w-[100px] m-0">{session.user.email}</p>
				<button
					onClick={() => {
						dispatch(deleteAllFromWishlist())
						localStorage.clear()
						signOut()
					}}
					className="ml-4 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition-colors duration-200 font-semibold"
				>
					Sign out
				</button>
			</div>
		)
	} else {
		return (
			<div className="flex flex-col items-center gap-1 p-1 bg-white rounded-lg shadow-md">
				<button
					onClick={() => signIn("google")}
					className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-300 rounded-full shadow hover:shadow-lg transition-all duration-200 font-semibold text-gray-700 hover:bg-gray-50"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid" foxified=""><script xmlns="" id="eppiocemhmnlbhjplcgkofciiegomcon" /><script xmlns="" /><script xmlns="" /><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>				Sign in with Google
				</button>
			</div>
		)
	}
}