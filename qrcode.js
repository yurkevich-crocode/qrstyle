const save = document.getElementById('savebtn');
const btn = document.getElementById('btn');

let globalQr;
let glWidth;
let glHeight;

//dots setings
//==================

//==================

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function generateQR() {
  let colorPickerSec = document.getElementById('cpicker2');
  let radioFirst = document.getElementById('sDotsColor');
  let radioSecond = document.getElementById('gDotsColor');
  const rotate = document.getElementById('rotate');
  const labelForRotate = document.getElementById('forRotate');

  if (radioFirst.checked) {
    colorPickerSec.classList.add('hidden');
    rotate.classList.add('hidden');
    labelForRotate.classList.add('hidden');
  }

  radioFirst.addEventListener('click', () => {
    colorPickerSec.classList.add('hidden');
    rotate.classList.add('hidden');
    labelForRotate.classList.add('hidden');
  });

  radioSecond.addEventListener('click', () => {
    colorPickerSec.classList.remove('hidden');
    rotate.classList.remove('hidden');
    labelForRotate.classList.remove('hidden');
  });
  //==================

  //corners square setings
  //==================
  let colorPickerSecSquare = document.getElementById('squarecpicker2');
  let radioFirstSquare = document.getElementById('sCorSquareColor');
  let radioSecondSquare = document.getElementById('gCorSquareColor');

  if (radioFirstSquare.checked) {
    colorPickerSecSquare.classList.add('hidden');
  }

  radioFirstSquare.addEventListener('click', () => {
    colorPickerSecSquare.classList.add('hidden');
  });

  radioSecondSquare.addEventListener('click', () => {
    colorPickerSecSquare.classList.remove('hidden');
  });
  //==================

  //corners dots setings
  //==================
  let colorPickerSecDotsCorners = document.getElementById('dotscpicker2');
  let radioFirstDotsCorners = document.getElementById('sCornDotColor');
  let radioSecondDotsCorners = document.getElementById('gCornDotColor');
  const rotateDotsCorners = document.getElementById('RotateDots');
  const labelForRotateDotsCorners = document.getElementById('forRotateDots');

  if (radioFirstDotsCorners.checked) {
    colorPickerSecDotsCorners.classList.add('hidden');
  }

  radioFirstDotsCorners.addEventListener('click', () => {
    colorPickerSecDotsCorners.classList.add('hidden');
  });

  radioSecondDotsCorners.addEventListener('click', () => {
    colorPickerSecDotsCorners.classList.remove('hidden');
  });
  //==================

  //background setings
  //==================
  let colorPickerBackSec = document.getElementById('backcpicker2');
  let radioFirstBack = document.getElementById('sBackColor');
  let radioSecondBack = document.getElementById('gBackColor');
  const rotateBack = document.getElementById('RotateBack');
  const labelForRotateBack = document.getElementById('forRotateBack');

  if (radioFirstBack.checked) {
    colorPickerBackSec.classList.add('hidden');
  }

  radioFirstBack.addEventListener('click', () => {
    colorPickerBackSec.classList.add('hidden');
  });

  radioSecondBack.addEventListener('click', () => {
    colorPickerBackSec.classList.remove('hidden');
  });
  if (document.getElementById('canvas')) {
    //main setings
    //==================

    const canvas = document.getElementById('canvas');
    const link = document.getElementById('link').value;
    const width = document.getElementById('width').value;
    let margin = document.getElementById('margin').value;
    const height = document.getElementById('height').value;
    canvas.style.width = `${width.toString()}px`;

    if (margin <= 20) {
      margin = 20;
    }
    //==================

    //background
    //==================
    const backgroundColor = document.getElementById('backcpicker').value;
    const backColVal = backgroundColor.toString();
    const backgroundAlert = document.querySelector('.custom__item-alert--background');
    let backColVal2 = colorPickerBackSec.value.toString();

    if (colorPickerBackSec.classList.contains('hidden')) {
      backColVal2 = backColVal;
    }

    //==================

    //dots options
    //==================

    const colorDots1 = document.getElementById('cpicker1').value;
    const selectDotsStyle = document.getElementById('dotsStyleSelect');
    const dotsAlert = document.querySelector('.custom__item-alert--dots');
    const colorDotsVal1 = colorDots1.toString();
    let colorDotsVal2 = colorPickerSec.value.toString();

    if (colorPickerSec.classList.contains('hidden')) {
      colorDotsVal2 = colorDotsVal1;
    }

    if (
      contrast(Object.values(hexToRgb(colorDotsVal1)), Object.values(hexToRgb(backColVal))) <= 2.5 ||
      contrast(Object.values(hexToRgb(colorDotsVal2)), Object.values(hexToRgb(backColVal2))) <= 2.5
    ) {
      dotsAlert.style.display = 'block';
    } else {
      dotsAlert.style.display = 'none';
    }

    //==================

    //corners square
    //==================
    const cornersSquare = document.getElementById('squarecpicker1').value;
    const selectCornersSquareStyle = document.getElementById('cornersSquareStyleSelect');
    const colorCorSquareVal = cornersSquare.toString();
    const cornersSquareAlert = document.querySelector('.custom__item-alert--corners-square');
    let colorCorSquareVal2 = colorPickerSecSquare.value.toString();

    if (colorPickerSecSquare.classList.contains('hidden')) {
      colorCorSquareVal2 = colorCorSquareVal;
    }

    if (
      contrast(Object.values(hexToRgb(cornersSquare)), Object.values(hexToRgb(backColVal))) <= 2.5 ||
      contrast(Object.values(hexToRgb(colorCorSquareVal2)), Object.values(hexToRgb(backColVal2))) <= 2.5
    ) {
      cornersSquareAlert.style.display = 'block';
    } else {
      cornersSquareAlert.style.display = 'none';
    }

    //==================

    //corners dots
    //==================
    const cornersDots = document.getElementById('dotscpicker').value;
    const cornersDotStyleSelect = document.getElementById('cornersDotStyleSelect');
    const colorCorDotsVal = cornersDots.toString();
    const cornersDotsAlert = document.querySelector('.custom__item-alert--corners-dots');
    let colorCorDotsVal2 = colorPickerSecDotsCorners.value.toString();

    if (colorPickerSecDotsCorners.classList.contains('hidden')) {
      colorCorDotsVal2 = colorCorDotsVal;
    }

    if (
      contrast(Object.values(hexToRgb(colorCorDotsVal)), Object.values(hexToRgb(backColVal))) <= 2.5 ||
      contrast(Object.values(hexToRgb(colorCorDotsVal2)), Object.values(hexToRgb(backColVal2))) <= 2.5
    ) {
      cornersDotsAlert.style.display = 'block';
    } else {
      cornersDotsAlert.style.display = 'none';
    }

    if (
      contrast(Object.values(hexToRgb(backColVal)), Object.values(hexToRgb(colorCorDotsVal))) >= 1.5 &&
      contrast(Object.values(hexToRgb(backColVal2)), Object.values(hexToRgb(colorCorDotsVal2))) >= 1.5 &&
      contrast(Object.values(hexToRgb(backColVal)), Object.values(hexToRgb(cornersSquare))) >= 1.5 &&
      contrast(Object.values(hexToRgb(backColVal2)), Object.values(hexToRgb(colorCorSquareVal2))) >= 1.5 &&
      contrast(Object.values(hexToRgb(backColVal)), Object.values(hexToRgb(colorDotsVal1))) >= 1.5 &&
      contrast(Object.values(hexToRgb(backColVal2)), Object.values(hexToRgb(colorDotsVal2))) >= 1.5
    ) {
      backgroundAlert.style.display = 'none';
    } else {
      backgroundAlert.style.display = 'block';
    }

    //==================

    //image
    //==================
    const imgMargin = document.getElementById('marginImage').value;
    //==================

    const qrCode = new QRCodeStyling({
      width: width,
      height: height,
      margin: margin,
      type: 'svg',
      data: link.toString(),
      image: image,
      errorCorrectionLevel: 'H',
      mode: 'Numeric',
      typeNumber: '1',
      hideBackgroundDots: false,
      imageSize: 1,
      dotsOptions: {
        type: selectDotsStyle.value,
        gradient: {
          type: 'linear',
          rotation: rotate.value * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: colorDotsVal1 },
            { offset: 1, color: colorDotsVal2 },
          ],
        },
      },
      backgroundOptions: {
        gradient: {
          type: 'linear',
          rotation: rotate.value * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: backColVal },
            { offset: 1, color: backColVal2 },
          ],
        },
      },
      cornersSquareOptions: {
        type: selectCornersSquareStyle.value,
        gradient: {
          type: 'linear',
          rotation: rotate.value * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: colorCorSquareVal },
            { offset: 1, color: colorCorSquareVal2 },
          ],
        },
      },
      cornersDotOptions: {
        type: cornersDotStyleSelect.value,
        gradient: {
          type: 'linear',
          rotation: rotate.value * (Math.PI / 180),
          colorStops: [
            { offset: 0, color: colorCorDotsVal },
            { offset: 1, color: colorCorDotsVal2 },
          ],
        },
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: imgMargin,
      },
    });

    document.getElementById('canvas').innerHTML = ' ';
    qrCode.append(document.getElementById('canvas'));
    globalQr = qrCode;
    glWidth = width;
    glHeight = height;
  }
}

const inputs = document.getElementsByTagName('input');
const selects = document.getElementsByTagName('select');
const logoInput = document.getElementById('Logo');
let image = '';
logoInput.addEventListener('input', () => {
  document.getElementById('Logo').onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        image = fr.result;
        generateQR();
      };

      fr.readAsDataURL(files[0]);
    }
  };
});

for (let input in inputs) {
  if (inputs.hasOwnProperty(input)) {
    inputs[input].addEventListener('change', () => {
      generateQR();
    });
  }
}

for (let input in selects) {
  if (selects.hasOwnProperty(input)) {
    selects[input].addEventListener('change', () => {
      generateQR();
    });
  }
}

save.addEventListener('click', () => {
  let whomade = document.querySelector('#canvas > svg');
  whomade.style.position = 'relative';
  whomade.innerHTML += `<svg x="${glWidth / 2 - 35}" y="${
    glHeight - 20
  }" width="100" height="20"  fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
      <path d="M8.56 20c4.728 0 8.56-4.477 8.56-10S13.288 0 8.56 0C3.832 0 0 4.477 0 10s3.833 10 8.56 10Z" fill="#7DBE3B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M57.933 14.018a2.667 2.667 0 0 1-1.587-.502c-.468-.343-.84-.807-1.113-1.39-.264-.592-.396-1.275-.396-2.049 0-.755.132-1.428.396-2.02.273-.593.64-1.06 1.1-1.405a2.637 2.637 0 0 1 1.6-.516c.316 0 .618.058.908.172.299.105.563.254.794.445.134.107.253.222.358.344V3.27h1.817v10.605h-1.715l-.039-.885a2.44 2.44 0 0 1-.46.47 2.79 2.79 0 0 1-.767.415c-.282.095-.58.143-.896.143Zm.41-1.69c.34 0 .64-.096.895-.287.256-.192.456-.454.601-.789.145-.334.218-.726.218-1.175 0-.44-.073-.826-.218-1.16-.145-.344-.345-.607-.601-.789a1.455 1.455 0 0 0-.895-.286c-.342 0-.64.095-.896.286-.248.182-.444.445-.589.788a3.056 3.056 0 0 0-.204 1.161c0 .45.068.84.204 1.175.145.335.341.597.589.788.256.192.554.287.895.287Z" fill="#7DBE3B"/>
      <path d="M22.868 14.018a3.048 3.048 0 0 1-1.74-.516 3.612 3.612 0 0 1-1.215-1.404c-.29-.593-.436-1.266-.436-2.02 0-.746.145-1.415.436-2.007.298-.602.703-1.075 1.215-1.419a3.048 3.048 0 0 1 1.74-.516c.606 0 1.16.125 1.663.373.504.248.896.592 1.177 1.032l-.998 1.347a2.104 2.104 0 0 0-.447-.487 2.128 2.128 0 0 0-.589-.359 1.636 1.636 0 0 0-.64-.129c-.35 0-.66.096-.934.287a1.86 1.86 0 0 0-.627.76c-.153.324-.23.697-.23 1.117 0 .411.077.779.23 1.104.163.315.38.573.653.774.273.19.58.286.921.286.222 0 .43-.033.627-.1.196-.077.38-.187.55-.33a2.62 2.62 0 0 0 .486-.516l.986 1.347c-.29.411-.691.745-1.203 1.004a3.674 3.674 0 0 1-1.625.372ZM26.86 13.875V6.294h1.753l.032 1.23c.066-.124.14-.242.224-.356.23-.325.498-.578.805-.76a1.95 1.95 0 0 1 1.408-.229c.136.029.252.062.345.1l-.486 2.236a1.587 1.587 0 0 0-.37-.143 1.422 1.422 0 0 0-.449-.072c-.204 0-.396.043-.575.13-.171.076-.32.19-.448.343-.128.143-.23.315-.307.516-.069.2-.103.42-.103.66v3.926h-1.83Z" fill="#7DBE3B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M33.475 13.517c.545.334 1.164.501 1.855.501.682 0 1.292-.167 1.83-.502a3.563 3.563 0 0 0 1.279-1.404c.307-.592.46-1.27.46-2.035 0-.764-.153-1.438-.46-2.02a3.563 3.563 0 0 0-1.28-1.405 3.32 3.32 0 0 0-1.83-.516c-.69 0-1.309.172-1.854.516a3.692 3.692 0 0 0-1.28 1.405c-.307.582-.46 1.256-.46 2.02s.153 1.443.46 2.035c.316.592.742 1.06 1.28 1.405Zm2.75-1.548a1.544 1.544 0 0 1-.895.272c-.341 0-.644-.09-.909-.272a1.971 1.971 0 0 1-.627-.774 2.518 2.518 0 0 1-.217-1.118c-.009-.42.064-.793.218-1.118.153-.324.362-.582.626-.773.265-.191.568-.287.909-.287.332 0 .631.096.895.287.265.181.47.44.615.773.153.325.23.698.23 1.118 0 .411-.077.784-.23 1.118-.145.325-.35.583-.615.774Z" fill="#7DBE3B"/>
      <path d="M43.209 14.018a3.048 3.048 0 0 1-1.74-.516 3.61 3.61 0 0 1-1.215-1.404c-.29-.593-.435-1.266-.435-2.02 0-.746.145-1.415.435-2.007.298-.602.703-1.075 1.215-1.419a3.048 3.048 0 0 1 1.74-.516c.606 0 1.16.125 1.663.373a2.87 2.87 0 0 1 1.177 1.032l-.998 1.347a2.113 2.113 0 0 0-.447-.487 2.131 2.131 0 0 0-.589-.359 1.635 1.635 0 0 0-.64-.129c-.35 0-.66.096-.934.287a1.86 1.86 0 0 0-.627.76c-.153.324-.23.697-.23 1.117 0 .411.077.779.23 1.104.162.315.38.573.653.774.273.19.58.286.921.286.222 0 .43-.033.627-.1.196-.077.38-.187.55-.33.18-.143.341-.315.486-.516l.985 1.347c-.29.411-.69.745-1.202 1.004a3.675 3.675 0 0 1-1.625.372Z" fill="#7DBE3B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M48.493 13.517c.546.334 1.164.501 1.855.501.682 0 1.292-.167 1.83-.502a3.563 3.563 0 0 0 1.28-1.404c.306-.592.46-1.27.46-2.035 0-.764-.154-1.438-.46-2.02a3.563 3.563 0 0 0-1.28-1.405 3.32 3.32 0 0 0-1.83-.516c-.69 0-1.31.172-1.855.516a3.69 3.69 0 0 0-1.28 1.405c-.307.582-.46 1.256-.46 2.02s.153 1.443.46 2.035a3.69 3.69 0 0 0 1.28 1.405Zm2.75-1.548a1.544 1.544 0 0 1-.895.272c-.341 0-.644-.09-.908-.272a1.971 1.971 0 0 1-.627-.774 2.518 2.518 0 0 1-.218-1.118c-.008-.42.064-.793.218-1.118.153-.324.362-.582.627-.773a1.51 1.51 0 0 1 .908-.287c.333 0 .631.096.896.287.264.181.469.44.614.773.153.325.23.698.23 1.118 0 .411-.077.784-.23 1.118-.145.325-.35.583-.614.774ZM64.873 13.517c.546.334 1.186.501 1.92.501.306 0 .618-.043.933-.129.316-.086.623-.21.921-.372.3-.172.572-.383.82-.631l-.87-1.361c-.282.258-.547.439-.794.544-.247.105-.52.158-.819.158-.435 0-.814-.091-1.139-.273a2.017 2.017 0 0 1-.742-.788c-.097-.19-.166-.4-.208-.63h4.827l.013-.63A4.293 4.293 0 0 0 69.53 8.4a3.478 3.478 0 0 0-.665-1.19 2.828 2.828 0 0 0-1.01-.788 2.884 2.884 0 0 0-1.28-.287 3.205 3.205 0 0 0-2.47 1.132 3.828 3.828 0 0 0-.716 1.262 4.825 4.825 0 0 0-.256 1.605c0 .754.153 1.423.46 2.006a3.483 3.483 0 0 0 1.28 1.376Zm.038-4.228c.034-.166.08-.319.141-.459a1.55 1.55 0 0 1 .589-.716c.264-.162.584-.244.96-.244.255 0 .485.058.69.172.205.115.371.277.499.488.137.21.214.444.23.702v.057h-3.109Z" fill="#7DBE3B"/>
      <path d="M17.12 10.509c0 4.524-3.138 8.19-7.01 8.19-3.873 0-7.013-3.666-7.013-8.19 0-4.524 3.14-8.191 7.012-8.191 3.873 0 7.012 3.667 7.012 8.19Z" fill="#448C0D"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.705 10.509c0 4.9-3.4 8.873-7.596 8.873-4.195 0-7.596-3.972-7.596-8.873s3.4-8.874 7.596-8.874c4.195 0 7.596 3.973 7.596 8.874Zm-5.728-7.897a5.155 5.155 0 0 0-.438-.019c-3.275 0-5.93 3.102-5.93 6.928 0 3.827 2.655 6.929 5.93 6.929 2.392 0 4.453-1.654 5.391-4.036-.735 3.605-3.51 6.286-6.821 6.286-3.873 0-7.012-3.667-7.012-8.191 0-4.524 3.14-8.191 7.012-8.191.647 0 1.273.102 1.868.294Z" fill="#fff"/>
  </g>
  <defs>
      <clipPath id="a">
          <path fill="#fff" d="M0 0h70v20H0z"/>
      </clipPath>
  </defs>
</svg>
`;

  html2canvas(document.querySelector('#canvas')).then((canvas) => {
    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    a.download = 'somefilename.jpg';
    a.click();
    a.remove();
  });
});

generateQR();
