/*global $:false, vf:false*/
(function() {

    /**
     * Dialog module which handles the main dialog functionality plus other functionalities like:
     * <br>- Zoomable (Complex) Table <br>
     * - Zoomable Images  <br>
     * - iFrames within dialogs <br><br><br>
     *
     * <h2>How zoomable images works ?</h2>
     * To be able to use zoomable images you use an image tag like this:
     * <br><pre class="prettyprint">&lt;img src="small-image-thumbnail.jpg" data-large-thumb="large-image-thumbnail.jpg" data-href="image-to-be-opened-in-dialog.jpg" class="mod mod-dialog di-zoom-img zoomable-image"&gt;</pre><br>
     * There you can see we have different attributes:<br>
     * <b>src: </b>Small thumbnail which will be displayed on mobiles (and the default thumbnail if there was no large thumbnail provided)<br>
     * <b>data-large-thumb (optional): </b>Large thumbnail which will be displayed on desktops<br>
     * <b>data-href: </b>The target image which will displayed within the dialog<br>
     *
     *
     * <br><br><br>
     *
     *
     * <h2>Classes of zoomable images</h2><br>
     * <b>mod: </b>To add the module to the list<br>
     * <b>mod-dialog: </b>To initialize the dialog module<br>
     * <b>di-zoom-img: </b> To tell the dialog module that this is a zoomable image<br>
     * <b>zoomable-image: </b> To wrap the zoomable image with the deeded extra divs (Abstraction of DD framework)<br>
     * <br><br><br>
     * @example
     * <!-- Complex Table -->
     * <table class="mod mod-dialog zoomable-table">
     *    Inner table code
     * </table>
     *
     * <!-- iFrame Usage -->
     * <a href="http://css-tricks.com" class="btn btn-sml mod mod-dialog iframe-dialog">
     *    iFrame Dialog Link
     * </a>
     *
     * <!-- Zoomable Image -->
     * <img src="small-image-thumbnail.jpg" data-large-thumb="large-image-thumbnail.jpg" data-href="image-to-be-opened-in-dialog.jpg" class="mod mod-dialog di-zoom-img zoomable-image">
     *
     * <!-- Any generic content -->
     * <a href="#IDofContent" class="mod mod-dialog btn btn-sml btn-alt">Generic Content</a><br>
     * <div class="di-content" id="IDofContent">
     *    <div>Any Content</div>
     * </div>
     *
     *
     * @module Dialog
     */

    /**
     * @class Dialog
     * @memberof module:Dialog
     */
    vf.dialog = {
        settings: {
            target: '.mod-dialog',
            html: {
                inner: '<div class="di-inner"></div>',
                close: '<div class="di-close"><span class="access">Close></span><i class="i-close-b-xxsml"></i></div>',
                dialog: '<div id="{{id}}" class="di-content {{style}}">{{content}}</div></div>'
            }
        },

        /**
         * This function initialize the dialog functionality also wraps the zoomable images and zoomable tables in case they have the corresponding classes
         * Also it handles the complex table dismiss, binds the corresponding events and also the swipe notification
         * @function init
         * @memberof module:Dialog.Dialog
         * @param {object} context - Initialization Context
         */
        init: function(context) {

            var s = this.settings;
            /** To switch the version of the images we have 2 sources one with src attribute and the other one is with data-href and based on screen resolution we switch between them
             * <br> <b>By default we will load the large image</b> (large image URL will be in the src attribute and the smaller one is in the data-href)
             *
             */
            var originalImageSource;
            var alternativeImageSource;

            //Initializing the complex table divs when the table has class zoomable-table (to let the content editors be able to enable it)
            vf.dialog.zoomableTableWrapping();
            vf.dialog.zoomableImageWrapping();
            vf.dialog.playingVideoWrapping();

            $(s.target, context).addBack(s.target).each(function() {
                $(this).on('click', vf.dialog.open);

                if ($(this).is('img')) {
                    var $theImg = $(this);
                    originalImageSource = $theImg.attr('src');
                    alternativeImageSource = $(this).attr('data-href');
                    //TODO: Check here if I need to replace the original source with the data-href one or not
                    //TODO: Check the exact required functionality
                }
            });

            // Close dialogs with the escape key
            $('body').on('keydown click', function(e) {
                if (e.type == 'keydown' && e.keyCode == 27) vf.dialog.close.call();
            });

            //Dismiss the swipe notification when clicked
            $(document).on('click', '.swipeNotification', function() {
                $('.swipeNotification').hide();
            });

            //Handling the click event on the image zoom module on IE10 and IE9
            //This is because IE10,IE9 lacks support for pointer-events: none
            $(document).on('click', '.zoom-content', function(e) {
                if (vf.util.layout() == 'lrg'){
                    return; //prevent for desktop
                } else {
                    var el = $(this).find('.di-zoom-img');
                    if (el.length == 1) {
                        vf.dialog.open.call(el, e);
                    }
                }
            });

            //This to fix that when the user click on the back button on the phone to close all open dialogs
            $(window).on('hashchange',function(){
                var newHash = (window.location.hash.indexOf('#')>-1) ? window.location.hash.replace('#','') : window.location.hash;
                vf.dialog.close();
                if($('a.ac-head[id="'+newHash+'"]').length>0 && !$('a.ac-head[id="'+newHash+'"]').hasClass('ac-active')){
                    $('a.ac-head[id="'+newHash+'"]').trigger('click');
                }
            });

            //This is to bind orientation change event ONLY for handling the complex tables behavior to be dismissed on the change
            //from the portrait to landscape
            $(window).bind('orientationchange', vf.dialog.complexTableDismissOnLandscape);

            //To switch sources of the zoomable image
            $(window).on('resize',vf.dialog.changeZoomableImageSource);

            //This to fix an issue where .zoomable-image opened on mobile view to load small image and not big one
            $(window).resize();





        },

        /**
         * Get called when a mod-dialog element gets clicked and then route to different other handlers
         * @function open
         * @memberof module:Dialog.Dialog
         * @param {object} e - Event object
         */
        open: function(e) {
            //Disable image zoom on desktop
            if ($(window).width() > 1140 && ($(this).hasClass('di-zoom-img') || $(this).hasClass('wm-table') || $(this).hasClass('wm-true-table') || $(this).hasClass('wm-table-full')) &&
                ($(this).attr('data-lrgScreenModal') != 'true' || $(this).attr('data-lrgScreenModal') === '' || $(this).attr('data-lrgScreenModal') === undefined) || $(this).attr('data-lrgScreenModal') == 'undefined') return false;

            if(typeof e !== "undefined") {
                e.preventDefault();
            }

            var s = vf.dialog.settings,
                target = $(this).is('a') ? $(this).attr('href') : $(this).attr('data-href'),
                scope = $(this).data('scope'),
                duplicateDialog = $(this).hasClass('di-duplicate'),
                isIframe = $(this).hasClass('iframe-dialog');
                isVideo = $(this).hasClass('video-dialog');
                image = new RegExp(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i);
                image = image.test(target);

            // If data-scope is set AND doesn't match the current scope return
            if (typeof scope !== 'undefined' && scope !== vf.util.layout()) return;

            // Stop page behind the dialog scrolling
            $('body').css('overflow', 'hidden');
            // If an image build a new dialog
            if (image) target = vf.dialog.imagedialog.call(this, target);

            // If content need duplicating
            if (duplicateDialog) target = vf.dialog.duplicatecontent.call(this, target);

            // If iFrame
            if (isIframe && target.indexOf('#di-') <= -1) target = vf.dialog.iframeDialog.call(this, target);

            // If isVideo
            if (isVideo && target.indexOf('#di-') <= -1) target = vf.dialog.videoDialog.call(this, target);

            // If dialog first use prepare dialog
            if ($(target).find('.di-inner').length === 0) {
                $(target).on('click', '.di-close', vf.dialog.close);
                $(target).wrapInner(s.html.inner);
                $(target).find('.di-inner').append(s.html.close);
            }
            $(target).addClass('di-show');
            $(window).trigger('vf::resize');

            //Swipe Notification
            if (!vf.cookie.checkCookie('vfswipevisited') && $(target).find('.swipeNotification').length > 0 && $(window).width() < 750) {
                $('.swipeNotification').show();
                vf.cookie.setCookie('vfswipevisited', 'true', 1);
                setTimeout(function() {
                    $('.swipeNotification').hide();
                }, 3000);
            }

        },

        /**
         * Handles duplicated content *to be investigated more*
         * @function duplicatecontent
         * @memberof module:Dialog.Dialog
         * @param {String} target - Target URL or target ID
         * @param {Object} e - Event object
         */
        duplicatecontent: function(target, e) {
            var s = vf.dialog.settings,
                id = 'di-' + $.now(),
                html = s.html.dialog.replace('{{id}}', id);
                html = html.replace('{{content}}', '<div class="di-duplicate-inner">' + $(this).html() + '</div>');
                html = html.replace('{{style}}', '');
                href = $(this).is('a') ? 'href' : 'data-href';

            // Update the original image references to a local id
            $(this).attr(href, '#' + id);

            $('body').append(html);

            // Return new local dialog target
            return $(this).attr(href);
        },

        /**
         * Handles youtube videos in dialog
         * @function videoDialog
         * @memberof module:Dialog.Dialog
         * @param {String} target - Target URL or target ID
         * @param {Object} style - not used
         */
         videoDialog: function(target, style) {
            var s = vf.dialog.settings,
                id = 'di-' + $.now(),
                html = s.html.dialog.replace('{{id}}', id);
                html = html.replace('{{style}}', 'di-video');
                href = $(this).is('a') ? 'href' : 'data-href';
                html = html.replace('{{content}}', '<div class="video-browse mod mod-youtube"><div class="youtube" id="' + target + '" alt=""></div></div>');



            // Update the original image references to a local id
            $(this).attr(href, '#' + id);

            $('body').append(html);

            // init youtube video afterwards
            vf.youtube.init($('#' + id));

            // Return new local dialog target
            return $(this).attr(href);
         },

        /**
         * Handles the zoomable images dialog
         * @function imagedialog
         * @memberof module:Dialog.Dialog
         * @param {String} target - Target URL or target ID
         * @param {Object} style - Not used
         */
        imagedialog: function(target, style) {
            var s = vf.dialog.settings,
                id = 'di-' + $.now(),
                html = s.html.dialog.replace('{{id}}', id);
                html = html.replace('{{content}}', '<img src="' + target + '" alt="">');
                html = html.replace('{{style}}', 'di-image');
                href = $(this).is('a') ? 'href' : 'data-href';

            // Update the original image references to a local id
            $(this).attr(href, '#' + id);

            // Create another container for scrollable content
            if ($(this).hasClass('di-zoom-img')) html = $(html).wrapInner('<div class="di-image-inner"></div>');

            $('body').append(html);

            // Return new local dialog target
            return $(this).attr(href);

        },

        /**
         * Handles the iframe dialog
         * @function iframeDialog
         * @memberof module:Dialog.Dialog
         * @param {String} target - Target URL or target ID
         */
        iframeDialog: function(target) {
            var s = vf.dialog.settings,
                id = 'di-' + $.now(),
                html = s.html.dialog.replace('{{id}}', id);
                html = html.replace('{{content}}', '<div class="di-scrollable-iframe"><iframe src="' + target + '"></iframe></div>');
                html = html.replace('{{style}}', 'di-iframe');
                href = $(this).is('a') ? 'href' : 'data-href';

            // Update the original image references to a local id
            $(this).attr(href, '#' + id);

            // Create another container for scrollable content
            // $(html).wrapInner('<div class="di-inner"></div>');

            $('body').append(html);

            // Return new local dialog target
            return $(this).attr(href);

        },


        /**
         * Close the dialog method
         * @function close
         * @memberof module:Dialog.Dialog
         */
        close: function() {
            $('body').css('overflow', 'inherit');
            // Close all dialogs
            $('body').find('.di-content').removeClass('di-show');

        },

        /**
         * Responsible for closing the complex tables when the user switch the orientation of the mobile device
         *  this was a requested feature
         * @function complexTableDismissOnLandscape
         * @memberof module:Dialog.Dialog
         */
        complexTableDismissOnLandscape: function() {
            var applyOrientationChange = function(){
                if(window.orientation && ( window.orientation=== 90 || window.orientation=== -90 ) && window.outerWidth>767 ){ //Landscape
                    if($('.di-content').is(':visible') && $('.di-content .wm-table-full').length>0){
                        vf.dialog.close();
                    }
                }
            };
            //Delay the execution of the event to make sure that the value is updated
            setTimeout(applyOrientationChange,100);
        },

        /**
         * Called at the dialog module Initialization to wrap any element with class zoomable-table with the corresponding needed elements to provide the complex tables functionality
         * @function zoomableTableWrapping
         * @memberof module:Dialog.Dialog
         */
        zoomableTableWrapping: function() {
            $('.zoomable-table').each(function(){
                if(!$(this).parent().hasClass('wm-table-full')){ //To check if it's already wrapped or not
                    $(this).addClass('wm-true-table').removeClass('zoomable-table').wrap('<div class="wm-table"></div>').wrap('<div class="wm-table-inner zoom-content mod mod-dialog di-duplicate" data-scope="sml"></div>').wrap('<div class="wm-table-full"></div>');
                }
            });
        },

        /**
         * Called at the dialog module Initialization to wrap any element with class zoomable-image with the corresponding needed elements to provide the zoomable images functionality
         * @function zoomableImageWrapping
         * @memberof module:Dialog.Dialog
         */
        zoomableImageWrapping: function() {
            $('.zoomable-image').each(function(){
                if(!$(this).parent().hasClass('zoom-content')){ //To check if it's already wrapped or not
                    $(this).removeClass('zoomable-image').wrap('<div class="zoom-content"></div>');
                }
            });
        },

        /**
         * Called at the dialog module Initialization to wrap any element with class playing-video with the corresponding needed elements to provide the youtube video functionality
         * @function playingVideoWrapping
         * @memberof module:Dialog.Dialog
         */
        playingVideoWrapping: function() {
            $('.playing-video:visible').each(function(){
                if(!$(this).parent().hasClass('video-content')){ //To check if it's already wrapped or not
                    $(this).removeClass('playing-video').wrap('<div class="video-content"></div>');
                }
            });
        },


        changeZoomableImageSource: function(){
          var elements = $('.zoom-content .di-zoom-img');
          var layout = vf.util.layout();
          var smallSrc;
          var largeSrc;
          var smallThumb;
          elements.each(function(){
              smallThumb = $(this).attr('data-small-thumb');
              largeSrc = ($(this).attr('data-large-thumb')) ? $(this).attr('data-large-thumb') : undefined;
              if(layout === 'lrg' && largeSrc && !smallThumb){
                $(this).attr('data-small-thumb',$(this).attr('src'));
                $(this).attr('src',largeSrc);
              }else if(layout === 'lrg' && largeSrc && smallThumb){
                $(this).attr('src',largeSrc);
              }else if(layout === 'sml' && smallThumb){
                $(this).attr('src',$(this).attr('data-small-thumb'));
              }
          });
        }

    };
}(vf));
