'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Model controller class. */
var MC = function () {

  /**
   * Creates a model controller.
   * @param {object} model        - The model. Holds data.
   * @param {string} url          - The url to an oData endpoint.
   * @param {object} ajaxSettings - The jQuery.ajax settings.
   */
  function MC() {
    var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var url = arguments[1];
    var ajaxSettings = arguments[2];

    _classCallCheck(this, MC);

    this.model = model;
    this.url = url;
    this.ajaxSettings = $.extend({
      contentType: 'application/json; charset=UTF-8'
    }, ajaxSettings);
  }

  /** Perform a (fake) HTTP DELETE. Override to implement true HTTP DELETE.  */


  _createClass(MC, [{
    key: 'httpDelete',
    value: function httpDelete() {
      this.model = {
        id: this.model.id,
        __Status: 'DEL'
      };
      return this.httpPatch();
    }

    /**
     * Perform an HTTP GET and populate the model.
     * @param {object} id - The record's ID to load.
     */

  }, {
    key: 'httpGet',
    value: function httpGet(id) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        $.ajax($.extend({}, _this.ajaxSettings, {
          error: function error(errorThrown) {
            reject(errorThrown);
          },
          method: 'GET',
          success: function success(data) {
            resolve(data);
          },
          url: _this.url + '(\'' + id + '\')'
        }));
      }).then(function (data) {
        return _this.model = data;
      });
    }

    /** Perform an HTTP PATCH */

  }, {
    key: 'httpPatch',
    value: function httpPatch() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        $.ajax($.extend({}, _this2.ajaxSettings, {
          data: JSON.stringify(_this2.model),
          error: function error(errorThrown) {
            reject(errorThrown);
          },
          method: 'PATCH',
          success: function success(data) {
            resolve(data);
          },
          url: _this2.url + '(\'' + _this2.model.id + '\')'
        }));
      });
    }

    /** Perform an HTTP POST */

  }, {
    key: 'httpPost',
    value: function httpPost() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.model.id = null;
        $.ajax($.extend({}, _this3.ajaxSettings, {
          data: JSON.stringify(_this3.model),
          error: function error(errorThrown) {
            reject(errorThrown);
          },
          method: 'POST',
          success: function success(data) {
            resolve(data);
          },
          url: _this3.url
        }));
      }).then(function (data) {
        // this.model.id = jqXHR.getResponseHeader('OData-EntityID');
        _this3.model.id = data.id;
        return data;
      });
    }

    /** Perform an HTTP PUT */

  }, {
    key: 'httpPut',
    value: function httpPut() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        $.ajax($.extend({}, _this4.ajaxSettings, {
          data: JSON.stringify(_this4.model),
          error: function error(errorThrown) {
            reject(errorThrown);
          },
          method: 'PUT',
          success: function success(data) {
            resolve(data);
          },
          url: _this4.url + '(\'' + _this4.model.id + '\')'
        }));
      });
    }
  }]);

  return MC;
}();

/** CotModel model controller class. */


var BackboneModelMC = function (_MC) {
  _inherits(BackboneModelMC, _MC);

  /**
   * Create a CotModel model controller.
   * @param {Backbone.Model} bbModel - The model using Backbone.JS.
   * @param {string} url             - The url to an oData endpoint.
   * @param {object} ajaxSettings    - The jQuery.ajax settings.
   */
  function BackboneModelMC(bbModel, url, ajaxSettings) {
    _classCallCheck(this, BackboneModelMC);

    var _this5 = _possibleConstructorReturn(this, (BackboneModelMC.__proto__ || Object.getPrototypeOf(BackboneModelMC)).call(this, undefined, url, ajaxSettings));

    _this5.bbModel = bbModel;
    return _this5;
  }

  /** Perform a (fake) HTTP DELETE. Override to implement true HTTP DELETE.  */


  _createClass(BackboneModelMC, [{
    key: 'httpDelete',
    value: function httpDelete() {
      var id = this.bbModel.get('id');
      this.bbModel.clear();
      this.bbModel.set({
        id: id,
        __Status: 'DEL'
      });
      return this.httpPatch();
    }

    /**
     * Perform an HTTP GET and populate the model.
     * @param {object} id - The record's ID to load.
     */

  }, {
    key: 'httpGet',
    value: function httpGet(id) {
      var _this6 = this;

      return _get(BackboneModelMC.prototype.__proto__ || Object.getPrototypeOf(BackboneModelMC.prototype), 'httpGet', this).call(this, id).then(function (data) {
        _this6.bbModel.set(_this6.model);
        return data;
      });
    }

    /** Perform an HTTP PATCH */

  }, {
    key: 'httpPatch',
    value: function httpPatch() {
      this.model = this.bbModel.toJSON();
      return _get(BackboneModelMC.prototype.__proto__ || Object.getPrototypeOf(BackboneModelMC.prototype), 'httpPatch', this).call(this);
    }

    /** Perform an HTTP POST */

  }, {
    key: 'httpPost',
    value: function httpPost() {
      var _this7 = this;

      this.model = this.bbModel.toJSON();
      return _get(BackboneModelMC.prototype.__proto__ || Object.getPrototypeOf(BackboneModelMC.prototype), 'httpPost', this).call(this).then(function (data) {
        _this7.bbModel.set('id', _this7.model.id);
        return data;
      });
    }

    /** Perform an HTTP PUT */

  }, {
    key: 'httpPut',
    value: function httpPut() {
      this.model = this.bbModel.toJSON();
      return _get(BackboneModelMC.prototype.__proto__ || Object.getPrototypeOf(BackboneModelMC.prototype), 'httpPut', this).call(this);
    }
  }]);

  return BackboneModelMC;
}(MC);

/** View controller class. */


var VC = function () {

  /** Create a view controller. */
  function VC() {
    _classCallCheck(this, VC);

    this.$view = $('<div></div>');
    this.renderedOnce = false;
  }

  /** Hide view controller's view. */


  _createClass(VC, [{
    key: 'hide',
    value: function hide() {
      return this.$view.fadeOut(400).promise();
    }

    /** Remove view controller's view from the DOM. */

  }, {
    key: 'remove',
    value: function remove() {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        _this8.$view.remove();
        _this8.renderedOnce = false;
        resolve();
      });
    }

    /**
     * Render view controller's view. Called to render changes on the view.
     * @param {object} options
     */

  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('VC -> RENDER');

      return new Promise(function (resolve, reject) {
        if (!_this9.renderedOnce) {
          _this9.renderedOnce = true;
          _this9.render_once(options).then(resolve, reject);
        } else {
          resolve();
        }
      }).then(function () {
        return _this9.render_always(options);
      });
    }

    /**
     * Called by the view controller ever time the render method is called.
     * @param {object} options
     */

  }, {
    key: 'render_always',
    value: function render_always() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('VC -> RENDER ALWAYS');

      return Promise.resolve();
    }

    /**
     * Called by the view controller the first time the render method is called.
     * Use to append the view controller's view to the view target.
     * @param {object} options
     */

  }, {
    key: 'render_once',
    value: function render_once() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('VC -> RENDER ONCE');

      if (options.$target) {
        $(options.$target).append(this.$view);
      }
      return Promise.resolve();
    }

    /** Show view controller's view. */

  }, {
    key: 'show',
    value: function show() {
      return this.$view.fadeIn(400).promise();
    }
  }]);

  return VC;
}();

/**
 * Navigation View Controller Class.
 * Help manage and navigate multiple view controllers.
 */


var NavVC = function (_VC) {
  _inherits(NavVC, _VC);

  /** Create a navigation view controller. */
  function NavVC() {
    _classCallCheck(this, NavVC);

    var _this10 = _possibleConstructorReturn(this, (NavVC.__proto__ || Object.getPrototypeOf(NavVC)).call(this));

    _this10.vcs = [];
    return _this10;
  }

  _createClass(NavVC, [{
    key: 'closeVC',
    value: function closeVC(vc) {
      var _this11 = this;

      // console.log('NAVVC -> CLOSE VC');

      return new Promise(function (resolve, reject) {
        // Step 1.

        if (_this11.vcs.length > 0 && _this11.vcs[_this11.vcs.length - 1] === vc) {
          _this11.vcs.pop();
        }

        if (_this11.vcs.length == 0) {
          vc.hide().then(function () {
            resolve();
          }, function () {
            reject();
          });
        } else {
          var topVC = _this11.vcs.pop();
          _this11.vcs.push(vc, topVC);
          resolve();
        }
      }).then(function () {
        // Step 2.

        return _this11.render();
      }).then(function () {
        // Step 3.

        if (_this11.vcs.length > 0) {
          var i = _this11.vcs.indexOf(vc);
          if (i > -1) {
            _this11.vcs.splice(i, 1);
            return _this11.render_always_menu(); // TODO - Hmmm rendered twice...
          }
        }

        return Promise.resolve();
      }).then(function () {
        // Step 4.

        return vc.remove();
      });
    }
  }, {
    key: 'openVC',
    value: function openVC(vc, vcOptions) {
      // console.log('NAVVC -> OPENVC');

      var i = this.vcs.indexOf(vc);
      if (i > -1) {
        this.vcs.splice(i, 1);
      }

      vc.navVC = this;
      this.vcs.push(vc);

      return this.render({ vcOptions: vcOptions });
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      var _this12 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('NAVVC -> RENDER ALWAYS');

      if (this.vcs.length > 0) {
        return new Promise(function (resolve, reject) {
          // console.log('Step 1.');
          // Step 1.

          if (_this12.vcs.length > 1) {
            _this12.vcs[_this12.vcs.length - 2].hide().then(resolve, reject);
          } else {
            resolve();
          }
        }).then(function () {
          // console.log('Step 2.');
          // Step 2.

          var topVC = _this12.vcs[_this12.vcs.length - 1];
          // console.log('topVC', topVC);
          return topVC.render(options.vcOptions).then(function () {
            // console.log('topVC -> show');
            return topVC.show();
          });
        });
      }

      return Promise.resolve();
    }
  }]);

  return NavVC;
}(VC);

/** Navigation bar view controller class. */


var NavbarVC = function (_NavVC) {
  _inherits(NavbarVC, _NavVC);

  /** Create a navigation bar view controller. */
  function NavbarVC() {
    var vcClasses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var menu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var cotLogin = arguments[2];

    _classCallCheck(this, NavbarVC);

    var _this13 = _possibleConstructorReturn(this, (NavbarVC.__proto__ || Object.getPrototypeOf(NavbarVC)).call(this));

    _this13.vcClasses = vcClasses;
    _this13.menu = menu;
    _this13.cotLogin = cotLogin;

    _this13.ajaxSettings = {
      headers: {}
    };
    return _this13;
  }

  /** Create a view controller. */


  _createClass(NavbarVC, [{
    key: 'closeVC',
    value: function closeVC(vc) {
      // console.log('NAVBARVC -> CLOSEVC');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.menu[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var menu = _step.value;

          if (menu.vc === vc) {
            menu.vc = null;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'closeVC', this).call(this, vc);
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      var _this14 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('NAVBARVC -> RENDER ALWAYS');

      return this.render_always_login(options).then(function () {
        return _get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'render_always', _this14).call(_this14, options);
      }).then(function () {
        // console.log('NAVBARVC -> RENDER ALWAYS -> CALL');
        return _this14.render_always_menu(options);
      });
    }
  }, {
    key: 'render_always_login',
    value: function render_always_login() {
      var _this15 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('NAVBARVC -> RENDER ALWAYS LOGIN');

      this.$view_navbar_login.empty();

      if (this.cotLogin == null) {
        // No UI
      } else {
        if (this.cotLogin.isLoggedIn()) {
          this.$view_navbar_login.append('<form class="navbar-form navbar-left"><p class="form-control-static">' + this.cotLogin.username + '</p> <button class="btn btn-default btn-logout" type="button">Logout</button></form>');

          $('.btn-logout', this.$view_navbar_login).on('click', function (e) {
            e.preventDefault();
            _this15.cotLogin.logout();
          });
        } else {
          this.$view_navbar_login.append('<form class="navbar-form navbar-left"><button class="btn btn-default btn-login" type="button">Login</button></form>');

          $('.btn-login', this.$view_navbar_login).on('click', function (e) {
            e.preventDefault();
            _this15.cotLogin.showLogin();
          });
        }
      }

      // console.log('NAVBARVC -> RENDER ALWAYS LOGIN -> RESOLVE');
      return Promise.resolve();
    }
  }, {
    key: 'render_always_menu',
    value: function render_always_menu(options) {
      var _this16 = this;

      // console.log('NAVBARVC -> RENDER ALWAYS MENU');

      this.$view_navbar_menu.empty().append('<ul class="nav navbar-nav"><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span></a><ul class="dropdown-menu"></ul></li></ul>');

      var $dropDownMenu = $('ul.dropdown-menu', this.$view_navbar_menu);

      // console.log(1);

      if (this.menu != null) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var menu = _step2.value;

            var $menuItem = $('<li><a href="#">' + menu.title + '</a></li>');
            $dropDownMenu.append($menuItem);

            $('a', $menuItem).on('click', function (e) {
              e.preventDefault();
              if (menu.vc == null) {
                menu.vc = new _this16.vcClasses[menu.vcClass]();
                _this16.openVC(menu.vc, menu.vcOptions);
              } else {
                _this16.openVC(menu.vc);
              }
            });
          };

          for (var _iterator2 = this.menu[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      // console.log(2);

      var vcs = this.vcs.filter(function (vc) {
        return vc.title != null;
      });

      if (this.menu != null & this.menu.length > 0 && vcs != null && vcs.length > 0) {
        $dropDownMenu.append($('<li role="separator" class="divider"></li>'));
      }

      // console.log(3);

      if (vcs != null) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function _loop2() {
            var vc = _step3.value;

            var $menuItem = $('<li><a href="#">' + (vc.title || 'Untitled') + '</a></li>');
            $dropDownMenu.append($menuItem);
            $('a', $menuItem).on('click', function (e) {
              e.preventDefault();
              _this16.openVC(vc);
            });
          };

          for (var _iterator3 = vcs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      // console.log('NAVBARVC -> RENDER ALWAYS MENU -> RESOLVE');
      return Promise.resolve();
    }
  }, {
    key: 'render_once',
    value: function render_once(options) {
      var _this17 = this;

      // console.log('NAVBARVC -> RENDER ONCE');

      return this.render_once_login(options).then(function () {
        _this17.$view = $('\n\t\t\t\t<nav class="navbar navbar-default navvc">\n\t\t\t\t\t<div class="container-fluid">\n\t\t\t\t\t\t<div class="navbar-header">\n\t\t\t\t\t\t\t<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n\t\t\t\t\t\t\t\t<span class="sr-only">Toggle navigation</span>\n\t\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<span class="navbar-brand"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\t\t\t\t\t\t\t<div class="navbar-left">\n\t\t\t\t\t\t\t\t<div class="nav navbar-nav navbar-vc-ui"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="navbar-right">\n\t\t\t\t\t\t\t\t<div class="nav navbar-nav navbar-menu"></div>\n\t\t\t\t\t\t\t\t<div class="nav navbar-nav navbar-login"></div>\n\t\t\t\t\t\t\t\t<div class="nav navbar-nav navbar-lock"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</nav>\n\t\t\t');

        _this17.$view_navbar_brand = $('.navbar-brand', _this17.$view);
        _this17.$view_navbar_vc_ui = $('.navbar-vc-ui', _this17.$view);
        _this17.$view_navbar_menu = $('.navbar-menu', _this17.$view);
        _this17.$view_navbar_login = $('.navbar-login', _this17.$view);

        // LOCK ICON
        $('.navbar-lock', _this17.$view).append($('.securesite > img'));

        return _get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'render_once', _this17).call(_this17, options);
      });
    }
  }, {
    key: 'render_once_login',
    value: function render_once_login() {
      var _this18 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // console.log('NAVBARVC -> RENDER ONCE LOGIN');

      if (this.cotLogin) {
        if (this.cotLogin.isLoggedIn()) {
          // this.ajaxSettings.headers.Authorization = `AuthSession ${cotLogin.sid}`;
          this.ajaxSettings.headers.Authorization = this.cotLogin.sid;
        }
        this.cotLogin.options.onLogin = function () {
          if (_this18.cotLogin.isLoggedIn()) {
            _this18.ajaxSettings.headers.Authorization = _this18.cotLogin.sid;
          }
          _this18.render();
        };
      }

      return Promise.resolve();
    }
  }]);

  return NavbarVC;
}(NavVC);

/** Require Login View Controller */


var RequireLoginVC = function (_VC2) {
  _inherits(RequireLoginVC, _VC2);

  function RequireLoginVC() {
    _classCallCheck(this, RequireLoginVC);

    return _possibleConstructorReturn(this, (RequireLoginVC.__proto__ || Object.getPrototypeOf(RequireLoginVC)).apply(this, arguments));
  }

  _createClass(RequireLoginVC, [{
    key: 'render_once',
    value: function render_once() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.$view = $('\n\t\t\t<div>\n\t\t\t\t<p>Please login</p>\n\t\t\t</div>\n\t\t');
      return _get(RequireLoginVC.prototype.__proto__ || Object.getPrototypeOf(RequireLoginVC.prototype), 'render_once', this).call(this, options);
    }
  }]);

  return RequireLoginVC;
}(VC);
