/** Model controller class. */
class MC {

  /**
   * Creates a model controller.
   * @param {object} model        - The model. Holds data.
   * @param {string} url          - The url to an oData endpoint.
   * @param {object} ajaxSettings - The jQuery.ajax settings.
   */
  constructor(model = {}, url, ajaxSettings) {
    this.model = model;
    this.url = url;
    this.ajaxSettings = $.extend({
      contentType: 'application/json; charset=UTF-8'
    }, ajaxSettings);
  }

  /** Perform a (fake) HTTP DELETE. Override to implement true HTTP DELETE.  */
  httpDelete() {
    this.model = {
      id: this.model.id,
      __Status: 'DEL'
    }
    return this.httpPatch();
  }

  /**
   * Perform an HTTP GET and populate the model.
   * @param {object} id - The record's ID to load.
   */
  httpGet(id) {
    return new Promise((resolve, reject) => {
      $.ajax($.extend({}, this.ajaxSettings, {
        error: (errorThrown) => {
          reject(errorThrown);
        },
        method: 'GET',
        success: (data) => {
          resolve(data);
        },
        url: `${this.url}('${id}')`
      }));
    }).then((data) => {
      return this.model = data;
    });
  }

  /** Perform an HTTP PATCH */
  httpPatch() {
    return new Promise((resolve, reject) => {
      $.ajax($.extend({}, this.ajaxSettings, {
        data: JSON.stringify(this.model),
        error: (errorThrown) => {
          reject(errorThrown);
        },
        method: 'PATCH',
        success: (data) => {
          resolve(data);
        },
        url: `${this.url}('${this.model.id}')`
      }));
    });
  }

  /** Perform an HTTP POST */
  httpPost() {
    return new Promise((resolve, reject) => {
      this.model.id = null;
      $.ajax($.extend({}, this.ajaxSettings, {
        data: JSON.stringify(this.model),
        error: (errorThrown) => {
          reject(errorThrown);
        },
        method: 'POST',
        success: (data) => {
          resolve(data);
        },
        url: this.url
      }));
    }).then((data) => {
      this.model.id = data.id;
      return data;
    });
  }

  /** Perform an HTTP PUT */
  httpPut() {
    return new Promise((resolve, reject) => {
      $.ajax($.extend({}, this.ajaxSettings, {
        data: JSON.stringify(this.model),
        error: (errorThrown) => {
          reject(errorThrown);
        },
        method: 'PUT',
        success: (data) => {
          resolve(data);
        },
        url: `${this.url}('${this.model.id}')`
      }));
    });
  }
}

/** CotModel model controller class. */
class BackboneModelMC extends MC {

  /**
   * Create a CotModel model controller.
   * @param {Backbone.Model} bbModel - The model using Backbone.JS.
   * @param {string} url             - The url to an oData endpoint.
   * @param {object} ajaxSettings    - The jQuery.ajax settings.
   */
  constructor(bbModel, url, ajaxSettings) {
    super(undefined, url, ajaxSettings);
    this.bbModel = bbModel;
  }

  /** Perform a (fake) HTTP DELETE. Override to implement true HTTP DELETE.  */
  httpDelete() {
    const id = this.bbModel.get('id');
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
  httpGet(id) {
    return super.httpGet(id).then((data) => {
      this.bbModel.set(this.model);
      return data;
    });
  }

  /** Perform an HTTP PATCH */
  httpPatch() {
    this.model = this.bbModel.toJSON();
    return super.httpPatch();
  }

  /** Perform an HTTP POST */
  httpPost() {
    this.model = this.bbModel.toJSON();
    return super.httpPost().then((data) => {
      this.bbModel.set('id', this.model.id);
      return data;
    });
  }

  /** Perform an HTTP PUT */
  httpPut() {
    this.model = this.bbModel.toJSON();
    return super.httpPut();
  }
}

/** View controller class. */
class VC {

  /** Create a view controller. */
  constructor() {
    this.$view = $('<div></div>');
    this.renderedOnce = false;
  }

  /** Hide view controller's view. */
  hide() {
    return this.$view.fadeOut(400).promise();
  }

  /** Remove view controller's view from the DOM. */
  remove() {
    return new Promise((resolve, reject) => {
      this.$view.remove();
      this.renderedOnce = false;
      resolve();
    });
  }

  /**
   * Render view controller's view. Called to render changes on the view.
   * @param {object} options
   */
  render(options = {}) {
    // console.log('VC - RENDER');
    return new Promise((resolve, reject) => {
      if (!this.renderedOnce) {
        this.renderedOnce = true;
        this.render_once(options || {}).then(resolve, reject);
      } else {
        resolve();
      }
    }).then(() => {
      // console.log('VC - THEN');
      return this.render_always(options || {});
    });
  }

  /**
   * Called by the view controller ever time the render method is called.
   * @param {object} options
   */
  render_always(options = {}) {
		// console.log('VC -> RENDER ALWAYS');

    return Promise.resolve();
  }

  /**
   * Called by the view controller the first time the render method is called.
   * Use to append the view controller's view to the view target.
   * @param {object} options
   */
  render_once(options = {}) {
		// console.log('VC -> RENDER ONCE');

    if (options.$target) {
      $(options.$target).append(this.$view);
    }
    return Promise.resolve();
  }

  /** Show view controller's view. */
  show() {
    return this.$view.fadeIn(400).promise();
  }
}

/**
 * Navigation View Controller Class.
 * Help manage and navigate multiple view controllers.
 */
class NavVC extends VC {

  /** Create a navigation view controller. */
  constructor() {
    super();
    this.vcs = [];
  }

  closeVC(vc) {
		// console.log('NAVVC -> CLOSE VC');

    return new Promise((resolve, reject) => {
      // Step 1.

      if (this.vcs.length > 0 && this.vcs[this.vcs.length - 1] === vc) {
        this.vcs.pop();
      }

      if (this.vcs.length == 0) {
        vc.hide().then(() => {
          resolve();
        }, () => {
          reject();
        });
      } else {
        const topVC = this.vcs.pop();
        this.vcs.push(vc, topVC);
        resolve();
      }
    }).then(() => {
      // Step 2.

      return this.render();
    }).then(() => {
      // Step 3.

      if (this.vcs.length > 0) {
        const i = this.vcs.indexOf(vc);
        if (i > -1) {
          this.vcs.splice(i, 1);
          return this.render_always_menu(); // TODO - Hmmm rendered twice...
        }
      }

      return Promise.resolve();
    }).then(() => {
      // Step 4.

      return vc.remove();
    });
  }

  openVC(vc, vcOptions = {}) {
    // console.log('NAVVC - OPEN VC');
    const i = this.vcs.indexOf(vc);
    if (i > -1) {
      this.vcs.splice(i, 1);
    }

    vc.navVC = this;
    this.vcs.push(vc);

    return this.render({ vcOptions: vcOptions || {} });
  }

  render_always(options = {}) {
		// console.log('NAVVC -> RENDER ALWAYS');

    if (this.vcs.length > 0) {
      return new Promise((resolve, reject) => {
				// console.log('Step 1.');
        // Step 1.

        if (this.vcs.length > 1) {
          this.vcs[this.vcs.length - 2].hide().then(resolve, reject);
        } else {
          resolve();
        }
      }).then(() => {
				// console.log('Step 2.');
        // Step 2.

        const topVC = this.vcs[this.vcs.length - 1];
				// console.log('topVC', topVC);
        return topVC.render(options.vcOptions || {}).then(() => {
					// console.log('topVC -> show');
          return topVC.show();
        });
      });
    }

    return Promise.resolve();
  }
}

/** Navigation bar view controller class. */
class NavbarVC extends NavVC {

  /** Create a navigation bar view controller. */
  constructor(vcClasses = {}, menu = [], cotLogin) {
    super();
    this.vcClasses = vcClasses;
    this.menu = menu;
    this.cotLogin = cotLogin;

    this.ajaxSettings = {
      headers: {}
    }
  }

  /** Create a view controller. */
  closeVC(vc) {
		// console.log('NAVBARVC -> CLOSEVC');

    for (const menu of this.menu) {
      if (menu.vc === vc) {
        menu.vc = null;
        break;
      }
    }

    return super.closeVC(vc);
  }

  openVC(vc, vcOptions = {}) {
    // console.log('NAVBARVC - OPEN VC');
    if (typeof vc === 'string') {
      const vcClass = vc;
      vc = new this.vcClasses[vcClass]();
      vc.vcClass = vcClass;
    }

    return super.openVC(vc, vcOptions || {});
  }

  render_always(options = {}) {
		// console.log('NAVBARVC -> RENDER ALWAYS');

    return this.render_always_login(options || {}).then(() => {
      return super.render_always(options || {});
    }).then(() => {
			// console.log('NAVBARVC -> RENDER ALWAYS -> CALL');
      return this.render_always_menu(options || {});
    });
  }

  render_always_login(options = {}) {
		// console.log('NAVBARVC -> RENDER ALWAYS LOGIN');

    this.$view_navbar_login.empty();

    if (this.cotLogin == null) {
      // No UI
    } else {
      if (this.cotLogin.isLoggedIn()) {
        this.$view_navbar_login.append(`<form class="navbar-form navbar-left"><p class="form-control-static">${this.cotLogin.username}</p> <button class="btn btn-default btn-logout" type="button">Logout</button></form>`);

        $('.btn-logout', this.$view_navbar_login).on('click', (e) => {
          e.preventDefault();
          this.cotLogin.logout();
        });
      } else {
        this.$view_navbar_login.append('<form class="navbar-form navbar-left"><button class="btn btn-default btn-login" type="button">Login</button></form>');

        $('.btn-login', this.$view_navbar_login).on('click', (e) => {
          e.preventDefault();
          this.cotLogin.showLogin();
        });
      }
    }

		// console.log('NAVBARVC -> RENDER ALWAYS LOGIN -> RESOLVE');
    return Promise.resolve();
  }

  render_always_menu(options = {}) {
    this.$view_navbar_menu.empty().append('<ul class="nav navbar-nav"><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Navigation <span class="caret"></span></a><ul class="dropdown-menu"></ul></li></ul>');

    const $dropDownMenu = $('ul.dropdown-menu', this.$view_navbar_menu);

    if (this.menu != null) {
      for (const menu of this.menu) {
				const $menuItem = $(`<li><a href="#">${menu.title}</a></li>`);
        $dropDownMenu.append($menuItem);

        $('a', $menuItem).on('click', (e) => {
          e.preventDefault();
          if (menu.vc == null) {
            // menu.vc = new this.vcClasses[menu.vcClass]();
            // this.openVC(menu.vc, menu.vcOptions);
            this.openVC(menu.vcClass, menu.vcOptions || {}).then(() => {
              menu.vc = this.vcs[this.vcs.length - 1];
            });
          } else {
            this.openVC(menu.vc);
          }
        });
      }
    }

		// console.log(2);

    const vcs = this.vcs.filter((vc) => vc.title != null);

    if (this.menu != null & this.menu.length > 0 && vcs != null && vcs.length > 0) {
      $dropDownMenu.append($('<li role="separator" class="divider"></li>'));
    }

		// console.log(3);

    if (vcs != null) {
      for (const vc of vcs) {
        const $menuItem = $(`<li><a href="#">${vc.title || 'Untitled'}</a></li>`);
        $dropDownMenu.append($menuItem);
        $('a', $menuItem).on('click', (e) => {
          e.preventDefault();
          this.openVC(vc);
        });
      }
    }

		// console.log('NAVBARVC -> RENDER ALWAYS MENU -> RESOLVE');
    return Promise.resolve();
  }

  render_once(options = {}) {
		// console.log('NAVBARVC -> RENDER ONCE');

    return this.render_once_login(options || {}).then(() => {
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
								<div class="nav navbar-nav navbar-vc-ui"></div>
							</div>
							<div class="navbar-right">
								<div class="nav navbar-nav navbar-menu"></div>
								<div class="nav navbar-nav navbar-login"></div>
								<div class="nav navbar-nav navbar-lock"></div>
							</div>
						</div>
					</div>
				</nav>
			`);

      this.$view_navbar_brand = $('.navbar-brand', this.$view);
      this.$view_navbar_vc_ui = $('.navbar-vc-ui', this.$view);
      this.$view_navbar_menu = $('.navbar-menu', this.$view);
      this.$view_navbar_login = $('.navbar-login', this.$view);

      // LOCK ICON
      $('.navbar-lock', this.$view).append($('.securesite > img'));

      return super.render_once(options || {});
    });
  }

  render_once_login(options = {}) {
		// console.log('NAVBARVC -> RENDER ONCE LOGIN');

    if (this.cotLogin) {
      if (this.cotLogin.isLoggedIn()) {
        // this.ajaxSettings.headers.Authorization = `AuthSession ${cotLogin.sid}`;
        this.ajaxSettings.headers.Authorization = this.cotLogin.sid;
      }
      this.cotLogin.options.onLogin = () => {
        if (this.cotLogin.isLoggedIn()) {
          this.ajaxSettings.headers.Authorization = this.cotLogin.sid;
        }
        this.render();
      }
    }

    return Promise.resolve();
  }
}

/** Require Login View Controller */
class RequireLoginVC extends VC {
  render_once(options = {}) {
    this.$view = $(`
			<div>
				<p>Please login</p>
			</div>
		`);
    return super.render_once(options || {});
  }
}
