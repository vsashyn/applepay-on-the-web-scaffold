/// <reference path="../node_modules/@types/applepayjs/index.d.ts" />

const btn = document.getElementById('applePay')

btn.addEventListener('click', function() {
  const session = new ApplePaySession(3, {
    "countryCode": "US",
    "currencyCode": "USD",
    "merchantCapabilities": [
      "supports3DS"
    ],
    "supportedNetworks": [
      "visa",
      "masterCard",
      "amex",
      "discover"
    ],
    "total": {
      "label": "Demo (Card is not charged)",
      "type": "final",
      "amount": "1.99"
    }
  })
  
  session.onvalidatemerchant = function(e) {
    fetch('/validate', {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: e.validationURL })
    }).then(r => r.json()).then(o => session.completeMerchantValidation(o.validationResponse)).catch(console.error)
  }

  session.onshippingcontactselected = function() {

  }

  session.onshippingmethodselected = function () {

  }

  session.onpaymentauthorized = function (e) {
    console.log(e.payment.billingContact, e.payment.shippingContact, e.payment.token)
    session.completePayment({
      status: 0
    })
  }
    
  session.begin();
})
