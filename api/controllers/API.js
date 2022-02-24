/**
 * @author lepek13
 * Controller to get history awb
 */
const modulTracking = require('../modul/globawb')
const ModelTransaksi = require('../models/Tracking_send')
const Transaksi_pesanan_detail = require('../models/Transaksi_pesanan_detail');
const ModuleAntrian = require('../modul/ModuleAntrian');

async function findTransaction(awb, ekspedisi) {
  let data = await Transaksi_pesanan_detail.findOne({
    where: {
      awb: awb
    }
  })

  if (!data) {
    return {
      status:false,
      ekspedisi,
      awb:awb,
      status_code:'404',
      msg:'Invalid AWB Pleace Check and try again'
    }
  }

  let JsonPengirim = JSON.parse(data.origin)
  let JsonPenerima = JSON.parse(data.destination)

  return {
    status:true,
    ekspedisi,
    awb: data.awb,
    tgl_booking:data.date_add,
    pengirim:JsonPengirim.warehouse,
    penerima:JsonPenerima.pembeli,
    alamat_pengirim:JsonPengirim.address,
    alamat_penerima:JsonPenerima.address,
    history : [{
      track_date:data.date_add,
      status:"Packet telah di proses",
      status_code: 101,
      driverName:null,
      driverPhone:null
    }]
  }
}

const checkAwb = async(awb) => {
  return await ModelTransaksi.findOne({
    where : { awb }
  })
}

const API = () => {

  const index = async (req, res) => {
    const {ekspedisi, awb} = req.body
    try {
      let checkdata = await checkAwb(awb) 

      if (!checkdata) {
        return res.status(404).json({
          status : false,
          note : "No resi/conote tidak dapat ditemukan"
        })
      }

      var data_return = ''
      if(modulTracking[ekspedisi] !== undefined){
        data_return = await modulTracking[ekspedisi](awb)
      }else {
        return res.status(400).json({status:false,note:"Courier Not available"});
      }
        

      if (data_return.status == false) {
        
        let trackingLocal = await findTransaction(awb, ekspedisi)
        if(!trackingLocal.status) {
          return res.status(400).json(data_return)
        } else {
          return res.json(trackingLocal)
        }
      } else {
        // module add antrian
        if( checkdata.is_cod > 0 ){
          await ModuleAntrian(awb, data_return, ekspedisi)
        }
        res.json(data_return)
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: 'Internal server error '+error.message})
    }
      
  };

  const findresi = async(req, res) => {
    const {ekspedisi, awb} = req.body

    try {
      var data_return = ''

      if(modulTracking[ekspedisi] !== undefined){
        data_return = await modulTracking[ekspedisi](awb)
        return res.json(data_return)
      }else {
        return res.status(400).json({status:false,note:"Courier Not available"});
      }

    } catch (error) {
      return res.status(500).json({
        status: false,
        note: "error server"
      })
    }
  }

  return {
    index,
    findresi
  };


};

module.exports = API;