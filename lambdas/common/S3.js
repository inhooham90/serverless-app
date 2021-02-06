const AWS = require('aws-sdk');

const s3Client = new AWS.S3();

const S3 = {
    async get(fileName, bucket) {
        const params = {
            Bucket: bucket,
            Key: fileName
        };

        let data = await s3Client.getObject(params).promise();

        if(!data) {
            throw Error('There was an error getting the file');
        }

        if(fileName.slice(fileName.length - 4) == 'json') {
            // if json format, change the blob object to string
            data = data.Body.toString();
        }

        return data;
    },
    async write(data, fileName, bucket) {
        const params = {
            Bucket: bucket,
            Body: JSON.stringify(data),
            Key: fileName
        };

        const newData = await s3Client.putObject(params).promise();

        if(!newData) {
            throw Error('There was an error writing the file');
        }

        return newData;
    }
}

module.exports = S3;