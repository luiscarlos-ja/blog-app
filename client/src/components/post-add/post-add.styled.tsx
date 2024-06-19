import styled from "styled-components";

export const AddPostContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  width: 300px;
`;

export const AddPostInput = styled.input`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
`;

export const AddPostTextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
`;

export const AddPostButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: #ced4da 0.5px solid;
  cursor: pointer;
`;

export const AddPostHeader = styled.h3`
  text-align: center;
  margin-bottom: 24px;
  margin: 0;
`;
