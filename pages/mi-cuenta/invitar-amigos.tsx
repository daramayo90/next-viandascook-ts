import { NextPage } from 'next';
import { ShopLayout } from '../../components/layouts';

const FriendsPage: NextPage = () => {
   return (
      <ShopLayout title={'Viandas Cook - Referidos'} pageDescription={''}>
         <section>
            <div>Invitar Amigos</div>
         </section>
      </ShopLayout>
   );
};

export default FriendsPage;
