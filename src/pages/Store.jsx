import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Store.module.scss';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

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

  const containerClass = `${styles.storeContainer} ${darkMode ? styles.dark : ''}`;

  return (
    <div className={containerClass}>
      <button onClick={() => setDarkMode(!darkMode)} className={styles.toggleButton}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1 className="text-2xl font-bold text-center mb-4">Store</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Product Grid */}
      <div className={styles.storeGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <h2 className="text-sm font-semibold mb-2">{product.name}</h2>
            <img
              src={product.image}
              alt={product.name}
              onClick={() => openModal(product.image)}
              onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
              className={styles.productImage}
            />
            <p className="text-xs font-medium">${product.listPrice?.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Centered Modal */}
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
