module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {data: 'test'},
        {image: 'test.png'}
      ]
    });
  }
}