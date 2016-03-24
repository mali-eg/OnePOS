(function() {
	vf['eq-rows'] = {
		settings: {
			target: '.mod-eq-rows'
		},

		init: function(context) {
			var s = this.settings;

			// Equal heights for large (desktop) only
			$(s.target, context).addBack(s.target).each(function() {

				var target = $(this);

                vf['eq-rows'].tables(target);

			});
		},

		tables: function(target) {

            var tables      = target.find(target.attr('data-tables')),
                rows        = [];

            // Build row collection
            tables.each(function(i){
                var table       = $(this),
                    items       = table.find(target.attr('data-rows'));

                items.each(function(j){

					var cell = $(this);

                    if(!rows[j]) rows[j] = [];

                    rows[j][i] = cell;

                });
            });

            // Map the cells of each row to a jQuery collection
            $.each(rows, function(k){
                rows[k] = $(this).map(function(){ return this.toArray(); });
            });

            vf['eq-rows'].resize(rows);
            $(window).on('vf::resize', function() {
                vf['eq-rows'].resize(rows);
            });
        },

        resize: function(rows) {

            var isLrg = vf.util.layout() == 'lrg';

            $.each(rows, function(k){
                var cells           = $(this),
                    targetHeight    = 0;


                // Only set heights on large layout
                if(isLrg) {

                    cells.each(function(){
                        var cellHeight = $(this).css('height', '').height();

                        if(cellHeight > targetHeight) targetHeight = cellHeight;

                    }).height(targetHeight);

                } else {

                    cells.css('height', '');

                }
            });

        }



	};
}(vf));




