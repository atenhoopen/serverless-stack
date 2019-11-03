import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-libs";
import { success, failure } from "./libs/response-libs";

export async function main(event, context) {
 const data = JSON.parse(event.body);
 const params = {
    TableName: process.env.tableName,
    Item: {
        id: uuid.v1(),
        content: data.content,
        createdAt: Date.now()
    }
 };
 try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
 } catch (e) {
    return failure({ status: false });
 }
}