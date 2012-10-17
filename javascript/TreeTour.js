var Tree = Backbone.Model.extend({
	initialize: function (domNode) {
		this.set('domNode', $(domNode));
		this.set('name', $('h2', domNode).text());
	}
});

var TreeTour = {
	trees: [],
	activeTreeMargin: 8,
	activeTree: null,

	initialize: function () {
		var self = this;
		this.doc = $(document);
		this.details = $('#details');

		$('.tree', this.details).each(function (idx, t) {
			self.trees.push(new Tree(t));
		});

		this.firstTreeOffset = this.trees[0].get('domNode').offset().top;
		this.initEvents();
	},

	initEvents: function () {
		_.extend(TreeTour, Backbone.Events);

		$(window).bind('scroll', _.bind(this.trackActiveTree, this));
	},

	trackActiveTree: function (e) {
		var self = this,
			scrollTop = this.doc.scrollTop() + this.firstTreeOffset;

		_.any(this.trees, function (t) {
			var tDomNode = t.get('domNode');

			if(scrollTop < (tDomNode.offset().top + tDomNode.height() - self.activeTreeMargin)) {
				if(self.activeTree != t) {
					self.activeTreeChanged(self.activeTree, t);
					self.activeTree = t;
				}

				return true;
			}

			return false;
		});
	},

	activeTreeChanged: function (oldTree, newTree) {
		console.log('tree changed to: "' + newTree.get('name') + '"');
	}
};

$(document).ready(function () {
	TreeTour.initialize();
});

