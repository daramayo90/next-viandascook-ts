import Image from 'next/image';
import { BarLoader } from 'react-spinners';

import { LoadingLayout } from '../layouts';

const LoadingPage = () => {
   return (
      <LoadingLayout>
         <section className='loading'>
            {/* <Image src='/loading.gif' width={500} height={400} /> */}
            <BarLoader color={'var(--primary)'} width={300} speedMultiplier={2} />
         </section>
      </LoadingLayout>
   );
};

export default LoadingPage;
