const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

function screenSize() {
  const width = window.innerWidth;
  let size = "";

  if (width >= 1600) {
    size = "xxl"
  } 
  else if (width >= 1200 && width < 1600) {
    size = "xl";
  }
  else if (width >= 992 && width < 1200) {
    size = "lg";
  }
  else if (width >= 768 && width < 992) {
    size = "md";
  }
  else if (width >= 576 && width < 768) {
    size = "sm";
  }
  else {
    size = "xs";
  }

  return size;
};

function ge(valor) {
  return sizes.indexOf(screenSize()) >= sizes.indexOf(valor);
}

function le(valor) {
  return sizes.indexOf(screenSize()) <= sizes.indexOf(valor);

}

export default screenSize;
export { ge, le };

// @screen-xl:"1600px"
// @screen-xl:"1200px"
// @screen-lg:"992px"
// @screen-md:"768px"
// @screen-sm:"576px"
// @screen-xs:"480px"