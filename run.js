var fs = require("fs"),
  PNG = require("pngjs").PNG;
 
  fs.createReadStream("img/download.png")
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
        let R = this.data[idx];
        let G = this.data[idx+1];
        let B = this.data[idx+2];
        let A = this.data[idx+3];

        // graysclaing
        let gray = 0.3*R+0.59*G+0.11*B; /* intensity based gray scaling */
        this.data[idx] = gray;
        this.data[idx+1] = gray;
        this.data[idx+2] = gray;

        // invert color
        // this.data[idx] = 255 - this.data[idx];
        // this.data[idx + 1] = 255 - this.data[idx + 1];
        // this.data[idx + 2] = 255 - this.data[idx + 2];
 
        // and reduce opacity
        // this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }
 
    this.pack().pipe(fs.createWriteStream("img/out.png"));
  });