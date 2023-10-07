import express from 'express'
import childProcess from 'child_process'
import path from 'path';

const app = express ();
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
const PORT = process.env.PORT || 3000;


app.get("/submit", (req, res) => {
        let taskProcessor = childProcess.fork('./scrapper.js');

        taskProcessor.on('message', function(msg){
            console.log(msg)
        }.bind(this));

        taskProcessor.on('close', function(msg){
            this.kill();
        });

        taskProcessor.send({
            timer:req.query.timer,
            dolphinID:req.query.dolphinID
        });
        res.status(200).json({
            msg:"Scrapping Started"
        });
 });
 app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});