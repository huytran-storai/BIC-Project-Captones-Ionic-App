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
                                            'data-bs-target="#components-links-module-AccountPageModule-0e3fb2d853a177872130766ecd2e2053d3f2a7105250133e76968ef8c83bb8892e92c458536d970ccbbf3699e7337392ad1d636140a23260f61ca9c841adb1f6"' : 'data-bs-target="#xs-components-links-module-AccountPageModule-0e3fb2d853a177872130766ecd2e2053d3f2a7105250133e76968ef8c83bb8892e92c458536d970ccbbf3699e7337392ad1d636140a23260f61ca9c841adb1f6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountPageModule-0e3fb2d853a177872130766ecd2e2053d3f2a7105250133e76968ef8c83bb8892e92c458536d970ccbbf3699e7337392ad1d636140a23260f61ca9c841adb1f6"' :
                                            'id="xs-components-links-module-AccountPageModule-0e3fb2d853a177872130766ecd2e2053d3f2a7105250133e76968ef8c83bb8892e92c458536d970ccbbf3699e7337392ad1d636140a23260f61ca9c841adb1f6"' }>
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
                                            'data-bs-target="#components-links-module-AppModule-0206a3b9549b364efa2153882f131979c61310a66f061af35199a0d6541693a5322db0e150ab96e355ef3dfd61fc8908ac502ed07549022b23e8e6313573acca"' : 'data-bs-target="#xs-components-links-module-AppModule-0206a3b9549b364efa2153882f131979c61310a66f061af35199a0d6541693a5322db0e150ab96e355ef3dfd61fc8908ac502ed07549022b23e8e6313573acca"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0206a3b9549b364efa2153882f131979c61310a66f061af35199a0d6541693a5322db0e150ab96e355ef3dfd61fc8908ac502ed07549022b23e8e6313573acca"' :
                                            'id="xs-components-links-module-AppModule-0206a3b9549b364efa2153882f131979c61310a66f061af35199a0d6541693a5322db0e150ab96e355ef3dfd61fc8908ac502ed07549022b23e8e6313573acca"' }>
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
                                            'data-bs-target="#components-links-module-DepartmentPageModule-c3e06ebc91e5d0b27f2846d29cf609e6ed48d765acb87434bd09180329265926d53f0e437563b85f10c476ea0280702fdb39c1882d038d61772720a91efece79"' : 'data-bs-target="#xs-components-links-module-DepartmentPageModule-c3e06ebc91e5d0b27f2846d29cf609e6ed48d765acb87434bd09180329265926d53f0e437563b85f10c476ea0280702fdb39c1882d038d61772720a91efece79"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentPageModule-c3e06ebc91e5d0b27f2846d29cf609e6ed48d765acb87434bd09180329265926d53f0e437563b85f10c476ea0280702fdb39c1882d038d61772720a91efece79"' :
                                            'id="xs-components-links-module-DepartmentPageModule-c3e06ebc91e5d0b27f2846d29cf609e6ed48d765acb87434bd09180329265926d53f0e437563b85f10c476ea0280702fdb39c1882d038d61772720a91efece79"' }>
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
                                            'data-bs-target="#components-links-module-DepartmentResultPageModule-7c74f5df07b06ed3d28885396865895b6a332ebe09a36d315ccbfa45dab155cabb8c331c861c9f082f16528b5d414541f37d5fa302823ebe1dcd5282ae051e65"' : 'data-bs-target="#xs-components-links-module-DepartmentResultPageModule-7c74f5df07b06ed3d28885396865895b6a332ebe09a36d315ccbfa45dab155cabb8c331c861c9f082f16528b5d414541f37d5fa302823ebe1dcd5282ae051e65"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DepartmentResultPageModule-7c74f5df07b06ed3d28885396865895b6a332ebe09a36d315ccbfa45dab155cabb8c331c861c9f082f16528b5d414541f37d5fa302823ebe1dcd5282ae051e65"' :
                                            'id="xs-components-links-module-DepartmentResultPageModule-7c74f5df07b06ed3d28885396865895b6a332ebe09a36d315ccbfa45dab155cabb8c331c861c9f082f16528b5d414541f37d5fa302823ebe1dcd5282ae051e65"' }>
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
                                            'data-bs-target="#components-links-module-ForgotPasswordPageModule-48c60eefef1baf45b4b4aefd2b874728c83cc43513fd32fa3580c7f5793b33cc83ee1fa1bf3a06e01a927afa6b8cfb60d049b607f720017f792bd059daafbb6c"' : 'data-bs-target="#xs-components-links-module-ForgotPasswordPageModule-48c60eefef1baf45b4b4aefd2b874728c83cc43513fd32fa3580c7f5793b33cc83ee1fa1bf3a06e01a927afa6b8cfb60d049b607f720017f792bd059daafbb6c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForgotPasswordPageModule-48c60eefef1baf45b4b4aefd2b874728c83cc43513fd32fa3580c7f5793b33cc83ee1fa1bf3a06e01a927afa6b8cfb60d049b607f720017f792bd059daafbb6c"' :
                                            'id="xs-components-links-module-ForgotPasswordPageModule-48c60eefef1baf45b4b4aefd2b874728c83cc43513fd32fa3580c7f5793b33cc83ee1fa1bf3a06e01a927afa6b8cfb60d049b607f720017f792bd059daafbb6c"' }>
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
                                            'data-bs-target="#components-links-module-HomePageModule-5dde33ca855fc3ebf40c90a8fa1f4863bcd668d3cc05677c8fff4c32ef9c39c2fe00f9110b6770146b11b1b3338f4755a89f806f83b34102fbf2a0d7272473d6"' : 'data-bs-target="#xs-components-links-module-HomePageModule-5dde33ca855fc3ebf40c90a8fa1f4863bcd668d3cc05677c8fff4c32ef9c39c2fe00f9110b6770146b11b1b3338f4755a89f806f83b34102fbf2a0d7272473d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-5dde33ca855fc3ebf40c90a8fa1f4863bcd668d3cc05677c8fff4c32ef9c39c2fe00f9110b6770146b11b1b3338f4755a89f806f83b34102fbf2a0d7272473d6"' :
                                            'id="xs-components-links-module-HomePageModule-5dde33ca855fc3ebf40c90a8fa1f4863bcd668d3cc05677c8fff4c32ef9c39c2fe00f9110b6770146b11b1b3338f4755a89f806f83b34102fbf2a0d7272473d6"' }>
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
                                            'data-bs-target="#components-links-module-LogInPageModule-c75d8bb603edcb070fdcebea0570011b835f7d33abdc46d96d87d8dbf64db97dc5307b885be7f6b3508578ba53a442cb7fde7f3354ad544a0eef571941940a91"' : 'data-bs-target="#xs-components-links-module-LogInPageModule-c75d8bb603edcb070fdcebea0570011b835f7d33abdc46d96d87d8dbf64db97dc5307b885be7f6b3508578ba53a442cb7fde7f3354ad544a0eef571941940a91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LogInPageModule-c75d8bb603edcb070fdcebea0570011b835f7d33abdc46d96d87d8dbf64db97dc5307b885be7f6b3508578ba53a442cb7fde7f3354ad544a0eef571941940a91"' :
                                            'id="xs-components-links-module-LogInPageModule-c75d8bb603edcb070fdcebea0570011b835f7d33abdc46d96d87d8dbf64db97dc5307b885be7f6b3508578ba53a442cb7fde7f3354ad544a0eef571941940a91"' }>
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
                                            'data-bs-target="#components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' : 'data-bs-target="#xs-components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' :
                                            'id="xs-components-links-module-ProfilePageModule-b95716036bc23629a31e330f0f2d700aa090d3490670c1a4cff01afeaadccb4060266e94e44fffa8de5371525a0cb280945de223c93d30ff8144f820f7a76269"' }>
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
                                            'data-bs-target="#components-links-module-SearchProductPageModule-275141137b10102460af5c540cd82a5bc0b564b19c1d36cd41419e5fb7d363c948af6b8b3f08fcec37849f88d0a39cfb672abcc2589f36e1f95c24498d4899dc"' : 'data-bs-target="#xs-components-links-module-SearchProductPageModule-275141137b10102460af5c540cd82a5bc0b564b19c1d36cd41419e5fb7d363c948af6b8b3f08fcec37849f88d0a39cfb672abcc2589f36e1f95c24498d4899dc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchProductPageModule-275141137b10102460af5c540cd82a5bc0b564b19c1d36cd41419e5fb7d363c948af6b8b3f08fcec37849f88d0a39cfb672abcc2589f36e1f95c24498d4899dc"' :
                                            'id="xs-components-links-module-SearchProductPageModule-275141137b10102460af5c540cd82a5bc0b564b19c1d36cd41419e5fb7d363c948af6b8b3f08fcec37849f88d0a39cfb672abcc2589f36e1f95c24498d4899dc"' }>
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
                                            'data-bs-target="#components-links-module-ShareModule-6dbfa5143cb5564ed6d756550841e0a6e78205d5504b2f235f5415d559ce35e6dd6dc050714273c828edc918aa2cb09fba76a586cc692a462df3535f5cb5fd71"' : 'data-bs-target="#xs-components-links-module-ShareModule-6dbfa5143cb5564ed6d756550841e0a6e78205d5504b2f235f5415d559ce35e6dd6dc050714273c828edc918aa2cb09fba76a586cc692a462df3535f5cb5fd71"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShareModule-6dbfa5143cb5564ed6d756550841e0a6e78205d5504b2f235f5415d559ce35e6dd6dc050714273c828edc918aa2cb09fba76a586cc692a462df3535f5cb5fd71"' :
                                            'id="xs-components-links-module-ShareModule-6dbfa5143cb5564ed6d756550841e0a6e78205d5504b2f235f5415d559ce35e6dd6dc050714273c828edc918aa2cb09fba76a586cc692a462df3535f5cb5fd71"' }>
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
                                            'data-bs-target="#components-links-module-ShoppingCartPageModule-436f0690325be012a5ad918bc3d8dce49ce1018f4518da91ec9500a97eb7b4e7acc576a8d78b9812d4ce884c344e310783bf5ab3ca1793048ae2e2862442a891"' : 'data-bs-target="#xs-components-links-module-ShoppingCartPageModule-436f0690325be012a5ad918bc3d8dce49ce1018f4518da91ec9500a97eb7b4e7acc576a8d78b9812d4ce884c344e310783bf5ab3ca1793048ae2e2862442a891"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShoppingCartPageModule-436f0690325be012a5ad918bc3d8dce49ce1018f4518da91ec9500a97eb7b4e7acc576a8d78b9812d4ce884c344e310783bf5ab3ca1793048ae2e2862442a891"' :
                                            'id="xs-components-links-module-ShoppingCartPageModule-436f0690325be012a5ad918bc3d8dce49ce1018f4518da91ec9500a97eb7b4e7acc576a8d78b9812d4ce884c344e310783bf5ab3ca1793048ae2e2862442a891"' }>
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
                                            'data-bs-target="#components-links-module-SignUpPageModule-180bf9bb6bce21177760ef695e77459e233b132152afd30a47f2d317c59e39f0cb083beb84bc71302946f8429b6885fe0781c2609a01a2049549d9a2cf3ae0ad"' : 'data-bs-target="#xs-components-links-module-SignUpPageModule-180bf9bb6bce21177760ef695e77459e233b132152afd30a47f2d317c59e39f0cb083beb84bc71302946f8429b6885fe0781c2609a01a2049549d9a2cf3ae0ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SignUpPageModule-180bf9bb6bce21177760ef695e77459e233b132152afd30a47f2d317c59e39f0cb083beb84bc71302946f8429b6885fe0781c2609a01a2049549d9a2cf3ae0ad"' :
                                            'id="xs-components-links-module-SignUpPageModule-180bf9bb6bce21177760ef695e77459e233b132152afd30a47f2d317c59e39f0cb083beb84bc71302946f8429b6885fe0781c2609a01a2049549d9a2cf3ae0ad"' }>
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