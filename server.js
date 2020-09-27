const Express = require('express');

const app = Express();

app.use(Express.static('./public'));

app.get('/', (req, res) => {
  res.send('index.html')
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})