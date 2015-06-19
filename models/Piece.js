var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Piece Model
 * =============
 */

var Piece = new keystone.List('Piece', {
	autokey: { from: 'title', path: 'slug', unique: true },
	map: { name: 'title' }
});

Piece.add({
	title: { type: String, required: true, initial: true  },
	size: { type: String, required: true, initial: true  },
	material: { type: String, required: true, initial: true  },
	price: { type: Types.Money, format: '$0,0.00', required: true, initial: true  },
	publishedDate: { type: Date, default: Date.now },
	image: { type: Types.CloudinaryImage }
});

Piece.register();
