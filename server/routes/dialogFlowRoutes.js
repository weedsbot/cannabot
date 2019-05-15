'use strict';

const chatbot = require('../chatbot/chatbot');

module.exports = app => {

    app.post('/df_text_query', async (req, res) => {

        let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);

    });

    app.post('/df_event_query', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    app.get('/get_client_token', async (req, res) => {
        let token = await chatbot.getToken();
        res.send({token});
    })
}