// src/app/store/Provider.js
"use client"; // This is the crucial line

import { Provider } from "react-redux";
import store from "./store";

export function ReduxProvider({ children }) {

	return <Provider store={store}>
		{children}
	</Provider>;
}