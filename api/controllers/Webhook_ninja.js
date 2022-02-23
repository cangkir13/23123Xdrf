const { webhook_prod } = require('../modul/ninja')
const {logWebhookNinja} = require('../services/LogService')
const Webhook_ninja = () => {

  const index = async (req, res) => {
    try {
      let xninja = req.headers['x-ninjavan-hmac-sha256'];
      let response = await webhook_prod(req.body, xninja)

      logWebhookNinja(req, response.status, response )
      delete response.error
      res.json(response)      
    } catch (error) {
      logWebhookNinja(req, error)
      res.status(400).json({status:false, data:"Any Trouble on server"})
    }
  
  };

  return {
    index
  };


};

module.exports = Webhook_ninja;