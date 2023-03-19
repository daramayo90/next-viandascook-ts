import * as XLSX from 'xlsx';

export const readExcelFile = async (filePath: string): Promise<any[]> => {
   const workbook = XLSX.readFile(filePath);
   const sheetName = workbook.SheetNames[0];
   const sheet = workbook.Sheets[sheetName];

   const data = XLSX.utils.sheet_to_json(sheet, { raw: false });

   // Trim keys and values
   const trimmedData = data.map((item: any) => {
      const newItem: any = {};
      for (const key in item) {
         newItem[key.trim()] = typeof item[key] === 'string' ? item[key].trim() : item[key];
      }
      return newItem;
   });

   return trimmedData;
};
