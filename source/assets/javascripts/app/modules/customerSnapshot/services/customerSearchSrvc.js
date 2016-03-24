(function () {
    "use strict";
    angular
        .module('onePOS.customerSearch')
        .factory('searchCustomerService', ['customerSnapshotResources', 'orderByFilter', searchCustomerService]);

    // search for customer
    function searchCustomerService(customerSnapshotResources, orderByFilter) {
        // vars
        var service = {};

        // to get the customer data
        service.getCustomer = function () {
            return service.customerAccount;
        }

        // to save the customer data
        service.saveCustomer = function (data) {
            service.customerAccount = data;
        }

        //Overview of customer account details
        service.searchCustomerByID = function (customerID) {
            return customerSnapshotResources.searchCustomerByID(customerID).then(function (resp) {
                // vars
                var vbo = resp.data.customerAccountVBO[0];
                // create the model
                var model = {
                    "accountID": vbo.accountID,
                    "authType": vbo.authType,
                    "type": vbo.type,
                    "category": vbo.category,
                    "status": vbo.status,
                    "skeletonContractNumber": vbo.skeletonContractNumber,
                    "marketCode": vbo.marketCode
                }
                return model;
            });
        }
        //Password (contract password - BAN/DSL)
        service.searchCustomerByIDAndPass = function (customerID, customerPass) {
            return customerSnapshotResources.searchCustomerByIDAndPass(customerID, customerPass).then(function (resp) {
                // vars
                var vbo = resp.data.customerAccountVBO;
                var model = createModel(vbo);
                return model;
            });
        }
        //Date Of Birth & ID-Card (alternative to password search)
        service.searchCustomerByIdCard = function (customerID, customerDateOfBirth, customerIdCard) {
            return customerSnapshotResources.searchCustomerByIdCard(customerID, customerDateOfBirth, customerIdCard).then(function (resp) {
                // vars
                var vbo = resp.data.customerAccountVBO;
                var model = createModel(vbo);
                return model;
            });
        }

        function createModel(vbo) {

            var customerAccountModel = {
                customerMasterData: {},
                customerSubscribers: [],
                linkedMobileCustomer: [],
                linkedFixedNetCustomer: {},
                availabilityList: []
            }

            for (var i = 0; i < vbo.length; i++) {
                if (i == 0) {
                    customerAccountModel.customerMasterData = getCustomerMasterDate(vbo[i]);

                    for (var j = 0; j < vbo[i].parts.serviceAccounts.length; j++) {

                        customerAccountModel.customerSubscribers.push(getCustomerSubscribers(vbo[i], j));
                    }
                }
                else {
                    if (vbo[i].type == 'mobile') {
                        var linkedMobileCustomer = {
                            customerMasterData: getCustomerMasterDate(vbo[i]),
                            customerSubscribers: []
                        }

                        for (var j = 0; j < vbo[i].parts.serviceAccounts.length; j++) {

                            var subscriber = getCustomerSubscribers(vbo[i], j);

                            linkedMobileCustomer.customerSubscribers.push(subscriber);
                        }

                        customerAccountModel.linkedMobileCustomer.push(linkedMobileCustomer);
                    }
                    else if (vbo[i].type == 'fixednet') {
                        customerAccountModel.linkedFixedNetCustomer = getFixedNetCustomet(vbo[i]);
                    }
                }
            }

            customerAccountModel.availabilityList = getAvailabilityList();

            orderSubscribers(customerAccountModel);
            orderLinkedSubscribers(customerAccountModel.linkedMobileCustomer);


            return customerAccountModel;
        }

        function orderSubscribers(customerAccountModel) {

            if (customerAccountModel.customerMasterData.skeleton != false && customerAccountModel.customerSubscribers.length > 0)
                customerAccountModel.customerSubscribers = new Array(customerAccountModel.customerSubscribers[0]);
            else if (!customerAccountModel.customerMasterData.skeleton && customerAccountModel.customerSubscribers.length > 10) {
                customerAccountModel.customerSubscribers = new Array();
                customerAccountModel.customerMasterData.showWarnMsg = true;
            }
            else if (!customerAccountModel.customerMasterData.skeleton && customerAccountModel.customerSubscribers.length <= 10) {
                var searchedSubscriber = customerAccountModel.customerSubscribers.shift();
                var OrderedSubscribers = orderByFilter(customerAccountModel.customerSubscribers, ['prolongationDate', 'mobileNumber']);
                OrderedSubscribers.unshift(searchedSubscriber);
                customerAccountModel.customerSubscribers = OrderedSubscribers;
            }
        }

        function orderLinkedSubscribers(linkedMobileCustomer) {

            for (var i = 0; i <= linkedMobileCustomer.size; i++) {

                var searchedSubscriber = linkedMobileCustomer[i].customerSubscribers.shift();
                var OrderedLinkedSubscribers = orderByFilter(linkedMobileCustomer[i].customerSubscribers, ['prolongationDate', 'mobileNumber']);
                OrderedLinkedSubscribers.unshift(searchedSubscriber);
                linkedMobileCustomer[i].customerSubscribers = OrderedLinkedSubscribers;
            }

        }

        function getCustomerMasterDate(vbo) {

            var customerMasterDate = {
                customerName: "",
                accountType: "",
                customerNumber: "",
                market: "",
                type: "",
                type2: "",
                subType: "",
                skeleton: "",
                banStatus: "",
                solvency: "",
                technology: "",
                product: "",
                showWarnMsg: false
            };

            customerMasterDate.customerName = getCustomerName(vbo.category, vbo.parts.individual.title, vbo.parts.individual.firstName, vbo.parts.individual.familyName, vbo.parts.individual.salutation);
            customerMasterDate.accountType = "postpaid";
            customerMasterDate.customerNumber = vbo.accountID;
            customerMasterDate.nba = vbo.nba;
            customerMasterDate.market = vbo.marketCode || "market";
            customerMasterDate.type = vbo.category;
            customerMasterDate.type2 = vbo.type;
            customerMasterDate.subType = getSubCategory(vbo.subCategory || "none")
            customerMasterDate.skeleton = getSkeleton(vbo.skeletonContract || "none")
            customerMasterDate.banStatus = vbo.status.toLowerCase();
            if (vbo.parts.hasOwnProperty("collections")) {
                customerMasterDate.solvency = getSolvency(vbo.parts.collections.delinquentStatus || "none")
            }
            customerMasterDate.technology = vbo.parts.serviceAccounts[0].product.technology;
            customerMasterDate.product = vbo.parts.serviceAccounts[0].product.name;
            customerMasterDate.mobileNumber = vbo.parts.serviceAccounts[0].subscriptionID;
            customerMasterDate.showWarnMsg = false;


            return customerMasterDate;
        };

        function getCustomerSubscribers(vbo, j) {

            var subscriber = {
                tariffName: "",
                level: "",
                subLevel: "",
                redPlusType: "",
                mobileNumber: "",
                futureCancellation: "",
                mobileNumberStatus: true,
                mobileNumberColor: "",
                subscriberName: "",
                subscriberStatus: "",
                nextRegularSubDate: "",
                role: "",
                prolongationStatus: "",
                prolongationDate: "",
                prolongationColor: "",
                currentBalance: "",
                balanceExpiryDate: "",
            };

            subscriber.tariffName = vbo.parts.serviceAccounts[j].product.name;
            subscriber.level = getSubscriberLevel(vbo.parts.serviceAccounts[j].level || "none");
            subscriber.subLevel = "";
            subscriber.redPlusType = vbo.parts.serviceAccounts[j].role;
            subscriber.mobileNumber = vbo.parts.serviceAccounts[j].subscriptionID;
            subscriber.futureCancellation = vbo.parts.serviceAccounts[j].cancellationDate || "none";
            subscriber.mobileNumberStatus = true;
            subscriber.mobileNumberColor = getMobileNumberColor(vbo.parts.serviceAccounts[j].status || "none", vbo.parts.serviceAccounts[j].cancellationDate || "none");
            subscriber.subscriberName = vbo.parts.serviceAccounts[j].firstName + " " + vbo.parts.serviceAccounts[j].familyName;
            subscriber.subscriberStatus = getSubscriberStatus(vbo.parts.serviceAccounts[j].status);
            subscriber.nextRegularSubDate = new Date(vbo.parts.serviceAccounts[j].nextSubsidyDate);
            subscriber.role = "member";
            subscriber.prolongationStatus = "";
            subscriber.prolongationDate = new Date("10/10/22");
            subscriber.prolongationColor = "green";
            subscriber.currentBalance = "100";
            subscriber.balanceExpiryDate = new Date("10/10/22");

            return subscriber;
        };

        function getFixedNetCustomet(vbo) {
            var fixedNet = {
                customerName: getCustomerName(vbo.category, vbo.parts.individual.title, vbo.parts.individual.firstName, vbo.parts.individual.familyName, vbo.parts.individual.salutation),
                tarrifName: vbo.parts.serviceAccounts[0].product.name,
                customerNumber: vbo.accountID,
                mobileNumber: vbo.parts.serviceAccounts[0].subscriptionID,
                type: vbo.category,
                market: vbo.marketCode,
                technology: vbo.parts.serviceAccounts[0].product.technology,
                product: vbo.parts.serviceAccounts[0].product.name
            }

            return fixedNet;
        };

        function getAvailabilityList() {
            return [
                {
                    serviceName: "Kabel Voice / Internet",
                    description: "Kabel Internet & Telefon is not available.",
                    message: "",
                    iconColor: "red"
                },
                {
                    serviceName: "Vodafone Voice / Internet",
                    description: "DSL 6000, 16000, 25000 and 50000 with connection type with base terminal, feature connection available.",
                    message: "",
                    iconColor: "green"
                },
                {
                    serviceName: "Vodafone TV for DSL",
                    description: "Bandwiths 6000 and 16000: Free TV via DSL, Theme package, TV package, Video package, Sky package. Bandwiths 25000 and 50000: Video package, Sky (via SAT).",
                    message: "Warning: This product is available for private customers only!",
                    iconColor: "yellow"
                },
                {
                    serviceName: "Vodafone Voice Internet / LTE",
                    description: "Note: If broadband access from Vodafone, Internet (DSL/CDSL including regional) with bandwith 6000 or higher, LTE cannot be booked.",
                    message: "",
                    iconColor: "black"
                }
            ]
        };

        function getMobileNumberColor(subscriberStatus, futureCancellation) {
            if (subscriberStatus.toLowerCase() == 'a' && futureCancellation == 'none')
                return "black"
            else if (subscriberStatus.toLowerCase() == 'a' && futureCancellation != 'none')
                return "red"
            else
                return "gray"
        };

        //function getBanStatus(ban) {
        //    switch (ban.toLowerCase()) {
        //        case 'o':
        //            return 'open'
        //            break;
        //        case 'c':
        //            return 'close'
        //            break;
        //        case 's':
        //            return 'suspended'
        //            break;
        //        case 'n':
        //            return 'cancelled'
        //            break;
        //        case 't':
        //            return 'tentative'
        //            break;
        //        default:
        //            return ban
        //    }
        //};

        function getSkeleton(skeleton) {
            if (skeleton == 'none')
                return false;
            else
                return skeleton;
        };

        function getSubscriberStatus(status) {
            switch (status.toLowerCase()) {
                case 'a':
                    return 'active'
                    break;
                case 'c':
                    return 'close'
                    break;
                case 's':
                    return 'suspended'
                    break;
                case 'r':
                    return 'reserved'
                    break;
                case 't':
                default:
                    return status
            }
        };
        //
        function getSubscriberLevel(level) {
            switch (level.toLowerCase()) {
                case 'r':
                    return 'Red'
                    break;
                case 's':
                    return 'Silver'
                    break;
                case 'g':
                    return 'Gold'
                    break;
                case 'p':
                    return 'Platinum'
                    break;
                default:
                    return level
            }
        };
        //
        function getSolvency(solvency) {
            switch (solvency.toLowerCase()) {
                case 'd':
                    return 'delinquent'
                    break;
                case 'n':
                    return 'Not delinquent'
                    break;
                case 'none':
                    return false
                    break;
                default:
                    return solvency
            }
        };

        function getCustomerName(category, title, firstName, familyName, salutation) {

            if (category.toLowerCase() == 'private') {
                return title + " " + firstName + " " + familyName;
            }
            else {
                return salutation + " " + firstName + " " + familyName
            }

        }

        //
        function getSubCategory(subCategory) {
            switch (subCategory.toLowerCase()) {
                case 'me':
                    return 'Employee'
                    break;
                case 'mm':
                    return 'Management'
                    break;
                case 'ak':
                    return 'Aktion'
                    break;
                case 'mo':
                    return 'MMO others'
                    break;
                case 'ca':
                    return 'Company paid account'
                    break;
                case 'rz':
                    return 'Red Zac'
                    break;
                case 'rg':
                    return 'Regular'
                    break;
                case 'vp':
                    return 'VIP'
                    break;
                case 'pl':
                    return 'Platin Club'
                    break;
                case 'qu':
                    return 'Quelle'
                    break;
                case 'ne':
                    return 'Mannesmann employee'
                    break;
                case 'nm':
                    return 'Mannesmann management'
                    break;
                case 'ft':
                    return 'Ford Telematics'
                    break;
                case 'nr':
                    return 'Mannesmann other'
                    break;
                case 'ky':
                    return 'Key account'
                    break;
                case 'sp':
                    return 'SAP'
                    break;
                case 'sl':
                    return 'Duo slave'
                    break;
                case 'none':
                    return false
                    break;
                default:
                    return subCategory
            }
        };


        // return
        return service;
    }
})();
