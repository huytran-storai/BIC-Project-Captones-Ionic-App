'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountPageModule.html" data-type="entity-link" >AccountPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"' : 'data-bs-target="#xs-components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"' :
                                            'id="xs-components-links-module-AccountPageModule-1e5d1dd867f7397f8e43a7740e21b49d095681f9e7ef16659ac0717e3dc3f1b7c7009a55485729fe3505a66c7a98f572252b78b0c47d91fc8c0d1e895795a50c"' }>
                                            <li class="link">
                                                <a href="components/AccountPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountPageRoutingModule.html" data-type="entity-link" >AccountPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"' : 'data-bs-target="#xs-components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"' :
                                            'id="xs-components-links-module-AppModule-0fac1a60c96e0e2dc18321f7f3af10cd176f21e5533f224b697b8de3ce16e0c3281927ac5f2fb1203424601eee371695a7ec9c73e85b770221ecf5e2381b5357"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentPageModule.html" data-type="entity-link" >DepartmentPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"' : 'data-bs-target="#xs-components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"' :
                                            'id="xs-components-links-module-DepartmentPageModule-716fb4e873707445b4b6be36b73912a5dbae3ad418ee19d3269795a4b49daaca125b4c94eb1ea672b708c6a246acc192657d22a41564cf8fb1208030895e98c7"' }>
                                            <li class="link">
                                                <a href="components/DepartmentPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentPageRoutingModule.html" data-type="entity-link" >DepartmentPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentResultPageModule.html" data-type="entity-link" >DepartmentResultPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"' : 'data-bs-target="#xs-components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"' :
                                            'id="xs-components-links-module-DepartmentResultPageModule-845524c16d4ca7c951af361312a78ff093bdd50864709d019c9f0ec54a1222d37f96815639591adcb62d28509a82c1bec58976137acf8f9429f1d97fa4cb420d"' }>
                                            <li class="link">
                                                <a href="components/DepartmentResultPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepartmentResultPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DepartmentResultPageRoutingModule.html" data-type="entity-link" >DepartmentResultPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordPageModule.html" data-type="entity-link" >ForgotPasswordPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"' : 'data-bs-target="#xs-components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"' :
                                            'id="xs-components-links-module-ForgotPasswordPageModule-a18d63aa7d84186d58694e8412821355fe1553d28a1e23043f19dcb58a31e780c9aea6f92bc1b7bca01bd2da2cfd8ce381240e2940fe938265b3359c38c82f7b"' }>
                                            <li class="link">
                                                <a href="components/ForgotPasswordPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ForgotPasswordPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForgotPasswordPageRoutingModule.html" data-type="entity-link" >ForgotPasswordPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"' : 'data-bs-target="#xs-components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"' :
                                            'id="xs-components-links-module-HomePageModule-23868900fbd874419df681920ee6d85c117e4628b81a21a3b6f808fb7d08acc095a663cda3469f198f1cfeaab66e973c4aa5ba2564d12508a02fafdde5b6c532"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogInPageModule.html" data-type="entity-link" >LogInPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"' : 'data-bs-target="#xs-components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"' :
                                            'id="xs-components-links-module-LogInPageModule-a9f41d07fe099a17b619c759eb652a6859900b3b8550fb334ef9647e23f50f1a15b4b2dbde2680ee95f94c0a25b15f9de7a175e86000fba0b8dc1c857703bf0c"' }>
                                            <li class="link">
                                                <a href="components/LogInPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogInPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogInPageRoutingModule.html" data-type="entity-link" >LogInPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' :
                                            'id="xs-components-links-module-ProfilePageModule-31132f6849536d25eb665692c7c375969564eab3e5ce2541b31f8f4dd977878b42584963289b067a5f23b929fa716116c4c916421b51b50e73cc0473c6f2cec9"' }>
                                            <li class="link">
                                                <a href="components/ProfilePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SearchProductPageModule.html" data-type="entity-link" >SearchProductPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"' : 'data-bs-target="#xs-components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"' :
                                            'id="xs-components-links-module-SearchProductPageModule-a70c6f1b3898b90cce2cf6e21aa45961a5d387bc902a8b193ead24bd353f2debf82c964e711603dcb6c963bd9912f1abad0e1356423d643f3865b24eec51fdca"' }>
                                            <li class="link">
                                                <a href="components/SearchProductPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchProductPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchProductPageRoutingModule.html" data-type="entity-link" >SearchProductPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ShareModule.html" data-type="entity-link" >ShareModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"' : 'data-bs-target="#xs-components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"' :
                                            'id="xs-components-links-module-ShareModule-d03244f9df4d5999ccf204ab05d0994a7c1b121f1a40de8b28c6c1fad6674f8d8a078b2810a9960084841377b0d7d77e2b6368ea8554b6941c1bccfae5be9a7f"' }>
                                            <li class="link">
                                                <a href="components/CheckoutIconComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabmenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabmenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShoppingCartPageModule.html" data-type="entity-link" >ShoppingCartPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"' : 'data-bs-target="#xs-components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"' :
                                            'id="xs-components-links-module-ShoppingCartPageModule-6d856991d895fd3a19629556c459180d09c55ff529f8ffd39ab0539855bd8d12688f561476576574e02a1229c40d8ffece2bf7d03563f38276bf3ab2dc3e57b4"' }>
                                            <li class="link">
                                                <a href="components/ShoppingCartPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingCartPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShoppingCartPageRoutingModule.html" data-type="entity-link" >ShoppingCartPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SignUpPageModule.html" data-type="entity-link" >SignUpPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"' : 'data-bs-target="#xs-components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"' :
                                            'id="xs-components-links-module-SignUpPageModule-a50ce1ae929eae9583af111b2afe0c6aab02319382f6537a02dd108540a563fb3e21ef85fade29f5e56ef4ea139ce4685bdf9530b801d009cfd6990b38e503ec"' }>
                                            <li class="link">
                                                <a href="components/SignUpPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SignUpPageRoutingModule.html" data-type="entity-link" >SignUpPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Store.html" data-type="entity-link" >Store</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/StoreService.html" data-type="entity-link" >StoreService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});