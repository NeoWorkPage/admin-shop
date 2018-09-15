# Admin-shop

## Installation

### Getting Started
```
npm install
npm start
```

Runs the app in development mode.
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.


### Building frontend
```
npm build
```
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
By default, it also [includes a service worker](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that our app loads from local cache on future visits.

Our app is ready to be deployed.


## Git flow

### Installing git-flow
```
brew install git-flow-avh
```

### Initialize
Start using git-flow by initializing it inside an existing git repository:
```
git flow init
```
You'll have to answer a few questions regarding the naming conventions for your branches.
It's recommended to use the default values.


### Start a new feature
Development of new features starting from the 'develop' branch.
Start developing a new feature with
```
git flow feature start JIRATASKNAME-123
```
This action creates a new feature branch based on 'develop' and switches to it.


### Publish a feature
Publish a feature to the remote server so it can be used by other users.
Please always publish your feature for ability to make pull request later.
```
git flow feature publish JIRATASKNAME-123
```
Once you publish a feature you don't need to do it every time when you need update on remote branch.
Just use
```
git push origin feature/JIRATASKNAME-123
```

### Finish up a feature
At first please update your branch with develop branch
```
git pull origin develop --rebase
```
Then resolve conflicts and create pull request.
We don't finish feature, but create pull request instead.
```
git create-pull-request develop
```
(Protip: to create pull request directly from command line you will need to install additional tools listed below)

**Please note that for bugfixes and hotfixes the flow remains the same.**

