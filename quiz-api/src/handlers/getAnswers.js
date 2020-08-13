async function getAnswers(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hi there!" }),
  };
}

export const handler = getAnswers;


