module.exports = {
  "host": process.env.HOST || "feathersvue.feathersjs.com",
  "port": process.env.PORT || 80,
  "protocal": process.env.PROTOCAL || "https",
  "mongodb": process.env.DATABASE_URL || "mongodb://localhost:27017/feathers-vue-production"
}
