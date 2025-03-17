import { useLoading } from "../context/LoadingContext";

import "./loading.css"; // CSS stillar

const LoadingSpinner = () => {
  const { loading } = useLoading();

  if (!loading) return null; // ❌ Agar loading yo‘q bo‘lsa, hech narsa qaytarmaymiz

  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
