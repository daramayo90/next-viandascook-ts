import { NextPage } from 'next';
import { useState } from 'react';

const testMenuPage: NextPage = () => {
   //  const burger = document.querySelector('.burger');
   //  const nav = document.querySelector('nav');

   //  burger!.addEventListener('click', (e) => {
   //     burger!.dataset.state === 'closed'
   //        ? (burger!.dataset.state = 'open')
   //        : (burger!.dataset.state = 'closed');
   //     nav!.dataset.state === 'closed'
   //        ? (nav!.dataset.state = 'open')
   //        : (nav!.dataset.state = 'closed');
   //  });

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const onToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <>
         <div className='hamburger-menu' onClick={onToggleMenu}>
            <button className={isMenuOpen ? 'burger open' : 'burger'}>
               <span></span>
               <span></span>
               <span></span>
            </button>
         </div>
         <nav className={isMenuOpen ? 'open' : ''}>
            <ul>
               <li>
                  <a href='#'>Home</a>
               </li>
               <li>
                  <a href='#'>Services</a>
               </li>
               <li>
                  <a href='#'>About</a>
               </li>
               <li>
                  <a href='#'>Contact</a>
               </li>
            </ul>
         </nav>
      </>
   );
};

export default testMenuPage;
