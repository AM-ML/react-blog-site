import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../Router';
import '../css/components/dashboard-bio-editor.css';

const BiographyEditor = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const [bio, setBio] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const maxChars = 200;

  useEffect(() => {
    // Initialize bio from user data
    if (userAuth && userAuth.fullUser && userAuth.fullUser.personal_info) {
      setBio(userAuth.fullUser.personal_info.bio || '');
      setCharCount(userAuth.fullUser.personal_info.bio ? userAuth.fullUser.personal_info.bio.length : 0);
    }
  }, [userAuth]);

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (newBio.length <= maxChars) {
      setBio(newBio);
      setCharCount(newBio.length);
      setError('');
    } else {
      setError(`Biography cannot exceed ${maxChars} characters`);
    }
  };

  const updateBio = async () => {
    if (bio.length > maxChars) {
      setError(`Biography cannot exceed ${maxChars} characters`);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + '/update-account',
        {
          id: userAuth.id,
          personal_info: {
            bio
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${userAuth.access_token}`
          }
        }
      );

      if (response.data) {
        // Update local storage
        const updatedUserData = response.data;
        sessionStorage.setItem('user', JSON.stringify(updatedUserData));
        
        // Update context
        setUserAuth(updatedUserData);
        
        setSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Failed to update biography:', err);
      setError(err.response?.data?.error || 'Failed to update biography');
    } finally {
      setLoading(false);
    }
  };

  // Only show for authors, admins, and owners
  if (!userAuth || !userAuth.role || (userAuth.role === 'user' && !userAuth.is_author)) {
    return null;
  }

  return (
    <div className="bio-editor-container">
      <h2 className="bio-editor-title">Author Biography</h2>
      <p className="bio-editor-description">
        Your biography will be displayed on your author page and blog posts.
      </p>
      
      <div className="bio-textarea-container">
        <textarea
          className="bio-textarea"
          value={bio}
          onChange={handleBioChange}
          placeholder="Write a short bio about yourself (200 characters max)"
          maxLength={maxChars}
          disabled={loading}
        />
        <div className="bio-char-count">
          <span className={charCount > maxChars * 0.9 ? "bio-char-count-warning" : ""}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
      
      {error && <p className="bio-error-message">{error}</p>}
      {success && <p className="bio-success-message">Biography updated successfully!</p>}
      
      <button 
        className="bio-save-button" 
        onClick={updateBio}
        disabled={loading || bio.length > maxChars}
      >
        {loading ? "Updating..." : "Update Biography"}
      </button>
    </div>
  );
};

export default BiographyEditor; 