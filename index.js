const client = require('./connections')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

client.connect();



app.get('/country', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    client.query('Select * from country')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/league', (req, res, next) => {
    client.query('Select id,name from league')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})


app.get('/match', (req, res, next) => {
    client.query('Select * from match')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})


app.get('/team', (req, res, next) => {
    client.query('Select * from team')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/all_details', (req, res, next) => {
    client.query(`select s1.id,s1.league,s1.home_team as team ,count(won) as number_of_wins,s1.season from (select l.id, m.season,l.name as league,c.name as country,m.stage,t1.team_long_name as home_team,t2.team_long_name as Away_team,case when home_team_goal>away_team_goal then t1.team_long_name 
        when away_team_goal>home_team_goal then t2.team_long_name 
        else 'draw' end as won from match m join team t1 on m.home_team_api_id = t1.team_api_id 
        join team t2 on m.away_team_api_id = t2.team_api_id 
        join league l on m.league_id = l.id 
        join country c on m.country_id = c.id) as s1 group by id,home_team,league,season order by season,league,count(won) desc`)
        .then(testData => { 
            console.log(testData);
            res.send(testData.rows);
        })
})


app.get('/data_about_team_participate_in_perticular_league', (req,res,next) =>{
    client.query(`select s1.id, s1.league,s1.home_team as team from (select l.id,l.name as league,c.name as country,m.stage,t1.team_long_name as home_team,t2.team_long_name as Away_team,case when home_team_goal>away_team_goal then t1.team_long_name 
        when away_team_goal>home_team_goal then t2.team_long_name
        else 'draw' end as won from match m join team t1 on m.home_team_api_id = t1.team_api_id 
        join  team t2 on m.away_team_api_id = t2.team_api_id 
        join league l on m.league_id = l.id
        join country c on m.country_id = c.id) as s1 group by id,home_team,league order by id asc`)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/name_of_player_in_perticular_team', (req,res,next) =>{
    client.query(`Select club_name, name as player_name from fifa15_players
    order by club_name asc`)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/name_of_player_and_his_nationality', (req,res,next) =>{
    client.query(`Select name as player_name, nationality from fifa15_players
    order by name asc`)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/players_according_to_rating', (req,res,next) =>{
    client.query(`Select name as player_name, club_name, rating from fifa15_players
    order by rating desc`)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/team_matches', (req,res,next) =>{
    client.query(`select m.date,m.season,l.name as league,c.name as country,m.stage,t1.team_long_name as Home_Team,t2.team_long_name as Away_team,
    m.home_team_goal as home_team_goal,m.away_team_goal as away_team_goal,case when home_team_goal>away_team_goal then t1.team_long_name 
    when away_team_goal>home_team_goal then t2.team_long_name
    else 'draw' end as result from match m join team t1 on m.home_team_api_id = t1.team_api_id 
    join  team t2 on m.away_team_api_id = t2.team_api_id 
    join league l on m.league_id = l.id
    join country c on m.country_id = c.id`)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

// select t.team_long_name as home_team, t.team_long_name as away_team, m.home_team_api_id, m.away_team_api_id from team as t
// left join match as m on t.team_api_id = m.home_team_api_id

