const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the React app
app.use(expressStaticGzip(path.join(__dirname, '../client/build')));

app.get('/api/country/:name', async(req, res) => {
  // Your API logic here
  const country_name = req.params.name
  console.log(country_name)
  const url = `https://restcountries.com/v3.1/name/${country_name}`
  let country_details = []
  try{
    country_details = await (await fetch(url)).json()
  }catch(error){
    console.error(error)
  }
  res.json({ message: 'Hello from the API!',data: country_details});
});


// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
