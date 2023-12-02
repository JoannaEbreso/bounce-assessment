require('dotenv').config();
const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the React app
app.use(expressStaticGzip(path.join(__dirname, '../client/build')));

app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err);

  // Check if the error is a FetchError (network error)
  if (err instanceof fetch.FetchError) {
    return res.status(400).json({error: err.toString()});
  }

  // Handle other types of errors
  res.status(500).json({ error: 'Internal Server Error' });
});


app.get('/api/country/:name', async(req, res) => {
  // Your API logic here
  const country_name = req.params.name
  console.log(country_name)
  const url = `${process.env.BOUNCE_BASE_URL}/name/${country_name}`
  let country_details = []
  try{
    country_details = await (await fetch(url)).json()
    if (country_details.status != 200){
      // res.status(400).json({error: country_details?.message || 'api error'})
      throw new Error(country_details?.message || 'api error')
    }
    res.json({ message: 'Data successfully retrieved!',data: country_details});
  }catch(error){
    res.status(400).json({error: error.message});
  }
});


// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
