import { NextPage } from 'next';
import { useState } from 'react';
import { viandasApi } from '../../../axiosApi';

const MassiveImportPage: NextPage = () => {
   const [file, setFile] = useState<File | null>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setFile(e.target.files[0]);
         setFile(e.target.files[0]);
      }
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!file) {
         alert('Please select a file to upload.');
         return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
         const { data } = await viandasApi.post('/upload/uploadFromExcel', formData);

         if (data) {
            alert(data.message);
         } else {
            throw new Error('Error uploading the file');
         }
      } catch (error) {
         alert(`Error: ${console.log(error)}`);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <input type='file' accept='.xlsx, .xls' onChange={handleFileChange} />
         <button type='submit'>Import Users</button>
      </form>
   );
};

export default MassiveImportPage;
