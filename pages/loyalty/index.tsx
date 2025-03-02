import { NextPage } from 'next';

import { MainLayout } from '../../components/layouts';
import { Breadcrumbs } from '../../components/ui';

import {
   AdditionalInfo,
   Benefits,
   Discount,
   HowItWorks,
   LoyaltyBanner,
   Presentation,
   ViandLovers,
} from '../../components/ui/loyalty';

import { seo } from '../../utils';

const LoyaltyPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['LoyaltyPage'];

   return (
      <MainLayout
         title={title}
         pageDescription={description}
         keywords={keywords}
         can={canonical}
         index>
         <section style={{ width: '100%' }}>
            <LoyaltyBanner />

            <Presentation />

            <HowItWorks />

            <AdditionalInfo />

            <Discount />

            <Benefits />

            <ViandLovers />
         </section>
      </MainLayout>
   );
};

export default LoyaltyPage;
