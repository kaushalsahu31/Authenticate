const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');
const app = express();




// CORS middleware
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));




// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());



// Serve static files directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/', require('./routes/index'));




// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
