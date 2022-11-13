const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// eslint-disable-next-line import/no-dynamic-require
const app = require(`${__dirname}/app`);

/*
env set for express, node sets more env variables
console.log(app.get('env'));
console.log(process.env);
*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
