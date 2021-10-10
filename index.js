const Express = require('express');

const app = Express();

app.use(Express.static('./dist'));

app.get('/', (req, res) => {
  res.send('index.html')
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})