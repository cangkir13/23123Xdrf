const warehouse = require('../models/Warehouse');
const driver = require('../models/Klink_driver');


function kodekurir() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

    
async function cekHW(wh) {
    return await warehouse.findOne({
        where:{
            whcd:wh,
            status:1
        }
    })
}

async function cekDriver(kode) {
    return await driver.findOne({
        where : {
            driver_code:kode
        }
    })
}

async function driverWH(wh) {
    return await driver.findAll({
        where:{
            whcd:wh
        }
    })
}

const KlinkDriver = () => {

    // list Warehouse
    const get_listwh = async(req, res) => {
        if (req.body.whcd == 'all') {
            let warehouses = await warehouse.findAll({where:{status:1},
                attributes:['whcd', ['fullnm', 'warehouse'], ['province', 'provinsi'], 
                            ['kab', 'kabupaten'], ['kec', 'kecamatan'], ['kel', 'kelurahan'],
                            ['postcd', 'kodepos']
                        ]
            });   
            return res.json({status:true, msg:'Data loading', data:warehouses})
        }else{
            let warehouses = await warehouse.findOne({
                where:{status:1, whcd:req.body.whcd},
                attributes:['whcd', ['fullnm', 'warehouse'], ['province', 'provinsi'], 
                            ['kab', 'kabupaten'], ['kec', 'kecamatan'], ['kel', 'kelurahan'],
                            ['postcd', 'kodepos']
                        ]
            });
            if (!warehouses) {
                return res.status(404).json({
                    status:false,
                    msg:"Warehouse not found",
                    data:''
                })
            }   
            return res.json({status:true, msg:'Data loading', data:[warehouses]})
        }
        
    }

    // list driver di warehouse
    const get_listdriverWh = async(req, res) => {
        const {whcd} = req.body
        let FIND = whcd.toUpperCase()
        try {
            if (FIND === 'ALL') {
                return res.json({
                    status:true, msg:'Data loading', data:await driver.findAll()
                })
            } else {
                let driver = await driverWH(whcd)
                if (driver.length < 1) {
                    return res.status(404).json({status:false, msg:"warehouse not found"})
                } else {
                    return res.json({
                        status:true, msg:'data loading', data: driver
                    })
                }                
            }
        } catch (error) {
            return res.status(500).json({status:false, msg:"Sory,"+error.message, data:''})
        }
    }

    // insert new driver warehouse
    const store = async(req, res) => {
        try {
            let driver_code = kodekurir()
            const {whcd, nama, tlpn} = req.body;
            if(!await cekHW(whcd))
                return res.status(404).json(
                    {status:false, msg:"warehouse not found", data:''}
                );
            if(await driver.findOne({where:{tlpn}}))    
                return res.status(403).json(
                    {status:false, msg:"Driver already exists", data:''}
                );
            await driver.create({
                whcd,
                nama,
                driver_code,
                tlpn,
                active:1,
            })    
            return res.status(200).json({status:true, msg:"Drive has been added", data:
                {
                    whcd,
                    nama,
                    driver_code,
                    tlpn,
                    active:true,
                }
            })
        } catch (error) {
            return res.status(500).json({status:false, msg:"Sory,"+error.message, data:''})
        }
    }

    // update data driver
    const update = async(req, res) => {
        try {
            const {whcd, nama, tlpn, drivecode} = req.body;
            if(!await cekHW(whcd))
                return res.status(404).json(
                    {status:false, msg:"warehouse not found", data:''}
                );
            // console.log(drivecode)   
            if (!await cekDriver(drivecode))
                return res.status(404).json({
                    status:false, msg:'Driver code not found', data:''
                })

            await driver.update({
                nama,
                tlpn
            },{where:{driver_code: drivecode}})    
            return res.status(200).json({status:true, msg:"Drive has been updated", data:[
                {
                    drivecode,
                    nama,
                    tlpn
                }
            ]})
        } catch (error) {
            return res.status(500).json({status:false, msg:"Sory,"+error.message, data:''})
        }
    }

    // update status driver
    const updateStatus = async(req, res) => {
        try {
            const {status, drivecode} = req.body;
            
            if (!await cekDriver(drivecode))
                return res.status(404).json({
                    status:false, msg:'Driver code not found', data:''
                });
            if (status < 0 || status > 1) 
                return res.status(403).json({
                    status:false, msg:'Status is false, please insert true status', data:''
                });
            await driver.update({
                active:status
            },{where:{driver_code: drivecode}})    
            return res.status(200).json({status:true, msg:"Drive has been updated", data:[{
                drivecode,
                status:(status == 1) ? 'active':'non active'
            }]})
        } catch (error) {
            return res.status(500).json({status:false, msg:"Sory,"+error.message, data:''})
        }
    }

    const deleteDriver = async(req, res) => {
        // destroy
        try {
            const { drivecode} = req.body;
            if (!await cekDriver(drivecode))
                return res.status(404).json({
                    status:false, msg:'Driver code not found', data:''
                });
            
            
            
        } catch (error) {
            return res.status(500).json({status:false, msg:"Sory,"+error.message, data:''})
        }
    }

    return {
        get_listwh,
        get_listdriverWh,
        store,
        update,
        updateStatus,
        deleteDriver
    }
};

module.exports = KlinkDriver;