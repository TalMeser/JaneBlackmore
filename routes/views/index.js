var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	locals.data = {
		previous: null,
		next: null
	}

	view.on('init', function(next) {
	    keystone.list('Piece').model.find().sort('sortOrder').exec(function(err,pieces){
	        if (err) return next(err);
	        var randomPiece = Math.floor(Math.random()*pieces.length);
			locals.piece = pieces[randomPiece];
			if(randomPiece-1 < 0){
				locals.data.previous = pieces[pieces.length];
			}else{
				locals.data.previous = pieces[randomPiece-1];
			}			
			if(randomPiece+1 >= pieces.length){
				locals.data.next = pieces[0];
			}else{
				locals.data.next = pieces[randomPiece+1];
			}
	        next();
	    });
	});
	// Render the view
	view.render('index');
	
};
