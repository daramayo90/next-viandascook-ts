import dynamic from 'next/dynamic';

const AuthProvider = dynamic(
   () => import('../auth/AuthProvider').then((module) => module.AuthProvider),
   {
      ssr: false, // Set to true if server-side rendering is needed
      // loading: () => <p>Loading Cart...</p>, // Optional: Loading component
   },
);

export default AuthProvider;
