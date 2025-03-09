import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { postsDirectory, removeDateIndex } from '../lib/posts';

export const getMatterResult = (fileName: string, hasExtension?: boolean) => {
   const post = !hasExtension ? fileName : `${fileName}.md`;
   const fullPath = path.join(postsDirectory, post);
   const fileContents = fs.readFileSync(fullPath, 'utf8');

   return matter(fileContents);
};

export const getMatterPostResult = (fileName: string) => {
   // Read all MD files in the directory
   const allFiles = fs.readdirSync(postsDirectory);

   // Then we look for a file whose name (minus date and extension) matches that slug
   const matchedFile = allFiles.find((file) => {
      // Remove extension
      const baseName = path.parse(file).name;
      // Remove date prefix from that base name
      const cleanName = removeDateIndex(baseName);
      // Compare with our target slug
      return cleanName === fileName;
   });

   if (!matchedFile) {
      throw new Error(`No matching file found for: ${fileName}`);
   }

   // Build the full path from the actual file name
   const fullPath = path.join(postsDirectory, matchedFile);
   const fileContents = fs.readFileSync(fullPath, 'utf8');

   // Return the matter result
   return matter(fileContents);
};
