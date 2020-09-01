# ApplePay on the Web scaffold

This is a simple scaffold (boilerplate) project to start working on ApplePay on the Web.

Includes `express` server with complete merchant validation using two-way TLS and client typings using `@types/applepayjs`.

## Usage

1. `npm i`
2. Create dir `./sslcert` for SSL certificates for HTTPS and [Merchant Identity Certificate](https://help.apple.com/developer-account/#/dev1731126fb). Put `cert.pem` and `key.pem` (for HTTPS), `validate-merchant-cert.p12` inside
3. Edit `.env`. Set `MERCHANT_ID` and `MERCHANT_ID_CERT_PASS`
4. Open `/etc/hosts` and add mapping `127.0.0.1	localhost.applepay.com`
5. `npm start` and open Safari browser `https://localhost.applepay.com`

## Testing

[ApplePay sandbox](https://developer.apple.com/apple-pay/sandbox-testing/)
