"use strict";
const axios = require("axios");
const Validations = require("../Validations/Validations");
const WebSocket = require("ws");
const Commonfunctions = require("../shared/Commonfunctions");
const CONSTANT = require("../shared/Constant");

let axiosInterceptor = axios.create({
  baseURL: CONSTANT.API_LINK,
});

const AFirstock = require("./AFirstock");

class Firstock extends AFirstock {
  constructor() {
    super();
    this.token = "";
    this.userId = "";
  }

  login({ userId, password, TOTP, vendorCode, apiKey }, callBack) {
    Validations.validateLogin({
      userId,
      password,
      TOTP,
      vendorCode,
      apiKey,
    });
    axiosInterceptor
      .post(`login`, {
        userId,
        password,
        TOTP,
        vendorCode,
        apiKey,
      })
      .then((response) => {
        const { data } = response;
        this.token = data.data.susertoken;
        this.userId = data.actid;
        const finished = (error) => {
          if (error) {
            callBack(error, null);
            return;
          } else {
            callBack(null, data);
          }
        };
        Commonfunctions.saveData(
          { token: data.data.susertoken, userId: data.data.actid },
          "config.json",
          finished
        );
      })
      .catch((error) => {
        callBack(error.response.data, null);
      });
  }
  logout(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`logout`, {
            userId,
            jKey,
          })
          .then((response) => {
            const { data } = response;
            const finished = (error) => {
              if (error) {
                callBack(error, null);
                return;
              } else {
                callBack(null, data);
              }
            };
            this.userId = "";
            this.token = "";
            Commonfunctions.saveData(
              { token: "", userId: "" },
              "config.json",
              finished
            );
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  getUserDetails(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`userDetails`, {
            userId,
            jKey,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  placeOrder(
    {
      exchange,
      tradingSymbol,
      quantity,
      price,
      product,
      transactionType,
      priceType,
      retention,
      remarks,
      triggerPrice,
    },
    callBack
  ) {
    Validations.validateplaceOrder();
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`placeOrder`, {
            userId,
            actid: userId,
            jKey,
            exchange,
            tradingSymbol,
            quantity,
            price,
            product,
            transactionType,
            priceType,
            retention,
            remarks,
            triggerPrice,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  orderMargin(
    {
      exchange,
      tradingSymbol,
      quantity,
      price,
      product,
      transactionType,
      priceType,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`orderMargin`, {
            userId,
            actid: userId,
            jKey,
            exchange,
            tradingSymbol,
            quantity,
            price,
            product,
            transactionType,
            priceType,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  orderBook(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`orderBook`, {
            userId,
            jKey,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  cancelOrder({ orderNumber }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`cancelOrder`, {
            userId,
            jKey,
            orderNumber,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  modifyOrder(
    {
      orderNumber,
      price,
      quantity,
      triggerPrice,
      tradingSymbol,
      exchange,
      priceType,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`modifyOrder`, {
            userId,
            jKey,
            quantity,
            price,
            triggerPrice,
            orderNumber,
            exchange,
            tradingSymbol,
            priceType,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  singleOrderHistory({ orderNumber }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`singleOrderHistory`, {
            userId,
            jKey,
            orderNumber,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  tradeBook(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;

        axiosInterceptor
          .post(`tradeBook`, {
            userId,
            jKey,
            actid: userId,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  positionsBook(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;

        axiosInterceptor
          .post(`positionBook`, {
            userId,
            jKey,
            actid: userId,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error, null);
          });
      }
    });
  }
  productConversion(
    {
      exchange,
      tradingSymbol,
      quantity,
      product,
      transactionType,
      positionType,
      previousProduct,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`productConversion`, {
            userId,
            jKey,
            actid: userId,
            exchange,
            tradingSymbol,
            quantity,
            product,
            transactionType,
            positionType,
            previousProduct,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  holdings({ product }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;

        axiosInterceptor
          .post(`holdings`, {
            userId,
            jKey,
            actid: userId,
            product,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  limits(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`limit`, {
            userId,
            jKey,
            actid: userId,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  getQuotes({ exchange, token }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`getQuote`, {
            userId,
            jKey,
            exchange,
            token,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  // ######################################################################################################################################

  getMultiQuotes({ data }, callBack) {
    Commonfunctions.readData((err, readData) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = readData.userId || this.userId;
        const jKey = readData.token || this.token;

        axiosInterceptor
          .post(`getMultiQuotes`, {
            userId,
            jKey,
            data,
          })
          .then((response) => {
            callBack(null, response.data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }

  getQuoteltp({ exchange, token }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`getQuote/ltp`, {
            userId,
            jKey,
            exchange,
            token,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }

  getMultiQuotesltp({ data }, callBack) {
    Commonfunctions.readData((err, readData) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = readData.userId || this.userId;
        const jKey = readData.token || this.token;
        axiosInterceptor
          .post(`getMultiQuotes/ltp`, {
            userId,
            jKey,
            data,
          })
          .then((response) => {
            callBack(null, response.data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }

  // ######################################################################################################################################

  searchScripts({ stext }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`searchScrips`, {
            userId,
            jKey,
            stext,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  getSecurityInfo({ exchange, token }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`securityInfo`, {
            userId,
            jKey,
            exchange,
            token,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  getIndexList({ exchange }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`indexList`, {
            userId,
            jKey,
            exchange,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  getOptionChain({ exchange, tradingSymbol, strikePrice, count }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`optionChain`, {
            userId,
            jKey,
            exchange,
            tradingSymbol,
            strikePrice,
            count,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  spanCalculator(listData, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`spanCalculators`, {
            userId,
            jKey,
            data: listData,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  timePriceSeries({ exchange, token, endTime, startTime, interval }, callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`timePriceSeries`, {
            userId,
            jKey,
            exchange,
            token,
            endTime,
            startTime,
            interval,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  basketMargin({ basket }, callBack) {
    Commonfunctions.readData((err, dat) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = dat.userId || this.userId;
        const jKey = dat.token || this.token;
        axiosInterceptor
          .post(`basketMargin`, {
            userId,
            jKey,
            basket,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  optionGreek(
    { expiryDate, strikePrice, spotPrice, initRate, volatility, optionType },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`optionGreek`, {
            userId,
            expiryDate,
            strikePrice,
            spotPrice,
            initRate,
            volatility,
            optionType,
            jKey,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  multiPlaceOrder({ data }, callBack) {
    Commonfunctions.readData((err, datatemp) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = datatemp.userId || this.userId;
        const jKey = datatemp.token || this.token;
        axiosInterceptor
          .post(`strategies/multiPlaceOrders`, {
            userId,
            jKey,
            data,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  bearPutSpread(
    {
      symbol,
      putBuyStrikePrice,
      putSellStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`strategies/bearPutSpread`, {
            symbol,
            putBuyStrikePrice,
            putSellStrikePrice,
            expiry,
            product,
            quantity,
            remarks,
            jKey,
            userId: userId,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  bullCallSpread(
    {
      symbol,
      callBuyStrikePrice,
      callSellStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`strategies/bullCallSpread`, {
            symbol,
            callBuyStrikePrice,
            callSellStrikePrice,
            expiry,
            product,
            quantity,
            remarks,
            jKey,
            userId: userId,
          })
          .then((response) => {
            const { data } = response;

            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  longStrangle(
    {
      symbol,
      callStrikePrice,
      putStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`strategies/longStrangle`, {
            symbol,
            callStrikePrice,
            putStrikePrice,
            expiry,
            product,
            quantity,
            remarks,
            jKey,
            userId: userId,
          })
          .then((response) => {
            const { data } = response;
            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  longStraddle(
    { symbol, strikePrice, expiry, product, quantity, remarks },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`strategies/longStraddle`, {
            symbol,
            strikePrice,
            expiry,
            product,
            quantity,
            remarks,
            jKey,
            userId: userId,
          })
          .then((response) => {
            const { data } = response;
            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  shortStraddle(
    {
      symbol,
      strikePrice,
      expiry,
      product,
      quantity,
      remarks,
      hedge,
      hedgeValue,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`strategies/shortStraddle`, {
            symbol,
            strikePrice,
            expiry,
            product,
            quantity,
            remarks,
            jKey,
            userId: userId,
            hedge,
            hedgeValue,
          })
          .then((response) => {
            const { data } = response;
            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }
  shortStrangle(
    {
      symbol,
      callStrikePrice,
      putStrikePrice,
      expiry,
      product,
      quantity,
      remarks,
      hedge,
      hedgeValue,
    },
    callBack
  ) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      } else {
        const userId = data.userId || this.userId;
        const jKey = data.token || this.token;
        axiosInterceptor
          .post(`strategies/shortStrangle`, {
            symbol,
            callStrikePrice,
            putStrikePrice,
            expiry,
            product,
            quantity,
            remarks,
            jKey,
            userId: userId,
            hedge,
            hedgeValue,
          })
          .then((response) => {
            const { data } = response;
            callBack(null, data);
          })
          .catch((error) => {
            callBack(error.response.data, null);
          });
      }
    });
  }

  //Websockets Start
  initializeWebSocket(number = 1) {
    if (number === 1) {
      const ws = new WebSocket(CONSTANT.WSS_LINK1);
      return ws;
    }
    if (number === 2) {
      const ws = new WebSocket(CONSTANT.WSS_LINK2);
      return ws;
    } else {
      throw "Websocket 1 and 2 are allowed";
    }
  }
  getWebSocketDetails(callBack) {
    Commonfunctions.readData((err, data) => {
      if (err) {
        callBack(err, null);
      }
      const params = {
        t: "c",
        uid: data.userId,
        actid: data.userId,
        susertoken: data.token,
        source: "API",
      };
      callBack(null, JSON.stringify(params));
    });
  }
  sendWebSocketDetails({ t, k, actid = "" }) {
    const messageData = {
      t,
      k,
      actid,
    };
    return JSON.stringify(messageData);
  }
  initialSendWebSocketDetails(ws, result, callback) {
    ws.send(result);
    let that = this;
    ws.on("message", function message(data) {
      const result = that.receiveWebSocketDetails(data);
      if (result["s"] === "OK") {
        callback();
      }
    });
  }
  subscribeFeed(k) {
    const messageData = {
      t: "tf",
      k,
    };
    return JSON.stringify(messageData);
  }
  subscribeFeedAcknowledgement(k) {
    const messageData = {
      t: "t",
      k,
    };
    return JSON.stringify(messageData);
  }
  unsubscribeFeed(k) {
    const messageData = {
      t: "u",
      k,
    };
    return JSON.stringify(messageData);
  }
  subscribeDepth(k) {
    const messageData = {
      t: "df",
      k,
    };
    return JSON.stringify(messageData);
  }
  subscribeDepthAcknowledgement(k) {
    const messageData = {
      t: "d",
      k,
    };
    return JSON.stringify(messageData);
  }
  unsubscribeDepth(k) {
    const messageData = {
      t: "ud",
      k,
    };
    return JSON.stringify(messageData);
  }
  subscribeOrderUpdate(actid) {
    const messageData = {
      t: "o",
      actid,
    };
    return JSON.stringify(messageData);
  }
  subscribeOrderAcknowledgement() {
    const messageData = {
      t: "ok",
    };
    return JSON.stringify(messageData);
  }
  unsubscribeOrderUpdate() {
    const messageData = {
      t: "uo",
    };
    return JSON.stringify(messageData);
  }
  receiveWebSocketDetails(data) {
    const decodedJsonObject = Buffer.from(data, "base64").toString("ascii");
    return JSON.parse(decodedJsonObject);
  }

  //Websockets End
}

module.exports = Firstock;
