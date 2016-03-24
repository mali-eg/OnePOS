(function () {
    'use strict';
    angular.module('onePOS.customer')
        .directive('pdfDownloadBtn', ['customerService', pdfDownloadBtn]);

    function pdfDownloadBtn() {

        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(',');
            var mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var blobObj = new Blob([u8arr], {type: mime});
            return blobObj;
        }

        return {
            restrict: 'A',
            scope: {
                fileName: '@',
                orderId: '@',
                fileId: '@',
                downloadStatus: '=',
                fileStatus: '='
            },
            link: function (scope, elem, att) {
                // initial state
                elem.addClass('btn-disabled');
                scope.downloadStatus = false;

                // on document ready
                scope.finishedDownload = function (data, contentType) {
                    //var dataURI = 'data:' + contentType + ';base64,' + data;
                    var blobObj = new Blob([data], {type: contentType});
                    if (window.navigator.msSaveOrOpenBlob) {
                        scope.data = blobObj;
                    } else {
                        //if (contentType == "application/xps") {
                        //    elem.attr('download', scope.fileName);
                        //}

                        elem.attr('href', window.URL.createObjectURL(blobObj));
                    }
                    elem.removeClass('btn-disabled');
                    scope.downloadStatus = 'ready';
                };

                // on document downloaded
                elem.on('click', function (e) {
                    if (window.navigator.msSaveOrOpenBlob) {
                        e.stopPropagation();
                        //var blobObject = dataURLtoBlob(scope.data);
                        window.navigator.msSaveOrOpenBlob(scope.data, scope.fileName);
                    }
                    scope.$apply(function () {
                        scope.downloadStatus = 'downloaded';
                        elem.addClass('downloaded');
                    });
                });
            },
            controller: ['customerService', '$scope', function (customerService, $scope) {
                if ($scope.fileStatus != 'notCreated') {
                    //$scope.fileName = "Smart_XL_Peter_Mueller.pdf";
                    customerService.getAgreement($scope.orderId, $scope.fileName, $scope.fileId, true).then(
                        function (res) {
                            $scope.finishedDownload(res.data, res.contentType);
                        }
                    );
                }
            }]
        }
    }
})();
