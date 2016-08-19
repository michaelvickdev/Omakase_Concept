# Omakase Client
React Native client for Project Omakase.

## Style Guide
The guidelines below should be observed for the project.

### File Structure
TBA

### Code Style
#### General
* 80 characters per line.
* Break lines on operands, with the operand indented on the next line.
* Code should be written for ES6 compatability and style should follow the standards set here: http://javascript.crockford.com/code.html
* Use `let` instead of `var` for variable declarations.
* Always use semi-colons.

#### Imports/Exports
* All imports should be declared at the top, separated by utilities and Component imports with a comment line above indicating the type of import.
* Exports should be done at the declaration (like `export default class Something extends Component`) and not through `module.exports`..
* If a module only contains a single export, then use `default`.

#### Commenting
* All comments should be on their own line (no inline commenting).
* All comments should be preceded by an empty line directly above, unless there is a comment directly above already.
