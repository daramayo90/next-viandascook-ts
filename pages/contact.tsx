import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { viandasApi } from '../axiosApi';

const ContactPage: NextPage = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [message, setMessage] = useState('');

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const body = {
         name,
         email,
         phone,
         message,
      };

      const { data } = await viandasApi.post('/submit', body);

      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
   };

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor='name'>Name</label>
            <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               type='text'
               name='name'
               id='name'
            />
         </div>

         <div>
            <label htmlFor='email'>Email</label>
            <input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               type='email'
               name='email'
               id='email'
            />
         </div>

         <div>
            <label htmlFor='phone'>Phone</label>
            <input
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
               type='tel'
               name='phone'
               id='phone'
            />
         </div>

         <div>
            <label htmlFor='message'>Message</label>
            <textarea
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               name='message'
               id='message'
            />
         </div>

         <button type='submit' style={{ backgroundColor: 'black', color: 'white' }}>
            Submit
         </button>
      </form>
   );
};

export default ContactPage;
