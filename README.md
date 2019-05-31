# VueJS Provider Directory Prototype

**A working prototype of a Healthx Provider Directory using [VueJS](https://vuejs.org/)**


Below you'll find a guide on how to set up and run a this environment on your local machine.

## Project Background
This project was created to learn how VueJS may be utilized within the Healthx system. This is not an official HX product or directive of the product team.

This project utilizes real data via calls to the Healthx API.


## Getting started
This is a guide to help you get this setup on your local machine.

### Prerequisites

**To set up the environment on your local machine you will need to have [NodeJS](https://nodejs.org) installed.**

### Installing VueJS

This setup utilizes [Vue CLI](https://cli.vuejs.org/).

To install via terminal:

```
$ npm install -g @vue/cli
```

### Clone this repo

Clone this repo to your local machine.

### Install project dependencies 

We need to install this project's dependencies

```
$ cd *repo location*/vue
$ npm install
```

## Running the app
This app utilizes [Webpack](https://webpack.js.org/) as a bundler and supports hot reloading within the browser. Webpack is bundled within this project and does not require any additional setup on your end to work.

### Chrome Environment

This guide is focused around a Google Chrome environment. We are accessing real Healthx data from a non-Healthx domain so we need to run a version of Chrome with the same-origin policy disabled.

For Windows:
``` bash
Press the Windows key 
type 'Run'
In the Run window type 'chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security'
Hit enter
```

For OSX:
From the terminal:
``` bash
$ open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security
```

### Building the App

From the terminal, be sure you are still in the `vue` folder, run the following command:

```
$ npm run dev
```
This will likely open a new tab in a standard version of Chrome. You will need to open up the same-origin policy disabled version of Chrome and go to `localhost:8080'. Any changes made to the source files will be hot-reloaded into this tab.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update this readme as appropriate.
