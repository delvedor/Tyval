# Tyval
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Build Status](https://travis-ci.org/delvedor/Tyval.svg?branch=master)](https://travis-ci.org/delvedor/Tyval)

Tyval is an extensible Type validator for Javascript, highly inspired from [Joi](https://github.com/hapijs/joi), it provides a lot of  fast and useful validation functions, with a self-descriptive name.

## Install
```
npm install tyval --save
```

## Usage
Easily require it and call the chanable functions.  
See <a href="#api">API</a> for more information.  
```javascript
const tyval = require('tyval')
const number = 1
if (tyval(number, 4).isNumber().min(0).max(5).integer()) {
  console.log('Yay!')
}
```

<a name="api"></a>
## API

## TODO
- [ ] Implement isArray
- [ ] Implement max/min for array.length

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## License
The code is released under the MIT license.

The osx is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
