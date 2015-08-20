var keystone = require('keystone');
var mailchimp = require('mailchimp-api');

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

    locals.formData = req.body || {};

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

	view.on('post', {action:'subscribe'}, function(next){
		var name = locals.formData.name.split(" ");
		if(!name[1]) name[1] = '';
		var mcReq = {
		    id: '01b5637352',
		    email: { email: locals.formData.email },
		    merge_vars: {
		        EMAIL: locals.formData.email,
		        FNAME: name[0],
		        LNAME: name[1]
		    }
		};
		// submit subscription request to mail chimp
		mailchimp.lists.subscribe(mcReq, function(data) {
		    console.log(data);
		}, function(error) {
		    console.log(error);
		});
	});
	// Render the view
	view.render('index');
	
};
