//REACT
import React from 'react';
//STYLE
import './BigPicture.css';

function BigPicture(props) {
    return (
      <div className="bigPicture_frame">
        <img className="bigPicture" src={props.imageUrl} alt="img" onClick={() => props.handleClick(props.id)}/>
      </div>
    );
}

export default BigPicture;
