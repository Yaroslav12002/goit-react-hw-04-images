import styled from 'styled-components';
import { RotatingLines } from 'react-loader-spinner';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
`;

export const RotatingLoader = styled(RotatingLines)`
  text-align: center;
`;
