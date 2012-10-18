var Tree = Backbone.Model.extend({
	markerTemplate: _.template('<div class="map-marker" style="left:<%= x %>px; top:<%= y %>px"><%= index %></div>'),

	initialize: function (domNode, index) {
		var d = $(domNode);
		this.set('domNode', d);
		this.set('name', $('h2', domNode).text());

		var coords = d.attr('data-map-coords');

		if(coords) {
			coords = coords.split(',');
			var mapOffset = TreeTour.mapImage.offset();

			this.set('marker', $(this.markerTemplate({
				x: parseInt(coords[0], 10) + mapOffset.left,
				y: parseInt(coords[1], 10) + mapOffset.top,
				index: index
			})).appendTo(TreeTour.body));
		}
	}
});

var TreeTour = {
	trees: [],
	activeTreeMargin: 8,
	activeTree: null,
	body: null,
	mapImage: null,
	activeMarkerClass: 'active',

	initialize: function () {
		var self = this;
		this.doc = $(document);
		this.body = $('body');
		this.details = $('#details');
		this.mapImage = $('#map img');

		$('.tree', this.details).each(function (idx, t) {
			self.trees.push(new Tree(t, idx + 1));
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
		//if(oldTree) oldTree.get('marker').removeClass(this.activeMarkerClass);
		//if(newTree) newTree.get('marker').addClass(this.activeMarkerClass);
	}
};

$(document).ready(function () {
	TreeTour.initialize();
});

