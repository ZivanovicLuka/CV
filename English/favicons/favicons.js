const faviconsContext = require.context(
  // '!!file-loader?name=/[name].[ext]!.',
  './',
  true,
  /\.(svg|png|ico|xml|json)$/
);
// console.log(faviconsContext);
// faviconsContext.keys().forEach( a => console.log(a));
faviconsContext.keys().forEach(faviconsContext);