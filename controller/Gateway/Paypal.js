const paypal = require("paypal-rest-sdk");
const create_payment_json = require('./paymentJson');
const Transac=require('../../models/Transactions')
const query=require('../../database/query')

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AV-8amux_k-iHSiK5GUUIjeR4GrFt9qNr73TZAJZ9WCPG9XcsC1ctCEbImLqVSfRH_165e2aFldogNdo",
    client_secret:
        "EHXTFj-Z49Brd4m1gyHm21hIJiPkpdHFmq7rzqR5-A20pkhaw2QONZ2iNN-aM9H4QYTIDsKN6q8lSxu8",
});


const payNowPost = async (req, res, next) => {
    let amount=req.body.amount
    try {
        
        paypal.payment.create(create_payment_json(amount), function (error, payment) {
            if (error) {
              throw error;
            } else {
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  res.redirect(payment.links[i].href);
                }
              }
            }
          });
    }
    catch (e) {

        next();

    }

}

const payNowGet = async (req, res, next) => {
   

    try {
    
       return res.render('./payment/pay',{title:'Payment Now'})
    }
    catch (e) {

       next();

    }

}

const PaySuccess = async (req, res, next) => {

    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const amount=req.query.amount;
      
        const execute_payment_json = {
          payer_id: payerId,
          transactions: [
            {
              amount: {
                currency: "USD",
                total: amount,
              },
            },
          ],
        };
      
        paypal.payment.execute(paymentId, execute_payment_json,async function (
          error,
          payment
        ) {
          if (error) {
            return next();
          } else {
            try{
              await query(`insert into transactions(PatientId,Status,TNX,Amount,TransferFrom) values('${req.patient.PatientId}','In',
              '${payment.id}','${amount}','${payment.payer.payer_info.email}'); `);
              await query(`update patients set Balance=Balance+'${amount}' where PatientId='${req.patient.PatientId}' `);
            }
            catch(e){
              return next();
            }
           
            return res.render('./payment/success',{title: "Deposit"});
          }
        });

    }
    catch (e) {

        next();

    }

}
const PayCancel = async (req, res, next) => {

    try {
      return res.render('./payment/calcel',{title: "Deposit Failed"});
    }
    catch (e) {

        next();

    }

}

module.exports = { payNowPost,payNowGet, PaySuccess, PayCancel }