import dynamic from 'next/dynamic';

const EmailsProvider = dynamic(
   () => import('../email/EmailsProvider').then((module) => module.EmailsProvider),
   {
      ssr: false, // Set to true if server-side rendering is needed
      // loading: () => <p>Loading Cart...</p>, // Optional: Loading component
   },
);

export default EmailsProvider;
