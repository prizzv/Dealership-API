import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken
        next();
    } else {
        res.send({ message: "Token not provided" });
    }
}
const verifyUser = (req, res, next) => {
    //verify the user.
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
        } else {
            req.user = authData;
            next();
        }
    })
}

export { verifyToken , verifyUser};