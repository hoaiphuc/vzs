import "./ChangeAvatarProfile.css";
import { useState, useEffect } from "react";
import { upload, useAuth } from "../firebase";

function ChangeAvatarProfile() {
  const [photoUpload, setPhotoUpload] = useState(null);
  const [photoURL, setPhotoURL] = useState('https://api-private.atlassian.com/users/f3ba6e3feb7b6867012f05b2f873affb/avatar ');
  const [loading, setLoading] = useState(false)
  const currentUser = useAuth();

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhotoUpload(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photoUpload, currentUser, setLoading)
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL)
    }

  }, [currentUser])

  return (
    <div className="ChangeAvatarProfile">
      <a href="#pablo" className="d-flex justify-content-center">
        
        <img
          alt=""
          className="rounded-circle border border-4 border-success justify-content-center"
          src={photoURL}
          style={{ width: '250px', height: '250px' }}
        />
        
      </a>

      <label htmlFor="file-input" className="d-flex justify-content-center">
        <img  src="https://cdn-icons-png.flaticon.com/512/3566/3566345.png" style={{ width: '30px', height: '30px' }} />

      </label>
      
      <input
        className="d-none"
        id="file-input"
        type="file"
        onChange={handleChange}
      />

      <button disabled={loading || !photoUpload} className="btn btn-success mt-2" onClick={handleClick}> Save Image</button>
    </div>
  );
}

export default ChangeAvatarProfile;
