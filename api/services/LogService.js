require('dotenv').config()
const winston = require('winston')
const CloudWatchTransport = require('winston-aws-cloudwatch')
const accessKeyId = process.env.WATCH_AWS_KEY_ID || ""  
const secretAccessKey = process.env.WATCH_AWS_ACC_KEY || "" 
const logGroupName = 'Service-Kirim'
 
const AccessLog = winston.createLogger({
  transports: [
    new CloudWatchTransport({
      logGroupName, // REQUIRED
      logStreamName: 'logWebhookNinja', // REQUIRED
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 2000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsConfig: {
        accessKeyId,
        secretAccessKey,
        region: 'ap-southeast-1'
      },
      formatLog: item =>
        `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
    })
  ]
})



const logWebhookNinja = (req, status, data) => {
 
    AccessLog.log('info', `Requesting ${req.method} ${req.originalUrl}`, 
      {
        Info: 
        {
          requestBody: req.body,
          requestHeaders: req.headers ,
          status: status,
          message: data
        }
      });
    
};



module.exports = {
  logWebhookNinja,
};