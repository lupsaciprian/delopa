const verifyPropsMiddleware = model => (req, res, next) => {
  if (typeof req.body === 'object') {
    const bodyKeys = Object.keys(req.body);
    console.log(bodyKeys);

    if (bodyKeys.length !== 0) {
      const schemaKeys = Object.keys(model.schema.paths);

      const difference = bodyKeys.filter(x => !schemaKeys.includes(x));
      if (difference.length > 0) {
        res.status(402).json({
          msg: `Connection refused. (Invalid data). Diff: ${difference.join(
            ' '
          )}`
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
};

module.exports = verifyPropsMiddleware;
