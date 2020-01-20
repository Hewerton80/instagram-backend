
const port = 3001
module.exports = {
    PORT : process.env.PORT || port,
    BASE_URL : process.env.BASE_URL || `http://localhost:${port}`
}