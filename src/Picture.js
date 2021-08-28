export default class Picture {
  constructor({ url, width, height, ctx }) {
    this.url = url;
    this._width = width;
    this._height = height;
    this.ctx = ctx;
    this.image = null;
  }

  load() {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        // Make image 100 times smaller
        this.image = image;
        this._width = image.width;
        this._height = image.height;
        resolve(image);
      };
      image.onerror = () =>
        reject(new Error(`Could not load image ${this.url}`));
      image.src = this.url;
    });
  }

  draw(x, y) {
    this.ctx.drawImage(this.image, x, y, this.width, this.height);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get aspectRatio() {
    return this.width / this.height;
  }

  get center() {
    return {
      x: this.width / 2,
      y: this.height / 2,
    };
  }

  get centerX() {
    return this.center.x;
  }

  get centerY() {
    return this.center.y;
  }

  update(lastCanvasImageData, deltaTime) {
    const image = lastCanvasImageData;

    for (let i in image.data) {
      // Invert the colors
      if (i % 4 === 0) {
        image.data[i] = 100 - image.data[i];
        if (image.data[i] < 0) {
          image.data[i] = 0;
        }
      } else if (i % 4 === 1) {
        image.data[i] = 255 - image.data[i];
      } else if (i % 4 === 2) {
        console.log(image.data[i]);
        image.data[i] = 255 - image.data[i];
      } else if (i % 4 === 3) {
        image.data[i] = Math.floor(i / 256) / 10 + deltaTime / 600;
      }
    }

    // Update the canvas with the new image data
    this.ctx.putImageData(image, 0, 0);
  }
}
