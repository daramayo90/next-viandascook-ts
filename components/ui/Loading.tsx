import Image from 'next/image';

import { LoadingLayout } from '../layouts';

const LoadingPage = () => {
   return (
      <LoadingLayout>
         <section className='loading'>
            <Image src='/loading.gif' width={500} height={400} />
            <span>Cargando ...</span>
         </section>
      </LoadingLayout>
   );
};

export default LoadingPage;
