import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Store.module.scss';
import { useNavigate } from 'react-router-dom';

const Store = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?page=${page}`);
        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, [page]);

  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePrev = () => page > 1 && setPage(page - 1);
  const openModal = (url) => setModalImage(url);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    document.body.style.overflow = modalImage ? 'hidden' : 'auto';
    const esc = (e) => e.key === 'Escape' && closeModal();
    if (modalImage) window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [modalImage]);

  return (
    <div className={styles.storeContainer}>
      <h1 className={styles.heading}>Store</h1>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.storeGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <h2 className={styles.productTitle}>{product.name}</h2>
            <img
              src={product.image}
              alt={product.name}
              onClick={() => openModal(product.image)}
              onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
              className={styles.productImage}
            />
            <p className={styles.productPrice}>${product.listPrice?.toFixed(2)}</p>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => onAddToCart(product)}
                className={styles.button}
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className={styles.button}
              >
                View Details
              </button>
              <button
                onClick={() => {
                  onAddToCart(product);
                  navigate('/checkout');
                }}
                className={styles.button}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={styles.button}
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={styles.button}
        >
          Next
        </button>
      </div>

      {modalImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <button
            className={styles.modalClose}
            onClick={closeModal}
            aria-label="Close image modal"
          >
            &times;
          </button>
          <img
            src={modalImage}
            alt="Modal"
            onClick={(e) => e.stopPropagation()}
            className={styles.modalImage}
          />
        </div>
      )}
    </div>
  );
};

export default Store;
