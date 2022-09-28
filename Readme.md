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
