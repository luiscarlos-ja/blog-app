import { http, HttpResponse } from "msw";
import { GLOBAL } from "../consts";

export const handlers = [
  http.post(`${GLOBAL.API_URL}/auth/signin`, async () => {
    return HttpResponse.json({
      uuid: "59cbfb5a-9891-4e8f-8180-5c9ca54be101",
      username: "luiscarlos",
      createdAt: "2024-06-18T02:12:55.229Z",
      updatedAt: "2024-06-18T02:12:55.229Z",
    });
  }),
  http.post(`${GLOBAL.API_URL}/auth/signup`, async () => {
    return HttpResponse.json([
      {
        uuid: "cf6cb989-fca3-4245-a50c-2491e9c368b1",
        username: "lucapix",
        createdAt: "2024-06-18T04:24:00.469Z",
        updatedAt: "2024-06-18T04:24:00.469Z",
      },
    ]);
  }),

  http.post(`${GLOBAL.API_URL}/auth/signout`, async () => {
    return HttpResponse.json({});
  }),

  http.get(`${GLOBAL.API_URL}/posts`, async () => {
    return HttpResponse.json({
      data: [
        {
          uuid: "87dada25-3273-4964-b29b-dc5ec4b4154b",
          name: "Post de luis carlos",
          content: "Jajaja",
          createdAt: "2024-06-18T02:31:54.346Z",
          updatedAt: "2024-06-18T02:32:11.622Z",
          user: {
            uuid: "59cbfb5a-9891-4e8f-8180-5c9ca54be101",
            username: "luiscarlos",
            createdAt: "2024-06-18T02:12:55.229Z",
            updatedAt: "2024-06-18T02:12:55.229Z",
          },
        },
        {
          uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
          name: "New post",
          content: "Hahah jejej jijii",
          createdAt: "2024-06-18T01:34:50.703Z",
          updatedAt: "2024-06-18T01:34:50.703Z",
          user: {
            uuid: "94b660e2-e0f7-4419-8eee-3033ba6010c1",
            username: "luca",
            createdAt: "2024-06-16T05:20:12.753Z",
            updatedAt: "2024-06-16T05:20:12.753Z",
          },
        },
        {
          uuid: "030542d9-307c-49b2-bdaa-7a94e0f6e88e",
          name: "Wera edit",
          content: "Post editado",
          createdAt: "2024-06-16T11:15:55.376Z",
          updatedAt: "2024-06-17T01:33:16.791Z",
          user: {
            uuid: "94b660e2-e0f7-4419-8eee-3033ba6010c1",
            username: "luca",
            createdAt: "2024-06-16T05:20:12.753Z",
            updatedAt: "2024-06-16T05:20:12.753Z",
          },
        },
      ],
      meta: {
        totalRecords: 3,
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        sortBy: "createdAt DESC",
        filterBy: "",
      },
      links: {
        first:
          "https://localhost:8000/api/v1/posts?page=1&limit=10&sortField=createdAt&sortOrder=DESC&filterBy=",
        last: "https://localhost:8000/api/v1/posts?page=1&limit=10&sortField=createdAt&sortOrder=DESC&filterBy=",
        next: null,
        prev: null,
      },
    });
  }),
];
