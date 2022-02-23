const validatePolicy = () => {

	const requiredHeaders = (req, res, next) => {
 	 if (req.headers['content-type'] !== 'application/json') {
  		 console.log('Server requires content-type: application/json at header')
  	 return res.status(400).json({
         error: 'Server requires content-type: application/json at header'
       })
		 }
		 else {
		      next()
		    }
		};

	return {
    requiredHeaders
 		 };
	};

module.exports = validatePolicy;