'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 Model Controller
 Properties:
 - model
 - url
 */
var MC = function () {
  function MC() {
    _classCallCheck(this, MC);
  }

  _createClass(MC, [{
    key: 'httpDelete',
    value: function httpDelete() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.model = {
        id: this.model.id,
        __Status: 'DEL'
      };
      this.httpPatch(resolve, reject);
    }
  }, {
    key: 'httpGet',
    value: function httpGet(id) {
      var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      $.ajax(this.url + '(\'' + id + '\')', {
        error: function error(jqXHR, textStatus, errorThrown) {
          reject(jqXHR, textStatus, errorThrown);
        },
        method: 'GET',
        success: function success(data, textStatus, jqXHR) {
          resolve(data, textStatus, jqXHR);
        }
      });
    }
  }, {
    key: 'httpPatch',
    value: function httpPatch() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      $.ajax(this.url + '(\'' + this.model.id + '\')', {
        data: JSON.stringify(this.model),
        error: function error(jqXHR, textStatus, errorThrown) {
          reject(jqXHR, textStatus, errorThrown);
        },
        method: 'PATCH',
        success: function success(data, textStatus, jqXHR) {
          resolve(data, textStatus, jqXHR);
        }
      });
    }
  }, {
    key: 'httpPost',
    value: function httpPost() {
      var _this = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.model.id = null;
      $.ajax(this.url, {
        data: JSON.stringify(this.model),
        error: function error(jqXHR, textStatus, errorThrown) {
          reject(jqXHR, textStatus, errorThrown);
        },
        method: 'POST',
        success: function success(data, textStatus, jqXHR) {
          _this._model.id = jqXHR.getResponseHeader('OData-EntityID');
          resolve(data, textStatus, jqXHR);
        }
      });
    }
  }, {
    key: 'httpPut',
    value: function httpPut() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      $.ajax(this.url + '(\'' + this.model.id + '\')', {
        data: JSON.stringify(this.model),
        error: function error(jqXHR, textStatus, errorThrown) {
          reject(jqXHR, textStatus, errorThrown);
        },
        method: 'PUT',
        success: function success(data, textStatus, jqXHR) {
          resolve(data, textStatus, jqXHR);
        }
      });
    }
  }]);

  return MC;
}();

/**
 CotModel Model Controller
 Property:
 - cotModel
 */


var CotModelMC = function (_MC) {
  _inherits(CotModelMC, _MC);

  function CotModelMC() {
    _classCallCheck(this, CotModelMC);

    return _possibleConstructorReturn(this, (CotModelMC.__proto__ || Object.getPrototypeOf(CotModelMC)).apply(this, arguments));
  }

  _createClass(CotModelMC, [{
    key: 'httpDelete',
    value: function httpDelete() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.model = this.cotModel.toJSON();
      _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpDelete', this).call(this, resolve, reject);
    }
  }, {
    key: 'httpGet',
    value: function httpGet(id) {
      var _this3 = this;

      var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpGet', this).call(this, id, function (data, textStatus, jqXHR) {
        _this3._cotModel.set(_this3.model);
        resolve(data, textStatus, jqXHR);
      }, reject);
    }
  }, {
    key: 'httpPatch',
    value: function httpPatch() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.model = this.cotModel.toJSON();
      _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpPatch', this).call(this, resolve, reject);
    }
  }, {
    key: 'httpPost',
    value: function httpPost() {
      var _this4 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.model = this.cotModel.toJSON();
      _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpPost', this).call(this, function (data, textStatus, jqXHR) {
        _this4.cotModel.set('id', _this4.model.id);
        resolve(data, textStatus, jqXHR);
      }, reject);
    }
  }, {
    key: 'httpPut',
    value: function httpPut() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      this.model = this.cotModel.toJSON();
      _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpPut', this).call(this, resolve, reject);
    }
  }]);

  return CotModelMC;
}(MC);

/**
 View Controller
 Property:
 - $view
 */


var VC = function () {
  function VC() {
    _classCallCheck(this, VC);
  }

  _createClass(VC, [{
    key: 'hide',
    value: function hide() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (this.$view != null) {
        this.$view.fadeOut(400, resolve);
      } else {
        resolve();
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      resolve();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


      // STEP 2
      var step2 = function step2() {
        _this5.render_always(resolve, reject);
      };

      // STEP 1
      var step1 = function step1() {
        if (_this5.renderedOnce != true) {
          _this5.renderedOnce = true;
          _this5.render_once(step2, reject);
        } else {
          step2();
        }
      };

      // START
      step1();
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      resolve();
    }
  }, {
    key: 'render_once',
    value: function render_once() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      resolve();
    }
  }, {
    key: 'show',
    value: function show() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (this.$view != null) {
        this.$view.fadeIn(400, resolve);
      } else {
        resolve();
      }
    }
  }]);

  return VC;
}();

/**
 Navigation View Controller
 Property:
 - defaultVC
 - vcs
 */


var NavVC = function (_VC) {
  _inherits(NavVC, _VC);

  function NavVC() {
    _classCallCheck(this, NavVC);

    return _possibleConstructorReturn(this, (NavVC.__proto__ || Object.getPrototypeOf(NavVC)).apply(this, arguments));
  }

  _createClass(NavVC, [{
    key: 'closeVC',
    value: function closeVC(vc) {
      var _this7 = this;

      var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


      // STEP 2
      var step2 = function step2() {
        if (_this7.vcs != null && _this7.vcs.length != 0) {
          var i = _this7.vcs.indexOf(vc);
          if (i != -1) {
            _this7.vcs.splice(i, 1);
          }
        }
        vc.remove(resolve, reject);
      };

      // STEP 1
      var step1 = function step1() {
        if (_this7.vcs != null && _this7.vcs.length != 0 && _this7.vcs[_this7.vcs.length - 1] === vc) {
          _this7.vcs.pop();
        }
        if (_this7.vcs.length == 0) {
          vc.hide(step2, reject);
        } else {
          var topVC = _this7.vcs.pop();
          _this7.vcs.push(vc, topVC);
          _this7.render(step2, reject);
        }
      };

      // START
      step1();
    }
  }, {
    key: 'openVC',
    value: function openVC(vc) {
      var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (this.vcs == null) {
        this.vcs = [];
      }
      var i = this.vcs.indexOf(vc);
      if (i != -1) {
        this.vcs.splice(i, 1);
      }
      this.vcs.push(vc);
      this.render(resolve, reject);
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      var _this8 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (this.vcs == null || this.vcs.length == 0) {
        if (this.defaultVC.vc == null) {
          this.defaultVC.vc = new this.vcClasses[this.defaultVC.vcClass]();
          this.defaultVC.vc.options = this.defaultVC.vcOptions;
        }
        this.openVC(this.defaultVC.vc, resolve, reject);
      } else {

        // STEP 2
        var step2 = function step2() {
          var topVC = _this8.vcs[_this8.vcs.length - 1];
          topVC.navVC = _this8;
          topVC.render(function () {
            topVC.show(resolve, reject);
          }, reject);
        };

        // STEP 1
        var step1 = function step1() {
          if (_this8.vcs.length > 1) {
            _this8.vcs[_this8.vcs.length - 2].hide(step2, reject);
          } else {
            step2();
          }
        };

        // START
        step1();
      }
    }
  }]);

  return NavVC;
}(VC);

/**
 Navigation Bar View Controller
 Property:
 - $view_navbar_login
 -
 -
 - defaultVC
 - menu
 - options
 - requireLoginVC
 */


var NavbarVC = function (_NavVC) {
  _inherits(NavbarVC, _NavVC);

  function NavbarVC() {
    _classCallCheck(this, NavbarVC);

    return _possibleConstructorReturn(this, (NavbarVC.__proto__ || Object.getPrototypeOf(NavbarVC)).apply(this, arguments));
  }

  _createClass(NavbarVC, [{
    key: 'closeVC',
    value: function closeVC(vc) {
      var _this10 = this;

      var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      _get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'closeVC', this).call(this, vc, function () {
        if (_this10.defaultVC.vc === vc) {
          _this10.defaultVC.vc = null;
        }
        if (_this10.menu != null) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this10.menu[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var menu = _step.value;

              if (menu.vc === vc) {
                menu.vc = null;
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
        }
      }, reject);
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      var _this11 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


      // Step 2
      var step2 = function step2() {
        _this11.render_always_login(function () {
          _get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'render_always', _this11).call(_this11, function () {
            _this11.render_always_menu(resolve, reject);
          }, reject);
        }, reject);
      };

      // Step 1
      var step1 = function step1() {
        if (_this11.requireLoginVC != null) {
          _this11.requireLoginVC.hide(step2, reject);
        } else {
          step2();
        }
      };

      // Start
      step1();
    }
  }, {
    key: 'render_always_login',
    value: function render_always_login() {
      var _this12 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var $view_navbar_login = this.$view_navbar_login;
      $view_navbar_login.empty();

      if (this.cotLogin == null) {
        // No UI
      } else {
        if (this.cotLogin.isLoggedIn()) {
          $view_navbar_login.append('\n\t\t\t\t\t\t<form class="navbar-form navbar-left">\n\t\t\t\t\t\t\t<p class="form-control-static">' + this.cotLogin.username + '</p>\n\t\t\t\t\t\t\t<button class="btn btn-default btn-logout" type="button">Logout</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t').find('.btn-logout').on('click', function (e) {
            e.preventDefault();
            _this12.cotLogin.logout();
          });
        } else {
          $view_navbar_login.append('\n\t\t\t\t\t<form class="navbar-form navbar-left">\n\t\t\t\t\t\t<button class="btn btn-default btn-login" type="button">Login</button>\n\t\t\t\t\t</form>\n\t\t\t\t').find('.btn-login').on('click', function (e) {
            e.preventDefault();
            _this12.cotLogin.showLogin();
          });
        }
      }
      resolve();
    }
  }, {
    key: 'render_always_menu',
    value: function render_always_menu() {
      var _this13 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var $view_navbar_menu = this.$view_navbar_menu;
      $view_navbar_menu.empty().append('\n\t\t\t<ul class="nav navbar-nav">\n\t\t\t\t<li class="dropdown">\n\t\t\t\t\t<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span></a>\n\t\t\t\t\t<ul class="dropdown-menu">\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t');

      var $dropDownMenu = $view_navbar_menu.find('ul.dropdown-menu');

      if (this.menu != null) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var menu = _step2.value;

            var $menuItem = $('<li><a href="#">' + menu.title + '</a></li>');
            $dropDownMenu.append($menuItem);
            $menuItem.find('a').on('click', function (e) {
              e.preventDefault();
              if (menu.vc == null) {
                menu.vc = new _this13.vcClasses[menu.vcClass]();
                menu.vc.options = menu.vcOptions;
              }
              _this13.openVC(menu.vc);
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

      var vcs = this.vcs.filter(function (vc) {
        return vc.title != null;
      });

      if (this.menu != null & this.menu.length > 0 && vcs != null && vcs.length > 0) {
        $dropDownMenu.append($('<li role="separator" class="divider"></li>'));
      }

      if (vcs != null) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function _loop2() {
            var vc = _step3.value;

            var $menuItem = $('<li><a href="#">' + (vc.title || 'Untitled') + '</a></li>');
            $dropDownMenu.append($menuItem);
            $menuItem.find('a').on('click', function (e) {
              e.preventDefault();
              _this13.openVC(vc);
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

      resolve();
    }
  }, {
    key: 'render_once',
    value: function render_once() {
      var _this14 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      _get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'render_once', this).call(this, function () {

        // SET UP COTLOGIN
        if (_this14.cotLogin != null) {
          _this14.cotLogin.options.onLogin = function () {
            _this14.render();
          };
        }

        // VIEW
        var $view = _this14.$view = $('\n  \t\t\t<nav class="navbar navbar-default navvc">\n  \t\t\t\t<div class="container-fluid">\n  \t\t\t\t\t<div class="navbar-header">\n  \t\t\t\t\t\t<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n  \t\t\t\t\t\t\t<span class="sr-only">Toggle navigation</span>\n  \t\t\t\t\t\t\t<span class="icon-bar"></span>\n  \t\t\t\t\t\t\t<span class="icon-bar"></span>\n  \t\t\t\t\t\t\t<span class="icon-bar"></span>\n  \t\t\t\t\t\t</button>\n  \t\t\t\t\t\t<span class="navbar-brand"></span>\n  \t\t\t\t\t</div>\n  \t\t\t\t\t<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n  \t\t\t\t\t\t<div class="navbar-left">\n  \t\t\t\t\t\t\t<div class="nav navbar-nav navbar-vc-ui"></div>\n  \t\t\t\t\t\t</div>\n  \t\t\t\t\t\t<div class="navbar-right">\n  \t\t\t\t\t\t\t<div class="nav navbar-nav navbar-menu"></div>\n  \t\t\t\t\t\t\t<div class="nav navbar-nav navbar-login"></div>\n  \t\t\t\t\t\t\t<div class="nav navbar-nav navbar-lock"></div>\n  \t\t\t\t\t\t</div>\n  \t\t\t\t\t</div>\n  \t\t\t\t</div>\n  \t\t\t</nav>\n  \t\t');

        _this14.$view_navbar_vc_ui = $('.navbar-vc-ui', $view);
        _this14.$view_navbar_menu = $('.navbar-menu', $view);
        _this14.$view_navbar_login = $('.navbar-login', $view);

        // LOCK ICON
        $('.navbar-lock', $view).append($('.securesite > img'));

        // APPEND TO HTML
        _this14.options.$placeholder.append(_this14.$view);

        // END
        resolve();
      }, reject);
    }
  }]);

  return NavbarVC;
}(NavVC);

/**
 Require Login View Controller
 Property:
 - options
 */


var RequireLoginVC = function (_VC2) {
  _inherits(RequireLoginVC, _VC2);

  function RequireLoginVC() {
    _classCallCheck(this, RequireLoginVC);

    return _possibleConstructorReturn(this, (RequireLoginVC.__proto__ || Object.getPrototypeOf(RequireLoginVC)).apply(this, arguments));
  }

  _createClass(RequireLoginVC, [{
    key: 'hide',
    value: function hide() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      console.log('HIDE');
      _get(RequireLoginVC.prototype.__proto__ || Object.getPrototypeOf(RequireLoginVC.prototype), 'hide', this).call(this, resolve, reject);
    }
  }, {
    key: 'render_once',
    value: function render_once() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var $view = this.$view = $('\n      <div>\n        <p>Please login</p>\n      </div>\n    ');
      this.options.$placeholder.append($view);
      this.$view.hide();
      resolve();
    }
  }]);

  return RequireLoginVC;
}(VC);
