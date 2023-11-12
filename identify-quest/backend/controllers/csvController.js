const fs = require('fs');
const csv = require('csv-parser');
const path = require('path')

exports.filterCSVByCity = (req, res) => {
    const city = req.query.city?.trim().toLowerCase();
    const results = [];
  
    const csvFilePath = path.join(__dirname, '../../public/Local_Law_Enforcement_Locations.csv');
  
    if (!city) {
      return res.status(400).send({ message: 'City parameter is required' });
    }
  
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const cityFieldValue = data.CITY?.trim().toLowerCase();
        if (cityFieldValue === city) {
          // Map CSV data to your schema
          const service = {
            id: data.OBJECTID, // Assuming OBJECTID is your desired ID
            name: data.NAME,
            address: data.ADDRESS,
            city: data.CITY,
            state: data.STATE,
            telephone: data.TELEPHONE,
            county: data.COUNTY,
            website: '' // Add if you have this information in your CSV
          };
          results.push(service);
        }
      })
      .on('end', () => {
        res.json(results);
      })
      .on('error', (err) => {
        res.status(500).send(err);
      });
  };
  