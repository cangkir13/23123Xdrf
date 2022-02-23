const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const userRoutes = {

	'POST /history':  {
		path: 'API.index',
		middlewares: [validate(schemas.tracking)],
	 },

	'POST /webhookninja': 'Webhook_ninja.index' 


};

module.exports = userRoutes;
