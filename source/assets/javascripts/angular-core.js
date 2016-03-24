/* Libary files */
//= require "_angular-core/1.4.8/angular.js"
//= require "_angular-core/1.4.8/angular-animate.js"
//= require "_angular-core/1.4.8/angular-cookies.js"
//= require "_angular-core/1.4.8/angular-sanitize.js"

/* Third-party libraries */
//= require "_angular-core/ui-router/0.2.15/angular-ui-router.js"
//= require "app/lib/ng-loaders/ngLoader.js"
//= require "app/lib/fileSaver/FileSaver.js"
//= require "app/lib/ui-grid/ui-grid.min.js"
//= require "app/lib/lodash/lodash.js"


/* Modules */
//= require "app/modules/app.js"
//= require "app/core/core.module.js"
//= require "app/widgets/widgets.module.js"
//= require "app/resources/resources.module.js"
//= require "app/modules/login/login.module.js"
//= require "app/modules/dashboard/dashboard.module.js"
//= require "app/modules/customer/customer.module.js"
//= require "app/modules/customerSnapshot/customerSnapshot.module.js"
//= require "app/modules/userManagement/userManagement.module.js"

/* Messages */
//= require "app/messages/messages.module.js"
//= require "app/messages/interceptor.js"
//= require "app/messages/errorContainer.directive.js"
//= require "app/messages/messaging.service.js"
//= require "app/messages/messagesResources.js"

/* Routes */
//= require "app/modules/route.js"
//= require "app/modules/login/login.route.js"
//= require "app/modules/dashboard/dashboard.route.js"
//= require "app/modules/customer/customer.route.js"
//= require "app/modules/customerSnapshot/customerSnapshot.route.js"
//= require "app/modules/userManagement/userManagement.route.js"

/* Filters */
//= require "app/filters/angular-filter.js"
//= require "app/modules/customer/filters/category.filter.js"
//= require "app/modules/customer/filters/ordersOverview.filter.js"
//= require "app/modules/customer/filters/cart.filter.js"
//= require "app/modules/customer/filters/escapedHtml.filter.js"
//= require "app/modules/customerSnapshot/filters/checkBalanceState.filter.js"




/* Auth Files */
//= require "app/auth/auth.module.js"
//= require "app/auth/authService.js"

/* Global Helpers */
//= require "app/core/config.js"
//= require "app/core/util.js"
//= require "app/core/logger.js"
//= require "app/core/config.js"
//= require "app/core/constants.js"
//= require "app/core/interceptor.js"
//= require "app/core/secureDelegates.js"

/* Resources */
//= require "app/resources/authResources.js"
//= require "app/resources/dashboardResources.js"
//= require "app/resources/customerResources.js"
//= require "app/resources/entityListResource.js"

//= require "app/resources/customerSnapshotResources.js"
//= require "app/resources/userManagementResources.js"

/* Services */
//= require "app/modules/login/services/loginSrvc.js"
//= require "app/modules/dashboard/services/dashboardSrvc.js"
//= require "app/modules/customer/services/availabilityCheckSrvc.js"
//= require "app/modules/customer/services/customerSrvc.js"
//= require "app/modules/customer/services/entityListMapping.service.js"
//= require "app/modules/customer/services/modelMapping.service.js"
//= require "app/modules/customer/services/Tariff.model.js"
//= require "app/modules/customer/services/tariffSelectionConfig.service.js"
//= require "app/modules/customer/services/tariffsManager.service.js"

//= require "app/modules/customerSnapshot/services/customerDetailsSrvc.js"
//= require "app/modules/customerSnapshot/services/customerOverviewSrvc.js"
//= require "app/modules/customerSnapshot/services/customerSearchSrvc.js"

//= require "app/modules/userManagement/services/userManagementSrvc.js"

//= require "app/modules/userManagement/services/userSrvc.js"
//= require "app/modules/userManagement/services/usersListSrvc.js"

/* Controllers */
//= require "app/modules/login/controllers/loginCtrl.js"
//= require "app/modules/login/controllers/mtanCtrl.js"
//= require "app/modules/login/controllers/passwordForgotCtrl.js"
//= require "app/modules/login/controllers/passwordResetCtrl.js"
//= require "app/modules/login/controllers/passwordExpiredCtrl.js"
//= require "app/modules/login/controllers/unauthorizedUserCtrl.js"

//= require "app/modules/dashboard/controllers/dashboardCtrl.js"
//= require "app/modules/dashboard/controllers/dashboardLayoutCtrl.js"

//= require "app/modules/customer/controllers/availabilityCheckCtrl.js"
//= require "app/modules/customer/controllers/ordersOverviewCtrl.js"
//= require "app/modules/customer/controllers/shoppingCartCtrl.js"
//= require "app/modules/customer/controllers/customerDataCtrl.js"
//= require "app/modules/customer/controllers/subscriberDataCtrl.js"
//= require "app/modules/customer/controllers/summaryDataCtrl.js"
//= require "app/modules/customer/controllers/tariffCtrl.js"
//= require "app/modules/customer/controllers/tariffHardwareCtrl.js"
//= require "app/modules/customer/controllers/addonsCtrl.js"
//= require "app/modules/customer/controllers/customerLayoutCtrl.js"
//= require "app/modules/customer/controllers/pdfDownloadCtrl.js"

//= require "app/modules/customer/controllers/duplicateCartModalCtrl.js"
//= require "app/modules/customer/controllers/duplicateCartSimModalCtrl.js"
//= require "app/modules/customer/controllers/deleteCartModalCtrl.js"
//= require "app/modules/customer/controllers/emptyCartModalCtrl.js"
//= require "app/modules/customer/controllers/saveModalCtrl.js"

//= require "app/modules/customer/controllers/orderSummaryOverlayCtrl.js"

//= require "app/modules/customerSnapshot/controllers/customerDetailsCtrl.js"
//= require "app/modules/customerSnapshot/controllers/customerOverviewCtrl.js"
//= require "app/modules/customerSnapshot/controllers/customerSearchCtrl.js"
//= require "app/modules/customerSnapshot/controllers/customerChangeCtrl.js"
// require "app/modules/customerSnapshot/controllers/customerSnapshotLayoutCtrl.js"

//= require "app/modules/userManagement/controllers/userManagementCtrl.js"

//= require "app/modules/userManagement/controllers/unlockUserCtrl.js"
//= require "app/modules/userManagement/controllers/deactivateUserCtrl.js"
//= require "app/modules/userManagement/controllers/newUserCtrl.js"
//= require "app/modules/userManagement/controllers/editUserCtrl.js"
//= require "app/modules/userManagement/controllers/viewProfileCtrl.js"
//= require "app/modules/userManagement/controllers/changePasswordCtrl.js"
//= require "app/modules/userManagement/controllers/changeShopModalCtrl.js"
//= require "app/modules/userManagement/controllers/usersListCtrl.js"


//Model Builder
//= require "app/modules/customerSnapshot/model/customerDetailsModelBuilder.js"





/* directives */
//= require "app/modules/customer/directives/customerHeader.js"
//= require "app/modules/customer/directives/pdfDownloadBtn.directive.js"

/* Widgets */
//= require "app/widgets/captcha/captcha.directive.js"
//= require "app/widgets/carousel/carousel.directive.js"

//= require "app/widgets/carousel/carousel.sly.lib.js"
//= require "app/widgets/carousel/carousel.sly.directive.js"

//= require "app/widgets/accordion/accordion.directive.js"
//= require "app/widgets/header/header.directive.js"
//= require "app/widgets/menu/menu.directive.js"
//= require "app/widgets/scrollbar/ngScrollbar.directive.js"
//= require "app/widgets/scrollbar/ng-scrollbar.js"
//= require "app/widgets/scrollbar/mCustomScrollbar.concat.js"
//= require "app/widgets/scrollbar/mCustomScrollbar.directive.js"
//= require "app/widgets/scrollbar/maxHeightOverflow.directive.js"
//= require "app/widgets/autofocus/autofocus.directive.js"
//= require "app/widgets/radioBtn/opsRadio.directive.js"
//= require "app/widgets/textbox/textbox.directive.js"
//= require "app/widgets/textarea/textarea.directive.js"
//= require "app/widgets/tabs/tabs.directive.js"
//= require "app/widgets/transactionSelection/transactionSelection.directive.js"
//= require "app/widgets/tooltip/tooltip.directive.js"
//= require "app/widgets/selectbox/select.directive.js"
//= require "app/widgets/modals/modal.tpls.js"
//= require "app/widgets/modals/ui-bootstrap-modal-0.14.3.js"
//= require "app/widgets/checkbox/opsCheckbox.directive.js"
//= require "app/widgets/datePicker/datePicker.tpls.js"
//= require "app/widgets/datePicker/ui-bootstrap-datePicker-0.14.3.js"
//= require "app/widgets/datePicker/datePicker.tb.directive.js"
//= require "app/widgets/stepper/opsStepper.directive.js"
//= require "app/widgets/messagesContainer/msgContainer.directive.js"
//= require "app/widgets/accordion/opsAccordion.controller.js"
//= require "app/widgets/accordion/opsAccordion.directive.js"
//= require "app/widgets/accordion/accordionPanel.directive.js"
//= require "app/widgets/accordion/accordionPanelHeading.directive.js"
//= require "app/widgets/accordion/accordionPanelHeaderTransclude.directive.js"
//= require "app/widgets/collaps/collaps.directive.js"
//= require "app/widgets/link/opsLink.directive.js"
//= require "app/widgets/opsSubmit/opsSubmit.directive.js"
//= require "app/widgets/opsBtn/opsBtn.directive.js"
