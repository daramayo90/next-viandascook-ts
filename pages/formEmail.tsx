import React, { useState } from 'react';

interface FormData {
   name: string;
   email: string;
}

const Form: React.FC = () => {
   const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
   });

   const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await fetch('/api/mail', {
         method: 'post',
         body: JSON.stringify(formData),
      });
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   return (
      <form onSubmit={handleOnSubmit}>
         <div>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' onChange={handleInputChange} />
         </div>
         <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' onChange={handleInputChange} />
         </div>

         <button type='submit'>Submit</button>
      </form>
   );
};

export default Form;
