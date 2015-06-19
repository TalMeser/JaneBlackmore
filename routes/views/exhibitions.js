var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'gallery';
	// Load the galleries by sortOrder
	view.query('exhibitions', keystone.list('Exhibition').model.find().sort('sortOrder'));
	// Render the view
	view.render('exhibitions');	
	
	
};
