import React, { Component } from 'react';
import asyncComponent from 'consys/asyncComponent';
import pageLoaderCss from './pageLoader.css';

class RootLoad extends Component {
  constructor() {
    super();
    this.refDots = this.refDots.bind(this);
  }
  refDots(wait) {
    this.dotLoading = window.setInterval( function() {
      if ( wait.innerHTML.length >= 3 ) 
          wait.innerHTML = "";
      else 
          wait.innerHTML += ".";
    }, 100);
  }
  render() {
    const {children} = this.props;

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
        loaded: () => { 
          this.refs.loader.style.display = 'none';
          this.dotLoading && clearInterval(this.dotLoading);
        }
     })
    );
    return (
      <div>
        <span ref="loader" className={pageLoaderCss.loader}>
          Carregando<span ref={this.refDots}></span>
        </span>
        {childrenWithProps}
      </div>
    );
  }
}
export default RootLoad;