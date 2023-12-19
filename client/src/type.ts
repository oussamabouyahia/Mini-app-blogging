export interface UserType {
  name: string;
  email: string;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface UpdateType {
  title: string;
  content: string;
}
export interface PostType {
  content: string;
  title: string;
  userId?: string;
  _id?: number;
  userName: string;
  deletePost?: () => void;
  editPost?: () => void;
  setUpdateTitle?: React.Dispatch<React.SetStateAction<string>>;
  setUpdateContent?: React.Dispatch<React.SetStateAction<string>>;
  updateTitle?: string;
}
