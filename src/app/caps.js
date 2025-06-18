'use client';
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Capsule({ children }) {
	const { language } = useSelector((state) => state.languages);
	const direction = language === "ar" ? "rtl" : "ltr";
	return (
		<div dir={direction} className="h-full d-flex flex-column">
			<Navbar />
			<main className="flex-grow-1">
				{children}
			</main>
			<Footer/>
		</div>
	);
}
