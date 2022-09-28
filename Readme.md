## How to Setup a TypeScript + Node.js Project

https://khalilstemmler.com/blogs/typescript/node-starter-project/

## Install typescript

npm i -D typescript

## compile

npx tsc example.ts

## Install ambient Node.js types for TypeScript

TypeScript has Implicit, Explicit, and Ambient types. Ambient types are types that get added to the global execution scope. Since we're using Node, it would be good if we could get type safety and auto-completion on the Node apis like file, path, process, etc. That's what installing the DefinitelyTyped type definition for Node will do.

npm install @types/node --save-dev

## Create a tsconfig.json.

The tsconfig.json is where we define the TypeScript compiler options. We can create a tsconfig with several options set.
npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

## Useful configurations & scripts

Cold reloading
Cold reloading is nice for local development. In order to do this, we'll need to rely on a couple more packages: ts-node for running TypeScript code directly without having to wait for it be compiled, and nodemon, to watch for changes to our code and automatically restart when a file is changed.

npm install --save-dev ts-node nodemon

## Add a nodemon.json config.

And then to run the project, all we have to do is run nodemon. Let's add a script for that.

"start:dev": "nodemon",

By running npm run start:dev, nodemon will start our app using ts-node ./src/index.ts, watching for changes to .ts and .js files from within /src.

## Creating production builds

In order to clean and compile the project for production, we can add a build script.

Install rimraf, a cross-platform tool that acts like the rm -rf command (just obliterates whatever you tell it to).

"build": "rimraf ./build && tsc",

Now, when we run npm run build,
rimraf will remove our old build folder before the TypeScript compiler emits new code to dist.

## Production startup script

In order to start the app in production, all we need to do is run the build command first, and then execute the compiled JavaScript at build/index.js.

The startup script looks like this.

"start": "npm run build && node build/index.js"

==========================================================================

## How to use ESLint with TypeScript

https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/

## Installation and setup

Run the following commands to setup ESLint in your TypeScript project.

npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

Create an .eslintrc file.

## Ignoring files we don't want to lint

Create an .eslintignore in order to prevent ESLint from linting stuff we don't want it to.

## Adding a lint script

In your project package.json, lets add a lint script in order to lint all TypeScript code.

## Ready to try it out?

Let's run the following command.

npm run lint

## Adding a rule

In .eslintrc, add a new attribute to the json object called "rules".

## Extending a different base config

Let's say that you wanted to start with a different base config- Shopify's, for example.

Here's how to do that.

Looking at the readme, we need to install it by running:

npm install eslint-plugin-shopify --save-dev
npm i -D eslint-config-airbnb-base (in this project)

Update our .eslintrc
"extends": [
"eslint:recommended",
"plugin:@typescript-eslint/eslint-recommended",
"plugin:@typescript-eslint/recommended",
"airbnb-base"
]

## Fixing linted code with ESLint

You might have noticed that at the end of the error message, it says "2 errors and 0 warnings potentially fixable with the --fix option."

You can run ESLint and tell it to fix things that it's able to fix at the same time.

Using the --fix option, let's add a new script to our package.json called lint-and-fix.

## How to use Prettier with ESLint and TypeScript in VSCode

https://khalilstemmler.com/blogs/tooling/prettier/

## Installing Prettier

First thing's first, we'll install Prettier as a dev dependency.

npm install --save-dev prettier

## Configuring Prettier

As per the docs, we can expose a JSON file called .prettierrc to put our configuration within.
Add the following script to your package.json.
"prettier-format": "prettier --config .prettierrc 'src/\*_/_.ts' --write"
And then run it.

npm run prettier-format

## Using Prettier

One of the most common ways that people use Prettier is to install the VS Code extension that adds it to your editor.

It enables you to, on save, format your code.

## Formatting using VSCode on save (recommended)

Install the Prettier VS Code extension
in the file .vscode/settings.json add following lines in the object

// Default (format when you paste)
"editor.formatOnPaste": true,
// Default (format when you save)
"editor.formatOnSave": true,

## Formatting before a commit (recommended)

When working with other developers as a team, it can be challenging to keep the formatting of the code clean constantly. Not everyone will want to use the Prettier VS Code extension. Not everyone will want to use VS Code!

How do we ensure that any code that gets commited and pushed to source control is properly formatted first?

Read the next post, "Enforcing Coding Conventions with Husky Pre-commit Hooks"(https://khalilstemmler.com/blogs/tooling/enforcing-husky-precommit-hooks/).

## Configuring Prettier to work with ESLint

With ESLint and Prettier already installed, install these two packages as well.

npm install --save-dev eslint-config-prettier eslint-plugin-prettier
make an adjustment to the .eslintrc
{
...
"plugins": [
...
"prettier"
],
"extends": [
...
"prettier"
],
"rules": {
...
"prettier/prettier": 2 // Means error
}
}

## Enforcing Coding Conventions with Husky Pre-commit Hooks

## Installing Husky

To install Husky, run:

npm install husky --save-dev

## Configuring Husky

To configure Husky, in the root of our project's package.json, add the following husky key:

"husky": {
"hooks": {
"pre-commit": "", // Command goes here
"pre-push": "", // Command goes here
"...": "..."
}
}
