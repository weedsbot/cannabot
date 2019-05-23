'use strict';

const chatbot = require('../chatbot/chatbot');
const express = require("express");
const router = express.Router();

router.post('/api/df_text_query', async (req, res) => {
    console.log('/api/df_text_query');
    let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
});

router.post('/api/df_event_query', async (req, res) => {
    console.log('/api/df_event_query');
    let responses = await chatbot.eventQuery(req.body.event, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
});

router.get('/api/get_client_token', async (req, res) => {
    let token = await chatbot.getToken();
    console.log('/api/get_client_token => ', token);
    res.send({token});
})



module.exports = router;


