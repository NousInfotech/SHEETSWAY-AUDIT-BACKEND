export interface IUser {
  id: string;
  firebaseId: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}
