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

		this.model = null;
		this.url = null;
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

		var _this2 = _possibleConstructorReturn(this, (CotModelMC.__proto__ || Object.getPrototypeOf(CotModelMC)).call(this));

		_this2.cotModel = null;
		return _this2;
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
 - vcs
 */


var VC = function () {
	function VC() {
		_classCallCheck(this, VC);

		this.renderedOnce = null;
	}

	_createClass(VC, [{
		key: 'remove',
		value: function remove() {
			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			resolve();
		}
	}, {
		key: 'render',
		value: function render() {
			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


			// STEP 2
			function step2() {
				this.render_always(resolve, reject);
			}

			// STEP 1
			if (this.renderedOnce != true) {
				this.renderedOnce = true;
				this.render_once(step2, reject);
			} else {
				doNext();
			}
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
	}]);

	return VC;
}();

var NavVC = function (_VC) {
	_inherits(NavVC, _VC);

	function NavVC() {
		_classCallCheck(this, NavVC);

		var _this5 = _possibleConstructorReturn(this, (NavVC.__proto__ || Object.getPrototypeOf(NavVC)).call(this));

		_this5.vcs = null;
		return _this5;
	}

	_createClass(NavVC, [{
		key: 'closeVC',
		value: function closeVC(vc) {
			var _this6 = this;

			var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
			var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

			if (this.vcs != null && this.vcs.length > 0 && this.vcs[this.vcs.length - 1] == vc) {
				this.vcs.pop();
				if (this.vcs.length > 0) {
					var topVC = this.vcs.pop();
					this.vcs.push(vc, topVC);
				} else {
					this.vcs.$view.hide();
				}
			}
			this.render(function () {
				var idx = _this6.vcs.indexOf(vc);
				if (idx != -1) {
					_this6.vcs.splice(idx, 1);
				}
				vc.remove(resolve, reject);
			}, reject);
		}
	}, {
		key: 'openVC',
		value: function openVC(vc) {
			var resolve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
			var reject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

			if (this.vcs == null) {
				this.vcs = [];
			}
			var idx = this.vcs.indexOf(vc);
			if (idx != -1) {
				this.vcs.splice(idx, 1);
			}
			this.vcs.push(vc);
			this.render(resolve, reject);
		}
	}, {
		key: 'render_always',
		value: function render_always() {
			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			this.render_always_vc(resolve, reject);
		}
	}, {
		key: 'render_always_vc',
		value: function render_always_vc() {
			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};


			// STEP 2
			function step2() {
				var topVC = this.vcs[this.vcs.length - 1];
				topVC.navVC = this;
				topVC.render(function () {
					topVC.$view.fadeIn(resolve);
				}, reject);
			}

			// STEP 1
			if (this.vcs == null || this.vcs.length == 0) {
				resolve();
			} else {
				if (this.vcs.length > 1) {
					this.vcs[this.vcs.length - 2].$view.fadeOut(step2);
				} else {
					step2();
				}
			}
		}
	}]);

	return NavVC;
}(VC);

/**
 Navbar View Controller
 Properties:
 - $view
 - cotLogin
 - defaultVC
 - menu
 - vcClasses
 */


var NavbarVC = function (_NavVC) {
	_inherits(NavbarVC, _NavVC);

	function NavbarVC() {
		_classCallCheck(this, NavbarVC);

		var _this7 = _possibleConstructorReturn(this, (NavbarVC.__proto__ || Object.getPrototypeOf(NavbarVC)).call(this));

		_this7.$view = null;
		_this7.cotApp = null;
		_this7.cotLogin = null;
		_this7.defaultVC = null;
		_this7.menu = null;
		_this7.vcClasses = null;
		return _this7;
	}

	_createClass(NavbarVC, [{
		key: 'render_always',
		value: function render_always() {
			var _this8 = this;

			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			this.$view.filter('.requireLogin').hide();
			this.render_always_login(function () {
				_this8.render_always_vc(function () {
					_this8.render_always_menu(resolve, reject);
				}, reject);
			}, reject);
		}
	}, {
		key: 'render_always_login',
		value: function render_always_login() {
			var _this9 = this;

			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			var $login = this.$view.find('.navbar-login').empty();
			if (this.cotLogin == null) {
				// No UI
			} else {
				if (this.cotLogin.isLoggedIn()) {
					$login.append('\n\t\t\t\t\t\t<form class="navbar-form navbar-left">\n\t\t\t\t\t\t\t<p class="form-control-static">' + this.cotLogin.username + '</p>\n\t\t\t\t\t\t\t<button class="btn btn-default btn-logout" type="button">Logout</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t').find('.btn-logout').on('click', function (e) {
						e.preventDefault();
						_this9.cotLogin.logout();
					});
				} else {
					$login.append('\n\t\t\t\t\t\t<form class="navbar-form navbar-left">\n\t\t\t\t\t\t\t<button class="btn btn-default btn-login" type="button">Login</button>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t').find('.btn-login').on('click', function (e) {
						e.preventDefault();
						_this9.cotLogin.showLogin();
					});
				}
			}
			resolve();
		}
	}, {
		key: 'render_always_menu',
		value: function render_always_menu() {
			var _this10 = this;

			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			var $menu = this.$view.find('.navbar-menu');
			$menu.html('\n\t\t\t<ul class="nav navbar-nav">\n\t\t\t\t<li class="dropdown">\n\t\t\t\t\t<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span></a>\n\t\t\t\t\t<ul class="dropdown-menu">\n\t\t\t\t\t\t<li role="separator" class="divider"></li>\n\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t\t<li><a href="#">Dynamic Item</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t');

			var $dropDownMenu = $menu.find('ul.dropdown-menu').empty();

			if (this.menu != null) {
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
								menu.vc = new _this10.vcClasses[menu.vcClass]();
							}
							_this10.openVC(menu.vc);
						});
					};

					for (var _iterator = this.menu[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

			var vcs = this.vcs.filter(function (vc) {
				return vc.title != null;
			});

			if (this.menu != null & this.menu.length > 0 && vcs != null && vcs.length > 0) {
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
							_this10.openVC(vc);
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
		}
	}, {
		key: 'render_always_vc',
		value: function render_always_vc() {
			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			if (this.vcs == null || this.vcs.length == 0) {
				if (this.defaultVC.vc == null) {
					this.defaultVC.vc = new this.vcClasses[this.defaultVC.vcClass]();
				}
				this.openVC(this.defaultVC.vc, resolve, reject);
			} else {
				_get(NavbarVC.prototype.__proto__ || Object.getPrototypeOf(NavbarVC.prototype), 'render_always_vc', this).call(this, resolve, reject);
			}
		}
	}, {
		key: 'render_once',
		value: function render_once() {
			var _this11 = this;

			var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var reject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

			if (this.cotLogin != null) {
				this.cotLogin.options.onLogin = function () {
					_this11.render();
				};
			}

			this.$view = $('\n\t\t\t<nav class="navbar navbar-default navvc">\n\t\t\t\t<div class="container-fluid">\n\t\t\t\t\t<div class="navbar-header">\n\t\t\t\t\t\t<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">\n\t\t\t\t\t\t\t<span class="sr-only">Toggle navigation</span>\n\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t\t<span class="icon-bar"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<span class="navbar-brand"></span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\t\t\t\t\t\t<div class="navbar-left">\n\t\t\t\t\t\t\t<div class="navbar-vc-ui"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="navbar-right">\n\t\t\t\t\t\t\t<div class="navbar-menu"></div>\n\t\t\t\t\t\t\t<div class="navbar-login"></div>\n\t\t\t\t\t\t\t<div class="navbar-lock"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</nav>\n\t\t\t<div class="requireLogin">\n\t\t\t\t<p>Please login.</p>\n\t\t\t</div>\n\t\t');
			$('.navbar-lock', this.$view.filter('.navbar')).append($('.securesite > img'));
			$('#app-content-top > div').append(this.$view);

			resolve();
		}
	}]);

	return NavbarVC;
}(NavVC);
