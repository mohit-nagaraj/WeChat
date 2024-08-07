import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {  
    const jwtkey = process.env.JWT_KEY;
    // Get the token from the Authorization header  
    const authHeader = req.headers['authorization'];  
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token  

    if (!token) return res.sendStatus(401); // Unauthorized if no token  

    // Verify the token  
    jwt.verify(token, jwtkey, (err, user) => {  
        if (err) return res.sendStatus(403); // Forbidden if token is invalid  
        req.user = user; // Attach the user to the request object  
        next(); // Proceed to the next middleware or route handler  
    });  
}  