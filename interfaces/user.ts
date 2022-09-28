export interface IUser {
   _id: string;
   name: string;
   lastName: string;
   email: string;
   password?: string; // Information not provided to the Frontend
   role: string;
   createdAt?: string;
   updatedAt?: string;
}
