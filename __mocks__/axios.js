module.exports = {
  get: () => {
    return Promise.resolve({
      data: 'test'
    });
  }
}