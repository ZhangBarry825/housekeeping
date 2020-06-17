module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1592374070038, function(require, module, exports) {


module.exports = require('./index').default;
}, function(modId) {var map = {"./index":1592374070039}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1592374070039, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = require("loader-utils");

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _options = _interopRequireDefault(require("./options.json"));

var _utils = require("./utils");

var _LessError = _interopRequireDefault(require("./LessError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lessLoader(source) {
  const options = (0, _loaderUtils.getOptions)(this);
  (0, _schemaUtils.default)(_options.default, options, {
    name: 'Less Loader',
    baseDataPath: 'options'
  });
  const callback = this.async();
  const lessOptions = (0, _utils.getLessOptions)(this, options);
  let data = source;

  if (typeof options.prependData !== 'undefined') {
    data = typeof options.prependData === 'function' ? `${options.prependData(this)}\n${data}` : `${options.prependData}\n${data}`;
  }

  if (typeof options.appendData !== 'undefined') {
    data = typeof options.appendData === 'function' ? `${data}\n${options.appendData(this)}` : `${data}\n${options.appendData}`;
  }

  (0, _utils.getLessImplementation)(options.implementation).render(data, lessOptions).then(({
    css,
    map,
    imports
  }) => {
    imports.forEach(item => {
      // `less` return forward slashes on windows when `webpack` resolver return an absolute windows path in `WebpackFileManager`
      // Ref: https://github.com/webpack-contrib/less-loader/issues/357
      this.addDependency(_path.default.normalize(item));
    });
    callback(null, css, typeof map === 'string' ? JSON.parse(map) : map);
  }).catch(lessError => {
    if (lessError.filename) {
      // `less` return forward slashes on windows when `webpack` resolver return an absolute windows path in `WebpackFileManager`
      // Ref: https://github.com/webpack-contrib/less-loader/issues/357
      this.addDependency(_path.default.normalize(lessError.filename));
    }

    callback(new _LessError.default(lessError));
  });
}

var _default = lessLoader;
exports.default = _default;
}, function(modId) { var map = {"./options.json":1592374070040,"./utils":1592374070041,"./LessError":1592374070042}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1592374070040, function(require, module, exports) {
module.exports = {
  "type": "object",
  "properties": {
    "lessOptions": {
      "description": "Options to pass through to `Less` (https://github.com/webpack-contrib/less-loader#lessoptions).",
      "anyOf": [
        {
          "type": "object",
          "additionalProperties": true
        },
        {
          "instanceof": "Function"
        }
      ]
    },
    "prependData": {
      "description": "Prepends `Less` code before the actual entry file (https://github.com/webpack-contrib/less-loader#prependdata).",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "instanceof": "Function"
        }
      ]
    },
    "appendData": {
      "description": "Add `Less` code after the actual entry file (https://github.com/webpack-contrib/less-loader#postponeddata).",
      "anyOf": [
        {
          "type": "string"
        },
        {
          "instanceof": "Function"
        }
      ]
    },
    "sourceMap": {
      "description": "Enables/Disables generation of source maps (https://github.com/webpack-contrib/less-loader#sourcemap).",
      "type": "boolean"
    },
    "implementation": {
      "description": "The implementation of the `Less` to be used (https://github.com/webpack-contrib/less-loader#implementation).",
      "type": "object"
    }
  },
  "additionalProperties": false
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1592374070041, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLessImplementation = getLessImplementation;
exports.getLessOptions = getLessOptions;

var _less = _interopRequireDefault(require("less"));

var _clone = _interopRequireDefault(require("clone"));

var _loaderUtils = require("loader-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable class-methods-use-this */
const trailingSlash = /[/\\]$/; // This somewhat changed in Less 3.x. Now the file name comes without the
// automatically added extension whereas the extension is passed in as `options.ext`.
// So, if the file name matches this regexp, we simply ignore the proposed extension.

const isModuleName = /^~([^/]+|[^/]+\/|@[^/]+[/][^/]+|@[^/]+\/?|@[^/]+[/][^/]+\/)$/;
/**
 * Creates a Less plugin that uses webpack's resolving engine that is provided by the loaderContext.
 *
 * @param {LoaderContext} loaderContext
 * @returns {LessPlugin}
 */

function createWebpackLessPlugin(loaderContext) {
  const resolve = loaderContext.getResolve({
    mainFields: ['less', 'style', 'main', '...'],
    mainFiles: ['index', '...'],
    extensions: ['.less', '.css']
  });

  class WebpackFileManager extends _less.default.FileManager {
    supports(filename) {
      if (this.isPathAbsolute(filename)) {
        return false;
      }

      return true;
    } // Sync resolving is used at least by the `data-uri` function.
    // This file manager doesn't know how to do it, so let's delegate it
    // to the default file manager of Less.
    // We could probably use loaderContext.resolveSync, but it's deprecated,
    // see https://webpack.js.org/api/loaders/#this-resolvesync


    supportsSync() {
      return false;
    }

    getUrl(filename, options) {
      if (options.ext && !isModuleName.test(filename)) {
        return this.tryAppendExtension(filename, options.ext);
      }

      return filename;
    }

    async resolveFilename(filename, currentDirectory, options) {
      const url = this.getUrl(filename, options);
      const moduleRequest = (0, _loaderUtils.urlToRequest)(url, url.charAt(0) === '/' ? '' : null); // Less is giving us trailing slashes, but the context should have no trailing slash

      const context = currentDirectory.replace(trailingSlash, '');
      return this.resolveRequests(context, [moduleRequest, url]);
    }

    resolveRequests(context, possibleRequests) {
      if (possibleRequests.length === 0) {
        return Promise.reject();
      }

      return resolve(context, possibleRequests[0]).then(result => {
        return result;
      }).catch(error => {
        const [, ...tailPossibleRequests] = possibleRequests;

        if (tailPossibleRequests.length === 0) {
          throw error;
        }

        return this.resolveRequests(context, tailPossibleRequests);
      });
    }

    async loadFile(filename, ...args) {
      let result;

      try {
        if (isModuleName.test(filename)) {
          const error = new Error();
          error.type = 'Next';
          throw error;
        }

        result = await super.loadFile(filename, ...args);
      } catch (error) {
        if (error.type !== 'File' && error.type !== 'Next') {
          return Promise.reject(error);
        }

        try {
          result = await this.resolveFilename(filename, ...args);
        } catch (webpackResolveError) {
          error.message = `Less resolver error:\n${error.message}\n\n` + `Webpack resolver error details:\n${webpackResolveError.details}\n\n` + `Webpack resolver error missing:\n${webpackResolveError.missing}\n\n`;
          return Promise.reject(error);
        }

        loaderContext.addDependency(result);
        return super.loadFile(result, ...args);
      }

      loaderContext.addDependency(result.filename);
      return result;
    }

  }

  return {
    install(lessInstance, pluginManager) {
      pluginManager.addFileManager(new WebpackFileManager());
    },

    minVersion: [3, 0, 0]
  };
}
/**
 * Get the less options from the loader context and normalizes its values
 *
 * @param {object} loaderContext
 * @param {object} loaderOptions
 * @returns {Object}
 */


function getLessOptions(loaderContext, loaderOptions) {
  const options = (0, _clone.default)(loaderOptions.lessOptions ? typeof loaderOptions.lessOptions === 'function' ? loaderOptions.lessOptions(loaderContext) || {} : loaderOptions.lessOptions : {});
  const lessOptions = {
    plugins: [],
    relativeUrls: true,
    // We need to set the filename because otherwise our WebpackFileManager will receive an undefined path for the entry
    filename: loaderContext.resourcePath,
    ...options
  };
  lessOptions.plugins.unshift(createWebpackLessPlugin(loaderContext));
  const useSourceMap = typeof loaderOptions.sourceMap === 'boolean' ? loaderOptions.sourceMap : loaderContext.sourceMap;

  if (useSourceMap) {
    lessOptions.sourceMap = {
      outputSourceFiles: true
    };
  }

  return lessOptions;
}

function getLessImplementation(implementation) {
  if (typeof implementation !== 'undefined') {
    return implementation;
  }

  return _less.default;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1592374070042, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LessError extends Error {
  constructor(error) {
    super();
    this.message = ['\n', ...LessError.getFileExcerptIfPossible(error), error.message.charAt(0).toUpperCase() + error.message.slice(1), `      Error in ${_path.default.normalize(error.filename)} (line ${error.line}, column ${error.column})`].join('\n');
    this.hideStack = true;
  }

  static getFileExcerptIfPossible(lessErr) {
    if (typeof lessErr.extract === 'undefined') {
      return [];
    }

    const excerpt = lessErr.extract.slice(0, 2);
    const column = Math.max(lessErr.column - 1, 0);

    if (typeof excerpt[0] === 'undefined') {
      excerpt.shift();
    }

    excerpt.push(`${new Array(column).join(' ')}^`);
    return excerpt;
  }

}

var _default = LessError;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1592374070038);
})()
//# sourceMappingURL=index.js.map