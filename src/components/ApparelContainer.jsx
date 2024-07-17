// src/components/ApparelContainer.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';
import shirtImage from '../images/shirt.jpg';

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  margin: 10px;
`;

const BaseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.7;
`;

const ApparelContainer = ({ overlayImageUrl }) => (
  <Container>
    <BaseImage src={shirtImage} alt="Base Apparel" />
    {overlayImageUrl && <OverlayImage src={overlayImageUrl} alt="Overlay" />}
  </Container>
);

ApparelContainer.propTypes = {
  overlayImageUrl: PropTypes.string,
};

export default ApparelContainer;
