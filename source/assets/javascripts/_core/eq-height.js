(function () {
    vf['eq-height'] = {
        settings: {
            target: '.mod-eq-height'
        },

        init: function (context) {
            var s = this.settings;

            // Equal heights for large (desktop) only
            $(s.target, context).addBack(s.target).each(function () {

                $(window).on('vf::resize vf::lazyloaded orientationchange', $.proxy(vf['eq-height'].calculate, this));
                $.proxy(vf['eq-height'].calculate, this)();

            });
        },

        calculate: function () {

            if (vf.util.layout() != 'lrg' && $(this).data('force-eq-height') != true) return; //force-eq-height to make it useable in mobile

            var target  = $(this),
                eleArray = target.data('eq-height').split(','),
                maxheight = 0;

            // loop over the elemnts from the array
            for (var i=0, _i = eleArray.length ; i < _i ; i++) {

                maxheight = 0;

                // find seperate elements from the eleArray
                var targets = target.find(eleArray[i]);

                // Loop through elements, find tallest element and set height
                targets.css('height', '').each(function(i) {

                    if($(this).outerHeight() > maxheight) {
                        maxheight = $(this).outerHeight();
                    }

                }).css('height', maxheight).addClass('eq-height');

            }
        }
    };

}(vf));
