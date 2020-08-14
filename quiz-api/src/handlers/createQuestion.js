import AWS from "aws-sdk";
import {v4 as uuid} from "uuid";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createQuestion(event, context) {

    const {text, politicianId, source, sourceType} = JSON.parse(event.body);

    const question={
        questionId: uuid(),
        text,
        politicianId,
        source,
        sourceType,
    };

    await dynamodb.put({
        TableName: process.env.QUESTIONS_TABLE_NAME,
        Item: question,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(question),
    };
  };
  export const handler = createQuestion;