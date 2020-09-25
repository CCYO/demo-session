const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const User = require('./models/user');
const {port, secret, dbpwd, dbname} = require('./config');
const dburl = `mongodb+srv://tume20938:${dbpwd}@cluster0.0are1.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const routerSession = require('./router/seloginAPI');



mongoose.Promise = global.Promise;
mongoose.connect( dburl, {
    //  以下3個options不知道幹嘛的，只是寫來去掉警告 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', err => console.error('mongoose連線錯誤: ' + err));
db.once('open', db => console.log('mongoose連線成功'))

const app = express();

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600 * 1000 },
    store: new MongoStore({
    mongooseConnection: mongoose.connection,
    })
}))


app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//app.use(cookieParser(secert))

app.use(express.static(__dirname + '/public'));

app.use('/session', routerSession);

app.get('/', (req, res) => {
    console.log('req.body.firstName: ' + req.body.firstName)
    res.redirect('./login.html')
})

app.listen(8080, () => {
    console.log(`SERVER listen 8080`)
    
})
