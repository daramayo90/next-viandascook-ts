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
      const { date, title, description } = data;

      return { id, date, title, description };
   });

   return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const removeMdExtension = (fileName: string) => fileName.replace(/\.md$/, '');
