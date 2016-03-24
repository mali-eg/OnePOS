(function () {
    "use strict";

    angular
        .module('onePOS.dashboard')
        .controller('dashboardCtrl', ['$scope', '$state', '$cookieStore', 'loginService', 'AuthService',
            dashboardCtrl]);

    function dashboardCtrl($scope, $state, $cookieStore, loginService, AuthService) {
        jQuery(window).scrollTop(0);
        var vm = this;
        var user = AuthService.getUser();
        var username = user.username;

        vm.warning = [];

        if (loginService.successMessage) {
            vm.successMessage = "Sie haben Ihr Passwort geändert. Sie können sich jetzt damit einloggen."
        }

        $scope.getChangePasswordUrl = function(){
            return $state.href('userManagement.changePassword');
        };

        var expiryDays = user.expiryDays;
        var passwordUpdate = user.passwordUpdate;

        if(typeof expiryDays !== "undefined") {
            vm.warning.push({
                text: 'Your password is about to expire in ' + expiryDays.toString() + ' days. You may change it <a href="' + $scope.getChangePasswordUrl() + '">here</a>.',
                type: 'warning'
            });
        }

        if(typeof passwordUpdate !== "undefined" && passwordUpdate) {
            vm.warning.push({
                text: 'Your password has been changed successfully.',
                type: 'success'
            });
        }
    }

})();

/*{
 "userAccountVBO":[
 {
 "credential":{
 "username":"Asmaa"
 },
 "permissions":{
 "businessRole":"Admin-FH",
 "businessRights":[
 "Inherit all rights from an agent",
 "Read profile data of all users of the PUID group the AdminFH is managing "
 ],
 "voIDList":[
 {
 "voID":20011406,
 "voDescription":"VoidForTesting",
 "salesChannelRights":[
 "SmartLTEOption",
 "WeitereUnterstuetzungUHD",
 "Minutenpakete",
 "Partnerkarte",
 "VodafoneTarife",
 "CallYaRoaming",
 "StatistikCallYa",
 "VodafoneClassic",
 "StatistikDCWechsel",
 "Kontostatus",
 "VFRedLTarife",
 "Rahmenvertragsnummer",
 "ITChannelVolumeRebate",
 "VodafoneRedPlus",
 "VFInternational",
 "VFVorteil",
 "WirelessOffice",
 "VodafoneBlackTarife",
 "BlackberryEnterprise",
 "GegenNutzungVonBestandsUndVerbindungsdaten",
 "VodafoneRedPlusDataSub",
 "DfueEinwahl",
 "VFRedXSHPRomo",
 "AnzeigeUnbekannterDienste",
 "GroupID",
 "HostedExchangeKlein",
 "SMARTCallYa",
 "Aktivierung",
 "DfueAuswahl",
 "DuoBill",
 "CallYaEthno",
 "HWBundle",
 "MBB4_XL",
 "KundendatenAbfrageVorbelegt",
 "WeitereUnterstuetzungFH",
 "KundendatenAendern",
 "MBB4_S",
 "Kundenanschrift",
 "ReiseversprechenRV",
 "SiGoPlaStatus",
 "NaechsterErwerb",
 "LetzterErwerb",
 "MBB4_M",
 "VodafoneZuhause",
 "VodafoneOptionenLTEOpt50",
 "HWO_UseCase_PRO",
 "Bankverbindung",
 "MBB4_L",
 "SmartMOS",
 "ReiseFlatData",
 "CallYaDirektabbuchung",
 "DSL_HW001",
 "SiGoPlaAndereDaten",
 "DiensteParameter",
 "MBBBUT",
 "FNActKaZeNotAllowed",
 "Panthera",
 "SmartSOS",
 "MobInternetPlus",
 "AnzeigeRahmenvertrag",
 "UltraCard",
 "EmbeddedDatentarif",
 "HandsetInsurance",
 "VIPSALE",
 "AddedRuntime",
 "HostedExchangeGross",
 "TarifServiceErlaubt",
 "PortierungCredit",
 "Rufnummernliste",
 "Vertragsende",
 "FaxBestaetigung",
 "HandyRabattbetrag",
 "HandyGratisDienstPflicht",
 "WindowsPushMail",
 "SmartSH10",
 "DiensteBeiRotNichtMoeglich",
 "VFRedXSTarife",
 "RootBan",
 "ProfessionalDienste",
 "SMART_Button",
 "SmartSH5",
 "NextPhone",
 "Rechnungsanschrift",
 "OnlineVerbindung",
 "No_LTE_premodem",
 "VFMobileInternetHandy",
 "CallYaKundendatenOhneKennwort",
 "SmartMH5",
 "IMEI",
 "DSL_HWGEN048",
 "DSL_HWGEN03S",
 "BusinessDataEmbedded",
 "KundendatenAbfrage",
 "VFRedMTarife",
 "ZentraleVFPPruefung",
 "VFRedSTarife",
 "CallYaOpenEndSmS",
 "DSL_HWGEN03",
 "NachtraeglichePortierung",
 "WorldData",
 "Ban",
 "CallYaOpenEnd",
 "15ProzentTargetDiscount",
 "ProfessionalTarife",
 "CallYaStandardTarife",
 "VFMobileConnect",
 "VerkaeuferName",
 "VodafoneOptionenLTEOpt21",
 "HWO_ArticleMaster_FH",
 "SmartSH20",
 "BusinessTarife",
 "WPEEnterprise",
 "StatistikVVL"
 ]
 }
 ]
 },
 "onlineUser":{
 "active":true,
 "suspended":false,
 "creationDate":"2016-01-11T11:42:32+01:00",
 "updateDate":"2016-01-01T11:42:32+01:00",
 "passwordExpiryDate":"2016-08-08T11:42:32+02:00",
 "firstName":"FE firstname37",
 "lastName":"FE lastname37",
 "lastLoginDate":"2016-02-03T10:57:21.179+01:00",
 "primaryEmail":"vf.user37@vodafone.com",
 "mTanPhoneNumber":"015201849655",
 "defaultVoID":"20011406"
 },
 "shopUser":{
 "shopName":"VFGermeny",
 "shopAddress":{
 "street":"Alex",
 "streetNumberSuffix":"VF",
 "postBox":123,
 "city":"Alexandria",
 "country":"Egypt"
 }
 }
 }
 ]
 }*/
