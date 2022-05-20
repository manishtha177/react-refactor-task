# Developer at Droppe - React refactoring task

## Known Issues

- Currently, When user add product it does not saved in API.
- When user add product in favourites it does not saved in backend and after refresh it disappears.
- After submitting form data the backend return only ID of the newly created product instead of full object.
- Currently, There is no option to give rating but in UI we are displaying rating.

## Enhancements can be done if time permits
- Currently, only one product card is displayed in a single row that can be beautify more.
- There would be an server side or client side pagination for the entries.
- We can add search and filter functionality as well for the product.
- Would add lazy load on scroll down with infinite scroll functionality.
- Maybe we can add more flows in this app like purchase, payment etc.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
