export interface Posts {
  data: Post[];
  meta: Meta;
  links: Links;
}

export interface Post {
  uuid: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Comments {
  data: Comment[];
  meta: Meta;
  links: Links;
}

export interface Comment {
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  post: Post;
}

export interface PostCreate {
  name: string;
  content: string;
}

export interface User {
  uuid: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Links {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface Meta {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  sortBy: string;
  filterBy: string;
}

export interface PostReducer {
  posts: Post[];
  isLoading: boolean;
  getPosts: () => void;
  createPost: (formData: FormData) => void;
  deletePost: (uuid: string) => void;
  editPost: (uuid: string, formData: FormData) => Promise<void>;
}

export interface AuthContextType {
  authUser: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}
