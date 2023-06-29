const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views','admin'));
app.set('views', __dirname + '/view');

// Parse JSON bodies for incoming requests
app.use(bodyParser.json());


const Login = require('./models/login');
const Hostel = require('./models/hostel');
const Student = require('./models/student'); 
const MessMenu = require('./models/mess'); 
const Mess = require('./models/mess');
const Complaint = require('./models/complaint');
const CleaningService = require('./models/CleaningService'); 
const Review = require('./models/review');

const mongoDB = 'mongodb://1:27017/dream'; 

// Serve static files from the "view" directory
//app.use(express.static('hostel/view'));
app.use(express.static(__dirname + '/view'));
app.use(express.static('view'));

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to MongoDB:', err);
  });
  app.get('/admin/hostel', (req, res) => {
    // Fetch the hostel data from the database
    Hostel.find({})
      .then((hostels) => {
        res.render('admin/hostel', { hostels });
      })
      .catch((error) => {
        console.error('Error fetching hostels:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/admin/hostel/remove', (req, res) => {
    const id = req.body.id;
  
    // Remove the hostel data from the database
    Hostel.findByIdAndRemove(id)
      .then(() => {
        res.redirect('/admin/hostel'); // Redirect back to the hostel details page
      })
      .catch((error) => {
        console.error('Error removing hostel:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  app.post('/admin/hostel/add', (req, res) => {
    const { hostelName, address, totalRooms, occupiedRooms, availableRooms } = req.body;
  
    // Create a new Hostel document
    const newHostel = new Hostel({
      hostelName,
      address,
      totalRooms,
      occupiedRooms,
      availableRooms
    });
  
    // Save the new hostel data in the database
    newHostel.save()
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        console.error('Error adding hostel:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });
  });
  // Fetch all students
app.get('/admin/student', (req, res) => {
    Student.find({})
      .then(students => {
        res.render('admin/student', { students });
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  // Add a student
  app.post('/admin/student/add', (req, res) => {
    const { name, address, phoneNumber, gender } = req.body;
  
    const newStudent = new Student({
      name,
      address,
      phoneNumber,
      gender
    });
  
    newStudent.save()
      .then(() => {
        res.redirect('/admin/student');
      })
      .catch(error => {
        console.error('Error adding student:', error);
        res.status(500).json({ error: error.message || 'student added' });
      });
  });
  
  // Remove a student
  app.post('/admin/student/remove', (req, res) => {
    const id = req.body.id;
  
    Student.findByIdAndRemove(id)
      .then(() => {
        res.redirect('/admin/student');
      })
      .catch(error => {
        console.error('Error removing student:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.get('/admin/mess', (req, res) => {
    // Fetch the mess data from the database
    Mess.find({})
      .then((mess) => {
        res.render('admin/mess', { mess });
      })
      .catch((error) => {
        console.error('Error fetching mess:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/admin/mess/remove', (req, res) => {
    const id = req.body.id;
  
    // Remove the mess data from the database
    Mess.findByIdAndRemove(id)
      .then(() => {
        res.redirect('/admin/mess'); // Redirect back to the mess details page
      })
      .catch((error) => {
        console.error('Error removing mess:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/admin/mess/add', (req, res) => {
    const { name, location, capacity, availableSeats } = req.body;
  
    // Create a new Mess document
    const newMess = new Mess({
      name,
      location,
      capacity,
      availableSeats
    });
  
    // Save the new mess data in the database
    newMess.save()
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) => {
        console.error('Error adding mess:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      });
  });
  app.route('/login')
  .get((req, res) => {
    res.sendFile(__dirname + '/view/login.html');
  })
  .post((req, res) => {
    const { id, password } = req.body;

    // Find the user by id
    Login.findOne({ id: id })
      .then((user) => {
        if (user) {
          // User exists, check the password
          if (user.password === password) {
            // Password matches, redirect to the appropriate page based on user type
            if (id.length === 5) {
              res.sendFile(__dirname + '/view/student/stdpage.html');
            } else if (id.length === 3) {
              res.sendFile(__dirname + '/view/admin/hadmin.html');
            } else if (id.length === 7) {
              res.sendFile(__dirname + '/view/admin/sadmin.html');
            } else if (id.length === 4) {
              res.sendFile(__dirname + '/view/admin/madmin.html');
            } else if (id.length === 6) {
              res.sendFile(__dirname + '/view/admin/staffp.html');
            } else {
              res.send('Invalid ID length');
            }
          } else {
            // Password doesn't match, show error message on login page
            res.sendFile(__dirname + '/view/login.html', { error: 'Invalid login credentials' });
          }
        } else {
          // User doesn't exist, show error message on login page
          res.sendFile(__dirname + '/view/login.html', { error: 'Invalid login credentials' });
        }
      })
      .catch((error) => {
        console.error('Error finding user:', error);
        res.status(500).send('Internal Server Error');
      });
  });

 
  app.route('/complaint')
  .get((req, res) => {
    // Handle GET request logic
    // For example, render a form for the complaint
    res.sendFile(__dirname + '/view/complaint.html');
  })
  .post((req, res) => {
    // Handle POST request logic
    const { date, name, email, description, complaintAbout } = req.body;

    const complaint = new Complaint({
      date,
      name,
      email,
      description,
      complaintAbout
    });

    complaint.save()
      .then(() => {
        // Complaint saved successfully
        res.redirect('/student/stdpage.html'); // Redirect to a thank-you page or wherever you want
      })
      .catch((error) => {
        // Error occurred while saving the complaint
        console.error('Error saving complaint:', error);
        res.redirect('/error'); // Redirect to an error page or handle the error as needed
      });
  });
  // ...

app.get('/admin/studentqueries.html', (req, res) => {
    // Fetch all the complaint data from the database
    Complaint.find({})
      .then((complaints) => {
        res.render('admin/studentqueries', { complaints });
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
        res.status(500).send('Error fetching complaints');
      });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).send('Internal Server Error');
  });
  
  app.route('/CleaningService')
  .get((req, res) => {
    // Handle GET request logic
    // For example, render a form for the complaint
    res.sendFile(__dirname + '/view/cleaning.html');
  })
  .post((req, res) => {
    // Handle POST request logic
    const { name, rollNumber, date, hostelName, roomNumber } = req.body;

    const cleaningService = new CleaningService({
      name,
      rollNumber,
      date,
      hostelName,
      roomNumber
    });
  

    cleaningService.save()
      .then(() => {
        // Complaint saved successfully
        res.redirect('/student/stdpage.html'); // Redirect to a thank-you page or wherever you want
      })
      .catch((error) => {
        // Error occurred while saving the complaint
        console.error('Error saving complaint:', error);
        res.redirect('/error'); // Redirect to an error page or handle the error as needed
      });
  });
  
  


  app.get('/admin/review', (req, res) => {
    // Fetch all the complaint data from the database
    Review.find({})
      .then((reviews) => {
        res.render('admin/review', { reviews });
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
        res.status(500).send('Error fetching complaints');
      });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).send('Internal Server Error');
  });
  app.post('/reviews', (req, res) => {
    const { email, message } = req.body;
  
    // Create a new review instance
    const newReview = new Review({
      email,
      message
    });
    console.log('Received review:', newReview); // Log the received review

    newReview.save()
      .then(() => {
        console.log('Review saved successfully');
        res.send('Review saved successfully');
      })
      .catch((error) => {
        console.error('Error saving review:', error);
        res.status(500).send('Error saving review: ${error.message}');
      });
  }); 