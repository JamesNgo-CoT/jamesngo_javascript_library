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
      this.model = {
        id: this.model.id,
        __Status: 'DEL'
      };
      return this.httpPatch();
    }
  }, {
    key: 'httpGet',
    value: function httpGet(id) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        $.ajax(_this.url + '(\'' + id + '\')', {
          error: function error(jqXHR, textStatus, errorThrown) {
            reject(_this, jqXHR, textStatus, errorThrown);
          },
          method: 'GET',
          success: function success(data, textStatus, jqXHR) {
            resolve(_this, data, textStatus, jqXHR);
          }
        });
      });
    }
  }, {
    key: 'httpPatch',
    value: function httpPatch() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        $.ajax(_this2.url + '(\'' + _this2.model.id + '\')', {
          data: JSON.stringify(_this2.model),
          error: function error(jqXHR, textStatus, errorThrown) {
            reject(_this2, jqXHR, textStatus, errorThrown);
          },
          method: 'PATCH',
          success: function success(data, textStatus, jqXHR) {
            resolve(_this2, textStatus, jqXHR);
          }
        });
      });
    }
  }, {
    key: 'httpPost',
    value: function httpPost() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3._model.id = null;
        $.ajax(_this3.url, {
          data: JSON.stringify(_this3.model),
          error: function error(jqXHR, textStatus, errorThrown) {
            reject(_this3, jqXHR, textStatus, errorThrown);
          },
          method: 'POST',
          success: function success(data, textStatus, jqXHR) {
            _this3._model.id = jqXHR.getResponseHeader('OData-EntityID');
            resolve(_this3, data, textStatus, jqXHR);
          }
        });
      });
    }
  }, {
    key: 'httpPut',
    value: function httpPut() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        $.ajax(_this4.url + '(\'' + _this4.model.id + '\')', {
          data: JSON.stringify(_this4.model),
          error: function error(jqXHR, textStatus, errorThrown) {
            reject(_this4, jqXHR, textStatus, errorThrown);
          },
          method: 'PUT',
          success: function success(data, textStatus, jqXHR) {
            resolve(_this4, data, textStatus, jqXHR);
          }
        });
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
      this.model = this.cotModel.toJSON();
      return _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpDelete', this).call(this);
    }
  }, {
    key: 'httpGet',
    value: function httpGet(id) {
      var _this6 = this;

      return _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpGet', this).call(this, id).then(function () {
        _this6._cotModel.set(_this6.model);
      });
    }
  }, {
    key: 'httpPatch',
    value: function httpPatch() {
      this.model = this.cotModel.toJSON();
      return _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpPatch', this).call(this);
    }
  }, {
    key: 'httpPost',
    value: function httpPost() {
      var _this7 = this;

      this.model = this.cotModel.toJSON();
      return _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpPost', this).call(this).then(function () {
        _this7.cotModel.set('id', _this7.model.id);
      });
    }
  }, {
    key: 'httpPut',
    value: function httpPut() {
      this.model = this.cotModel.toJSON();
      return _get(CotModelMC.prototype.__proto__ || Object.getPrototypeOf(CotModelMC.prototype), 'httpPut', this).call(this);
    }
  }]);

  return CotModelMC;
}(MC);

/** View Controller */


var VC = function () {
  function VC() {
    _classCallCheck(this, VC);
  }

  _createClass(VC, [{
    key: 'remove',
    value: function remove() {
      return Promise.resolve();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var promise = new Promise(function (resolve, reject) {
          if (_this8.renderedOnce != true) {
            _this8.renderedOnce = true;
            _this8.render_once().then(function () {
              resolve();
            }, function () {
              reject();
            });
          } else {
            resolve();
          }
        }).then(function () {
          _this8.render_always().then(function () {
            resolve();
          }, function () {
            reject();
          });
        }, function () {
          reject();
        });
      });
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      return Promise.resolve();
    }
  }, {
    key: 'render_once',
    value: function render_once() {
      return Promise.resolve();
    }
  }]);

  return VC;
}();

/**
 Navbar View Controller
 Properties:
 - $view
 - cotLogin
 - defaultVC
 - menu
 - vcClasses
 - vcs
 */


var NavbarVC = function (_VC) {
  _inherits(NavbarVC, _VC);

  function NavbarVC() {
    _classCallCheck(this, NavbarVC);

    return _possibleConstructorReturn(this, (NavbarVC.__proto__ || Object.getPrototypeOf(NavbarVC)).apply(this, arguments));
  }

  _createClass(NavbarVC, [{
    key: 'closeVC',
    value: function closeVC(vc) {
      var _this10 = this;

      return new Promise(function (resolve, reject) {
        if (_this10.vcs != null && _this10.vcs.length > 0 && _this10.vcs[_this10.vcs.length - 1] == vc) {
          _this10.vcs.pop();
          if (_this10.vcs.length > 0) {
            var topVC = _this10.vcs.pop();
            _this10.vcs.push(vc, topVC);
          } else {
            _this10.vcs.$view.hide();
          }
        }
        _this10.render().then(function () {
          var idx = _this10.vcs.indexOf(vc);
          if (idx != -1) {
            _this10.vcs.splice(idx, 1);
          }
          vc.remove().then(function () {
            resolve();
          });
        });
      });
    }
  }, {
    key: 'render_always',
    value: function render_always() {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        _this11.$view.filter('.requireLogin').hide();
        Promise.all([_this11.render_always_login(), new Promise(function (resolve, reject) {
          _this11.render_always_vc().then(function () {
            _this11.render_always_menu().then(function () {
              resolve();
            });
          });
        })]).then(function () {
          resolve();
        }, function () {
          reject();
        });
      });
    }
  }, {
    key: 'render_always_login',
    value: function render_always_login() {
      var _this12 = this;

      return new Promise(function (resolve, reject) {
        var $login = _this12.$view.find('.navbar-login').empty();
        if (_this12.cotLogin == null) {
          // No UI
        } else {
          if (_this12.cotLogin.isLoggedIn()) {
            $login.append('\n\t\t\t\t\t\t\t<form class="navbar-form navbar-left">\n\t\t\t\t\t\t\t\t<p class="form-control-static">' + _this12.cotLogin.username + '</p>\n\t\t\t\t\t\t\t\t<button class="btn btn-default btn-logout" type="button">Logout</button>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t').find('.btn-logout').on('click', function (e) {
              e.preventDefault();
              _this12.cotLogin.logout();
            });
          } else {
            $login.append('\n\t\t\t\t\t\t\t<form class="navbar-form navbar-left">\n\t\t\t\t\t\t\t\t<button class="btn btn-default btn-login" type="button">Login</button>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t').find('.btn-login').on('click', function (e) {
              e.preventDefault();
              _this12.cotLogin.showLogin();
            });
          }
        }

        resolve();
      });
    }
  }, {
    key: 'render_always_menu',
    value: function render_always_menu() {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        var $menu = _this13.$view.find('.navbar-menu');
        $menu.html('\n\t\t\t\t<ul class="nav navbar-nav">\n\t\t\t\t\t<li class="dropdown">\n\t\t\t\t\t\t<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span></a>\n\t\t\t\t\t\t<ul class="dropdown-menu">\n\t\t\t\t\t\t\t<li role="separator" class="divider"></li>\n\t\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t');

        var $dropDownMenu = $menu.find('ul.dropdown-menu').empty();

        if (_this13.menu != null) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var menu = _step.value;

              var $menuItem = $('<li><a href="#">' + menu.title + '</a></li>');
              $dropDownMenu.append($menuItem);
              $menuItem.find('a').on('click', function (e) {
                e.preventDefault();
                if (menu.vc == null) {
                  menu.vc = new _this13.vcClasses[menu.vcClass]();
                }
                _this13.openVC(menu.vc);
              });
            };

            for (var _iterator = _this13.menu[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
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

        var vcs = _this13.vcs.filter(function (vc) {
          return vc.title != null;
        });

        if (_this13.menu != null & _this13.menu.length > 0 && vcs != null && vcs.length > 0) {
          $dropDownMenu.append($('<li role="separator" class="divider"></li>'));
        }

        if (vcs != null) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            var _loop2 = function _loop2() {
              var vc = _step2.value;

              var $menuItem = $('<li><a href="#">' + (vc.title || 'Untitled') + '</a></li>');
              $dropDownMenu.append($menuItem);
              $menuItem.find('a').on('click', function (e) {
                e.preventDefault();
                _this13.openVC(vc);
              });
            };

            for (var _iterator2 = vcs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              _loop2();
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

        resolve();
      });
    }
  }, {
    key: 'render_always_vc',
    value: function render_always_vc() {
      var _this14 = this;

      if (this.vcs == null || this.vcs.length == 0) {
        if (this.defaultVC.vc == null) {
          this.defaultVC.vc = new this.vcClasses[this.defaultVC.vcClass]();
        }
        return this.openVC(this.defaultVC.vc);
      } else {
        return new Promise(function (resolve, reject) {
          new Promise(function (resolve, reject) {
            if (_this14.vcs.length > 1) {
              _this14.vcs[_this14.vcs.length - 2].$view.fadeOut(function () {
                resolve();
              });
            } else {
              resolve();
            }
          }).then(function () {
            var topVC = _this14.vcs[_this14.vcs.length - 1];
            topVC.navbarVC = _this14;
            topVC.render().then(function () {
              topVC.$view.fadeIn(function () {
                resolve();
              });
            });
          });
        });
      }
    }
  }, {
    key: 'render_once',
    value: function render_once() {
      var _this15 = this;

      return new Promise(function (resolve, reject) {
        if (_this15.cotLogin != null) {
          _this15.cotLogin.options.onLogin = function () {
            _this15.render();
          };
        }

        _this15.$view = $('\n\t\t\t\t<nav class="navbar navbar-default navvc">\n\t\t\t\t\t<div class="container-fluid">\n\t\t\t\t\t\t<div class="navbar-header">\n\t\t\t\t\t\t\t<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n\t\t\t\t\t\t\t\t<span class="sr-only">Toggle navigation</span>\n\t\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<span class="navbar-brand"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\t\t\t\t\t\t\t<div class="navbar-left">\n\t\t\t\t\t\t\t\t<div class="navbar-vc-ui"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="navbar-right">\n\t\t\t\t\t\t\t\t<div class="navbar-menu"></div>\n\t\t\t\t\t\t\t\t<div class="navbar-login"></div>\n\t\t\t\t\t\t\t\t<div class="navbar-lock"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</nav>\n\t\t\t\t<div class="requireLogin">\n\t\t\t\t\t<p>Please login.</p>\n\t\t\t\t</div>\n\t\t\t');
        $('.navbar-lock', _this15.$view.filter('.navbar')).append($('.securesite > img'));
        $('#app-content-top > div').append(_this15.$view);

        resolve();
      });
    }
  }, {
    key: 'openVC',
    value: function openVC(vc) {
      if (this.vcs == null) {
        this.vcs = [];
      }
      var idx = this.vcs.indexOf(vc);
      if (idx != -1) {
        this.vcs.splice(idx, 1);
      }
      this.vcs.push(vc);
      return this.render();
    }
  }]);

  return NavbarVC;
}(VC);
