const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      $ENV: {
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
        SIGNALING_URL: JSON.stringify(process.env.SIGNALING_URL),
        API_URL: JSON.stringify(process.env.API_URL),
        AUTH_TYPE: JSON.stringify(process.env.AUTH_TYPE)
      }
    })
  ]
};