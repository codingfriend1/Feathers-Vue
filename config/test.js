module.exports = {
  "mongodb": process.env.DATABASE_URL || process.env.DATABASE_TEST_URL || "mongodb://localhost:27017/FeathersVueTest"
}