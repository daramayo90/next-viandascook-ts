import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { postsDirectory } from '../lib/posts';

/**
 * Read markdown file as string
 * Use gray-matter to parse the post metadata section
 */
export const getMatterResult = (fileName: string, hasExtension?: boolean) => {
   const post = !hasExtension ? fileName : `${fileName}.md`;
   const fullPath = path.join(postsDirectory, post);
   const fileContents = fs.readFileSync(fullPath, 'utf8');

   return matter(fileContents);
};
