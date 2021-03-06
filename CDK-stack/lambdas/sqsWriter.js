"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require("aws-sdk");
AWS.config.update({
    region: process.env.AWS_REGION,
});
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 10,
    MessageAttributes: {
        "Title": {
            DataType: "String",
            StringValue: "The Whistler",
        },
        "Author": {
            DataType: "String",
            StringValue: "John Grisham"
        },
        "WeeksOn": {
            DataType: "Number",
            StringValue: "6"
        }
    },
    MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
    // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
    // MessageGroupId: "Group1",  // Required for FIFO queues
    QueueUrl: process.env.QUEUE_URL
};
exports.handler = async (event, context) => {
    const data = await new Promise((resolve, reject) => {
        sqs.sendMessage(params, (error, data) => {
            resolve({ error, data });
        });
    });
    console.log("QUEUE_URL ===>", process.env.QUEUE_URL);
    console.log("Event===>", JSON.stringify(data, null, 2));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v2.0! Your function executed successfully! and updated',
            input: event,
        }, null, 2),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FzV3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3FzV3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUErQjtBQUcvQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVO0NBQy9CLENBQUMsQ0FBQTtBQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBRXRELE1BQU0sTUFBTSxHQUErQjtJQUN6QywwREFBMEQ7SUFDMUQsWUFBWSxFQUFFLEVBQUU7SUFDaEIsaUJBQWlCLEVBQUU7UUFDakIsT0FBTyxFQUFFO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLGNBQWM7U0FDNUI7UUFDRCxRQUFRLEVBQUU7WUFDUixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsY0FBYztTQUM1QjtRQUNELFNBQVMsRUFBRTtZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxHQUFHO1NBQ2pCO0tBQ0Y7SUFDRCxXQUFXLEVBQUUsK0VBQStFO0lBQzVGLHNFQUFzRTtJQUN0RSx5REFBeUQ7SUFDekQsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBVTtDQUNqQyxDQUFDO0FBRVcsUUFBQSxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUM5QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksT0FBTyxDQUFrQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNsRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN0QyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhELE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25CLE9BQU8sRUFBRSxzRUFBc0U7WUFDL0UsS0FBSyxFQUFFLEtBQUs7U0FDYixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDWixDQUFDO0FBRUosQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgQVdTIGZyb20gJ2F3cy1zZGsnO1xyXG5cclxuXHJcbkFXUy5jb25maWcudXBkYXRlKHtcclxuICByZWdpb246IHByb2Nlc3MuZW52LkFXU19SRUdJT04sXHJcbn0pXHJcblxyXG5jb25zdCBzcXMgPSBuZXcgQVdTLlNRUyh7IGFwaVZlcnNpb246ICcyMDEyLTExLTA1JyB9KTtcclxuXHJcbmNvbnN0IHBhcmFtczogQVdTLlNRUy5TZW5kTWVzc2FnZVJlcXVlc3QgPSB7XHJcbiAgLy8gUmVtb3ZlIERlbGF5U2Vjb25kcyBwYXJhbWV0ZXIgYW5kIHZhbHVlIGZvciBGSUZPIHF1ZXVlc1xyXG4gIERlbGF5U2Vjb25kczogMTAsXHJcbiAgTWVzc2FnZUF0dHJpYnV0ZXM6IHtcclxuICAgIFwiVGl0bGVcIjoge1xyXG4gICAgICBEYXRhVHlwZTogXCJTdHJpbmdcIixcclxuICAgICAgU3RyaW5nVmFsdWU6IFwiVGhlIFdoaXN0bGVyXCIsXHJcbiAgICB9LFxyXG4gICAgXCJBdXRob3JcIjoge1xyXG4gICAgICBEYXRhVHlwZTogXCJTdHJpbmdcIixcclxuICAgICAgU3RyaW5nVmFsdWU6IFwiSm9obiBHcmlzaGFtXCJcclxuICAgIH0sXHJcbiAgICBcIldlZWtzT25cIjoge1xyXG4gICAgICBEYXRhVHlwZTogXCJOdW1iZXJcIixcclxuICAgICAgU3RyaW5nVmFsdWU6IFwiNlwiXHJcbiAgICB9XHJcbiAgfSxcclxuICBNZXNzYWdlQm9keTogXCJJbmZvcm1hdGlvbiBhYm91dCBjdXJyZW50IE5ZIFRpbWVzIGZpY3Rpb24gYmVzdHNlbGxlciBmb3Igd2VlayBvZiAxMi8xMS8yMDE2LlwiLFxyXG4gIC8vIE1lc3NhZ2VEZWR1cGxpY2F0aW9uSWQ6IFwiVGhlV2hpc3RsZXJcIiwgIC8vIFJlcXVpcmVkIGZvciBGSUZPIHF1ZXVlc1xyXG4gIC8vIE1lc3NhZ2VHcm91cElkOiBcIkdyb3VwMVwiLCAgLy8gUmVxdWlyZWQgZm9yIEZJRk8gcXVldWVzXHJcbiAgUXVldWVVcmw6IHByb2Nlc3MuZW52LlFVRVVFX1VSTCFcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50LCBjb250ZXh0KSA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IG5ldyBQcm9taXNlPHsgZXJyb3IsIGRhdGEgfT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgc3FzLnNlbmRNZXNzYWdlKHBhcmFtcywgKGVycm9yLCBkYXRhKSA9PiB7XHJcbiAgICAgIHJlc29sdmUoeyBlcnJvciwgZGF0YSB9KTtcclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIGNvbnNvbGUubG9nKFwiUVVFVUVfVVJMID09PT5cIiwgcHJvY2Vzcy5lbnYuUVVFVUVfVVJMKTtcclxuICBjb25zb2xlLmxvZyhcIkV2ZW50PT09PlwiLCBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIG1lc3NhZ2U6ICdHbyBTZXJ2ZXJsZXNzIHYyLjAhIFlvdXIgZnVuY3Rpb24gZXhlY3V0ZWQgc3VjY2Vzc2Z1bGx5ISBhbmQgdXBkYXRlZCcsXHJcbiAgICAgIGlucHV0OiBldmVudCxcclxuICAgIH0sIG51bGwsIDIpLFxyXG4gIH07XHJcblxyXG59O1xyXG4iXX0=