export interface UserType {
  name: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface PostUser {
  content: string;
  title: string;
  userId: string;
  _id: number;
  userName: string;
}
export interface PostType {
  userName: string;
  title: string;
  content: string;
}
