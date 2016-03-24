$(function(){

    var console = (window.console = window.console || {});

    $('body').prepend('<div id="media-layout"></div>');

	// Fire modules and helpers
    vf.util.initModules();

    // Resize handle
    var resize_handle = false,
        size          = {
            last:       [0, 0],
            current:    [0, 0],
            hasChanged: false
        };

    $(window).on('resize', function(e) {
        /*
            Workaround for preventing the following behaviour:
            IE8>= triggers the window resize event when the size of an
            element changes, even if the size of the window does not.
        */
        size.current      = [$(window).width(), $(window).height()];
        size.hasChanged   = (
            size.current[0] !== size.last[0] || size.current[1] !== size.last[1]
        );

        if(size.hasChanged) {
            if(resize_handle) clearTimeout(resize_handle);

            //resize_handle = setTimeout(function() {
                $(this).trigger('vf::resize');
            //}, 100);

            size.last = size.current;
        }
    });

    // setTimeout(function(){
    //     $(window).trigger('scroll');
    // }, 1000);
});