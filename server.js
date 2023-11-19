const server = require('./app');
const port = 3300;

require('./socket');
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});