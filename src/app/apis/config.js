// src/app/apis/config.js
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: 'e0dd7fb1ec73d693e8c236644b38dc1f',
	},
});

// Only add interceptor in client-side
if (typeof window !== 'undefined') {
    axiosInstance.interceptors.request.use((config) => {
        // Try to get language from Redux store
        try {
            const store = require('@/store/store').default;
            const state = store.getState();
            const language = state?.languages?.language || 'en';
            config.params = {...config.params, language: language};
        } catch (error) {
            // Fallback to English if store is not available
            config.params = {...config.params, language: 'en'};
        }
        return config;
    });
}

export default axiosInstance;
