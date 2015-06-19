var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Exhibition Model
 * =============
 */

var Exhibition = new keystone.List('Exhibition', {
	autokey: { from: 'title', path: 'key', unique: true },
	map: { name: 'title' }
});

Exhibition.add({
	title: { type: String, required: true, initial: true },
	subtitle: { type: String, required: true, initial: true },
	publishedDate: { type: Date, default: Date.now },
	description: { type: String, required: true, initial: true },
	image: { type: Types.CloudinaryImage }
});

Exhibition.register();
