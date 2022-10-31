import { LoadingLayout } from '../layouts';
import { ClipLoader } from 'react-spinners';

const LoadingPage = () => {
   return (
      <LoadingLayout>
         <section className='loading'>
            <ClipLoader color={'var(--primary)'} size={55} speedMultiplier={1} />
         </section>
      </LoadingLayout>
   );
};

export default LoadingPage;
