/**
 * Created by Omar Makeen on 1/18/16.
 */

(function () {

        "use strict";

        angular.module("onePOS.customerSnapshot").factory('customerDetailsModelBuilder', [customerDetailsModelBuilder]);

        function customerDetailsModelBuilder() {

            var service = {};
            var customerAccountVBO, subscriptionVBO, invoiceVBO;

            service.createCustomerDetailsModel = function (customerDetailsResp, subscriptionDetailsResp, invoiceResp) {

                customerAccountVBO = customerDetailsResp.customerAccountVBO;
                subscriptionVBO = subscriptionDetailsResp.subscriptionVBO;
                invoiceVBO = invoiceResp.invoiceVBO[0];

                var model = {
                    contract: {
                        contractMasterData: getContractMasterData(),
                        discounts: getDiscounts(),
                        promotions: getPromotions(),
                        addOns: getAddons(),
                        simInfo: getSimInfo()
                    },
                    contact: {
                        customerContact: getCustomerContact(),
                        privacySettings: getPrivacySetting(),
                        customerAddress: getCustomerAddress(),
                        subscriberAddress: getSubscriberAddress(),
                        homeZoneAddress: getHomeZoneAddress()

                    },
                    billing: {
                        billingInfo: getBillingInfo(),
                        invoiceStatus: getInvoiceBalance(),
                        itemizedBill: getItemizedBill(),
                        bankAccount: getBankAccount(),
                        billingAddress: getBillingAddress(),
                        invoices: getInvoices()
                    }
                };

                return model;
            };

            function getContractMasterData() {

                var contractMasterData = {
                    customerName: getCustomerName(),
                    customerNumber: customerAccountVBO.accountID,
                    Tariff: subscriptionVBO.subscriptions[0].customerProduct.tariffDetails.name,
                    type: customerAccountVBO.type,
                    accountId: customerAccountVBO.accountID,
                    role: "member",
                    mobileNumber: subscriptionVBO.subscriptions[0].details.msisdn,
                    mobileNumberColor: "",
                    level: subscriptionVBO.subscriptions[0].details.level,
                    firstActivationDate: subscriptionVBO.subscriptions[0].contractDetails.startDate,
                    nextPossibleCancellation: subscriptionVBO.subscriptions[0].contractDetails.nextCancellationDate,
                    lastSubsidy: subscriptionVBO.subscriptions[0].contractDetails.lastSubsidyDate,
                    lastNotification: subscriptionVBO.subscriptions[0].contractDetails.lastNotificationDate,
                    recommendations: "",
                    Empfehlungen: 'Diese Daten sehen Sie aktuell in ePOS als Empfehlungen.',
                    EmpfehlungsInfo: 'warning'
                };

                return contractMasterData;

            }

            function getCustomerName() {
                var customerName;

                if (customerAccountVBO.category == 'private') {
                    customerName = customerAccountVBO.parts.individual.title
                        + " " + customerAccountVBO.parts.individual.firstName
                        + " " + customerAccountVBO.parts.individual.familyName
                }
                else {
                    customerName = customerAccountVBO.parts.organization.legalEntity.salutation
                        + " " + customerAccountVBO.parts.organization.legalEntity.localTradingName;
                }
                return customerName;
            }

            function getDiscounts() {
                var discounts = [
                    "Guthaben 01",
                    "Guthaben 02"
                ];

                return discounts;
            }

            function getPromotions() {
                var promotions = [
                    "Christmas Promotion 0432",
                    "Christmas Promotion 0432"
                ];
                return promotions;
            }

            function getAddons() {
                var addOns = [];
                for (var i = 0; i < subscriptionVBO.subscriptions[0].customerProduct.tariffOptionDetails.length; i++) {
                    var addonCategory = subscriptionVBO.subscriptions[0].customerProduct.tariffOptionDetails[i].type;
                    var addOnName = subscriptionVBO.subscriptions[0].customerProduct.tariffOptionDetails[i].name;
                    var exist = false;
                    if (addOns == 0) {

                        addOns.push({
                            addOnCategory: addonCategory,
                            addOnName: [addOnName]
                        });
                    }
                    else {
                        for (var j = 0; j < addOns.length; j++) {
                            if (addonCategory == addOns[j].addOnCategory) {
                                addOns[j].addOnName.push(addOnName);
                                exist = true;
                                break;
                            }
                        }
                        if (!exist) {

                            addOns.push({
                                addOnCategory: addonCategory,
                                addOnName: [addOnName]
                            });
                        }
                    }
                }

                return addOns;
            }

            function getSimInfo() {

                var simInfo = {
                    simCard: {
                        simSerialNumber: subscriptionVBO.subscriptions[0].specification.simNumber,
                        cardType: subscriptionVBO.subscriptions[0].specification.simCardType,
                    },
                    ultraCard: {
                        ultraCards: getUltraCards(),
                        cardType: ""
                    }
                };

                return simInfo;
            }

            function getUltraCards() {
                var ultraCards = [];
                for (var i = 0; i < subscriptionVBO.subscriptions[0].specification.ultraCards.length; i++) {
                    ultraCards.push(subscriptionVBO.subscriptions[0].specification.ultraCards[i]);
                }

                return ultraCards;
            }

            function getBillingInfo() {
                var billingInfo = {
                    billCycle: customerAccountVBO.billingAccount.paymentInstructions.billCycleNumber,
                    paymentMethod: customerAccountVBO.billingAccount.paymentMethod.modeOfPayment,
                    billingType: customerAccountVBO.billingAccount.paymentInstructions.billMediaCategory,
                    billingEmail: customerAccountVBO.billingAccount.email.fullAddress,
                };

                return billingInfo;
            }

            function getInvoiceBalance() {

                var invoiceBalance = {
                    currentBalance: invoiceVBO.details.balanceAmount,
                    reminderStatus: "Reminder",
                    lastReminderDate: "23.07.2016",
                    delinquentIndicator: customerAccountVBO.parts.collections.delinquentStatus,
                    solvency: customerAccountVBO.parts.collections.delinquentStatus
                };

                return invoiceBalance;
            }

            function getItemizedBill() {
                var itemizedBill = {
                    detailLevel: "",
                    desiredNumber: ""
                };

                return itemizedBill;
            }

            function getBankAccount() {
                var bankAcccount = {
                    accountOwner: customerAccountVBO.billingAccount.paymentMethod.bankPayment.accountOwnerName,
                    iban: customerAccountVBO.billingAccount.paymentMethod.bankPayment.iban,
                    bankName: customerAccountVBO.billingAccount.paymentMethod.bankPayment.bankName
                };

                return bankAcccount;
            }

            function getBillingAddress() {
                var billAddress = {
                    name: getBillCustomerName(),
                    street: customerAccountVBO.billingAccount.billingAddress.street,
                    streetNumber: customerAccountVBO.billingAccount.billingAddress.streetNumber,
                    postCode: customerAccountVBO.billingAccount.billingAddress.postCode,
                    city: customerAccountVBO.billingAccount.billingAddress.city,
                    country: customerAccountVBO.billingAccount.billingAddress.country,
                    addressHashCode: customerAccountVBO.billingAccount.billingAddress.addressHashCode,
                    sameAsCusAddress: customerAccountVBO.billingAccount.sameAsCusAddress
                };

                return billAddress;
            }

            function getBillCustomerName() {
                if (customerAccountVBO.category == 'private') {
                    return customerAccountVBO.billingAccount.individual.title + " " + customerAccountVBO.billingAccount.individual.firstName + " " + customerAccountVBO.billingAccount.individual.familyName;
                }
                else {
                    return customerAccountVBO.billingAccount.organization.legalEntity.salutation + " " + customerAccountVBO.billingAccount.organization.legalEntity.localTradingName;
                }
            }

            function getInvoices() {
                var invoices = [];

                for (var i = 0; i < invoiceVBO.payments.payment.length; i++) {

                    var invoice = {
                        number: invoiceVBO.payments.payment[i].artifact.id,
                        date: invoiceVBO.payments.payment[i].artifact.creationTime,
                        dueDate: invoiceVBO.payments.payment[i].due.date,
                        amount: invoiceVBO.payments.payment[i].due.amount,
                        format: invoiceVBO.payments.payment[i].artifact.format
                    };

                    invoices.push(invoice);
                }

                return invoices;
            }

            function getCustomerContact() {

                if (customerAccountVBO.category == 'private') {
                    var customerContact = {
                        contactPerson: getCustomerName(),
                        contactPhone: customerAccountVBO.parts.contactPoints[0].telephone.fullNumber,
                        email: customerAccountVBO.parts.contactPoints[0].email.fullAddress
                    };
                }
                else {
                    var customerContact = {
                        contactPerson: getCustomerName(),
                        contactPhone: customerAccountVBO.parts.contactPoints[0].telephone.fullNumber,
                        registerNumber: customerAccountVBO.parts.organization.legalEntity.registeredNumber,
                        legalCourt: customerAccountVBO.parts.organization.legalEntity.registrationCity,
                        type: "",
                        email: customerAccountVBO.parts.contactPoints[0].email.fullAddress
                    };

                }

                return customerContact;
            }

            function getPrivacySetting() {
                var privacySetting = {
                    advertisingIndicator: subscriptionVBO.subscriptions[0].preferences.advertisingIndicator,
                    personalDataEvalIndicator: subscriptionVBO.subscriptions[0].preferences.personalDataEvalIndicator,
                    marketingUsePhoneIndicator: subscriptionVBO.subscriptions[0].preferences.marketingUsePhoneIndicator,
                };

                return privacySetting;
            }

            function getCustomerAddress() {
                var customerAddress = {
                    name: getCustomerName(),
                    street: customerAccountVBO.parts.contactPoints[0].postal.street,
                    streetNumber: customerAccountVBO.parts.contactPoints[0].postal.streetNumber,
                    postCode: customerAccountVBO.parts.contactPoints[0].postal.postCode,
                    city: customerAccountVBO.parts.contactPoints[0].postal.city,
                    country: customerAccountVBO.parts.contactPoints[0].postal.country,
                    addressHashCode: customerAccountVBO.parts.contactPoints[0].postal.addressHashCode
                };

                return customerAddress;
            }

            function getSubscriberAddress() {
                var subscriberAddress = {
                    name: getCustomerName(),
                    street: subscriptionVBO.subscriptions[0].address.street,
                    streetNumber: subscriptionVBO.subscriptions[0].address.streetNumber,
                    postCode: subscriptionVBO.subscriptions[0].address.postCode,
                    city: subscriptionVBO.subscriptions[0].address.city,
                    country: subscriptionVBO.subscriptions[0].address.country,
                    addressHashCode: subscriptionVBO.subscriptions[0].address.addressHashCode
                };

                return subscriberAddress;
            }

            function getHomeZoneAddress() {
                var homeZoneAddress = {
                    homeZoneNumbers: getHomeZoneNumbers(),
                    street: subscriptionVBO.subscriptions[0].installationSite.address.street,
                    streetNumber: subscriptionVBO.subscriptions[0].installationSite.address.streetNumber,
                    postCode: subscriptionVBO.subscriptions[0].installationSite.address.postCode,
                    city: subscriptionVBO.subscriptions[0].installationSite.address.city,
                    country: subscriptionVBO.subscriptions[0].installationSite.address.country,
                    addressHashCode: subscriptionVBO.subscriptions[0].installationSite.address.addressHashCode
                };

                return homeZoneAddress;
            }

            function getHomeZoneNumbers() {
                var homeZoneNumbers = [];
                for (var i = 0; i < subscriptionVBO.subscriptions[0].installationSite.phoneNumbers.phoneNumber.length; i++) {
                    homeZoneNumbers.push(subscriptionVBO.subscriptions[0].installationSite.phoneNumbers.phoneNumber[i]);
                }
                return homeZoneNumbers;
            };

            return service;

        }

    }()
);
