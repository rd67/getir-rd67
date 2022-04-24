export default {
  "/records": {
    post: {
      tags: ["Records List"],
      summary: "Records List Api",
      produces: ["application/json"],
      security: [
        // {
        //   auth_token: [],
        // },
      ],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              properties: {
                startDate: {
                  type: "string",
                  format: "date",
                  description: "YYYY-MM-DD format",
                },
                endDate: {
                  type: "string",
                  format: "date",
                  description: "YYYY-MM-DD format",
                },
                minCount: {
                  type: "integer",
                  default: 0,
                },
                maxCount: {
                  type: "integer",
                  default: 100,
                },
              },
              required: ["startDate", "endDate", "minCount", "maxCount"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success.",
        },
        400: {
          description: "Validation Failed.",
        },
      },
    },
  },
};
