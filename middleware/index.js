exports.isNotLoggedIn = function() {

	return function (req,res,next) {

	//Route Middleware
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');

	}

};
exports.isLoggedIn = function() {

	return function (req,res,next) {

	//Route Middleware
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

	}

};