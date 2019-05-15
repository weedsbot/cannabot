import React, { Component } from 'react';
import axios from "axios/index";
import DialogFlow from '../../services/DialogFlow';
import { withRouter } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';
import MessageCard from './MessageCard';
import Replies from './Replies';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


let googleProjectID = process.env.GOOGLE_PROJECT_ID;
let dialogFlowSessionID = process.env.DIALOGFLOW_SESSION_ID;

/*
let dialogFlowSessionLanguageCode = process.env.DIALOGFLOW_LANGUAGE_CODE;
let googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;
let googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
let mongoURI = process.env.MONGO;
*/

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;
    talkInput;

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.ChatbotComms = new DialogFlow({googleProjectID, dialogFlowSessionID});
        this.state = {
            messages: [],
            showBot: false,
            shopWelcomeSent: false,
            clientToken: false,
            regenerateToken: 0
        };
        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'user',
            msg: {
                text : {
                    text: text
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says]});


        const request = {
            queryInput: {
                text: {
                    text: text,
                    languageCode: 'en-US',
                },
            }
        };

        await this.df_client_call(request);

    };



    async df_event_query(event) {

        const request = {
            queryInput: {
                event: {
                    name: event,
                    languageCode: 'en-US',
                },
            }
        };

        await this.df_client_call(request);

    };

    async df_client_call(request) {

        try {

            if (this.state.clientToken === false) {
                const res = await this.ChatbotComms.getClientToken();
                this.setState({clientToken: res.data.token});
            }

            var config = {
                headers: {
                    'Authorization': "Bearer " + this.state.clientToken,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };


            const res = await this.ChatbotComms.sendRequest(request, config, cookies);

            let  says = {};


            if (res.data.queryResult.fulfillmentMessages ) {
                for (let msg of res.data.queryResult.fulfillmentMessages) {
                    says = {
                        speaks: 'bot',
                        msg: msg
                    }
                    this.setState({ messages: [...this.state.messages, says]});
                }
            }
        } catch (e) {
            if (e.response.status === 401 && this.state.regenerateToken < 1) {
                this.setState({ clientToken: false, regenerateToken: 1 });
                this.df_client_call(request);
            }
            else {
                let says = {
                    speaks: 'bot',
                    msg: {
                        text : {
                            text: "I'm having troubles. I need to terminate. will be back later"}
                    }
                }
                this.setState({ messages: [...this.state.messages, says]});
                let that = this;
                setTimeout(function(){
                    that.setState({ showBot: false})
                }, 2000);
            }
        }

    }

    resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x * 1000);
        })
    }

    async componentDidMount() {
        this.df_event_query('Welcome');

        if (window.location.pathname === '/shop' && !this.state.shopWelcomeSent) {
            await this.resolveAfterXSeconds(1);
            this.df_event_query('WELCOME_SHOP');
            this.setState({ shopWelcomeSent: true, showBot: true });
        }

        this.props.history.listen(() => {
            if (this.props.history.location.pathname === '/shop' && !this.state.shopWelcomeSent) {
                this.df_event_query('WELCOME_SHOP');
                this.setState({ shopWelcomeSent: true, showBot: true });
            }
        });
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if ( this.talkInput ) {
            this.talkInput.focus();
        }
    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: true});
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({showBot: false});
    }

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        switch (payload) {
            case 'recommended_yes':
                this.df_event_query('SHOW_RECOMMENDATIONS');
                break;
            default:
                this.df_text_query(text);
                break;
        }
    }

    renderCards(cards) {
        return cards.map((card, i) => <MessageCard key={i} payload={card}/>);
    }

    renderOneMessage(message, i) {

        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        } else if (message.msg
            && message.msg.payload
            && message.msg.payload.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.cards.length * 270}}>
                                {this.renderCards(message.msg.payload.cards)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (message.msg &&
            message.msg.payload &&
            message.msg.payload.quick_replies
        ) {
            return <Replies
                text={message.msg.payload.text ? message.msg.payload.text : null}
                key={i}
                replyClick={this._handleQuickReplyPayload}
                speaks={message.speaks}
                payload={message.msg.payload.quick_replies}/>;
        }
    }

    renderMessages(returnedMessages) {
        if (returnedMessages) {
            return returnedMessages.map((message, i) => {
                    return this.renderOneMessage(message, i);
                }
            )
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        if (this.state.showBot) {
            return (
                <div style={{ minHeight: 500, maxHeight: 470, width:400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">ChatBot</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.hide}>Close</a></li>
                            </ul>
                        </div>
                    </nav>

                    <div id="chatbot"  style={{ minHeight: 388, maxHeight: 388, width:'100%', overflow: 'auto'}}>

                        {this.renderMessages(this.state.messages)}
                        <div ref={(el) => { this.messagesEnd = el; }}
                             style={{ float:"left", clear: "both" }}>
                        </div>
                    </div>
                    <div className=" col s12" >
                        <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} ref={(input) => { this.talkInput = input; }} placeholder="type a message:"  onKeyPress={this._handleInputKeyPress} id="user_says" type="text" />
                    </div>

                </div>
            );
        } else {
            return (
                <div style={{ minHeight: 40, maxHeight: 500, width:400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                    <nav>
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">ChatBot</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><a href="/" onClick={this.show}>Show</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Chatbot);