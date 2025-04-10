const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join("public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'head.html'));
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
