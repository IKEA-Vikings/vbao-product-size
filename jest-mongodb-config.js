module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'test'
    },
    binary: {
      version: '4.4.4', // Version of MongoDB
      skipMD5: true
    },
    autoStart: false
  }
};