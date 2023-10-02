'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);
  var _super = _createSuper(_class);
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">client documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AccountPageModule.html\" data-type=\"entity-link\" >AccountPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"' : 'data-bs-target="#xs-components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"' : 'id="xs-components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AccountPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AccountPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AccountPageRoutingModule.html\" data-type=\"entity-link\" >AccountPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"' : 'data-bs-target="#xs-components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"' : 'id="xs-components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/DepartmentPageModule.html\" data-type=\"entity-link\" >DepartmentPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"' : 'data-bs-target="#xs-components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"' : 'id="xs-components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/DepartmentPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DepartmentPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/DepartmentPageRoutingModule.html\" data-type=\"entity-link\" >DepartmentPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/DepartmentResultPageModule.html\" data-type=\"entity-link\" >DepartmentResultPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"' : 'data-bs-target="#xs-components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"' : 'id="xs-components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/DepartmentResultPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DepartmentResultPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/DepartmentResultPageRoutingModule.html\" data-type=\"entity-link\" >DepartmentResultPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ForgotPasswordPageModule.html\" data-type=\"entity-link\" >ForgotPasswordPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"' : 'data-bs-target="#xs-components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"' : 'id="xs-components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ForgotPasswordPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ForgotPasswordPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ForgotPasswordPageRoutingModule.html\" data-type=\"entity-link\" >ForgotPasswordPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/HomePageModule.html\" data-type=\"entity-link\" >HomePageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"' : 'data-bs-target="#xs-components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"' : 'id="xs-components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/HomePage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HomePage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/HomePageRoutingModule.html\" data-type=\"entity-link\" >HomePageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/LogInPageModule.html\" data-type=\"entity-link\" >LogInPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"' : 'data-bs-target="#xs-components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"' : 'id="xs-components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/LogInPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LogInPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/LogInPageRoutingModule.html\" data-type=\"entity-link\" >LogInPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProfilePageModule.html\" data-type=\"entity-link\" >ProfilePageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' : 'id="xs-components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ProfilePage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProfilePage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ProfilePageRoutingModule.html\" data-type=\"entity-link\" >ProfilePageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SearchProductPageModule.html\" data-type=\"entity-link\" >SearchProductPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"' : 'data-bs-target="#xs-components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"' : 'id="xs-components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/SearchProductPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SearchProductPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SearchProductPageRoutingModule.html\" data-type=\"entity-link\" >SearchProductPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ShareModule.html\" data-type=\"entity-link\" >ShareModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"' : 'data-bs-target="#xs-components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"' : 'id="xs-components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/CheckoutIconComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CheckoutIconComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/NewsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NewsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ProductDetailsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProductDetailsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ProductListComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ProductListComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/TabmenuComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TabmenuComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ShoppingCartPageModule.html\" data-type=\"entity-link\" >ShoppingCartPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"' : 'data-bs-target="#xs-components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"' : 'id="xs-components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/ShoppingCartPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ShoppingCartPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/ShoppingCartPageRoutingModule.html\" data-type=\"entity-link\" >ShoppingCartPageRoutingModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SignUpPageModule.html\" data-type=\"entity-link\" >SignUpPageModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"' : 'data-bs-target="#xs-components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"' : 'id="xs-components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/SignUpPage.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SignUpPage</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SignUpPageRoutingModule.html\" data-type=\"entity-link\" >SignUpPageRoutingModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/Store.html\" data-type=\"entity-link\" >Store</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Tag.html\" data-type=\"entity-link\" >Tag</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/StoreService.html\" data-type=\"entity-link\" >StoreService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));