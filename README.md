The application renders a single-page frontend with a form to enter repository and owner details, and a table which displays a paginated list of all issues in the repository (closed and open). Clicking an issue renders a second table with details of the events for the issue, such as when a commit/pull request was created referencing the issue.

## Prerequisite

To have the backend running:

1) `git clone git@github.com:Alapan/Github_Issues_Backend.git`
2) cd into the project root, and run `npm install`
3) In the same location, run `npm start`

## Available Scripts

In the project directory in a separate terminal, you can run:

### `npm start`

Create-react-app should open the app in the browser ([http://localhost:3000](http://localhost:3000)) in the development mode.

### `npm run lint`

Runs TSLint to analyze the code for maintainability and readability.

### `npm run prettier`

Runs Prettier to improve code formatting.

## Libraries and tools used

- React 16.13.1 (including context hook to save application state)
- TypeScript
- Material UI for UI elements
- TSLint and Prettier

## Scope for further work

An improvement to the existing features would be to save the current page when going back from the issue details to the issues list. In other words, if a user clicks on an issue in page 4, and views its events, then goes back, the user should return to page 4, instead of page 1 as it is currently. This will be done soon.
