// src/components/ProductItem.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProductCard = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    margin: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProductImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 200px; // Adjust max width as needed
    margin-bottom: 10px;
`;

const ProductName = styled.h3`
    margin: 10px 0;
    font-size: 1.2em;
`;

const ProductPrice = styled.p`
    font-size: 1em;
    color: #888;
`;

const ProductItem = ({ product }) => (
    <ProductCard>
        <ProductImage src={product.image} alt={product.name} />
        <ProductName>{product.name}</ProductName>
        <ProductPrice>${product.price}</ProductPrice>
    </ProductCard>
);

ProductItem.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductItem;
