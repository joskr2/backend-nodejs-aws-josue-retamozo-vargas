export const successResponse = (data: any) => ({
  statusCode: 200,
  body: JSON.stringify(data),
});

export const errorResponse = (message: string) => ({
  statusCode: 500,
  body: JSON.stringify({ message }),
});
