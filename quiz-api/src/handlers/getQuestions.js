import AWS from "aws-sdk";
import middy from "@middy/core";
import createError from "http-errors";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpEventNormalizer from "@middy/http-event-normalizer";
import { generateParamsArr } from "../../helpers/generateParamsArr";
import { generateRandomNums } from "../../helpers/generateRandomNums";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getQuestions(event, context) {
  const { amount } = event.queryStringParameters; //how many questions are needed
  let indexesArr;
  let questionsIds;
  let questions;

  let params = {
    TableName: process.env.QUESTIONS_TABLE_NAME,
    ProjectionExpression: "questionId",
  };
  try {
    const scanResult = await dynamodb.scan(params).promise();
    questionsIds = scanResult.Items;
    indexesArr = generateRandomNums(questionsIds.length, amount); //generates an array of random indexes to get the amount of questions needed

    const keys = generateParamsArr(questionsIds, indexesArr); //.split(","));

    params = {
      RequestItems: {
        [process.env.QUESTIONS_TABLE_NAME]: {
          Keys: keys,
        },
      },
    };
    const result = await dynamodb.batchGet(params).promise();

    questions = result.Responses; //.["QuestionsTable-dev"]
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError({Msg:error});
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: JSON.stringify(questions[process.env.QUESTIONS_TABLE_NAME]),
  };
  return response;
}
export const handler = middy(getQuestions)
  .use(httpJsonBodyParser())
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
