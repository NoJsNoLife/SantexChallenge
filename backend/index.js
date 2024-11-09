const express = require('express');
const cors = require('cors');

const app = express();
const version = 'v1';

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//app.use('/api/player', require('./routers/player.routes.js'));
app.use(`/api/${version}/maleplayer`, require('./routers/malePlayer.routes.js'));
app.use(`/api/${version}/nationality`, require('./routers/nationality.routes.js'));
app.use(`/api/${version}/league`, require('./routers/league.routes.js'));
app.use(`/api/${version}/fifa`, require('./routers/fifa.routes.js'));
app.use(`/api/${version}/club`, require('./routers/club.routes.js'));
app.use(`/api/${version}/nationteam`, require('./routers/nationTeam.routes.js'));

app.get("*", (req, res, next) => { 
    console.log("aqui")
    res.status(404).send("PAGE NOT FOUND"); 
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})