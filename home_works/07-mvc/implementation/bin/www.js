const config = require('config');
const app = require('../app');

app.listen(config.port, () => {
  console.log(
    `Server listen port: ${config.port}, and run on http://localhost:${config.port}`
  );
});
