# Omakase Concept
A React Native concept exercise that was never completed or launched with good aesthetic. I've left our internal style guide below.

## Build Instructions after a Fresh Clone
As always, `npm install` and the following manual steps:

### react-native-fbsdk (Facebook Integration)
Download https://origincache.facebook.com/developers/resources/?id=facebook-ios-sdk-current.zip and unzip all contents into `~/Documents/FacebookSDK`.

## Style Guide
The guidelines below should be observed for the project.

### File Structure
```
android
ios
res
  - img
src (platform agnostic)
  - components (reusable components)
  - views (entire views)
  - utils
  - stores
  - actions
  nav.js
index.ios.js (ios-specific modules/etc)
index.android.js (android-specific modules/etc)
```

### Code Style
#### General
* 80 characters per line.
* Break lines on operands, with the operand indented on the next line.
* Code should be written for ES6 compatability and style should follow the standards set here: http://javascript.crockford.com/code.html
* Use `let` instead of `var` for variable declarations.
* Always use semi-colons.

#### Imports/Exports
* All imports should be declared at the top, separated by utilities and Component imports with a comment line above indicating the type of import.
* Importing from a module should be contained in a single instruction and named imports should look as follows (with tabbing):
```
import DefaultImport, {
  FirstImport, SecondImport, ThirdImport, FourthImport,
  FifthImport
} from 'SomeModule';
```
* Exports should be done at the declaration (like `export default class Something extends Component`) and not through `module.exports`.
* If a module only contains a single export, then use `default`.

#### Commenting
* All comments should be on their own line (no inline commenting).
* All comments should be preceded by an empty line directly above, unless there is a comment directly above already.
