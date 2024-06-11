import fs from 'fs';
import path from 'path';
import { getMatterResult } from '../plugins';
import { IPost } from '../interfaces';

export const postsDirectory = path.join(process.cwd(), 'posts');
export const fileNames = fs.readdirSync(postsDirectory);

export const getSortedPosts = (): IPost[] => {
   const posts: IPost[] = fileNames.map((fileName) => {
      const id = removeMdExtension(fileName);

      const { data } = getMatterResult(fileName);
      const { date, cover, title, description } = data;

      return { id, date, cover, title, description };
   });

   return posts.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/').map(Number);
      const [dayB, monthB, yearB] = b.date.split('/').map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();

      return dateB - dateA; // Sort descending
   });
};

export const removeMdExtension = (fileName: string) => fileName.replace(/\.md$/, '');
