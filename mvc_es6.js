/**
 Model Controller
 Properties:
 - model
 - url
 */
class MC {
	constructor() {
		this.model = null;
		this.url = null;
	}
	httpDelete(resolve = () => {}, reject = () => {}) {
		this.model = {
			id: this.model.id,
			__Status: 'DEL'
		}
		this.httpPatch(resolve, reject);
	}
	httpGet(id, resolve = () => {}, reject = () => {}) {
		$.ajax(`${this.url}('${id}')`, {
			error: (jqXHR, textStatus, errorThrown) => {
				reject(jqXHR, textStatus, errorThrown);
			},
			method: 'GET',
			success: (data, textStatus, jqXHR) => {
				resolve(data, textStatus, jqXHR);
			}
		});
	}
	httpPatch(resolve = () => {}, reject = () => {}) {
		$.ajax(`${this.url}('${this.model.id}')`, {
			data: JSON.stringify(this.model),
			error: (jqXHR, textStatus, errorThrown) => {
				reject(jqXHR, textStatus, errorThrown);
			},
			method: 'PATCH',
			success: (data, textStatus, jqXHR) => {
				resolve(data, textStatus, jqXHR);
			}
		});
	}
	httpPost(resolve = () => {}, reject = () => {}) {
		this.model.id = null;
		$.ajax(this.url, {
			data: JSON.stringify(this.model),
			error: (jqXHR, textStatus, errorThrown) => {
				reject(jqXHR, textStatus, errorThrown);
			},
			method: 'POST',
			success: (data, textStatus, jqXHR) => {
				this._model.id = jqXHR.getResponseHeader('OData-EntityID');
				resolve(data, textStatus, jqXHR);
			}
		});
	}
	httpPut(resolve = () => {}, reject = () => {}) {
		$.ajax(`${this.url}('${this.model.id}')`, {
			data: JSON.stringify(this.model),
			error: (jqXHR, textStatus, errorThrown) => {
				reject(jqXHR, textStatus, errorThrown);
			},
			method: 'PUT',
			success: (data, textStatus, jqXHR) => {
				resolve(data, textStatus, jqXHR);
			}
		});
	}
}

/**
 CotModel Model Controller
 Property:
 - cotModel
 */
class CotModelMC extends MC {
	constructor() {
		super();
		this.cotModel = null;
	}
	httpDelete(resolve = () => {}, reject = () => {}) {
		this.model = this.cotModel.toJSON();
		super.httpDelete(resolve, reject);
	}
	httpGet(id, resolve = () => {}, reject = () => {}) {
		super.httpGet(id, (data, textStatus, jqXHR) => {
			this._cotModel.set(this.model);
			resolve(data, textStatus, jqXHR);
		}, reject);
	}
	httpPatch(resolve = () => {}, reject = () => {}) {
		this.model = this.cotModel.toJSON();
		super.httpPatch(resolve, reject);
	}
	httpPost(resolve = () => {}, reject = () => {}) {
		this.model = this.cotModel.toJSON();
		super.httpPost((data, textStatus, jqXHR) => {
			this.cotModel.set('id', this.model.id);
			resolve(data, textStatus, jqXHR);
		}, reject);
	}
	httpPut(resolve = () => {}, reject = () => {}) {
		this.model = this.cotModel.toJSON();
		super.httpPut(resolve, reject);
	}
}

/**
 View Controller
 Property:
 - vcs
 */
class VC {
	constructor() {
		this.renderedOnce = null;
	}
	remove(resolve = () => {}, reject = () => {}) {
		resolve();
	}
	render(resolve = () => {}, reject = () => {}) {

		// STEP 2
		const step2 = () => {
			this.render_always(resolve, reject);
		}

		// STEP 1
		if (this.renderedOnce != true) {
			this.renderedOnce = true;
			this.render_once(step2, reject);
		} else {
			step2();
		}
	}
	render_always(resolve = () => {}, reject = () => {}) {
		resolve();
	}
	render_once(resolve = () => {}, reject = () => {}) {
		resolve();
	}
}

class NavVC extends VC {
	constructor() {
		super();
		this.vcs = null;
	}
	closeVC(vc, resolve = () => {}, reject = () => {}) {
		if (this.vcs != null && this.vcs.length > 0 && this.vcs[this.vcs.length - 1] == vc) {
			this.vcs.pop();
			if (this.vcs.length > 0) {
				const topVC = this.vcs.pop();
				this.vcs.push(vc, topVC);
			} else {
				vc.$view.hide();
			}
		}
		this.render(() => {
			const idx = this.vcs.indexOf(vc);
			if (idx != -1) {
				this.vcs.splice(idx, 1);
			}
			vc.remove(resolve, reject);
		}, reject);
	}
	openVC(vc, resolve = () => {}, reject = () => {}) {
		if (this.vcs == null) {
			this.vcs = [];
		}
		const idx = this.vcs.indexOf(vc);
		if (idx != -1) {
			this.vcs.splice(idx, 1);
		}
		this.vcs.push(vc);
		this.render(resolve, reject);
	}
	render_always(resolve = () => {}, reject = () => {}) {
		this.render_always_vc(resolve, reject);
	}
	render_always_vc(resolve = () => {}, reject = () => {}) {

		// STEP 2
		const step2 = () => {
			const topVC = this.vcs[this.vcs.length - 1];
			topVC.navVC = this;
			topVC.render(() => {
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
}

/**
 Navbar View Controller
 Properties:
 - $view
 - cotLogin
 - defaultVC
 - menu
 - vcClasses
 */
class NavbarVC extends NavVC {
	constructor() {
		super();
		this.$view = null;
		this.cotApp = null;
		this.cotLogin = null;
		this.defaultVC = null;
		this.menu = null;
		this.vcClasses = null;
	}
	closeVC(vc, resolve = () => {}, reject = () => {}) {
		for (const menu of this.menu) {
			if (menu.vc === vc) {
				menu.vc = null;
			}
		}
		super.closeVC(vc, resolve, reject);
	}
	render_always(resolve = () => {}, reject = () => {}) {
		this.$view.filter('.requireLogin').hide();
		this.render_always_login(() => {
			this.render_always_vc(() => {
				this.render_always_menu(resolve, reject);
			}, reject);
		}, reject);
	}
	render_always_login(resolve = () => {}, reject = () => {}) {
		const $login = this.$view.find('.navbar-login').empty();
		if (this.cotLogin == null) {
			// No UI
		} else {
			if (this.cotLogin.isLoggedIn()) {
				$login.append(`
						<form class="navbar-form navbar-left">
							<p class="form-control-static">${this.cotLogin.username}</p>
							<button class="btn btn-default btn-logout" type="button">Logout</button>
						</form>
					`).find('.btn-logout').on('click', (e) => {
					e.preventDefault();
					this.cotLogin.logout();
				});
			} else {
				$login.append(`
						<form class="navbar-form navbar-left">
							<button class="btn btn-default btn-login" type="button">Login</button>
						</form>
					`).find('.btn-login').on('click', (e) => {
					e.preventDefault();
					this.cotLogin.showLogin();
				});
			}
		}
		resolve();
	}
	render_always_menu(resolve = () => {}, reject = () => {}) {
		const $menu = this.$view.find('.navbar-menu');
		$menu.html(`
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li role="separator" class="divider"></li>
						<li><a href="#">Dynamic Item</a></li>
						<li><a href="#">Dynamic Item</a></li>
						<li><a href="#">Dynamic Item</a></li>
						<li><a href="#">Dynamic Item</a></li>
					</ul>
				</li>
			</ul>
		`);

		const $dropDownMenu = $menu.find('ul.dropdown-menu').empty();

		if (this.menu != null) {
			for (const menu of this.menu) {
				const $menuItem = $(`<li><a href="#">${menu.title}</a></li>`);
				$dropDownMenu.append($menuItem);
				$menuItem.find('a').on('click', (e) => {
					e.preventDefault();
					if (menu.vc == null) {
						menu.vc = new this.vcClasses[menu.vcClass]();
						menu.vc.options = menu.vcOptions;
					}
					this.openVC(menu.vc);
				});
			}
		}

		const vcs = this.vcs.filter((vc) => vc.title != null);

		if (this.menu != null & this.menu.length > 0 && vcs != null && vcs.length > 0) {
			$dropDownMenu.append($('<li role="separator" class="divider"></li>'));
		}

		if (vcs != null) {
			for (const vc of vcs) {
				const $menuItem = $(`<li><a href="#">${vc.title || 'Untitled'}</a></li>`);
				$dropDownMenu.append($menuItem);
				$menuItem.find('a').on('click', (e) => {
					e.preventDefault();
					this.openVC(vc);
				});
			}
		}

		resolve();
	}
	render_always_vc(resolve = () => {}, reject = () => {}) {
		if (this.vcs == null || this.vcs.length == 0) {
			if (this.defaultVC.vc == null) {
				this.defaultVC.vc = new this.vcClasses[this.defaultVC.vcClass]();
				this.defaultVC.vc.options = this.defaultVC.vcOptions;
			}
			this.openVC(this.defaultVC.vc, resolve, reject);
		} else {
			super.render_always_vc(resolve, reject);
		}
	}
	render_once(resolve = () => {}, reject = () => {}) {
		if (this.cotLogin != null) {
			this.cotLogin.options.onLogin = () => {
				this.render();
			}
		}

		this.$view = $(`
			<nav class="navbar navbar-default navvc">
				<div class="container-fluid">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<span class="navbar-brand"></span>
					</div>
					<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<div class="navbar-left">
							<div class="navbar-vc-ui"></div>
						</div>
						<div class="navbar-right">
							<div class="navbar-menu"></div>
							<div class="navbar-login"></div>
							<div class="navbar-lock"></div>
						</div>
					</div>
				</div>
			</nav>
			<div class="requireLogin">
				<p>Please login.</p>
			</div>
		`);
		$('.navbar-lock', this.$view.filter('.navbar')).append($('.securesite > img'));
		$('#app-content-top > div').append(this.$view);

		resolve();
	}
}
