import AWS from "aws-sdk";
import middy from "@middy/core";
import createError from "http-errors";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getQuestionsIds(event, context) {
  let questionsIds;

  var params = {
    TableName: process.env.QUESTIONS_TABLE_NAME,
    ProjectionExpression: "questionId",
  };

  try {
    const result = await dynamodb.scan(params).promise();
    questionsIds = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(questionsIds),
  };
}
export const handler = middy(getQuestionsIds)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
