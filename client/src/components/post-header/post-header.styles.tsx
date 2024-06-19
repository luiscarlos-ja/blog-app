import styled from "styled-components";

export const PostHeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const PostTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  margin: 0;
`;

export const AddPostButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 700px;
`;
