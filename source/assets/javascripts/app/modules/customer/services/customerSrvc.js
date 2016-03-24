(function () {
    "use strict";

    angular
        .module('onePOS.customer')
        .factory('customerService', ["customerResources", "$filter", "AuthService", "$http", "$q",
            customerService]);

    function customerService(customerResources, $filter, AuthService, $http, $q) {
        var service = {},
            resp,
            payload;

        service.orderData = {};
        service.sharedLineItem = {};
        //service.sharedTariff = {};
        service.cartlist = [];

        service.data = null;
        service.shared = {};
        service.selectedHardware = null;
        service.selectedAddress = null;

        service.getOrdersOverview = getOrdersOverview;
        service.getOrderItem = getOrderItem;

        service.getCart = getCart;
        service.addItem = addItem;
        service.emptyCart = emptyCart;
        service.empty = empty;
        service.submitCart = submitCart;
        service.putCustomerData = putCustomerData;
        service.subscription = subscription;
        service.orderLineItemData = orderLineItemData;

        service.getCustomerData = getCustomerData;
        service.getSubscriberData = getSubscriberData;

        service.saving = saving;

        //service.addonsArray = {}; //
        service.firstLog = true; //
        service.customerSharedData = {};

        service.addonsArray = {}; //
        service.subscriberDataShared = {},
            service.checkAll = checkAll;
        service.sendProduct = sendProduct;
        service.getProduct = getProduct;
        service.getAddons = getAddons;
        service.getPortingData = getPortingData;
        service.getPrepaidData = getPrepaidData;
        service.getFixednetData = getFixednetData;
        service.getHardwareData = getHardwareData;

        service.getDiscounts = getDiscounts;
        service.getAccessories = getAccessories;
        service.getHardware = getHardware;

        service.getOrderId = getOrderId;
        service.sendOrderLineItem = sendOrderLineItem;
        service.postTariff = postTariff;

        //pdf download services
        service.order = {
            id: 111
        };
        service.getAgreementForOrder = getCustomerAgreementForOrder;
        service.getAgreement = getCustomerAgreement;

        service.addonsArray = [];

        return service;

        function respModel(model) {
            this.model = model;
        }

        function getOrdersOverview(params) {
            return customerResources.ordersOverview(params).then(
                function (response) {
                    resp = new respModel(response.data);

                    return resp;
                });
        }

        function getOrderItem(params) {
            return customerResources.orderItem(params).then(
                function (response) {
                    resp = new respModel(response.data);

                    return resp;
                });
        }

        function saving(params) {
            payload = {

                "salesOrderVBO": [
                    {
                        "parts": {
                            "lineItems": [
                                {
                                    "orderLineItemId": params.orderLineItemId,
                                    "status": params.status,
                                    "lastModified": params.lastModified,
                                    "productOffering": {
                                        "groupItemID": params.groupItemID,
                                        "product": [
                                            {
                                                "specification": params.specification,
                                                "characteristicValue": [
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    },
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    }
                                                ]
                                            },
                                            {
                                                "specification": params.specification,
                                                "characteristicValue": [
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    }
                                                ]
                                            },
                                            {
                                                "specification": params.specification,
                                                "characteristicValue": [
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    },
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    },
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    }
                                                ]
                                            },
                                            {
                                                "code": params.code,
                                                "name": params.name,
                                                "specification": params.specification,
                                                "category": params.category,
                                                "infoURL": params.infoURL,
                                                "characteristicValue": [
                                                    {
                                                        "name": params.name,
                                                        "value": params.value
                                                    }
                                                ],
                                                "product": [
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    },
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    },
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    },
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "category": params.category,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    },
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "category": params.category,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    },
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "category": params.category,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    },
                                                    {
                                                        "code": params.code,
                                                        "name": params.name,
                                                        "specification": params.specification,
                                                        "category": params.category,
                                                        "validity": params.validity,
                                                        "infoURL": params.infoURL
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            } //TODO: review

            return customerResources.saveItem(payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    //console.log(resp);
                    return resp;
                })
        }


        function getCart(orderID) {
            //console.log(params);
            return customerResources.cart(orderID).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                })
        }

        function addItem(params) {

            payload = {
                "salesOrderVBO": {
                    "parts": {
                        "lineItems": [
                            {
                                "type": params.type,
                                "category": params.category
                            }
                        ]
                    }
                }
            }

            return customerResources.addTariff(payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    return resp;


                })
        }

        function emptyCart(orderId,orderLineItemId) {
            return customerResources.deleteCart(orderId,orderLineItemId).then(
                function (response) {
                    resp = new respModel(response.data);
                    return resp;


                })
        }


        function empty(params) {
            return customerResources.emptyCarts(params).then(
                function (response) {
                    resp = new respModel(response.data);
                    return resp;


                })
        }

        function submitCart(orderId, orderLineItemId, payload) {
            /*payload = {
             "salesOrderVBO": [
             {
             "actionCode": params,
             "roles": {
             "customer": {
             "type": "private"
             }
             }
             }
             ]
             };*/
            return customerResources.sendCart(orderId, orderLineItemId, payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                })
        }


        function sendOrderLineItem(params) { /*orderLineItemId*/
            payload = {
                "salesOrderVBO": [
                    {
                        "parts": {
                            "lineItems": [
                                {
                                    /*"orderLineItemId": orderLineItemId*/
                                    "type": params.type,
                                    "category": params.category
                                }
                            ]
                        }
                    }
                ]
            };
          return customerResources.postOrderLineItem(payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                })
        }


        function putCustomerData(orderId, cashingData) {
            var payload = {
                "customerAccountVBO": [
                    {
                        "category": cashingData.contractData.type,
                        "skeletonContractNumber": cashingData.contractData.num,
                        "details": {
                            "password": cashingData.contractData.password
                        },
                        "parts": {
                            "individual": {
                                "salutation": cashingData.customerData.salutation,
                                "title": cashingData.customerData.title,
                                "firstName": cashingData.customerData.firstName,
                                "familyName": cashingData.customerData.surName,
                                "prefix": "Van de",
                                "aristocraticTitle": "Graf von",
                                "birthDate": cashingData.customerData.birth,
                                "idCard": {
                                    "documentNumber": cashingData.customerData.ID,
                                    "bankName": cashingData.customerData.creditInst,
                                    "idCardNumber": cashingData.customerData.creditNum,
                                    "idCardType": "Passport",
                                    "idCardCountry": "DE",
                                    "idCardExpiryDate": cashingData.customerData.expiryDate
                                }
                            },
                            "contactPoints": [
                                {
                                    "contactPerson": cashingData.contactDetails.contact,
                                    "postal": {
                                        "type": "CustomerAddress",
                                        "street": cashingData.customerAdd.street,
                                        "streetNumber": cashingData.customerAdd.num,
                                        "postCode": cashingData.customerAdd.postal,
                                        "city": cashingData.customerAdd.city,
                                        "country": cashingData.customerAdd.country
                                    },
                                    "email": {
                                        "fullAddress": cashingData.contactDetails.email,
                                        "hasEmailAccount": cashingData.contactDetails.noEmail
                                    },
                                    "telephone": {
                                        "subscriberNumber": cashingData.contactDetails.num,
                                        "localAreaCode": "211",
                                        "fullNumber": "211" + cashingData.contactDetails.num
                                    }
                                }
                            ],
                            "preferences": {
                                "marketingUseDataIndicator": false,
                                "marketingUsePhoneIndicator": cashingData.agreement.noColdCalling,
                                "hasMessageForBackOffice": true/*cashingData.AVD.choice*/,
                                "manualCheck": false,
                                "messageToBackOffice": cashingData.AVD.message
                            },
                            "billingAccount": {
                                "invoiceDeliveryType": "EMAIL", //cashingData.billDetails.type
                                "sameAsCustAddress": true,
                                "hasSMSNotification": cashingData.billDetails.sms,

                                "contactPerson": cashingData.diffBill.contactPerson,
                                "paymentMethod": {
                                    "bankPayment": {
                                        "accountNumber": cashingData.bankDetails.accNum,
                                        "accountOwnerName": cashingData.bankDetails.accHolder,
                                        "bankCode": cashingData.bankDetails.bankCode,
                                        "bankName": cashingData.bankDetails.creditInst,
                                        "iban": cashingData.bankDetails.IBAN,
                                        "bic": cashingData.bankDetails.BIC,
                                        "reasonForPayment": cashingData.bankDetails.usage
                                    },
                                    "bankAddress": {
                                        "street": cashingData.bankDetails.street,
                                        "streetNumber": cashingData.bankDetails.num,
                                        "postCode": cashingData.bankDetails.postal,
                                        "city": cashingData.bankDetails.city,
                                        "country": cashingData.bankDetails.country
                                    }
                                },
                                "individual": {
                                    "title": cashingData.diffBill.title,
                                    "salutation": cashingData.diffBill.salutation,
                                    "firstName": cashingData.diffBill.firstName,
                                    "familyName": cashingData.diffBill.surName
                                },
                                "billingAddress": {
                                    "street": cashingData.diffBill.street,
                                    "streetNumber": cashingData.diffBill.num,
                                    "postBox": cashingData.diffBill.PObox,
                                    "postCode": cashingData.diffBill.postal,
                                    "city": cashingData.diffBill.city,
                                    "country": cashingData.diffBill.country
                                },
                                "telephone": {
                                    "subscriberNumber": cashingData.diffBill.contactNumber,
                                    "localAreaCode": "211",
                                    "fullNumber": "211" + cashingData.diffBill.contactNumber
                                },
                                "sms": {
                                    "subscriberNumber": cashingData.billDetails.num,
                                    "localAreaCode": "211",
                                    "fullNumber": "211" + cashingData.billDetails.num
                                }
                            },
                            "phoneBook": {
                                "individual": {
                                    "title": "Dr",
                                    "salutation": cashingData.phonebook.title,
                                    "firstname": cashingData.phonebook.fName,
                                    "familyName": cashingData.phonebook.lName,
                                    "prefix": cashingData.phonebook.prefix,
                                    "aristocraticTitle": cashingData.phonebook.academicTitle,
                                    "occupation": cashingData.phonebook.profession
                                },
                                "address": {
                                    "street": cashingData.phonebook.street,
                                    "streetNumber": cashingData.phonebook.num,
                                    "streetNumberSuffix": cashingData.phonebook.zusatz,
                                    "postCode": cashingData.phonebook.postal,
                                    "city": cashingData.phonebook.city,
                                    "subLocality": cashingData.phonebook.district,
                                    "country": cashingData.phonebook.country
                                },
                                "searchTerm": cashingData.phonebook.searchTerm,
                                "searchDirectory": "PrivateDatabase",
                                "entryType": cashingData.phonebook.entryType,
                                "publicationType": cashingData.phonebook.publicationType,
                                "informationExchange": cashingData.phonebook.information,
                                "inverseSearch": cashingData.phonebook.reverseSearch,
                                "marketingUseDataIndicator": cashingData.phonebook.commercialUse
                            }
                        }
                    }
                ]

                /* "customerAccountVBO": [
                 {
                 "category": "private",
                 "skeletonContractNumber": 12345678,
                 "details": {
                 "password": "Kennwortxy"
                 },
                 "parts": {
                 "individual": {
                 "salutation": "Herr",
                 "title": "Dr",
                 "firstName": "Peter",
                 "familyName": "Müller",
                 "prefix": "Van de",
                 "aristocraticTitle": "Graf von",
                 "birthDate": "1980-01-01",
                 "idCard": {
                 "documentNumber": "1234567890",
                 "bankName": "Sparkasse Düsseldorf",
                 "idCardNumber": "123456789012",
                 "idCardType": "Passport",
                 "idCardCountry": "DE",
                 "idCardExpiryDate": "2018-01-01"
                 }
                 },
                 "contactPoints": [
                 {
                 "contactPerson": "Peter Müller",
                 "postal": {
                 "type": "CustomerAddress",
                 "street": "Am Seestern",
                 "streetNumber": "1",
                 "postCode": "40547",
                 "city": "Düsseldorf",
                 "country": "Deutschland"
                 },
                 "email": {
                 "fullAddress": "peter.mueller@arcor.de",
                 "hasEmailAccount": true
                 },
                 "telephone": {
                 "subscriberNumber": "123456",
                 "localAreaCode": "211",
                 "fullNumber": "0211123456"
                 }
                 }
                 ],
                 "preferences": {
                 "marketingUseDataIndicator": false,
                 "marketingUsePhoneIndicator": false,
                 "hasMessageForBackOffice": false,
                 "manualCheck": false,
                 "messageToBackOffice": "Please contact…"
                 },
                 "billingAccount": {
                 "invoiceDeliveryType": "EMAIL",
                 "sameAsCustAddress": true,
                 "hasSMSNotification": true,
                 "contactPerson": "Peter Müller",
                 "paymentMethod": {
                 "bankPayment": {
                 "accountNumber": "1234567890",
                 "accountOwnerName": "Peter Müller",
                 "bankCode": "30050110",
                 "bankName": "Sparkasse Düsseldorf",
                 "iban": "DE11222233334444555566",
                 "bic": "DUSSDEDDXXX",
                 "reasonForPayment": "Direct Debit Feature"
                 },
                 "bankAddress": {
                 "street": "Am Seestern",
                 "streetNumber": "2",
                 "postCode": "40567",
                 "city": "Düsseldorf",
                 "country": "Deutschland"
                 }
                 },
                 "individual": {
                 "title": "Dr.",
                 "salutation": "Herr",
                 "firstName": "Peter",
                 "familyName": "Müller"
                 },
                 "billingAddress": {
                 "street": "Am Seestern",
                 "streetNumber": "1",
                 "postBox": 4567,
                 "postCode": "40547",
                 "city": "Düsseldorf",
                 "country": "Deutschland"
                 },
                 "telephone": {
                 "subscriberNumber": "123456",
                 "localAreaCode": "211",
                 "fullNumber": "0211123456"
                 },
                 "sms": {
                 "subscriberNumber": "123456",
                 "localAreaCode": "211",
                 "fullNumber": "0211123456"
                 }
                 },
                 "phoneBook": {
                 "individual": {
                 "title": "Dr",
                 "salutation": "Herr",
                 "firstname": "Stephanie",
                 "familyName": "Müller",
                 "prefix": "Van de",
                 "aristocraticTitle": "Graf von",
                 "occupation": "Graf von"
                 },
                 "address": {
                 "street": "Musterstraße",
                 "streetNumber": "23",
                 "streetNumberSuffix": "a",
                 "postCode": "12345",
                 "city": "CityStadt",
                 "subLocality": "Kreis Stadthausen",
                 "country": "Deutschland"
                 },
                 "searchTerm": "Feuerwehr ",
                 "searchDirectory": "PrivateDatabase",
                 "entryType": "Printed",
                 "publicationType": "CityAndStreet",
                 "informationExchange": "Complete",
                 "inverseSearch": true,
                 "marketingUseDataIndicator": false
                 }
                 }
                 }
                 ]*/
            }

            return customerResources.customerData(orderId, payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;


                })
        }


        function subscription(orderId, orderLineItemId, cashingData) {
            payload = {
                "subscriptions": [
                    {
                        "details": {
                            "reservedPhoneNumber": cashingData.contractData.reservedPhoneNumber
                        },
                        "contractDetails": {
                            "startDate": cashingData.contractData.startDate
                        },
                        "security": {
                            "password": cashingData.contractData.password
                        },
                        "preferences": {
                            "copyLegalToSubscrAddress": cashingData.participantAddress.useLegaelAddress,
                            "copyBillingToSubscrAddress": cashingData.participantAddress.useBillingAddress,
                            "desiredOverview": "Mini",
                            "desiredNumber": "Complete",
                            "displayedNumber": "EnableCaseToCase"
                        },
                        // "services": {
                        //     "sharingGroupType": "red-plus",
                        //     "sharingGroupRole": "owner"
                        // },
                        "porting": {
                            "individual": {
                                "firstName": "Jonh",
                                "familyName": "Johnson",
                                "birthDate": cashingData.discounts.birthDate
                            },
                            "organization": {
                                "name": cashingData.discounts.college,
                                "organizationType": "T"
                            },
                            "oldServiceProvider": "TMOB",
                            "oldCustomerNumber": "10033232",
                            "quickPorting": true,
                            "telephone": {
                                "countryCode": "49",
                                "localAreaCode": "172",
                                "subscriberNumber": "1234567"
                            },
                            "numbers": {
                                "countryCode": "49",
                                "localAreaCode": "172",
                                "mainPhoneNumber": "12233443"
                            }
                        },
                        // "specialPorting": {
                        //     "individual": {
                        //         "firstName": "Jonh",
                        //         "familyName": "Johnson"
                        //     },
                        //     "address": {
                        //         "type": "HOMEZONE",
                        //         "street": "Roadstraße",
                        //         "streetNumber": "23",
                        //         "postCode": "12345",
                        //         "city": "Citystadt",
                        //         "country": "Deutschland"
                        //     },
                        //     "landPorting": {
                        //         "provider": "TMOB",
                        //         "desiredPortingDate": "2015-01-02",
                        //         "connectionType": "normal",
                        //         "numbers": {
                        //             "countryCode": "49",
                        //             "localAreaCode": "172",
                        //             "mainPhoneNumber": "12233443",
                        //             "additionalPhoneNumber": [
                        //                 "0211123450",
                        //                 "0211123451",
                        //                 "0211123452"
                        //             ],
                        //             "portAllNumbers": true
                        //         }
                        //     }
                        // },
                        "address": {
                            "type": "SUBSCRIBER",
                            "street": "Roadstraße",
                            "streetNumber": "23",
                            "streetNumberSuffix": "a",
                            "postCode": "12345",
                            "city": "Citystadt",
                            "country": "Deutschland",
                            "countryCode": "D"
                        },
                        "phoneBook": {
                            "individual": {
                                "title": "Dr",
                                "salutation": "Herr",
                                "firstname": "Stephanie",
                                "familyName": "Müller",
                                "prefix": "Van de",
                                "aristocraticTitle": "Graf von",
                                "occupation": "doctor"
                            },
                            "address": {
                                "street": "Musterstraße",
                                "streetNumber": "23",
                                "streetNumberSuffix": "a",
                                "postCode": "12345",
                                "city": "CityStadt",
                                "subLocality": "Kreis Stadthausen",
                                "country": "Deutschland"
                            },
                            "searchTerm": "Feuerwehr",
                            "searchDirectory": "PrivateDatabase",
                            "entryType": "Printed",
                            "publicationType": "CityAndStreet",
                            "informationExchange": "Complete",
                            "inverseSearch": true,
                            "marketingUseDataIndicator": false
                        }
                    }
                ]

                /* "subscriptions": [
                 {
                 "details": {
                 "reservedPhoneNumber": "4917246578976"
                 },
                 "contractDetails": {
                 "startDate": "2015-01-01"
                 },
                 "security": {
                 "password": "Test123456"
                 },
                 "preferences": {
                 "copyLegalToSubscrAddress": true,
                 "copyBillingToSubscrAddress": false,
                 "desiredOverview": "Mini",
                 "desiredNumber": "Complete",
                 "displayedNumber": "EnableCaseToCase"
                 },
                 "address": {
                 "type": "SUBSCRIBER",
                 "street": "Roadstraße",
                 "streetNumber": "23",
                 "streetNumberSuffix": "a",
                 "postCode": "12345",
                 "city": "Citystadt",
                 "country": "Deutschland",
                 "countryCode": "D"
                 },
                 "phoneBook": {
                 "individual": {
                 "title": "Dr",
                 "salutation": "Herr",
                 "firstname": "Stephanie",
                 "familyName": "Müller",
                 "prefix": "Van de",
                 "aristocraticTitle": "Graf von",
                 "occupation": "doctor"
                 },
                 "address": {
                 "street": "Musterstraße",
                 "streetNumber": "23",
                 "streetNumberSuffix": "a",
                 "postCode": "12345",
                 "city": "CityStadt",
                 "subLocality": "Kreis Stadthausen",
                 "country": "Deutschland"
                 },
                 "searchTerm": "Feuerwehr",
                 "searchDirectory": "PrivateDatabase",
                 "entryType": "Printed",
                 "publicationType": "CityAndStreet",
                 "informationExchange": "Complete",
                 "inverseSearch": true,
                 "marketingUseDataIndicator": false
                 }
                 }
                 ]*/


            }

            return customerResources.subscriberData(orderId, orderLineItemId, payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    //console.log(resp);
                    return resp;
                })
        }

        function orderLineItemData(orderId, orderLineItemId) {
            return customerResources.orderLineItemData(orderId, orderLineItemId).then(
                function (response) {
                    resp = new respModel(response.data);
                    return resp;
                })
        }


        function getCustomerData(orderId) {
            return customerResources.customerSummary(orderId).then(
                function (response) {
                    resp = new respModel(response.data);
                    return resp;
                })
        }

        function getSubscriberData(orderId, orderLineItemId) {
            return customerResources.subscriberSummary(orderId, orderLineItemId).then(
                function (response) {
                    resp = new respModel(response.data);
                    return resp;
                })
        }

        //TODO: to be populated
        function checkAll(filterList, index, disableFun) {
            disableFun = true;
            angular.forEach(filterList, function (value, index) {
                if (value != true) {
                    filterList[index] = true;
                }
                disableFun = true;
            });
        }


        function sendProduct(orderId, orderLineItemId, payload) {
            return customerResources.sendProduct(orderId, orderLineItemId, payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                }
            )
        }

        function postTariff(orderId, orderLineItemId, tarrifObject) {
            var payload = {
                "salesOrderVBO": [
                    {
                        "parts": {
                            "lineItems": [
                                {
                                    "productOffering": {
                                        "product": []
                                    }
                                }
                            ]
                        }

                    }
                ]
            };

            // hardware

            if (tarrifObject.code) {
                var tempTariff = {
                    "code": tarrifObject.code,
                    "specification": "tariff-group",
                    "characteristicValue": [
                        {
                            "name": "SubsidyLevel",
                            "value": "Subsidy 1"
                        }
                    ],
                    //"product": service.shared.extrasArray.concat(payload)
                    "product": []
                };

                if (tarrifObject.imeiNumber) {

                    tempTariff.product.push({
                        "specification": "hardware",
                        "characteristicValue": [
                            {
                                "name": "IMEI",
                                "value": tarrifObject.imeiNumber
                            },
                            {
                                "name": "DeliveryMode",
                                "value": "DirectDelivery"
                            }
                        ]
                    });
                }
                if (tarrifObject.simNumber) {
                    tempTariff.product.push({
                        "specification": "sim-card",
                        "characteristicValue": [
                            {
                                "name": "simSerialNumber",
                                "value": tarrifObject.simNumber
                            }
                        ]
                    })
                }

                if (tarrifObject.promotions.length > 0) {
                    var mappedPromotions = tarrifObject.promotions.map(function (elem) {
                        return {
                            code: elem.code,
                            specification: "promotion"
                        }
                    });
                    tempTariff.product = tempTariff.product.concat(mappedPromotions);

                }
                if (tarrifObject.discounts.length > 0) {
                    var mappedDiscounts = tarrifObject.discounts.map(function (elem) {
                        return {
                            code: elem.code,
                            specification: "discount"
                        }
                    });
                    tempTariff.product = tempTariff.product.concat(mappedDiscounts);
                }
                payload.salesOrderVBO[0].parts.lineItems[0].productOffering = tempTariff;
            }


            return customerResources.sendProduct(orderId, orderLineItemId, payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                }
            );
        }

        function getProduct(orderId, orderLineItemId) {
            return customerResources.getProduct(orderId, orderLineItemId).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.data = resp;
                    return resp;
                }
            );
        }



        function getAddons() {
            return {
                "user": {
                    "username": "ops_1",
                    "id": "xyz"
                },
                "tariff": "Red 1.5 GB",
                "addonsList": [
                    {
                        "code": "DeezerMusik-Flat-1",
                        "name": "Deezer Musik-Flat",
                        "category": "Entertainment",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "MobileTV-2",
                        "name": "Mobile TV",
                        "category": "Entertainment",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "VFHappyInternational-3",
                        "name": "VF Happy International",
                        "category": "Roaming",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "VFReisePaketData-3",
                        "name": "VF ReisePaket Data",
                        "category": "Roaming",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "VFReiseVersprechenAsien-3",
                        "name": "VF ReiseVersprechen Asien",
                        "category": "Roaming",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "EasyTravelFlatTag-3",
                        "name": "EasyTravel Flat Tag",
                        "category": "Roaming",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "ZuhauseOption-3",
                        "name": "Zuhause Option",
                        "category": "Sonstige",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "VFHandy-Tablet-Versicherung-3",
                        "name": "VF Handy-Tablet-Versicherung",
                        "category": "Sonstige",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "ConsumerSecureNet-3",
                        "name": "Consumer Secure Net",
                        "category": "Sonstige",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    }
                ],
                "hiddenSOCs": [
                    {
                        "code": "DeezerMusik-Flat-SOC-1",
                        "name": "Deezer Musik-Flat SOC",
                        "category": "Hidden SOCs",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "MobileTV-SOC-2",
                        "name": "Mobile TV SOC",
                        "category": "Hidden SOCs",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    },
                    {
                        "code": "VFHappyInternational-SOC-3",
                        "name": "VF Happy International SOC",
                        "category": "Hidden SOCs",
                        "validity": "24 Monate",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_mob.html",
                        "specification": "tariff-addon"
                    }
                ]
            }
        }

        function getPortingData() {
            return {
                simType: [
                    {
                        "name": "SIMOnly",
                        "code": "SIMO",
                        "path": "simType"
                    },
                    {
                        "name": "SUB 5",
                        "code": "SUB5",
                        "path": "simType"
                    }
                ]
            }
        }

        function getPrepaidData() {
            return {
                tariffGroup: [
                    {
                        "name": "Vodafone CallYa Special ",
                        "code": "Vodafone_CallYa_Special ",
                        "path": "tariffGroup"
                    },
                    {
                        "name": "Vodafone CallYa Talk & SMS",
                        "code": "Vodafone_CallYa_Talk-SMS",
                        "path": "tariffGroup"
                    },
                    {
                        "name": "Vodafone Allnet Flat",
                        "code": "Vodafone_Allnet_Flat",
                        "path": "tariffGroup"
                    }
                ]
            }
        }

        function getFixednetData() {
            return {
                tariffGroup: [
                    {
                        "name": "Vodafone DSL XL 8MBps",
                        "code": "DSL_XL_8MB",
                        "path": "tariffGroup"
                    },
                    {
                        "name": "Vodafone DLS XL",
                        "code": "DSL_XL",
                        "path": "tariffGroup"
                    },
                    {
                        "name": "Vodafone DSL XL 16MBps",
                        "code": "DSL_XL_16MB",
                        "path": "tariffGroup"
                    }
                ],
                "bandwidth": "50000",
                "regionalFee": "yes",
                "hardwareArr": [
                    {
                        "name": "Samsung Galaxy S6",
                        "code": "hardwareCode-1",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-2",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-3",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-4",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-5",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-6",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-7",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-8",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-9",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-10",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-11",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-12",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-13",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-14",
                        "imgSrc": ""
                    },
                    {
                        "name": "Product title on two lines",
                        "code": "hardwareCode-15",
                        "imgSrc": ""
                    }
                ]
            }
        }

        function getHardwareData() {
            return {
                hardwareArr: [
                    {
                        "name": "iPhone 6 Plus, 64 GB, spacegrey",
                        "code": "deviceCode-1",
                        "partNumber": "1234567891011",
                        "price": "449"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-2",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-3",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-4",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-5",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-6",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-7",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-8",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-9",
                        "partNumber": "1234567891011",
                        "price": "649"
                    },
                    {
                        "name": "iPhone 6 Plus, 128 GB, spacegrey",
                        "code": "deviceCode-10",
                        "partNumber": "1234567891011",
                        "price": "649"
                    }
                ]
            }
        }


        function getOrderId() {
            var payload = {
                "salesOrderVBO": [
                    {
                        "details": {
                            "activationDateTime": "2015-08-13T15:06:44.848+02:00"
                        },
                        "roles": {
                            "agent": {
                                "voID": AuthService.getUser().defaultVoID.toString()
                            },
                            "customer": {
                                "type": "private"
                            }
                        },
                        "parts": {
                            "lineItems": [
                                {
                                    "type": "activation",
                                    "category": "post-pay"
                                }
                            ]
                        }
                    }
                ]
            }
            return customerResources.getOrderId(payload).then(
                function (response) {
                    resp = new respModel(response.data);
                    service.orderData = resp.model.salesOrderVBO[0];
                    return service.orderData;
                }
            )
        }

        function getDiscounts(){
            return{
                "discountsList":[
                    {
                        "code": "VFDISC1",
                        "name": "Discount Option A",
                        "specification": "discount",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_disca.html"
                    },
                    {
                        "code": "VFDISC2",
                        "name": "Discount Option B",
                        "specification": "discount",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_discb.html"
                    },
                    {
                        "code": "JWLPROMO1",
                        "name": "Discount Option A",
                        "specification": "Discount",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_promo.html"
                    }
                ]
            }
        }
        function getAccessories(){
            return{
                "accessoriesList":[
                    {
                        "code": "VFDISC1",
                        "name": "accessories Option A",
                        "specification": "accessories",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_disca.html"
                    },
                    {
                        "code": "VFDISC2",
                        "name": "accessories Option B",
                        "specification": "accessories",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_discb.html"
                    },
                    {
                        "code": "JWLPROMO1",
                        "name": "accessories Option A",
                        "specification": "accessories",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_promo.html"
                    }
                ]
            }
        }
        function getHardware(){
            return{
                "hardwareList":[
                    {
                        "code": "VFDISC1",
                        "name": "hardware Option A",
                        "specification": "hardware",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_disca.html"
                    },
                    {
                        "code": "VFDISC2",
                        "name": "hardware Option B",
                        "specification": "hardware",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_discb.html"
                    },
                    {
                        "code": "JWLPROMO1",
                        "name": "hardware Option A",
                        "specification": "hardware",
                        "validity": "24 months",
                        "infoURL": "http://www.vodafone.de/css/tarif_info/vf_promo.html"
                    }
                ]
            }
        }

        function getCustomerAgreementForOrder(orderId) {
            return customerResources.getAgreementsForOrder(orderId).then(
                function (res) {
                    return res.data;
                }
            )
        }

        function getCustomerAgreement(orderId, fileName, fileId, saveFile) {
            return customerResources.getAgreement(orderId, fileName, fileId, saveFile).then(
                function (res) {
                    //return res.data;
                    //    parse returned XML to get data
                    return {
                        contentType: res.contentType,
                        data: res.data
                    };
                }
            )
        }


        function getEntityList(pageId) {
            return $http.get('/api/itemTask_entityList' + '?page-id=' + pageId).then(function (res) {
                var tarrifsEntities = getEntitiesOf(res.data.containers, 'tariff-group');
                var packageEntities = getEntitiesOf(res.data.containers, 'package');
                if (tarrifsEntities && packageEntities && tarrifsEntities.length > 0)
                    return getTarrifsDetails(tarrifsEntities.concat(packageEntities));
                else
                    return $q.reject();
            }, function (err) {
                debugger;
            });
        }

        function getTarrifsDetails(tarrifGroup) {
            return $http.get('/assets/javascripts/app/data/tarrifDetails.json').then(function (res) {
                var tarrifsDetailsArr = [];
                if (typeof tarrifGroup.forEach === "function" && res.data) {
                    tarrifGroup.forEach(function (elem) {
                        if (res.data[elem.code])
                            tarrifsDetailsArr.push(res.data[elem.code]);
                    });
                }
                return tarrifsDetailsArr;
            });
        }


        /**************************************/
        /*               helpers              */
        /**************************************/
        function find(arr, handlerFun) {
            var res = [];
            arr.forEach(function (elem) {
                if (handlerFun(elem))
                    res.push(elem)
            });
            return res;
        }

        function findFirst(arr, handlerFun) {
            var res = find(arr, handlerFun);
            return res.length > 0 ? res[0] : null;
        }

        function getEntitiesOf(containers, groupName) {
            var group = findFirst(containers, function (container) {
                return container.name === groupName;
            });
            return group.entities;
        }
    }

})();
