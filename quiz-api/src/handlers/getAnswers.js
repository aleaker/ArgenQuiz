async function getAnswers(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "hi there!" }), //resp body must be a string
  };
};

export const handler = getAnswers;


