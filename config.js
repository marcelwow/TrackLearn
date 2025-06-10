const PORT = 3000;

const DB_USER = "marcelekwaw";
const DB_PASS = "marcel1234";


const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.86jxk9y.mongodb.net/tracklearn?retryWrites=true&w=majority`;


const SESSION_SECRET = 'tracklearn-secret-key';

module.exports = {
    PORT,
    DB_USER,
    DB_PASS,
    MONGODB_URI,
    SESSION_SECRET
};