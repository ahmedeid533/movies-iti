// src/app/search/page.jsx

import { Suspense } from 'react';
import SearchResults from './search'; // Import your new component

// A simple loading component to use as a fallback
function Loading() {
	return <h2>🌀 Loading...</h2>;
}

export default function SearchPage() {
	return (
		// The parent component is a Server Component
		// It wraps the dynamic client component in a Suspense boundary
		<Suspense fallback={<Loading />}>
			<SearchResults />
		</Suspense>
	);
}