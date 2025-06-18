'use client';
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "@/app/components/Navbar";
export default function Capsule({ children }) {
	const { language } = useSelector((state) => state.languages);
	const direction = language === "ar" ? "rtl" : "ltr";
	return (
		<div dir={direction} className="h-full">
			<Navbar />
			{children}
		</div>
	);
}