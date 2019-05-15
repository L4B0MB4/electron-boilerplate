const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron"); // Require Electron from the binaries included in node_modules.
const path = require("path");

describe("Application launch", function() {
  beforeEach(function() {
    this.app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: path.join(__dirname, "../dist/win-unpacked/electron-boilerplate.exe"),

      args: [path.join(__dirname, "..")]
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("shows an initial window", function() {
    return this.app.client.getWindowCount().then(function(count) {
      assert.equal(count, 2);
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    });
  });
});
