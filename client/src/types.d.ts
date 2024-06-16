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
}
