import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { HomeLayout } from '../../components/layouts';
import { Breadcrumbs, Button } from '../../components/ui';
import {
   AdditionalInfo,
   Benefits,
   Discount,
   HowItWorks,
   LoyaltyBanner,
   Presentation,
   ViandLovers,
} from '../../components/ui/loyalty';
import { cloudDiscountsPath, cloudImagesPath, howItWorks, seo } from '../../utils';

import styles from '../../styles/loyalty/Loyalty.module.scss';

const LoyaltyPage: NextPage = () => {
   const { title, description, keywords, canonical } = seo['LoyaltyPage'];

   return (
      <HomeLayout title={title} pageDescription={description} keywords={keywords} can={canonical}>
         <section className={styles.loyalty}>
            <Breadcrumbs />

            <LoyaltyBanner />

            <Presentation />

            <HowItWorks />

            <AdditionalInfo />

            <Discount />

            <Benefits />

            <ViandLovers />
         </section>
      </HomeLayout>
   );
};

export default LoyaltyPage;
