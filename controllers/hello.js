exports.postHello = (req, res, next) => {
  let hello = "Hello from Node.js. Your message: ";
  if (req.body.helloMessage) {
    hello += req.body.helloMessage;
  } else {
    hello += "nothing";
  }
  res.send(JSON.stringify({ helloMessage: hello }));
};

exports.getHello = (req, res, next) => {
  res.send(JSON.stringify({ helloMessage: "Hello World!" }));
};
