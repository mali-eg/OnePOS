(function () {
    "use strict"

    angular
        .module('onePOS.customer')
        .controller('subscriberDataCtrl', ['$scope', 'customerService', '$state',
            subscriberDataCtrl]);

    function subscriberDataCtrl($scope, customerService, $state) {
        jQuery(window).scrollTop(0);
        var vm = this,
            inputs =    vm.inputs = {
            "phonebook": {},
            "portLand":{}
        },
            orderId = customerService.sharedLineItem.orderId,
            orderLineItemId = customerService.sharedLineItem.orderLineItemId,
            credentials = vm.credentials = {};


        vm.carts = customerService.cartlist;

        if (customerService.subscriberDataShared.contractData) {
            vm.startDate = customerService.subscriberDataShared.contractData.startDate;
            vm.reservedPhoneNumber = customerService.subscriberDataShared.contractData.reservedPhoneNumber;
            vm.password = customerService.subscriberDataShared.contractData.password;
        }

        if (customerService.subscriberDataShared.participantAddress) {
            // vm.custAddress = customerService.subscriberDataShared.password.custAddress;
            if (customerService.subscriberDataShared.participantAddress.useLegaelAddress) {
                vm.invoiceAddress = "Kundenadresse";
            } else {
                vm.invoiceAddress = "Rechnungsadresse";
            }
        }

        if (customerService.subscriberDataShared.numberPortability) {

            vm.numPortLName = customerService.subscriberDataShared.numberPortability.numPortLName;
            vm.numPortFName = customerService.subscriberDataShared.numberPortability.numPortFName;
            vm.numPortDate = customerService.subscriberDataShared.numberPortability.numPortDate;
            vm.numAway = customerService.subscriberDataShared.numberPortability.numAway;
            vm.currentOp = customerService.subscriberDataShared.numberPortability.currentOp;
            vm.prevCustNum = customerService.subscriberDataShared.numberPortability.prevCustNum;
            vm.prevSupplier = customerService.subscriberDataShared.numberPortability.prevSupplier;
        }
        if (customerService.subscriberDataShared.porting) {
            vm.portingTime = customerService.subscriberDataShared.porting.portingTime;
            vm.portingTimeDate = customerService.subscriberDataShared.porting.portingTimeDate;
            vm.portingTimeDateSec = customerService.subscriberDataShared.porting.portingTimeDateSec;
            vm.portingTimeDatethird = customerService.subscriberDataShared.porting.portingTimeDatethird;
        }

        if (customerService.subscriberDataShared.studentDiscounts) {
            vm.studentId = customerService.subscriberDataShared.studentDiscounts.studentId;
            vm.disability = customerService.subscriberDataShared.studentDiscounts.disability;
        }

        if (customerService.subscriberDataShared.vfAtHome) {
            vm.vfHome = customerService.subscriberDataShared.vfAtHome.vfHome;
            vm.vfHomestreet = customerService.subscriberDataShared.vfAtHome.vfHomestreet;
            vm.vfHomeArea = customerService.subscriberDataShared.vfAtHome.vfHomeArea;
            vm.vfHomePostal = customerService.subscriberDataShared.vfAtHome.vfHomePostal;
            vm.vfHomeCity = customerService.subscriberDataShared.vfAtHome.vfHomeCity;
            vm.vfHomecountry = customerService.subscriberDataShared.vfAtHome.vfHomecountry;
        }
        if (customerService.subscriberDataShared.portLand) {
            vm.portLandLName = customerService.subscriberDataShared.portLand.portLandLName;
            vm.portLandFName = customerService.subscriberDataShared.portLand.portLandFName;
            vm.portLandStreet = customerService.subscriberDataShared.portLand.portLandStreet;
            vm.portLandNum = customerService.subscriberDataShared.portLand.portLandNum;
            vm.portLandPostal = customerService.subscriberDataShared.portLand.portLandPostal;
            vm.portLandCity = customerService.subscriberDataShared.portLand.portLandCity;
            vm.portLandName = customerService.subscriberDataShared.portLand.portLandName;
            vm.portLandDate = customerService.subscriberDataShared.portLand.portLandDate;
            vm.inputs.portLand.termination = customerService.subscriberDataShared.portLand.termination;
            vm.telTransportCode = customerService.subscriberDataShared.portLand.telTransportCode;
            vm.telTransportNum = customerService.subscriberDataShared.portLand.telTransportNum;
            vm.telTransportPortNum = customerService.subscriberDataShared.portLand.telTransportPortNum;
            vm.telTransportAdd = customerService.subscriberDataShared.portLand.telTransportAdd;
        }


        if (customerService.subscriberDataShared.discounts) {
            vm.college = customerService.subscriberDataShared.discounts.college;
            vm.idNum = customerService.subscriberDataShared.discounts.idNum;
            vm.birthDate = customerService.subscriberDataShared.discounts.birthDate;
        }

        if (customerService.subscriberDataShared.connectionSettings) {
            vm.desiredOverview = customerService.subscriberDataShared.connectionSettings.desiredOverview;
            vm.desiredNumber = customerService.subscriberDataShared.connectionSettings.desiredNumber;
            vm.displayedNumber = customerService.subscriberDataShared.connectionSettings.displayedNumber;

        }


        if (customerService.subscriberDataShared.phoneBook) {
            vm.inputs.phonebook.title = customerService.subscriberDataShared.phoneBook.title;
            vm.inputs.phonebook.subTitle = customerService.subscriberDataShared.phoneBook.subTitle;
            vm.inputs.phonebook.prefix = customerService.subscriberDataShared.phoneBook.prefix;
            vm.checkedTelSubFName = customerService.subscriberDataShared.phoneBook.checkedTelSubFName;
            vm.checkedTelSubLName = customerService.subscriberDataShared.phoneBook.checkedTelSubLName;
            vm.checkedTelSubStreet = customerService.subscriberDataShared.phoneBook.checkedTelSubStreet;
            vm.checkedTelSubNum = customerService.subscriberDataShared.phoneBook.checkedTelSubNum;
            vm.checkedTelSubArea = customerService.subscriberDataShared.phoneBook.checkedTelSubArea;
            vm.inputs.phonebook.country = customerService.subscriberDataShared.phoneBook.country;
            vm.checkedTelSubPostal = customerService.subscriberDataShared.phoneBook.checkedTelSubPostal;
            vm.checkedTelSubPlace = customerService.subscriberDataShared.phoneBook.checkedTelSubPlace;
            vm.checkedTelSubLocation = customerService.subscriberDataShared.phoneBook.checkedTelSubLocation;
            vm.checkedTelSubPosition = customerService.subscriberDataShared.phoneBook.checkedTelSubPosition;
            vm.inputs.phonebook.searchTerm = customerService.subscriberDataShared.phoneBook.searchTerm
            vm.entryTyp = customerService.subscriberDataShared.phoneBook.entryTyp;
            vm.phonebookInformation = customerService.subscriberDataShared.phoneBook.phonebookInformation;
            vm.phonebookPublicationType = customerService.subscriberDataShared.phoneBook.phonebookPublicationType;
            vm.phonebookTransmission = customerService.subscriberDataShared.phoneBook.phonebookTransmission;
            vm.phonebookReverseSearch = customerService.subscriberDataShared.phoneBook.phonebookReverseSearch;
            vm.phonebookCommercialUse = customerService.subscriberDataShared.phoneBook.phonebookCommercialUse;
            vm.phonebookProfessionFName = customerService.subscriberDataShared.phoneBook.phonebookProfessionFName;
            vm.phonebookProfessionLName = customerService.subscriberDataShared.phoneBook.phonebookProfessionLName;
            vm.phonebookProfessionStreet = customerService.subscriberDataShared.phoneBook.phonebookProfessionStreet;
            vm.phonebookProfessionNum = customerService.subscriberDataShared.phoneBook.phonebookProfessionNum;
            vm.phonebookProfessionSearchTerm = customerService.subscriberDataShared.phoneBook.phonebookProfessionsearchTerm;
            vm.phonebookProfessionPostal = customerService.subscriberDataShared.phoneBook.phonebookProfessionPostal;
            vm.phonebookProfessionCity = customerService.subscriberDataShared.phoneBook.phonebookProfessionCity;
        }

        if (customerService.subscriberDataShared.cards) {
            vm.cardsSimFirst = customerService.subscriberDataShared.cards.cardsSimFirst;
            vm.cardsSimSec = customerService.subscriberDataShared.cards.cardsSimSec;

        }


        vm.selectboxData = [
            "Alabama",
            "Alaska",
            "Arizona"
        ];

        vm.countriesData = [
            "Deutschland"
        ];

        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.progressBar = true;
        $scope.$parent.progressState = 5;
        $scope.$parent.subPrevText = "Zurück zu";
        $scope.$parent.prevText = "Kundendaten";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {
            cashingData()
            $state.go("customer.customerData");
        }

        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Zusammenfassung";
        $scope.$parent.next = function () {
            cashingData();
            customerService.subscription(orderId, orderLineItemId, cashingData()).then(
                function (respModel) {
                    $state.go("customer.summaryData");
                }
            )
        }
        function cashingData() {
            return customerService.subscriberDataShared = {
                "contractData": {
                    "startDate": vm.startDate,
                    "reservedPhoneNumber": vm.reservedPhoneNumber,
                    "password": vm.password
                },

                "participantAddress": {
                    "invoiceAddress": vm.invoiceAddress,//Teilnehmeranschrift //
                    useLegaelAddress: vm.invoiceAddress === "Kundenadresse",
                    useBillingAddress: vm.invoiceAddress === "Rechnungsadresse"
                },

                "numberPortability": {//
                    "numPortLName": vm.numPortLName,
                    "numPortFName": vm.numPortFName,
                    "numPortDate": vm.numPortDate,
                    "numAway": vm.numAway,
                    "currentOp": vm.currentOp,
                    "prevCustNum": vm.prevCustNum,
                    "prevSupplier": vm.prevSupplier
                },
                "porting": {//
                    "portingTime": vm.portingTime,
                    "portingTimeDate": vm.portingTimeDate,
                    "portingTimeDateSec": vm.portingTimeDateSec,
                    "portingTimeDatethird": vm.portingTimeDatethird
                },
                "discounts": {//
                    "college": vm.college,
                    "idNum": vm.idNum,
                    "birthDate": vm.birthDate
                },
                "studentDiscounts": {//
                    "studentId": vm.studentId,
                    "disability": vm.disability
                },

                "connectionSettings": {
                    "desiredOverview": vm.desiredOverview,
                    "desiredNumber": vm.desiredNumber,
                    "displayedNumber": vm.displayedNumber

                },

                "vfAtHome": {//
                    "vfHome": vm.vfHome,
                    "vfHomestreet": vm.vfHomestreet,
                    "vfHomeArea": vm.vfHomeArea,
                    "vfHomePostal": vm.vfHomePostal,
                    "vfHomeCity": vm.vfHomeCity,
                    "vfHomecountry": vm.vfHomecountry


                },
                "portLand": {//
                    "portLandLName": vm.portLandLName,
                    "portLandFName": vm.portLandFName,
                    "portLandStreet": vm.portLandStreet,
                    "portLandNum": vm.portLandNum,
                    "portLandPostal": vm.portLandPostal,
                    "portLandCity": vm.portLandCity,
                    "portLandName": vm.portLandName,
                    "portLandDate": vm.portLandDate,
                    "termination": vm.inputs.portLand.termination,
                    "telTransportCode": vm.telTransportCode,
                    "telTransportNum": vm.telTransportNum,
                    "telTransportPortNum": vm.telTransportPortNum,
                    "telTransportAdd": vm.telTransportAdd
                },
                "phoneBook": {
                    "title": vm.inputs.phonebook.title,
                    "subTitle": vm.inputs.phonebook.subTitle,
                    "prefix": vm.inputs.phonebook.prefix,
                    "checkedTelSubFName": vm.checkedTelSubFName,
                    "checkedTelSubLName": vm.checkedTelSubLName,
                    "checkedTelSubStreet": vm.checkedTelSubStreet,
                    "checkedTelSubNum": vm.checkedTelSubNum,
                    "checkedTelSubArea": vm.checkedTelSubArea,//
                    "country": vm.inputs.phonebook.country,
                    "checkedTelSubPostal": vm.checkedTelSubPostal,
                    "checkedTelSubPlace": vm.checkedTelSubPlace,//
                    "checkedTelSubLocation": vm.checkedTelSubLocation,
                    "checkedTelSubPosition": vm.checkedTelSubPosition,//
                    "searchTerm": vm.inputs.phonebook.searchTerm,
                    "entryTyp": vm.entryTyp,
                    "phonebookInformation": vm.phonebookInformation,
                    "phonebookPublicationType": vm.phonebookPublicationType,
                    "phonebookTransmission": vm.phonebookTransmission,//
                    "phonebookReverseSearch": vm.phonebookReverseSearch,//
                    "phonebookCommercialUse": vm.phonebookCommercialUse,
                    "phonebookProfessionFName": vm.phonebookProfessionFName,
                    "phonebookProfessionLName": vm.phonebookProfessionLName,
                    "phonebookProfessionStreet": vm.phonebookProfessionStreet,
                    "phonebookProfessionNum": vm.phonebookProfessionNum,
                    "phonebookProfessionsearchTerm": vm.phonebookProfessionSearchTerm,
                    "phonebookProfessionPostal": vm.phonebookProfessionPostal,
                    "phonebookProfessionCity": vm.phonebookProfessionCity


                    },
                "cards": {//
                    "cardsSimFirst": vm.cardsSimFirst,
                    "cardsSimSec": vm.cardsSimSec

                }


            };
        }


        /* angular.element(document).ready(function () {
         vf.accordion.init(document);
         });*/
    }


})();


