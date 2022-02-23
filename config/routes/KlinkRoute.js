const validate = require('../../api/middleware/validation/validateMiddleware')
const schemas = require('../../api/middleware/validation/validateSchema')

const KlinkRoute = {

    /**
     * CRUD KLINK DRIVER/ EXPRESS
     */
    'POST /driverStore': {
                path:'KlinkDriver.store',
                middlewares:[validate(schemas.addDriver)]
             },
    'GET /listDriver' :{
                path:'KlinkDriver.get_listdriverWh',
                middlewares:[validate(schemas.GetDriver)]
    },
    'POST /driverStore': {
        path:'KlinkDriver.store',
        middlewares:[validate(schemas.addDriver)]
     },
    'PUT /driverUpdate' : {
        path:'KlinkDriver.update',
        middlewares:[validate(schemas.updateDriver)]
    },    
    'PUT /driverStatus' : {
        path:'KlinkDriver.updateStatus',
        middlewares:[validate(schemas.updateDriveStatus)]
    },  

    // adding data history package
    'POST /AddDriverHistory' :{
        path:'KlinkWebhook.add',
        middlewares:[validate(schemas.DriveHistoryStatus)]
    },
};

module.exports = KlinkRoute;
