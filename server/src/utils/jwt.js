const expressjwt = require('express-jwt')
const User = require('../models/User')

function jwt() {
    const secret = process.env.BIG_SECRET
    return expressjwt({ secret, isRevoked }).unless({
        path: [
            '/api/users/authenticate',
            '/api/users/register',
        ]
    })
}

async function isRevoked(req, payload, done) {
    const user = await User.findById(payload.sub)

    if (!user) {
        return done(null, true)
    }

    done()
}

module.exports = jwt