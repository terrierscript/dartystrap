const unpkg = require("./unpkg");

it("XXX", done => {
  unpkg("bootstrap").then(importer => {
    importer("functions", "/scss/bootstrap.scss", r => {
      done();
    });
  });
});
