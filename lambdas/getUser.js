const Responses = require('./API_responses');

exports.handler = async event => {
    console.log('event', event);

    if(!event.pathParameters || !event.pathParameters.ID) {
        //failed without an id

        return Responses._400({ message: 'Missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    if(data[ID]) {
        return Responses._200(data[ID]);
    }

    return Responses._400({ message: 'ID not found' });
}

const data = {
    1: { name: "Jane", birthday: "November 3 1987", job: "photographer"},
    2: { name: "James", birthday: "September 25 1990", job: "developer"},
};