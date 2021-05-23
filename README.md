# Jop-App

Entrance exam 401
401 Entrance Exam
Instructions:
Make sure before starting to:
Turn off any means of communication (phone, Slack, Email,...).
Start your screen recording and share your face camera.
You are not allowed to use previous projects, notes, or GitHub.
You can use Google search engine.
Create a new repository (Jobs-App) on your GitHub.
Requirements:
You will create a webapp to provide the users with all the jobs in the USA that are retrieved from GitHub Jobs API (Links to an external site.)

The Home Page displays all jobs in USA that come from the API using this endpoint (Links to an external site.) as cards with this data (title, company, location, and url). You have to use a CONSTRUCTOR function to construct the objects. (12 points)

In Search Page, the user wants to have the ability to search about jobs in the USA using the description parameter, for example, if the user searched about [python] you will use this endpoint (Links to an external site.), you will change the description parameter value based on the user input in the form. Once the user clicks on the search button then should be redirected to the Results page. (10 points)

The Results page displays the results as cards with this data (title, company, location, and url) and add-to-my-list button. When the user clicks on the 'add-to-my-list' button then this record should be added to the database and be redirected to the My List page. (16 points)

In My List page, the user wants to view all the records that are retrieved from the database and displayed as cards (Each card should have the title, company, location, url, and View-Details link). If there is no data in the database, then No Jobs in Your List should be rendered. Once the user clicks on the 'View-Details' link then should be redirected to the Job Details page. (10 points)
In Job Details page, the user wants to view the selected job details from the database(title, company, location, url, description, Update and Delete buttons). (10 points)

In Job Details page, When the user clicks on the 'Delete' button, the record should be deleted from the database and be redirected to the My List page. Also, when the user clicks on the 'UPDATE' button, an update form will be shown where the user can update the data in the database and should be redirected to the same page. (14 points)

The user should have a simple UI design (using Flexbox or Grid for all the cards in the webapp). (5 points)

Deploy your webapp on Heroku. (5 points)

Keep your code clean, also use proper naming for both variables and functions (idiomatic style) and proper indentation. (3 points)

Full run webapp. (5 points)

Take a look at the EXAM DEMO (Links to an external site.).
Resources
You can use any technology you've learned during the code 301 course to achieve the above requirements.
You can use this SQL cheat sheet (Links to an external site.).
For connecting to the database you can use:
postgresql://localhost:5432/exam301
For connecting the schema to your database psql -f <path/to/schemaFile> -d <database-name>
For connecting the schema to Heroku heroku pg:psql -f <path/to/schemaFile> -a <heroku-app-name>
If you face any connection issues to the database, don't forget to start your Postgres server:
for MAC brew services start postgresql
for WIN sudo service postgresql start
If you use WSL and have weird issues with your server, you can use this command killall -s KILL node. keep using ctrl+c \***\* Useful Express Codes \*\***
require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('\_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);
const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const client = new pg.Client( { connectionString: process.env.DATABASE_URL, ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}} );
Libraries Resources
Express (Links to an external site.)
Dotenv (Links to an external site.)
Pg (Links to an external site.)
Ejs (Links to an external site.)
Method-override (Links to an external site.)
Superagent (Links to an external site.)
JQuery (Links to an external site.)
Submission Instructions:
Submit the link to your GitHub repo for this project.
Submit the Heroku link for the project.
After completing the exam, do NOT commit or push anything to your repo.
Send the link of the recorded video to your instructor on Slack.
