var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'gallery';
	locals.filters = {
		piece: req.params.piece
	};
	locals.data = {
		pieces: [],
		piece: null,
		next: null,
		previous: null
	};

	view.on('init', function(next) {
		// Load the galleries by sortOrder
	    keystone.list('Piece').model.find().sort('sortOrder').exec(function(err,pieces){
	        if (err) return next(err);
	        locals.data.pieces = pieces;
	        if(locals.filters.piece){
	    	    for(i=0;i<locals.data.pieces.length;i++){
			    	if(locals.data.pieces[i].slug == req.params.piece){
			    		locals.data.piece = locals.data.pieces[i];
						if(i-1 < 0){
							locals.data.previous = pieces[pieces.length-1];
						}else{
							locals.data.previous = pieces[i-1];
						}			
						if(i+1 >= pieces.length){
							locals.data.next = pieces[0];
						}else{
							locals.data.next = pieces[i+1];
						}
						break;
			    	}
	    		}
	        }
	        next();
	    });
	});

	if(locals.filters.piece){
		view.render('piece');
	}else{
		view.render('gallery');	
	}
	
};
