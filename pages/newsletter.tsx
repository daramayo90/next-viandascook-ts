import { NextPage } from 'next';
import { useState } from 'react';

const Newsletter: NextPage = () => {
   const [emailForm, setEmailForm] = useState<string>('');

   const subscribeUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await fetch('/api/mailchimp/newsletter', {
         body: JSON.stringify({
            email: emailForm,
         }),

         headers: {
            'Content-Type': 'application/json',
         },

         method: 'POST',
      });
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmailForm(value);
   };

   return (
      <form onSubmit={subscribeUser}>
         <label htmlFor='email-input' className='form__label'>
            Your Best Email
         </label>

         <input
            type='email'
            id='email-input'
            name='email'
            placeholder='your best email'
            required
            autoCapitalize='off'
            autoCorrect='off'
            onChange={handleInputChange}
         />

         <button type='submit' value='' name='subscribe' style={{ background: 'var(--primary)' }}>
            Subscribe
         </button>
      </form>
   );
};

export default Newsletter;
