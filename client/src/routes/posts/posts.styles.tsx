import styled from "styled-components";

export const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostLoading = styled.h1`
  margin-top: 16px;
  color: #007bff;
`;

export const PostListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const PostList = styled.ul`
  width: 600px;
  padding: 0;
  margin: 0;
`;

export const PostListItem = styled.li`
  list-style: none;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 24px;
`;
