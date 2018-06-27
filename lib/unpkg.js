const axios = require("axios");
const path = require("path");
const { buildIncludePaths } = require("node-sass-magic-importer/dist/toolbox");
const flatten = files => {
  return files.reduce((prev, curr) => {
    if (curr.files) {
      const child = flatten(curr.files);
      return {
        ...prev,
        ...child
      };
    }
    return {
      ...prev,
      [curr.path]: curr
    };
  }, {});
};

const partialFileName = fileName => {
  console.log(
    "pfN",
    fileName,
    path.dirname(fileName),
    `_${path.filename(fileName)}`
  );

  const r =
    "/" + path.join(path.dirname(fileName), `_${path.filename(fileName)}`);

  return r;
};

const appendSuffix = fileName => {
  return (
    "/" +
    path.join(
      path.dirname(fileName),
      `${path.basename(fileName, path.extname(fileName))}.scss`
    )
  );
};

// const getUrl = (file) => {
//   const base = "https://unpkg.com/bootstrap@4.1.1/scss"
//   return `${base}/${file}.scss`
// }

class _UnpkgFetcher {
  constructor(packageName, files) {
    this.packageName = packageName;
    this.files = files;
  }
  getScssFile(filePath, prev) {
    console.log("=============", filePath);
    const fileName = this.resolveFileName(filePath, prev);

    console.log("===", filePath, fileName, this.getFullPath(fileName));
    return axios.get(this.getFullPath(fileName));
  }
  getFullPath(filePath) {
    return `https://unpkg.com/${this.packageName}${filePath}`;
  }
  listEnableFiles(filePath, prev) {
    const prevBase = path.dirname(prev);
    return [appendSuffix(filePath)];
  }
  resolveFileName(filePath, prev) {
    const filePathWithSuffix = appendSuffix(filePath);

    if (this.files[filePathWithSuffix]) {
      return filePathWithSuffix;
    }
    const cwd = path.dirname(prev);
    const partial = path.join(cwd, partialFileName(filePathWithSuffix));

    if (this.files[partial]) {
      return partial;
    }
  }
}

module.exports = packageName => {
  console.log("AAAAAAAAAAAPPPPp");
  return axios.get(`https://unpkg.com/${packageName}/?meta`).then(r => {
    const files = flatten(r.data.files);
    const resolver = new _UnpkgFetcher(packageName, files);
    return function(url, prev, done) {
      console.log("AAAAAAA", url, prev);
      resolver.getScssFile(url, prev).then(r => {
        done({ contents: r.data });
      });
    };
  });
};
