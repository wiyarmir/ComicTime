# <img alt="Buzz" src="./art/logo.svg" height="60" width="60"/> Comic Time [![Build Status](https://travis-ci.org/ComicTime/ComicTime.svg?branch=master)](https://travis-ci.org/ComicTime/ComicTime)

Allow any user to easily read comics, without any prerequisites. [Go to Comic Time](https://comictime.app)

![feed](./art/screencasts/feed.gif)
![detail](./art/screencasts/detail.gif)
![search](./art/screencasts/search.gif)


**Application logo designed by [@luishj](https://twitter.com/luishj)**

## Running this project:

This repository is built on top of [React](https://reactjs.org/) and [Redux](https://redux.js.org/advanced/middleware) using [Yarn](https://yarnpkg.com/en/) for dependency management. Thanks to these tools you can easily run this project on your computer running the following commands:

```
yarn install
yarn start // Starts a webpack-dev-server instance with our react application running on a browser.
```

## Building this project:

As this project is built on top of [React](https://reactjs.org/) we can easily generate distribution site. We've configured this project to easily generate the distribution binaries executing the following command:

```
yarn build
```

**Remember, you'll have to execute ``yarn install`` first.**

The execution of this command will generate a static site you can place anywhere inside the ``build`` folder.

## Publish a new release:

The repository is ready to be hosted on Firebase. To deploy a new version of the site you just need to initialize firebase by executing ``yarn firebase init`` and then execute the ``./release.sh``. This will build a new version of the app and will upload it to Firebase. Remember to review your ``.env.production`` configuration before releasing a new version of Comic Time :smiley:.

## Executing tests:

This project contains some tests written using [Jest](https://facebook.github.io/jest/). You can easily run the tests by executing one of the following commands:

```
yarn test // Executes every test inside the src folder.
yarn test --updateSnapshot // Executes every test inside the src folder recording snapshots again.
yarn test --watch // Watch files for changes and rerun tests related to changed files.
yarn test --watchAll // Watch files for changes and rerun every test.
yarn test --testRegex "String calculator spec*" //Executes tests matching with the regex passed as param.
```

If you are going to execute the repository test suite from IntelliJ remember to add the following jest params to your configuration:

```
--env=jsdom // If you need to run tests using react under the hood.
--env=jsdom --updateSnapshot // If you need to record the tests snapshots again.
```

## Error reporting:

Reporting errors or crashes as issues is always useful and worth it :bug: However, if we can find some errors and report it automatically our lives as developers will be easier. That's why this repository is configured to use [Sentry](https://sentry.io/) to report all the not handled exceptions for us. In order to configure Sentry to report errors for you only need to create two files named ``.env.development`` and ``.env.production`` in the root folder and add the following content:

```
REACT_APP_SENTRY_KEY = "YOUR SENTRY REFERENCE FOUND WHEN CREATING A NEW PROJECT"
```

You can find the the Sentry key after creating the project in their site.

## Analytics:

Knowledge is power, and I'm sure we'd like to know how our users move around Comic Time. That's why we've configured [Google Analytics](https://analytics.google.com) and tracked every movement in our application. To configure Google Analytics to report stats for you only need to create two files named ``.env.development`` and ``.env.production`` in the root folder and add the following content:

```
REACT_APP_GOOGLE_ANALYTICS_TRACKING_NUMBER = "YOUR GOOGLE ANALYTICS TRACKING NUMBER"
```

You can find the the Goolge Analytics tracking number after creating the project in their site.

## Linter:

This repository uses [eslint](https://eslint.org/) in order to check if the js code written matches the checkstyle configured. You can check if everything is ok by executing ``yarn lint`` and automatically fix the issues by executing ``yarn fixLint`` if needed.

## Hosting:

For now, this project is being hosted as a single page applicaition in [Firebase](https://firebase.google.com/docs/hosting). If you'd like to do the same you only need to create a Firebase project, execute the following commands and follow the instructions:

```
yarn firebase init
yarn firebase deploy
```

If the deploy finish as expected, you'll see a url you can access from your browser.

## Contributing

If you would like to contribute code to this repository you can do so through GitHub by creating a new branch in the repository and sending a pull request or opening an issue. Please, remember that there are some requirements you have to pass before accepting your contribution:

* Write clean code and test it.
* The code written will have to match the product owner requirements.
* Follow the repository code style.
* Write good commit messages.
* Do not send pull requests without checking if the project build is OK in the CI environment.
* Review if your changes affects the repository documentation and update it.
* Describe the PR content and don't hesitate to add comments to explain us why you've added or changed something.

## FAQs

* **Do you store any document shown in this web page?**
    * Nope, we get the information from a web site already published and storing this content for us.

* **Why do you perform all this heavy work on client-side instead of developing a back-end?**
    * I don't want to code a backend, I just want to read issues. This solution was pragmatic enough for fulfilling my expectations.

* **Why an open source project?**
    * Why not? Maybe any other comic fan and developer would like to contribute :smiley:.

* **Why do you describe the content of your pull requests instead of just pushing directly to master?**
    * Maybe my pull requests could be helpful for someone writing a similar page using a similar technology.

## Contributors

* Pedro Vicente Gómez Sánchez - <pedrovicente.gomez@gmail.com> <a href="https://twitter.com/pedro_g_s"><img alt="Follow me on Twitter" src="https://image.freepik.com/iconos-gratis/twitter-logo_318-40209.jpg" height="20" width="20"/></a> <a href="https://es.linkedin.com/in/pedrovgs"><img alt="Add me to Linkedin" src="https://image.freepik.com/iconos-gratis/boton-del-logotipo-linkedin_318-84979.png" height="20" width="20"/></a>

## License

    Copyright 2018 Comic Time

    Licensed under the GNU General Public License, Version 3 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.gnu.org/licenses/gpl-3.0.en.html

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
