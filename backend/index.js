const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//app.use('/api/player', require('./routers/player.routes.js'));
app.use('/api/maleemployee', require('./routers/maleEmployee.routes.js'));
app.use('/api/maleplayer', require('./routers/malePlayer.routes.js'));

app.get("*", (req, res, next) => { 
    console.log("aqui")
    res.status(404).send("PAGE NOT FOUND"); 
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
})