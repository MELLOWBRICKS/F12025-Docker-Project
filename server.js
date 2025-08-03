const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// In-memory storage for votes (in production, use a database)
let votes = {};

// F1 Drivers data 2025 - Current season with official F1 images
const drivers = [
  {
    id: 1,
    name: "Max Verstappen",
    team: "Red Bull Racing Honda RBPT",
    number: 1,
    country: "Netherlands",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png"
  },
  {
    id: 2,
    name: "Sergio Pérez",
    team: "Red Bull Racing Honda RBPT",
    number: 11,
    country: "Mexico",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/1col/image.png"
  },
  {
    id: 3,
    name: "Lewis Hamilton",
    team: "Ferrari",
    number: 44,
    country: "Great Britain",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png"
  },
  {
    id: 4,
    name: "Charles Leclerc",
    team: "Ferrari",
    number: 16,
    country: "Monaco",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/1col/image.png"
  },
  {
    id: 5,
    name: "George Russell",
    team: "Mercedes",
    number: 63,
    country: "Great Britain",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/1col/image.png"
  },
  {
    id: 6,
    name: "Kimi Antonelli",
    team: "Mercedes",
    number: 12,
    country: "Italy",
    imageUrl: "https://images.ctfassets.net/1fvlg6xqnm65/5YiTw6xQHuM94ty9yLDnyk/ff67d40c690940307f48d1b370352577/Kimi_Antonelli.png?w=3840&q=75&fm=webp"
  },
  {
    id: 7,
    name: "Lando Norris",
    team: "McLaren Mercedes",
    number: 4,
    country: "Great Britain",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/1col/image.png"
  },
  {
    id: 8,
    name: "Oscar Piastri",
    team: "McLaren Mercedes",
    number: 81,
    country: "Australia",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/1col/image.png"
  },
  {
    id: 9,
    name: "Fernando Alonso",
    team: "Aston Martin Aramco Mercedes",
    number: 14,
    country: "Spain",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/1col/image.png"
  },
  {
    id: 10,
    name: "Lance Stroll",
    team: "Aston Martin Aramco Mercedes",
    number: 18,
    country: "Canada",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/1col/image.png"
  },
  {
    id: 11,
    name: "Pierre Gasly",
    team: "Alpine Renault",
    number: 10,
    country: "France",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/1col/image.png"
  },
  {
    id: 12,
    name: "Jack Doohan",
    team: "Alpine Renault",
    number: 7,
    country: "Australia",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/J/JACDOO01_Jack_Doohan/jacdoo01.png.transform/1col/image.png"
  },
  {
    id: 13,
    name: "Nico Hülkenberg",
    team: "Kick Sauber Ferrari",
    number: 27,
    country: "Germany",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/1col/image.png"
  },
  {
    id: 14,
    name: "Gabriel Bortoleto",
    team: "Kick Sauber Ferrari",
    number: 5,
    country: "Brazil",
    imageUrl: "https://cdn.racingnews365.com/_570x570_crop_center-center_none/gabbor01.png?v=1741601062"
  },
  {
    id: 15,
    name: "Yuki Tsunoda",
    team: "RB Honda RBPT",
    number: 22,
    country: "Japan",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/1col/image.png"
  },
  {
    id: 16,
    name: "Isack Hadjar",
    team: "RB Honda RBPT",
    number: 6,
    country: "France",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/1col/image.png"
  },
  {
    id: 17,
    name: "Alexander Albon",
    team: "Williams Mercedes",
    number: 23,
    country: "Thailand",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/1col/image.png"
  },
  {
    id: 18,
    name: "Carlos Sainz",
    team: "Williams Mercedes",
    number: 55,
    country: "Spain",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/1col/image.png"
  },
  {
    id: 19,
    name: "Esteban Ocon",
    team: "Haas Ferrari",
    number: 31,
    country: "France",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/1col/image.png"
  },
  {
    id: 20,
    name: "Oliver Bearman",
    team: "Haas Ferrari",
    number: 87,
    country: "Great Britain",
    imageUrl: "https://www.formula1.com/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/1col/image.png"
  }
];

// Initialize votes for all drivers
drivers.forEach(driver => {
  votes[driver.id] = 0;
});

// Routes

// GET /drivers - List all drivers with image URLs
app.get('/api/drivers', (req, res) => {
  res.json({
    success: true,
    data: drivers
  });
});

// POST /vote - Submit vote for a driver
app.post('/api/vote', (req, res) => {
  const { driverId } = req.body;
  const userVoted = req.cookies.hasVoted;

  // Check if user has already voted
  if (userVoted) {
    return res.status(400).json({
      success: false,
      message: 'You have already voted for this Grand Prix!'
    });
  }

  // Validate driver ID
  const driver = drivers.find(d => d.id === parseInt(driverId));
  if (!driver) {
    return res.status(400).json({
      success: false,
      message: 'Invalid driver ID'
    });
  }

  // Record the vote
  votes[driverId] = (votes[driverId] || 0) + 1;

  // Set cookie to prevent multiple votes
  res.cookie('hasVoted', 'true', { 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true 
  });

  res.json({
    success: true,
    message: `Vote recorded for ${driver.name}!`,
    data: { driverId, driverName: driver.name }
  });
});

// GET /results - Fetch live vote statistics
app.get('/api/results', (req, res) => {
  const results = drivers.map(driver => ({
    id: driver.id,
    name: driver.name,
    team: driver.team,
    votes: votes[driver.id] || 0
  })).sort((a, b) => b.votes - a.votes);

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  res.json({
    success: true,
    data: {
      results,
      totalVotes,
      lastUpdated: new Date().toISOString()
    }
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏎️  F1 Fan App server running on port ${PORT}`);
  console.log(`🌐 Access the app at http://localhost:${PORT}`);
});
