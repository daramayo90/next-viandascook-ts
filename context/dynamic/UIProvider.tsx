import dynamic from 'next/dynamic';

const UIProvider = dynamic(() => import('../ui/UIProvider').then((module) => module.UIProvider), {
   ssr: false, // Set to true if server-side rendering is needed
   // loading: () => <p>Loading Cart...</p>, // Optional: Loading component
});

export default UIProvider;
