//REACT
import React from 'react';
//PACKAGES
import Masonry from 'react-masonry-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//STYLE & PICTURES
import './App.css';
import logo_Syhko from './logo_Syhko.png';
import logo_Unsplash from './logo_Unsplash.png';
//COMPONENTS
import Picture from './components/Picture';
import BigPicture from './components/BigPicture';

//MASONRY OPTIONS
const masonryOptions = {  transitionDuration : '1.5s', columnWidth : 1, fitWidth : true };
const imagesLoadedOptions = { background : '.masonry_brick' };

class App extends React.Component {

  state = {
    urlsSmall : [],
    urlsRegular : [],
    selectedRegular : [],
    showBigPicture : false,
    search : ''
  }

//First API request to fill the page before any research
  componentDidMount() {
    fetch('https://api.unsplash.com/photos/?client_id=cafb670b38fe81cc5594269814c73f25c82530482a9377485f9fcffdd17fea8f&per_page=50')
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      let urlsSmall = data.map(data => data.urls).map(urls => urls.small)
      let urlsRegular = data.map(data => data.urls).map(urls => urls.regular)
      this.setState({ urlsSmall : urlsSmall, urlsRegular : urlsRegular });
    })
  };

//Regular API request function to refresh the state with new images, when user research something
 searchImages = () => {
  const currentComponent = this;

  return fetch(`https://api.unsplash.com/photos/search?client_id=cafb670b38fe81cc5594269814c73f25c82530482a9377485f9fcffdd17fea8f&query=${this.state.search}&per_page=50`)
  .then(response => response.json())
  .then((data) => {
    let urlsSmall = data.map(data => data.urls).map(urls => urls.small)
    let urlsRegular = data.map(data => data.urls).map(urls => urls.regular)
    return currentComponent.setState({ urlsSmall, urlsRegular }, () => true);
  });
}

//Updating the state with the input value
handleChange = (event) => {
  this.setState ({ search : event.target.value })
}

//Gallery refresh with new image when the form is submitted
updateGallery =  async (event) => {

  event.preventDefault();
  await this.searchImages();
  this.searchInput.value = "";
}

//refresh the state with the image selected to display the BigPicture
bigPictureClick = (id) => {
  const urlsRegular = { ...this.state.urlsRegular };
  this.setState({ selectedRegular : urlsRegular[id] });
  this.setState({ showBigPicture : true });
}

closeBigPicture = () => {
  this.setState({ showBigPicture : false });
  console.log(this.state.showBigPicture);
}

  render() {

    const { urlsSmall, urlsRegular, showBigPicture, selectedRegular } = this.state;

    const images = Object.keys(urlsSmall).map(key =>
      <CSSTransition key={key} classNames="fade" timeout={1000}>
        <Picture id={key} key={key} imageUrl={urlsSmall[key]} handleClick={this.bigPictureClick}/>
      </CSSTransition> )

    return (

      <div className="App">
        <div className="unSplash">
          <p className="unSplashCredits">Powered by
            <span className="unSplashLink" style={{ fontWeight: 'bold' }}>
              <a href="https://unsplash.com/" target="_blank"> Unsplash</a>
            </span>
          </p>
          <img className="logo_Unsplash" src={logo_Unsplash} alt="logo_Unsplash"/>
        </div>
        <div className="Syhko">
          <div className="invisible_brick"></div>
          <p className="title"><span style={{ fontWeight: 'bold' }}>REACT GALLERY</span></p>
          <p className="syhkoCredits">Made by
            <span className="syhkoLink" style={{ fontWeight: 'bold' }}>
              <a href="https://github.com/Syhko" target="_blank"> Syhko</a>
            </span>
            <img className="logo_Syhko" src={logo_Syhko} alt="logo_Syhko"/>
          </p>
        </div>
        <header className="App_header">
          <form className="form_search" onSubmit={this.updateGallery}>
            <input
              ref={input => this.searchInput = input}
              onChange={this.handleChange}
              type="search"
              required
              className="picture_search">
            </input>
          </form>
        </header>
        <Masonry
          className={showBigPicture ? "masonry_blur" : "masonry_clear"}
          elementType={'div'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateonEachImageLoad={false}
          imagesLoadOptions={imagesLoadedOptions}>
            {images}
        </Masonry>
        <CSSTransition in={showBigPicture === true} out={showBigPicture === false} timeout={1000} classNames="fade">
          <React.Fragment>
            {showBigPicture ? <BigPicture imageUrl={selectedRegular} handleClick={this.closeBigPicture}/> : null}
          </React.Fragment>
      </CSSTransition>
      </div>
    );
  }
}
export default App;
