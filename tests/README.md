

# Test Best Practices

Surprisingly, you don't need to import *describe()* and *it()* for using them in tests with Mocha... Global variables? Mocha's documentation could be richer...

Tests should be run over the "compiled" (bundled, transpiled, packaged) software in a production-like environment. The paths you import in test code should be the same as the paths the users will use... Tests are parts of the documentation.


Alternatives:
- `npm pack` for use in an temporary application,
- local npm package registry (Verdaccio).

nyc(Istanbul) + Mocha + Chai + Sinon

The *exports* field restricts the modules that can be imported. For testing purposes, the list of allowed modules could be temporary expanded (a tool for changing package.json automatically before publishing)...

The module resolution algorithm.

https://nodejs.org/api/esm.html#resolution-and-loading-algorithm

The WebDriver API. Selenium. https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Your_own_automation_environment#your_own_remote_server




1. Use a task runner such as Grunt or Gulp, or npm scripts to run tests and clean up code during your build process. This is a great way to perform tasks like linting and minifying code, adding in CSS prefixes or transpiling nascent JavaScript features for maximum cross-browser reach, and so on.
1. Use a browser automation system like Selenium to run specific tests on installed browsers and return results, alerting you to failures in browsers as they crop up. Commercial cross-browser testing apps like Sauce Labs and BrowserStack are based on Selenium, but allow you to access their set up remotely using a simple interface, saving you the hassle of setting up your own testing system.

If you haven't got the means to test all those different browsers, operating systems, and device combinations on physical hardware, you can also make use of emulators (emulate a device using software on your desktop computer) and virtual machines (software that allows you to emulate multiple operating system/software combinations on your desktop computer). This is a very popular choice, especially in some circumstances — for example, Windows doesn't let you have multiple versions of Windows installed simultaneously on the same machine, so using multiple virtual machines is often the only option here.

*Andy* or Android Studio for emulating Android.

Some larger companies have device labs that stock a very large selection of different devices, enabling developers to hunt down bugs on very specific browser/device combinations.


User Testing. It is useful to provide a set of steps (sometimes called a script) so that you get more reliable results pertaining to what you were trying to test.

You can classify browsers and devices by the amount of support you intend to give. 


*Reuse the test suite* for Node and browsers. How to manage fixtures depending on file readings in both cases?

https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser?noredirect=1&lq=1

https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0

Utiliser Flask et Jinja.

Isomorphic modules.

The JavaScript sources executed by the browser are often transformed in some way from the original sources created by a developer.
In these situations, it’s much easier to debug the original source, rather than the source in the transformed state that the browser has downloaded. A **source map** is a file that maps from the transformed source to the original source, enabling the browser to reconstruct the original source and present the reconstructed original in the debugger.

`mocha --require` for transpiling. https://github.com/mochajs/mocha/wiki/compilers-deprecation#what-should-i-use-instead-then

https://github.com/mochajs/mocha/wiki


Paywright or Selenium or Cypress?

https://github.com/mochajs/mocha-examples

Parameterized tests. Using the *this* variable as a shared context managed by Mocha.
https://mochajs.org/#dynamically-generating-tests
Use global setup fixtures (js modules) for setting up a server before running tests...
https://github.com/mochajs/mocha/wiki/Shared-Behaviours Can be useful.
https://dev.to/open-wc/shared-behaviors-best-practices-with-mocha-519d


SEE ALSO hooks...


**Test harnesses** allow for the automation of tests. They can call functions with supplied parameters and print out and compare the results to the desired value. The test harness provides a hook for the developed code, which can be tested using an automation framework. 
A test harness is used to facilitate testing where all or some of an application's production infrastructure is unavailable.


The callback function *done()* for the asynchronous tests. https://mochajs.org/#asynchronous-code

check-leaks...


A cascade of conftest.js common fixture functions (`import * as conftest from "./conftest.js"`) that you can override (Pytest).

A new library for browser testing : https://modern-web.dev/docs/test-runner/overview/. Headless browsers with Puppeteer, Playwright, Selenium or WebdriverIO. Mock ES modules using Import Maps (new HTML feature).


Useful command. `mocha init ./testDir`

```javascript
// Technique 1)
async function compareIO(f, inputPath, outputPath, done, options = {}) {
try {
    inputPath = correctPath(inputPath);
    outputPath = correctPath(outputPath);
    const input = await readFile(inputPath);
    const expectedOutput = await readFile(outputPath);
    const output = f(input, options);
    assertEqual(output, expectedOutput);
    done();
} catch (err) {
    done(err);
}
}

describe("Test...", function () {
it("Reread a simple example", function (done) {
    compareIO(
    f,
    "./path",
    "./another/path",
    done
    );
});})

// Technique 2)
async function compareIO(f, inputPath, outputPath, options = {}) {
try {
    inputPath = correctPath(inputPath);
    outputPath = correctPath(outputPath);
    const input = await readFile(inputPath);
    const expectedOutput = await readFile(outputPath);
    const output = f(input, options);
    assertEqual(output, expectedOutput);
} catch (err) {
    throw err
}
}

describe("Test...", async function () {
it("Reread a simple example", function () {
    await compareIO(
    f,
    "./path",
    "./another/path",
    );
});})

``````