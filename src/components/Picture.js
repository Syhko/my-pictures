//REACT
import React from 'react';
//STYLE
import './Picture.css';

function Picture(props) {
    return (
      <div className="masonry_brick" id={props.id}>
        <img className="picture" onClick={() => props.handleClick(props.id)} src={props.imageUrl} alt="img"/>
      </div>
    );
}

export default Picture;
