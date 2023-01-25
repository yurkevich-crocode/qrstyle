class QrCode {
  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  contrast(rgb1, rgb2) {
    var lum1 = this.luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = this.luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  updateImg() {
    const logoInput = document.getElementById("Logo");
    logoInput.addEventListener("input", () => {
      document.getElementById("Logo").onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
          files = tgt.files;

        if (FileReader && files && files.length) {
          var fr = new FileReader();
          fr.onload = function () {
            image = fr.result;
            qr.generateQR();
          };
          fr.readAsDataURL(files[0]);
        }
      };
    });
  }

  generateQR() {
    let colorPickerSec = document.getElementById("cpicker2");
    let hidden__el = document.querySelectorAll(".hidden__el");
    let radioFirst = document.getElementById("sDotsColor");
    let radioSecond = document.getElementById("gDotsColor");
    const rotate = document.getElementById("rotate");
    const labelForRotate = document.getElementById("forRotate");

    if (radioFirst.checked) {
      colorPickerSec.classList.add("hidden");
      rotate.classList.add("hidden");
      labelForRotate.classList.add("hidden");
      hidden__el.forEach((item) => {
        item.classList.add("hidden");
      });
    }

    radioFirst.addEventListener("click", () => {
      colorPickerSec.classList.add("hidden");
      rotate.classList.add("hidden");
      labelForRotate.classList.add("hidden");
      hidden__el.forEach((item) => {
        item.classList.add("hidden");
      });
    });

    radioSecond.addEventListener("click", () => {
      colorPickerSec.classList.remove("hidden");
      rotate.classList.remove("hidden");
      labelForRotate.classList.remove("hidden");
      hidden__el.forEach((item) => {
        item.classList.remove("hidden");
      });
    });
    //==================

    //corners square setings
    //==================
    let colorPickerSecSquare = document.getElementById("squarecpicker2");
    let radioFirstSquare = document.getElementById("sCorSquareColor");
    let radioSecondSquare = document.getElementById("gCorSquareColor");
    let hidden__elSquare = document.querySelectorAll(".hidden__el-square");

    if (radioFirstSquare.checked) {
      colorPickerSecSquare.classList.add("hidden");
      hidden__elSquare.forEach((item) => {
        item.classList.add("hidden");
      });
    }

    radioFirstSquare.addEventListener("click", () => {
      colorPickerSecSquare.classList.add("hidden");
      hidden__elSquare.forEach((item) => {
        item.classList.add("hidden");
      });
    });

    radioSecondSquare.addEventListener("click", () => {
      colorPickerSecSquare.classList.remove("hidden");
      hidden__elSquare.forEach((item) => {
        item.classList.remove("hidden");
      });
    });
    //==================

    //corners dots setings
    //==================
    let colorPickerSecDotsCorners = document.getElementById("dotscpicker2");
    let radioFirstDotsCorners = document.getElementById("sCornDotColor");
    let radioSecondDotsCorners = document.getElementById("gCornDotColor");
    let hidden__elDot = document.querySelectorAll(".hidden__el-dot");
    if (radioFirstDotsCorners.checked) {
      colorPickerSecDotsCorners.classList.add("hidden");
      hidden__elDot.forEach((item) => {
        item.classList.add("hidden");
      });
    }

    radioFirstDotsCorners.addEventListener("click", () => {
      colorPickerSecDotsCorners.classList.add("hidden");
      hidden__elDot.forEach((item) => {
        item.classList.add("hidden");
      });
    });

    radioSecondDotsCorners.addEventListener("click", () => {
      colorPickerSecDotsCorners.classList.remove("hidden");
      hidden__elDot.forEach((item) => {
        item.classList.remove("hidden");
      });
    });
    //==================

    //background setings
    //==================
    let colorPickerBackSec = document.getElementById("backcpicker2");
    let radioFirstBack = document.getElementById("sBackColor");
    let radioSecondBack = document.getElementById("gBackColor");
    let hidden__elBack = document.querySelectorAll(".hidden__el-back");
    if (radioFirstBack.checked) {
      colorPickerBackSec.classList.add("hidden");
      hidden__elBack.forEach((item) => {
        item.classList.add("hidden");
      });
    }

    radioFirstBack.addEventListener("click", () => {
      colorPickerBackSec.classList.add("hidden");
      hidden__elBack.forEach((item) => {
        item.classList.add("hidden");
      });
    });

    radioSecondBack.addEventListener("click", () => {
      colorPickerBackSec.classList.remove("hidden");
      hidden__elBack.forEach((item) => {
        item.classList.remove("hidden");
      });
    });
    if (document.getElementById("canvas")) {
      //main setings
      //==================

      const link = document.getElementById("link").value;
      let margin = document.getElementById("margin").value;
      const width = document.getElementById("width").value;
      const height = document.getElementById("height").value;

      if (margin <= 20) {
        margin = 20;
      }
      //==================

      //background
      //==================
      const backgroundColor = document.getElementById("backcpicker").value;
      const backColVal = backgroundColor.toString();
      const backgroundAlert = document.querySelector(
        ".custom__item-alert--background"
      );
      let backColVal2 = colorPickerBackSec.value.toString();

      if (colorPickerBackSec.classList.contains("hidden")) {
        backColVal2 = backColVal;
      }

      //==================

      //dots options
      //==================

      const colorDots1 = document.getElementById("cpicker1").value;
      const dotsAlert = document.querySelector(".custom__item-alert--dots");
      const colorDotsVal1 = colorDots1.toString();
      let colorDotsVal2 = colorPickerSec.value.toString();

      if (colorPickerSec.classList.contains("hidden")) {
        colorDotsVal2 = colorDotsVal1;
      }

      if (
        this.contrast(
          Object.values(this.hexToRgb(colorDotsVal1)),
          Object.values(this.hexToRgb(backColVal))
        ) <= 2.5 ||
        this.contrast(
          Object.values(this.hexToRgb(colorDotsVal2)),
          Object.values(this.hexToRgb(backColVal2))
        ) <= 2.5
      ) {
        dotsAlert.style.display = "block";
      } else {
        dotsAlert.style.display = "none";
      }

      //==================

      //corners square
      //==================
      const cornersSquare = document.getElementById("squarecpicker1").value;
      const colorCorSquareVal = cornersSquare.toString();
      const cornersSquareAlert = document.querySelector(
        ".custom__item-alert--corners-square"
      );
      let colorCorSquareVal2 = colorPickerSecSquare.value.toString();

      if (colorPickerSecSquare.classList.contains("hidden")) {
        colorCorSquareVal2 = colorCorSquareVal;
      }

      if (
        this.contrast(
          Object.values(this.hexToRgb(cornersSquare)),
          Object.values(this.hexToRgb(backColVal))
        ) <= 2.5 ||
        this.contrast(
          Object.values(this.hexToRgb(colorCorSquareVal2)),
          Object.values(this.hexToRgb(backColVal2))
        ) <= 2.5
      ) {
        cornersSquareAlert.style.display = "block";
      } else {
        cornersSquareAlert.style.display = "none";
      }

      //==================

      //corners dots
      //==================
      const cornersDots = document.getElementById("dotscpicker").value;
      const colorCorDotsVal = cornersDots.toString();
      const cornersDotsAlert = document.querySelector(
        ".custom__item-alert--corners-dots"
      );
      let colorCorDotsVal2 = colorPickerSecDotsCorners.value.toString();

      if (colorPickerSecDotsCorners.classList.contains("hidden")) {
        colorCorDotsVal2 = colorCorDotsVal;
      }

      if (
        this.contrast(
          Object.values(this.hexToRgb(colorCorDotsVal)),
          Object.values(this.hexToRgb(backColVal))
        ) <= 2.5 ||
        this.contrast(
          Object.values(this.hexToRgb(colorCorDotsVal2)),
          Object.values(this.hexToRgb(backColVal2))
        ) <= 2.5
      ) {
        cornersDotsAlert.style.display = "block";
      } else {
        cornersDotsAlert.style.display = "none";
      }

      if (
        this.contrast(
          Object.values(this.hexToRgb(backColVal)),
          Object.values(this.hexToRgb(colorCorDotsVal))
        ) >= 1.5 &&
        this.contrast(
          Object.values(this.hexToRgb(backColVal2)),
          Object.values(this.hexToRgb(colorCorDotsVal2))
        ) >= 1.5 &&
        this.contrast(
          Object.values(this.hexToRgb(backColVal)),
          Object.values(this.hexToRgb(cornersSquare))
        ) >= 1.5 &&
        this.contrast(
          Object.values(this.hexToRgb(backColVal2)),
          Object.values(this.hexToRgb(colorCorSquareVal2))
        ) >= 1.5 &&
        this.contrast(
          Object.values(this.hexToRgb(backColVal)),
          Object.values(this.hexToRgb(colorDotsVal1))
        ) >= 1.5 &&
        this.contrast(
          Object.values(this.hexToRgb(backColVal2)),
          Object.values(this.hexToRgb(colorDotsVal2))
        ) >= 1.5
      ) {
        backgroundAlert.style.display = "none";
      } else {
        backgroundAlert.style.display = "block";
      }

      //==================

      //image:TODO:
      //   let imagestyle = document.querySelector(".image-style");
      // {
      //   if (image == "") {
      //     imagestyle.classList.add("hidden");
      //   }
      // }
      //==================

      //==================

      const imgMargin = document.getElementById("marginImage").value;

      const qrCode = new QRCodeStyling({
        width: width,
        height: height,
        margin: margin,
        type: "canvas",
        data: link.toString(),
        image: image,
        errorCorrectionLevel: "H",
        mode: "Numeric",
        typeNumber: "1",
        hideBackgroundDots: false,
        imageSize: 1,
        dotsOptions: {
          type: dataType,
          gradient: {
            type: "linear",
            rotation: rotate.value * (Math.PI / 180),
            colorStops: [
              { offset: 0, color: colorDotsVal1 },
              { offset: 1, color: colorDotsVal2 },
            ],
          },
        },
        backgroundOptions: {
          gradient: {
            type: "linear",
            rotation: rotate.value * (Math.PI / 180),
            colorStops: [
              { offset: 0, color: backColVal },
              { offset: 1, color: backColVal2 },
            ],
          },
        },
        cornersSquareOptions: {
          type: cornesrsSquareType,
          gradient: {
            type: "linear",
            rotation: rotate.value * (Math.PI / 180),
            colorStops: [
              { offset: 0, color: colorCorSquareVal },
              { offset: 1, color: colorCorSquareVal2 },
            ],
          },
        },
        cornersDotOptions: {
          type: cornersDotType,
          gradient: {
            type: "linear",
            rotation: rotate.value * (Math.PI / 180),
            colorStops: [
              { offset: 0, color: colorCorDotsVal },
              { offset: 1, color: colorCorDotsVal2 },
            ],
          },
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: imgMargin,
        },
      });

      document.getElementById("canvas").innerHTML = " ";
      qrCode.append(document.getElementById("canvas"));
      globalQr = qrCode;
      glWidth = width;
      glHeight = width;
    }
  }

  saveQr() {
    var canvas = document.querySelector("canvas");
    var pdf = canvas.getContext("2d");
    var img = new Image();
    img.onload = function () {
      pdf.drawImage(img, glWidth / 2 - 35, glHeight - 20);
    };

    img.src = "croco.svg";
    const new_window = window.open("https://crocode.io/", "_blank");
    setTimeout(() => {
      globalQr.download({ name: "qr", extension: "png" });
      new_window.close();
    }, 5000);
  }

  getInputs() {
    const inputs = document.getElementsByTagName("input");
    const selects = document.getElementsByTagName("select");
    const formItems = document.querySelectorAll(".forms__item");
    const cornesrsSquareItems = document.querySelectorAll(
      ".forms__item-square"
    );
    const cornesrsDotsItems = document.querySelectorAll(".forms__item-corndot");

    for (let input in inputs) {
      if (inputs.hasOwnProperty(input)) {
        inputs[input].addEventListener("change", () => {
          qr.generateQR();
        });
      }
    }

    for (let input in selects) {
      if (selects.hasOwnProperty(input)) {
        selects[input].addEventListener("change", () => {
          qr.generateQR();
        });
      }
    }

    formItems.forEach((item) => {
      item.addEventListener("click", () => {
        formItems.forEach((el) => {
          el.classList.remove("active");
        });
        item.classList.add("active");
        dataType = item.dataset.type;
        qr.generateQR();
      });
    });

    cornesrsSquareItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        cornesrsSquareItems.forEach((el) => {
          el.classList.remove("active");
        });
        item.classList.add("active");
        cornesrsSquareType = item.dataset.type;
        qr.generateQR();
      });
    });

    cornesrsDotsItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        cornesrsDotsItems.forEach((el) => {
          el.classList.remove("active");
        });
        item.classList.add("active");
        cornersDotType = item.dataset.type;
        qr.generateQR();
      });
    });
  }

  init() {
    window.addEventListener("load", () => {
      this.generateQR();
      this.updateImg();
      this.getInputs();
    });
  }
}

const qr = new QrCode();

qr.init();

let image = "";
let dataType;
let cornersDotType;
let cornesrsSquareType;
let globalQr;
let glWidth;
let glHeight;

const save = document.getElementById("savebtn");

save.addEventListener("click", () => {
  qr.saveQr();
});
