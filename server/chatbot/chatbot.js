'use strict';
const dialogflow = require('dialogflow');
const structjson = require('./structjson.js');
const mongoose = require('mongoose');

const googleAuth = require('google-oauth-jwt');

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

let googleProjectID = process.env.GOOGLE_PROJECT_ID;
let dialogFlowSessionID = process.env.DIALOGFLOW_SESSION_ID;
let dialogFlowSessionLanguageCode = process.env.DIALOGFLOW_LANGUGAGE_CODE;
let googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
let googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;

const projectId = googleProjectID;
const sessionId = dialogFlowSessionID;
const languageCode = dialogFlowSessionLanguageCode;

const credentials = {
    client_email: googleClientEmail,
    private_key: googlePrivateKey
};

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});





module.exports = {

    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: googleClientEmail,
                    key: googlePrivateKey,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                },
            );
        });
    },

    textQuery: async function(text, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;



    },

    eventQuery: async function(event, userID,  parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = self.handleAction(responses);
        return responses;

    },


    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendstrains-yes':
                if (queryResult.allRequiredParamsPresent) {

                }
                break;
        }

        return responses;
    },


}
