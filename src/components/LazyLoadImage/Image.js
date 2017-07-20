import styled from 'styled-components';

const Image = styled.img`
  position: absolute;
  opacity: ${props => (props.loaded ? 1 : 0)};
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 1s linear;
`;

export const BluredImage = Image.extend`
  filter: blur(50px);
  /* this is needed so Safari keeps sharp edges */
  transform: scale(1);
`;

export default Image;
