Babbel Dev Teet
=======================================

Hi! I made you this.

Deploy and testing should be straight forward.

clone the repo and move into the directory

```
git clone git@github.com:mousemke/bowlingisfun.git
cd babbel-js-test
```

Install the dependencies. This will run most of the tests.

```
npm i
```

Start the server, and run the other tests.  The first time the tests run it generates the baseline images for the regression testing.
######* note: the server will need it's own terminal window

```
npm run serve
npm test
```

You're all set!  Go to the site at [http://localhost:8078](http://localhost:8078)

## npm scripts

Everything is controlled through the npm scripts.  There are some that are only used by the other scripts that I will leave off of this list.


| script  | description  |
| -------|------- |
| deploy                    | Runs all the tests and builds the bundles to `./dist`
| lint                      | Lints all the `.js` and `.jsx` for code errors and style errors
| lintFix                   | Lints all the `.js` and `.jsx` for code errors and style errors. Fixes many whitespace issues
| serve                     | Starts the dev server at [http://localhost:8078](http://localhost:80788
| stylelint                 | Lints all the `.css` for style
| test                      | Runs all tests. Tests are a bit lacking due to time but the structures are there for them
| test:unit                 | Runs unit tests
| test:unit:coverage        | Runs coverage tests and opens a report
| test:unit:coverage:cli    | Runs coverage tests and reports to the command line
| test:unit:coverage:report | Opens the test coverage report
| test:visual               | Runs visual regression tests and opens a report
| test:visual:baseline      | Sets baseline images for testing
| test:visual:clean         | Removes all testing images
| test:visual:cli           | Runs visual regression tests and reports to the command line
| test:visual:report        | Opens the visual regression report


-🐭


