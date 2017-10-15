/**
 Model Controller
 Properties:
 - model
 - url
 */
class MC {
	httpDelete() {
		this.model = {
			id: this.model.id,
			__Status: 'DEL'
		}
		return this.httpPatch();
	}
	httpGet(id) {
		return new Promise((resolve, reject) => {
			$.ajax(`${this.url}('${id}')`, {
				error: (jqXHR, textStatus, errorThrown) => {
					reject(this, jqXHR, textStatus, errorThrown);
				},
				method: 'GET',
				success: (data, textStatus, jqXHR) => {
					resolve(this, data, textStatus, jqXHR);
				}
			});
		});
	}
	httpPatch() {
		return new Promise((resolve, reject) => {
			$.ajax(`${this.url}('${this.model.id}')`, {
				data: JSON.stringify(this.model),
				error: (jqXHR, textStatus, errorThrown) => {
					reject(this, jqXHR, textStatus, errorThrown);
				},
				method: 'PATCH',
				success: (data, textStatus, jqXHR) => {
					resolve(this, textStatus, jqXHR);
				}
			});
		});
	}
	httpPost() {
		return new Promise((resolve, reject) => {
			this._model.id = null;
			$.ajax(this.url, {
				data: JSON.stringify(this.model),
				error: (jqXHR, textStatus, errorThrown) => {
					reject(this, jqXHR, textStatus, errorThrown);
				},
				method: 'POST',
				success: (data, textStatus, jqXHR) => {
					this._model.id = jqXHR.getResponseHeader('OData-EntityID');
					resolve(this, data, textStatus, jqXHR);
				}
			});
		});
	}
	httpPut() {
		return new Promise((resolve, reject) => {
			$.ajax(`${this.url}('${this.model.id}')`, {
				data: JSON.stringify(this.model),
				error: (jqXHR, textStatus, errorThrown) => {
					reject(this, jqXHR, textStatus, errorThrown);
				},
				method: 'PUT',
				success: (data, textStatus, jqXHR) => {
					resolve(this, data, textStatus, jqXHR);
				}
			});
		});
	}
}

/**
 CotModel Model Controller
 Property:
 - cotModel
 */
class CotModelMC extends MC {
	httpDelete() {
		this.model = this.cotModel.toJSON();
		return super.httpDelete();
	}
	httpGet(id) {
		return super.httpGet(id).then(() => {
			this._cotModel.set(this.model);
		});
	}
	httpPatch() {
		this.model = this.cotModel.toJSON();
		return super.httpPatch();
	}
	httpPost() {
		this.model = this.cotModel.toJSON();
		return super.httpPost().then(() => {
			this.cotModel.set('id', this.model.id);
		});
	}
	httpPut() {
		this.model = this.cotModel.toJSON();
		return super.httpPut();
	}
}

/** View Controller */
class VC {
	remove() {
		return Promise.resolve();
	}
	render() {
		return new Promise((resolve, reject) => {
			(this.renderedOnce != true ? (() => {
				this.renderedOnce = true;
				return this.render_once();
			})() : Promise.resolve()).then(() => {
				this.render_always().then(() => {
					resolve();
				}, () => {
					reject();
				});
			});
		});
	}
	render_always() {
		return Promise.resolve();
	}
	remove_once() {
		return Promise.resolve();
	}
}

class NavVC extends VC {
	closeVC(vc) {
		return new Promise((resolve, reject) => {
			if (this.vcs != null && this.vcs.length > 0 && this.vcs[this.vcs.length - 1] == vc) {
				this.vcs.pop();
				if (this.vcs.length > 0) {
					const topVC = this.vcs.pop();
					this.vcs.push(vc, topVC);
				} else {
					this.vcs.$view.hide();
				}
			}
			this.render().then(() => {
				const idx = this.vcs.indexOf(vc);
				if (idx != -1) {
					this.vcs.splice(idx, 1);
				}
				vc.remove().then(() => {
					resolve();
				});
			});
		});
	}
	openVC(vc) {
		if (this.vcs == null) {
			this.vcs = [];
		}
		const idx = this.vcs.indexOf(vc);
		if (idx != -1) {
			this.vcs.splice(idx, 1);
		}
		this.vcs.push(vc);
		return this.render();
	}
	render_always() {
		return this.render_always_vc();
	}
	render_always_vc() {
		if (this.vcs == null || this.vcs.length == 0) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			(new Promise((resolve, reject) => {
				if (this.vcs.length > 1) {
					this.vcs[this.vcs.length - 2].$view.fadeOut(() => {
						resolve();
					});
				} else {
					resolve();
				}
			})).then(() => {
				const topVC = this.vcs[this.vcs.length - 1];
				topVC.navbarVC = this;
				topVC.render().then(() => {
					topVC.$view.fadeIn(() => {
						resolve();
					});
				});
			});
		})
		;
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
 - vcs
 */
class NavbarVC extends NavVC {
	render_always() {
		return new Promise((resolve, reject) => {
			this.$view.filter('.requireLogin').hide();
			Promise.all([
				this.render_always_login(),
				new Promise((resolve, reject) => {
					this.render_always_vc().then(() => {
						this.render_always_menu().then(() => {
							resolve();
						})
					})
				})
			]).then(() => {
				resolve();
			}, () => {
				reject();
			});
		});
	}
	render_always_login() {
		return new Promise((resolve, reject) => {
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
		});
	}
	render_always_menu() {
		return new Promise((resolve, reject) => {
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
		});
	}
	render_always_vc() {
		if (this.vcs == null || this.vcs.length == 0) {
			if (this.defaultVC.vc == null) {
				this.defaultVC.vc = new this.vcClasses[this.defaultVC.vcClass]();
			}
			return this.openVC(this.defaultVC.vc);
		}

		return this.super.render_always_vc();
	}
	render_once() {
		return new Promise((resolve, reject) => {
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
		});
	}
}
