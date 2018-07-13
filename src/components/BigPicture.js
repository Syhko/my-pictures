// REACT
import React from 'react';
// STYLE
import './BigPicture.css';

const BigPicture = ({
  id,
  handleClick,
  imageUrl
}) => (
      <div className="bigPicture_frame">
        <img className="bigPicture" src={imageUrl} alt="img" onClick={() => handleClick(id)}/>
      </div>
    )


export default BigPicture;
