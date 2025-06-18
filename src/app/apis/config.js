// src/app/apis/config.js
import axios from 'axios';
import store from '@/store/store'; // Assuming you have a Redux store

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: 'e0dd7fb1ec73d693e8c236644b38dc1f',
	},
});

// This interceptor is the problem because it might use client-side logic
axiosInstance.interceptors.request.use((config) => {
	const state = store.getState(); // Accessing client-side state
	const language = state?.language?.lang || 'en'; // Default to 'en' if language is not set
	config.params = { ...config.params, language: language };
	return config;
});

export default axiosInstance;