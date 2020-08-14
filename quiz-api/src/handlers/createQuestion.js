import AWS from "aws-sdk";
import middy from "@middy/core";
import { v4 as uuid } from "uuid";
import createError from "http-errors";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createQuestion(event, context) {
  const { text, politicianId, fakesArray, source, sourceType } = event.body; //no need to parse it because of httpJsonBodyParser

  const question = {
    questionId: uuid(),
    text,
    politicianId,
    fakesArray,
    source,
    sourceType,
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.QUESTIONS_TABLE_NAME,
        Item: question,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(question),
  };
}
export const handler = middy(createQuestion)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
