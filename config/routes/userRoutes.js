const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const userRoutes = {

	'POST /history':  {
		path: 'API.index',
		middlewares: [validate(schemas.tracking)],
	 },

	'POST /webhookninja': 'Webhook_ninja.index' ,


	'GET /:awb' :  {
		path: 'API.findresi',
		middlewares: [validate(schemas.tracking)],
	 },
};

module.exports = userRoutes;
