(function () {
    "use strict"

    angular
        .module('onePOS.customer')
        .controller('customerDataCtrl', ['$scope', 'customerService', '$state',
            customerDataCtrl]);

    function customerDataCtrl($scope, customerService, $state) {
        jQuery(window).scrollTop(0);
        var vm = this,
            orderId = customerService.sharedLineItem.orderId,
            inputs = vm.inputs = {
                "contractData": {},
                "customerData": {},
                "customerAdd": {},
                "contactDetails": {},
                "billDetails": {},
                "diffBill": {},
                "bankDetails": {},
                "phonebook": {},
                "agreement": {},
                "AVD": {}
            };
        $scope.$parent.orderId = customerService.sharedLineItem.orderId;


        if (customerService.customerSharedData.contractData) {
            vm.inputs.contractData.password = customerService.customerSharedData.contractData.password;
            vm.inputs.contractData.num = customerService.customerSharedData.contractData.num;
            vm.inputs.contractData.type = customerService.customerSharedData.contractData.type;
        }

        if (customerService.customerSharedData.customerData) {
            vm.inputs.customerData.salutation = customerService.customerSharedData.customerData.salutation;
            vm.inputs.customerData.title = customerService.customerSharedData.customerData.title;
            vm.inputs.customerData.birth = customerService.customerSharedData.customerData.birth;
            vm.inputs.customerData.surName = customerService.customerSharedData.customerData.surName;
            vm.inputs.customerData.firstName = customerService.customerSharedData.customerData.firstName;
            vm.inputs.customerData.ID = customerService.customerSharedData.customerData.ID;
            vm.inputs.customerData.noID = customerService.customerSharedData.customerData.noID;
            vm.inputs.customerData.creditInst = customerService.customerSharedData.customerData.creditInst;
            vm.inputs.customerData.creditNum = customerService.customerSharedData.customerData.creditNum;
            vm.inputs.customerData.expiryDate = customerService.customerSharedData.customerData.expiryDate;
        }

        if (customerService.customerSharedData.customerAdd) {
            vm.inputs.customerAdd.street = customerService.customerSharedData.customerAdd.street;
            vm.inputs.customerAdd.num = customerService.customerSharedData.customerAdd.num;
            vm.inputs.customerAdd.postal = customerService.customerSharedData.customerAdd.postal;
            vm.inputs.customerAdd.city = customerService.customerSharedData.customerAdd.city;
            vm.inputs.customerAdd.country = customerService.customerSharedData.customerAdd.countr;
        }
        if (customerService.customerSharedData.contactDetails) {
            vm.inputs.contactDetails.prefix = customerService.customerSharedData.contactDetails.prefix;
            vm.inputs.contactDetails.contact = customerService.customerSharedData.contactDetails.contact;
            vm.inputs.contactDetails.preset = customerService.customerSharedData.contactDetails.preset;
            vm.inputs.contactDetails.num = customerService.customerSharedData.contactDetails.num;
            vm.inputs.contactDetails.email = customerService.customerSharedData.contactDetails.email;
            vm.inputs.contactDetails.noEmail = customerService.customerSharedData.contactDetails.noEmail;
        }
        if (customerService.customerSharedData.billDetails) {
            vm.inputs.billDetails.sms = customerService.customerSharedData.billDetails.sms;
            vm.inputs.billDetails.num = customerService.customerSharedData.billDetails.num;
            vm.inputs.billDetails.area = customerService.customerSharedData.billDetails.area;
            vm.inputs.billDetails.type = customerService.customerSharedData.billDetails.type;
            vm.inputs.billDetails.custCostCenter = customerService.customerSharedData.billDetails.custCostCenter;
        }
        if (customerService.customerSharedData.diffBill) {
            vm.inputs.diffBill.salutation = customerService.customerSharedData.diffBill.salutation;
            vm.inputs.diffBill.title = customerService.customerSharedData.diffBill.title;
            vm.inputs.diffBill.firstName = customerService.customerSharedData.diffBill.firstName;
            vm.inputs.diffBill.surName = customerService.customerSharedData.diffBill.surName;
            vm.inputs.diffBill.street = customerService.customerSharedData.diffBill.street;
            vm.inputs.diffBill.num = customerService.customerSharedData.diffBill.num;
            vm.inputs.diffBill.postal = customerService.customerSharedData.diffBill.postal;
            vm.inputs.diffBill.city = customerService.customerSharedData.diffBill.city;
            vm.inputs.diffBill.country = customerService.customerSharedData.diffBill.country;
            vm.inputs.diffBill.PObox = customerService.customerSharedData.diffBill.PObox;
            vm.inputs.diffBill.contactTitle = customerService.customerSharedData.diffBill.contactTitle;
            vm.inputs.diffBill.contactPerson = customerService.customerSharedData.diffBill.contactPerson;
            vm.inputs.diffBill.preset = customerService.customerSharedData.diffBill.preset;
            vm.inputs.diffBill.contactNumber = customerService.customerSharedData.diffBill.contactNumber;
        }
        if (customerService.customerSharedData.bankDetails) {
            vm.inputs.bankDetails.IBAN = customerService.customerSharedData.bankDetails.IBAN;
            vm.inputs.bankDetails.BIC = customerService.customerSharedData.bankDetails.BIC;
            vm.inputs.bankDetails.accNum = customerService.customerSharedData.bankDetails.accNum;
            vm.inputs.bankDetails.bankCode = customerService.customerSharedData.bankDetails.bankCode;
            vm.inputs.bankDetails.creditInst = customerService.customerSharedData.bankDetails.creditInst;
            vm.inputs.bankDetails.usage = customerService.customerSharedData.bankDetails.usage;
            vm.inputs.bankDetails.accHolder = customerService.customerSharedData.bankDetails.accHolder;
            vm.inputs.bankDetails.street = customerService.customerSharedData.bankDetails.street;
            vm.inputs.bankDetails.num = customerService.customerSharedData.bankDetails.num;
            vm.inputs.bankDetails.postal = customerService.customerSharedData.bankDetails.postal;
            vm.inputs.bankDetails.city = customerService.customerSharedData.bankDetails.city;
            vm.inputs.bankDetails.country = customerService.customerSharedData.bankDetails.country;
        }
        if (customerService.customerSharedData.phonebook) {
            vm.inputs.phonebook.academicTitle = customerService.customerSharedData.phonebook.academicTitle;
            vm.inputs.phonebook.title = customerService.customerSharedData.phonebook.title;
            vm.inputs.phonebook.intent = customerService.customerSharedData.phonebook.intent;
            vm.inputs.phonebook.fName = customerService.customerSharedData.phonebook.fName;
            vm.inputs.phonebook.lName = customerService.customerSharedData.phonebook.lName;
            vm.inputs.phonebook.prefix = customerService.customerSharedData.phonebook.prefix;
            vm.inputs.phonebook.street = customerService.customerSharedData.phonebook.street;
            vm.inputs.phonebook.num = customerService.customerSharedData.phonebook.num;
            vm.inputs.phonebook.zusatz = customerService.customerSharedData.phonebook.zusatz;
            vm.inputs.phonebook.country = customerService.customerSharedData.phonebook.country;
            vm.inputs.phonebook.postal = customerService.customerSharedData.phonebook.postal;
            vm.inputs.phonebook.city = customerService.customerSharedData.phonebook.city;
            vm.inputs.phonebook.district = customerService.customerSharedData.phonebook.district;
            vm.inputs.phonebook.profession = customerService.customerSharedData.phonebook.profession;
            vm.inputs.phonebook.searchTerm = customerService.customerSharedData.phonebook.searchTerm;
            vm.inputs.phonebook.entryType = customerService.customerSharedData.phonebook.entryType;
            vm.inputs.phonebook.information = customerService.customerSharedData.phonebook.information;
            vm.inputs.phonebook.publicationType = customerService.customerSharedData.phonebook.publicationType;
            vm.inputs.phonebook.transmission = customerService.customerSharedData.phonebook.transmission;
            vm.inputs.phonebook.reverseSearch = customerService.customerSharedData.phonebook.reverseSearch;
            vm.inputs.phonebook.commercialUse = customerService.customerSharedData.phonebook.commercialUse;
        }
        if (customerService.customerSharedData.agreement) {
            //vm.inputs.agreement.noAdvert = customerService.customerSharedData.agreement.noAdvert;
            vm.inputs.agreement.noColdCalling = customerService.customerSharedData.agreement.noColdCalling;
        }
        if (customerService.customerSharedData.AVD) {
            vm.inputs.AVD.choice = customerService.customerSharedData.AVD.choice;
            vm.inputs.AVD.message = customerService.customerSharedData.AVD.message;
        }


        //TODO: Remove static content
        vm.inputs.customerAdd.country = "Deutschland";
        vm.inputs.diffBill.country = "Deutschland";
        vm.inputs.bankDetails.country = "Deutschland";
        vm.inputs.phonebook.country = "Deutschland";
        vm.acdemicTitle = [
            "Dr."
        ];
        vm.countriesData = [
            "Deutschland"
        ];
        vm.anrede = [
            "Herr",
            "Frau"
        ];
        vm.prefix = [
            "0172",
            "0173",
            "0174"
        ];
        vm.invoiceTyp = [
            "Online",
            "Papier"
        ];
        vm.intent = [
            "intent-1",
            "intent-2"
        ]


        $scope.$parent.headerTitle = "Neukunde";
        $scope.$parent.subPrevText = "Vorheriger Schritt";
        $scope.$parent.prevText = "Warenkorb";
        $scope.$parent.hidePrevBtn = false;
        $scope.$parent.prev = function () {
            cashingData();
            $state.go("customer.shoppingCart");
        };

        $scope.$parent.subNextText = "Nächster Schritt";
        $scope.$parent.nextText = "Teilnehmerdaten";
        $scope.$parent.next = function () {
                 cashingData();
            customerService.putCustomerData(orderId, cashingData()).then(
                function (respModel) {
                    $state.go("customer.subscriberData");
                }
            ).catch(function (fault) {
                    //vm.errorMessage = fault.text;
                    vm.saveError = true;

                }
            );
    };


        angular.element(document).ready(function () {
            vf.dialog.init(document);
        });

        function cashingData() {
            return customerService.customerSharedData = {
                "contractData": {
                    "password": vm.inputs.contractData.password,
                    "num": vm.inputs.contractData.num,
                    "type": vm.inputs.contractData.type
                },
                "customerData": {
                    "salutation": vm.inputs.customerData.salutation,
                    "title": vm.inputs.customerData.title,
                    "birth": vm.inputs.customerData.birth,
                    "surName": vm.inputs.customerData.surName,
                    "firstName": vm.inputs.customerData.firstName,
                    "ID": vm.inputs.customerData.ID,
                    "noID": vm.inputs.customerData.noID,
                    "creditInst": vm.inputs.customerData.creditInst,
                    "creditNum": vm.inputs.customerData.creditNum,
                    "expiryDate": vm.inputs.customerData.expiryDate
                },
                "customerAdd": {
                    "street": vm.inputs.customerAdd.street,
                    "num": vm.inputs.customerAdd.num,
                    "postal": vm.inputs.customerAdd.postal,
                    "city": vm.inputs.customerAdd.city,
                    "country": vm.inputs.customerAdd.country
                },
                "contactDetails": {
                    "prefix": vm.inputs.contactDetails.prefix,
                    "contact": vm.inputs.contactDetails.contact,
                    "preset": vm.inputs.contactDetails.preset,
                    "num": vm.inputs.contactDetails.num,
                    "email": vm.inputs.contactDetails.email,
                    "noEmail": vm.inputs.contactDetails.noEmail
                },
                "billDetails": {
                    "sms": vm.inputs.billDetails.sms,
                    "num": vm.inputs.billDetails.num,
                    "area": vm.inputs.billDetails.area,
                    "type": vm.inputs.billDetails.type,
                    "custCostCenter": vm.inputs.billDetails.custCostCenter
                },
                "diffBill": {
                    "salutation": vm.inputs.diffBill.salutation,
                    "title": vm.inputs.diffBill.title,
                    "firstName": vm.inputs.diffBill.firstName,
                    "surName": vm.inputs.diffBill.surName,
                    "street": vm.inputs.diffBill.street,
                    "num": vm.inputs.diffBill.num,
                    "postal": vm.inputs.diffBill.postal,
                    "city": vm.inputs.diffBill.city,
                    "country": vm.inputs.diffBill.country,
                    "PObox": vm.inputs.diffBill.PObox,
                    "contactTitle": vm.inputs.diffBill.contactTitle,
                    "contactPerson": vm.inputs.diffBill.contactPerson,
                    "preset": vm.inputs.diffBill.preset,
                    "contactNumber": vm.inputs.diffBill.contactNumber
                },
                "bankDetails": {
                    "IBAN": vm.inputs.bankDetails.IBAN,
                    "BIC": vm.inputs.bankDetails.BIC,
                    "accNum": vm.inputs.bankDetails.accNum,
                    "bankCode": vm.inputs.bankDetails.bankCode,
                    "creditInst": vm.inputs.bankDetails.creditInst,
                    "usage": vm.inputs.bankDetails.usage,
                    "accHolder": vm.inputs.bankDetails.accHolder,
                    "street": vm.inputs.bankDetails.street,
                    "num": vm.inputs.bankDetails.num,
                    "postal": vm.inputs.bankDetails.postal,
                    "city": vm.inputs.bankDetails.city,
                    "country": vm.inputs.bankDetails.country
                },
                "phonebook": {
                    "academicTitle": vm.inputs.phonebook.academicTitle,
                    "title": vm.inputs.phonebook.title,
                    "intent": vm.inputs.phonebook.intent,
                    "fName": vm.inputs.phonebook.fName,
                    "lName": vm.inputs.phonebook.lName,
                    "prefix": vm.inputs.phonebook.prefix,
                    "street": vm.inputs.phonebook.street,
                    "num": vm.inputs.phonebook.num,
                    "zusatz": vm.inputs.phonebook.zusatz,
                    "country": vm.inputs.phonebook.country,
                    "postal": vm.inputs.phonebook.postal,
                    "city": vm.inputs.phonebook.city,
                    "district": vm.inputs.phonebook.district,
                    "profession": vm.inputs.phonebook.profession,
                    "searchTerm": vm.inputs.phonebook.searchTerm,
                    "entryType": vm.inputs.phonebook.entryType,
                    "information": vm.inputs.phonebook.information,
                    "publicationType": vm.inputs.phonebook.publicationType,
                    "transmission": vm.inputs.phonebook.transmission,
                    "reverseSearch": vm.inputs.phonebook.reverseSearch,
                    "commercialUse": vm.inputs.phonebook.commercialUse

                },
                "agreement": {
                    "noColdCalling": vm.inputs.agreement.noColdCalling
                },
                "AVD": {
                    "choice": vm.inputs.AVD.choice,
                    "message": vm.inputs.AVD.message
                }
            };
        }


    }


})();
