const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_mg3eJ7qrjvcvJc4mQQBorztq00885ZaU2T');
//requerimos stripe y le pasamos el secret key

router.get('/', (req,res)=>{
    res.render('index');
});

//usamos los metodos de stripe para  los datos.

//Primero creo un comprador:
router.post('/envio', async (req,res)=>{
    //console.log ('cliente :' + req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
    });


    //creamos el metrodo de pago la compra:

   const charge= await stripe.charges.create({
        amount:  "3000",
        currency: "usd",
        customer: customer.id,
        description: "compra software"
    });
    console.log( charge.id);
    //respuesta final:

    res.render('download');

});
module.exports = router;