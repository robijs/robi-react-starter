# RHC-C React Starter

This template repo is an opinionated boilerlate for client-side SharePoint apps used by RHC-C.

## Features
* Default theme for consistent, familiar look-and-feel
* Built-in SPA Routing
* Simple init process via config.js
* Support for [PnPjs](https://pnp.github.io/pnpjs/getting-started/)

### `npm start`

*Before you run this command, you must invoke ```npm run proxy``` to start the proxy service. Follow the prompts in the console. If successful, a config directory will be created and the service will start on port 8081 (the proxy port can be changed in api-server.js).*

Runs the app in development mode **with** sp rest proxy.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run dev`

Runs the app in development mode **without** sp rest proxy.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

***

**This app was built with [Create React App](https://create-react-app.dev/).**