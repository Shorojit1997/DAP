

const PaymentJson=(totalAmount)=>{


   var  create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: `http://localhost:3000/success?amount=${totalAmount}`,
            cancel_url: "http://localhost:3000/cancel",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "AppointMent",
                            sku: "001",
                            price: totalAmount,
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: totalAmount,
                },
                description: "Hat for the best team ever",
            },
        ],
    };

    return create_payment_json

}

module.exports=PaymentJson