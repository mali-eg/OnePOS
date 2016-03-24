describe('checkbox component', function () {
    var element, scope, $httpBackend;

    beforeEach(module('onePOS.widgets'));

    //beforeEach(inject(function ($injector) {
    //    $httpBackend = $injector.get('$httpBackend');
    //    $httpBackend.whenGET(/(?!.*[.](?:html|class|js|css)$).*/).passThrough();
    //}));
    beforeEach(module('/assets/javascripts/app/widgets/checkbox/opsCheckbox.tpl.html'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        var $compile = _$compile_;
        var $rootScope = _$rootScope_;

        element = angular.element(
            '<ops-checkbox inner-id="{{id}}" ng-model="model" name="{{name}}">'+
            '</ops-checkbox>'
        );

        scope = $rootScope.$new();
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should display the template with input of type checkbox', function () {
        var input = element.find('input');
        expect(input.attr('type')).toBe('checkbox');
    });

    it('should accept inner id as id', function () {
        scope.$apply(function(){
            scope.id = 'checkBox01';
        });

        var input = element.find('input');
        expect(input[0].id).toBe('checkBox01');
    });

    it('should label have id as for', function () {
        scope.$apply(function(){
            scope.id = 'checkBox01';
        });

        var label = element.find('label');
        expect(label.attr('for')).toBe('checkBox01');
    });

    it('should accept checkbox name as name', function () {
        var name = "checkBoxName";
        scope.$apply(function(){
            scope.name = name;
        });

        var input = element.find('input');
        expect(input.attr('name')).toBe(name);
    });

    xit('should change model when click on label', function () {
        scope.$apply(function(){
            scope.model = false;
            scope.id = 'test01';
        });

        var label = element.find('label');
        label.click();
        //scope.$digest();
        expect(scope.model).toBeTruthy();
    });


});
