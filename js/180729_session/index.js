const express = require('express')
const session = require('express-session')
// const cors = require('cors');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  name: 'mandoCookie_newnewnew3'
}))

app.use(express.static('public'));

// app.use(cors());

// app.get('/', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send('hello, world');
// })

// app.get('/data', (req, res) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.send({name: "mando"});
// })

app.get('/data', function(req, res){
  res.set('Access-Control-Allow-Origin', '*');
  if(req.session.page_views){
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});

app.listen(3000);