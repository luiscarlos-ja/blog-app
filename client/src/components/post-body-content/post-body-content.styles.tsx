import styled from "styled-components";

export const PostBodyContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 10px;
  border: #ced4da 0.5px solid;
  padding: 4px 12px 12px 12px;
  background-color: #ffffff;
`;

export const PostName = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PostCreatedAt = styled.small`
  font-size: 12px;
`;

export const PostCreatedBy = styled.small`
  font-size: 14px;
  font-weight: 500;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 8px;
`;

export const PostSubFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  gap: 8px;
`;

export const PostButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: #ced4da 0.5px solid;
  border-radius: 4px;
  cursor: pointer;
`;

export const PostInput = styled.input`
  padding: 6px 12px;
  font-size: 14px;
  border: #ced4da 0.5px solid;
  border-radius: 4px;
`;

export const PostTextArea = styled.textarea`
  padding: 6px 12px;
  font-size: 14px;
  border: #ced4da 0.5px solid;
  border-radius: 4px;
`;
