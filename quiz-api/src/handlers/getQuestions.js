import AWS from "aws-sdk";
import middy from "@middy/core";
import createError from "http-errors";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getQuestions(event, context) {
  let questions;

  // const { questionIdArr } = event.queryStringParameters;

  const TABLE_NAME = process.env.QUESTIONS_TABLE_NAME;

  const params = {
    RequestItems: {
      [TABLE_NAME]: {
        Keys: [{ questionId: "0a5ac4cd-6367-4658-bb16-a2e5a550840d" }],
      },
    },
  };

  try {
    const result = await dynamodb.batchGet(params).promise();

    questions = result;//.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(questions),
  };
}
export const handler = middy(getQuestions)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
