const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve project files statically from the root folder
app.use(express.static(path.join(__dirname)));

// Load the app HTML by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'app.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
