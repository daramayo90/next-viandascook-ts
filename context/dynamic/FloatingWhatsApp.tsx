import dynamic from 'next/dynamic';
import { FloatingWhatsAppProps } from 'react-floating-whatsapp';

const FloatingWhatsApp = dynamic(
   () => import('react-floating-whatsapp').then((module) => module.FloatingWhatsApp),
   {
      ssr: false,
   },
);

const WhatsApp = (props: FloatingWhatsAppProps) => <FloatingWhatsApp {...props} />;

export default WhatsApp;
