function ZaloPopup() {
  const handleLinkClick = () => {
    window.location.href = "https://zalo.me/0334416510"; // Thay your-link bằng link của bạn
  };

  return (
    <div>
      <button onClick={handleLinkClick} className="zalo-button">
        <div className="zalo-icon" />
        LH Zalo
      </button>
    </div>
  );
}

export default ZaloPopup;
