'use strict';
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const structjson = require('./structjson.js');
const googleAuth = require('google-oauth-jwt');
const config       = require('../config/keys');

const projectId = config.project_id;
const sessionId = uuid.v4();
const languageCode = 'en-US';

const credentials = {
    client_email: config.client_email,
    private_key: config.private_key,
    projectId: config.project_id
};



const sessionClient = new dialogflow.SessionsClient(credentials);

module.exports = {
    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: config.client_email,
                    key: config.private_key,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                    console.log(" async function getToken => ", token)
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
            case 'recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent) {
                    //
                }
                break;
        }

        return responses;
    },


}
