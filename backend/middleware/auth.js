const jwt = require('jsonwebtoken');
const models = require ('../db/models/index')
const { User } = models.sequelize.models

require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "TOKEN_KEY");
		const user = await models.User.findOne({ where: { id: decodedToken.id } });
		if (!user) {
			throw new Error("not valid");
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ error: "A token must be provided" });
	}
};