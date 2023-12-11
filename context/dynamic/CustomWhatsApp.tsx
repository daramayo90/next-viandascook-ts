import dynamic from 'next/dynamic';

const CustomWhatsApp = dynamic(
   () => import('../../components/ui/CustomWhatsApp').then((module) => module.CustomWhatsApp),
   {
      ssr: false,
   },
);

export default CustomWhatsApp;
