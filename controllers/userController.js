const colors = require("colors");
const { randomUUID } = require("crypto");

exports.getUserId = (req, res) => {
  console.log("Get UserId Called");

  const guid = randomUUID();

  res
    .status(200)
    .json({
      data: guid,
      links: { first: "", prev: "", self: "", next: "", last: "" },
      meta: null,
    });
};
