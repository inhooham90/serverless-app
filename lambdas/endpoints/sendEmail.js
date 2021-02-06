const AWS = require('aws-sdk');
const Responses = require('../common/API_responses');

const SES = new AWS.SES();

exports.handler = async event => {
    console.log('event: ', event);
    
    const { to, from, subject, text } = JSON.parse(event.body);

    if (!to || !from || !subject || !text) {
        return Responses._400({ message: "all fields are required."});
    };

    const params = {
        Destination: {
            ToAddresses: [ to ],
        },
        Message: {
            Body: {
                Text: { Data: text },
            },
            Subject: { Data: subject },
        },
        Source: from,
    };

    try {
        await SES.sendEmail(params).promise();
        return Responses._200({});
    } catch (error) {
        console.log('error sending email: ', error);
        return Responses._400({ message: 'Email failed to send'});
    };
};