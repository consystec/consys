import lessToJs from 'consys/lessToJs';
import txt from '!raw-loader!antd/lib/style/themes/default.less';
const palette = lessToJs(txt);
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

function clearValuePallete(value) {
  return parseInt(palette[value]);
}

function screenSize() {
  const width = window.innerWidth;
  let size = "";

  if (width >= clearValuePallete("@screen-xl")) {
    size = "xl";
  }
  else if (width >= clearValuePallete("@screen-lg") && width < clearValuePallete("@screen-xl")) {
    size = "lg";
  }
  else if (width >= clearValuePallete("@screen-md") && width < clearValuePallete("@screen-lg")) {
    size = "md";
  }
  else if (width >= clearValuePallete("@screen-sm") && width < clearValuePallete("@screen-md")) {
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
// @screen-lg:"1200px"
// @screen-md:"992px"
// @screen-sm:"768px"
// @screen-xs:"480px"