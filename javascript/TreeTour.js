var TreeTour = {
	trees: [],
	activeTreeMargin: 5,

	initialize: function () {
		var self = this;
		this.doc = $(document);
		this.details = $('#details');

		$('.tree', this.details).each(function (idx, t) {
			self.trees.push($(t));
		});

		this.firstTreeOffset = this.trees[0].offset().top;
		$(window).bind('scroll', _.bind(this.trackActiveTree, this));
	},

	trackActiveTree: function (e) {
		var self = this,
			scrollTop = this.doc.scrollTop() + this.firstTreeOffset;

		_.any(this.trees, function (t) {
			if(scrollTop < (t.offset().top + t.height() - self.activeTreeMargin)) {
				console.log($('h2', t).text());
				return true;
			}

			return false;
		});
	}
};

$(document).ready(function () {
	TreeTour.initialize();
});

