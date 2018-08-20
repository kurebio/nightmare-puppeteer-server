function Driver(reqId, n, p) {

  var _ = this;


  // For server
  _.reset = reset;
  _.runDriverScript = runDriverScript;
  _.finish = finish;
  _.promise = null;

  function reset() {
    console.log(reqId, 'server.reset');
    return _;
  }

  function runDriverScript(driverScript) {
    console.log(reqId, 'server.runDriverScript');
    _.promise = driverScript(_);
    return _;
  }

  function finish(serverFn) {
    _.promise.then(function (result) {
      serverFn(200, result);
    }).catch(function (error) {
      serverFn(500, error);
    }).then(function () {
      console.log(reqId, 'server.finish');
    });
    return _;
  }


  // For clients
  _.goto = goto;
  _.extract = extract;
  _.nightmare = nightmare;
  _.puppeteer = puppeteer;

  function goto(url) {
    console.log(reqId, 'client.goto', url);
    n = n.goto(url)
        .inject('js', 'node_modules/jquery/dist/jquery.min.js')
        .inject('js', 'jqextract.js');
    return _;
  }

  function extract(fn) {
    console.log(reqId, 'client.extract');
    n = n.evaluate(fn);
    return _;
  }

  function nightmare() {
    console.log(reqId, "client.nightmare() directly! (we won't have visibility)");
    return n;
  }

  function puppeteer() {
    console.log(reqId, "client.puppeteer() directly! (we won't have visibility)");
    return p;
  }

}

exports.Driver = Driver;
