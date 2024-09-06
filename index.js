const express = require('express');
const axios = require('axios'); 
const cors = require('cors');
const app = express();
// const connectDB = require('./server'); 
app.use(express.json());
app.use(cors());

app.post('/api/quiz', async (req, res) => {
    // console.log("req came");
    const { difficulty, category } = req.body;
    // console.log(difficulty, category);
    let apiUrl;

    if(difficulty == "any" && category == "any"){
        apiUrl = `https://opentdb.com/api.php?amount=10`;
    }
    else if(difficulty == "any" && category != "any"){
        apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}`;
    }
    else if(category == "any" && difficulty != "any"){
        apiUrl = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`;
    }
    else{
    // Construct the URL based on the selected difficulty and category
     apiUrl = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&category=${category}`;
    }

    // console.log(apiUrl);

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching quiz questions' });
    }
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
