# The Firstock Connect API Nodejs client - v3

To communicate with the Firstock Connect API using Nodejs, you can use the official Nodejs client library provided by Firstock.
`<br />` Licensed under the MIT License.


[Version - 3.1.0](https://www.npmjs.com/package/thefirstock)


## Documentation

* Nodejs client documentation

## v3 - Changes

* Error code response structured has been changed
* Renamed

## Installing the client

Use the package manager [npm](https://www.npmjs.com/) to install thefirstock.

```bash
npm install thefirstock
```

## API usage

```javascript
const Firstock = require('thefirstock');

const firstock = new Firstock();

// Login using firstock account//
firstock.login({
    "userId": "",
    "password": "",
    "TOTP":"",
    "DOBnPAN": "",
    "vendorCode": "",
    "apiKey": ""
},(err, result)=>{
    console.log("Error, ",err)
    console.log("Result: ",result)
})


//Place an order//
firstock.placeOrder(
  {
    exchange: "",
    tradingSymbol: "",
    quantity: "",
    price: "",
    product: "",
    transactionType: "",
    priceType: "",
    retention: "",
    triggerPrice: "",
    remarks: "",
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Result: ", result);
  }
);

//Fetch single order deatils//
firstock.singleOrderHistory({ orderNumber: "" }, (err, result) => {
  console.log("Error, ", err);
  console.log("Result: ", result);
});


//Order book//
firstock.orderBook((err, result) => {
  console.log("Error, ", err);
  console.log("Result: ", result);
});

//Cancel order//
firstock.cancelOrder({ orderNumber: "" }, (err, result) => {
  console.log("Error, ", err);
  console.log("Result: ", result);
});


//Historical data// 
firstock.timePriceSeries(
  {
    exchange: "",
    token: "",
    endTime: "",
    startTime: "",
    intrv: "",
  },
  (err, result) => {
    console.log("Error, ", err);
    console.log("Result: ", result);
  }
);
```

Refer to the [Firstock Connect Documentation](https://connect.thefirstock.com/)  for the complete list of supported methods.

## WebSocket usage


```js
//Initializer//
const ws = firstock.initializeWebSocket(1); // Sending Number = 1 or 2 for using two websockets simultaneoulsy

ws.on("open", function open() {
  firstock.getWebSocketDetails((err, result) => {
    if (!err) {
      firstock.initialSendWebSocketDetails(ws, result, () => {
        //Subscribe Feed
        ws.send(firstock.subscribeFeedAcknowledgement("NSE|26000")); //Sending NIFTY 50 Token
      });
    }
  });
});

ws.on("error", function error(error) {
  console.log(`WebSocket error: ${error}`);
});

ws.on("message", function message(data) {
  const result = firstock.receiveWebSocketDetails(data);
  console.log("message: ", result);
  if (result["t"] === "tk" && result["ts"] === "Nifty 50") {
    ws.send(firstock.subscribeFeedAcknowledgement("NSE|26009#NSE|26017")); //Sending BANKNIFTY and INDIAVIX Token
  }
});
```

## Changelog

Check release notes.
