export type TJoiError = {
  status: number;
  statusCode: string;
};

export type TSchemaBody<T> = {
  [key: string]: T;
};
