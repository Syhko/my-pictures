// REACT
import React from 'react';
// STYLE
import './Picture.css';

const Picture = ({
  id,
  handleClick,
  imageUrl
}) => (
    <div className="masonry_brick" id={id}>
      <img className="picture" onClick={() => handleClick(id)} src={imageUrl} alt="img"/>
    </div>
    )


export default Picture;
