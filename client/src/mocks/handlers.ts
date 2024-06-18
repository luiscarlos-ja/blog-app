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
          name: "Post by luis carlos",
          content: "Content of the post by luis carlos",
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
          name: "New post test",
          content: "Content of the post",
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
          name: "Post edited",
          content: "Post edited",
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

  http.post(
    `${GLOBAL.API_URL}/users/59cbfb5a-9891-4e8f-8180-5c9ca54be101/post`,
    async () => {
      return HttpResponse.json({
        uuid: "87dada25-3273-4964-b29b-dc5ec4b4154c",
        name: "New post in the test",
        content: "Content of the post in the test",
        createdAt: "2024-06-18T02:31:54.346Z",
        updatedAt: "2024-06-18T02:32:11.622Z",
        user: {
          uuid: "559cbfb5a-9891-4e8f-8180-5c9ca54be101",
          username: "luiscarlos",
          createdAt: "2024-06-18T02:12:55.229Z",
          updatedAt: "2024-06-18T02:12:55.229Z",
        },
      });
    }
  ),

  http.patch(
    `${GLOBAL.API_URL}/users/59cbfb5a-9891-4e8f-8180-5c9ca54be101/post/87dada25-3273-4964-b29b-dc5ec4b4154b`,
    async () => {
      return HttpResponse.json([
        {
          uuid: "87dada25-3273-4964-b29b-dc5ec4b4154b",
          name: "Post edited in the test",
          content: "Post content edited in the test",
          createdAt: "2024-06-16T11:15:55.376Z",
          updatedAt: "2024-06-17T01:33:16.791Z",
        },
      ]);
    }
  ),

  http.delete(
    `${GLOBAL.API_URL}/users/59cbfb5a-9891-4e8f-8180-5c9ca54be101/post/87dada25-3273-4964-b29b-dc5ec4b4154b`,
    async () => {
      return HttpResponse.json({});
    }
  ),

  http.get(
    `${GLOBAL.API_URL}/posts/6612c79e-fc9a-4688-8135-75d99624fc35/comment`,
    async () => {
      return HttpResponse.json({
        data: [
          {
            uuid: "5e349d9d-ad3f-41d8-9c5c-10f1bb735f5f",
            content: "Comment by luis carlos",
            createdAt: "2024-06-18T02:16:36.553Z",
            updatedAt: "2024-06-18T02:16:49.396Z",
            user: {
              uuid: "59cbfb5a-9891-4e8f-8180-5c9ca54be101",
              username: "luiscarlos",
              createdAt: "2024-06-18T02:12:55.229Z",
              updatedAt: "2024-06-18T02:12:55.229Z",
            },
            post: {
              uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
              name: "New post test",
              content: "Content of the post",
              createdAt: "2024-06-18T01:34:50.703Z",
              updatedAt: "2024-06-18T01:34:50.703Z",
            },
          },
          {
            uuid: "57f22901-6302-41f0-817a-223ddb5b71d4",
            content: "Third comment",
            createdAt: "2024-06-18T02:07:28.985Z",
            updatedAt: "2024-06-18T02:07:28.985Z",
            user: {
              uuid: "94b660e2-e0f7-4419-8eee-3033ba6010c1",
              username: "luca",
              createdAt: "2024-06-16T05:20:12.753Z",
              updatedAt: "2024-06-16T05:20:12.753Z",
            },
            post: {
              uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
              name: "New post test",
              content: "Content of the post",
              createdAt: "2024-06-18T01:34:50.703Z",
              updatedAt: "2024-06-18T01:34:50.703Z",
            },
          },
          {
            uuid: "94289b86-fcbd-4f68-87e3-dc1fb4e9a916",
            content: "Second comment",
            createdAt: "2024-06-18T02:07:06.181Z",
            updatedAt: "2024-06-18T02:07:06.181Z",
            user: {
              uuid: "94b660e2-e0f7-4419-8eee-3033ba6010c1",
              username: "luca",
              createdAt: "2024-06-16T05:20:12.753Z",
              updatedAt: "2024-06-16T05:20:12.753Z",
            },
            post: {
              uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
              name: "New post test",
              content: "Content of the post",
              createdAt: "2024-06-18T01:34:50.703Z",
              updatedAt: "2024-06-18T01:34:50.703Z",
            },
          },
          {
            uuid: "17363948-152e-468e-b58c-a4a6d699e6e6",
            content: "First comment",
            createdAt: "2024-06-18T02:05:01.284Z",
            updatedAt: "2024-06-18T02:05:01.284Z",
            user: {
              uuid: "94b660e2-e0f7-4419-8eee-3033ba6010c1",
              username: "luca",
              createdAt: "2024-06-16T05:20:12.753Z",
              updatedAt: "2024-06-16T05:20:12.753Z",
            },
            post: {
              uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
              name: "New post test",
              content: "Content of the post",
              createdAt: "2024-06-18T01:34:50.703Z",
              updatedAt: "2024-06-18T01:34:50.703Z",
            },
          },
        ],
        meta: {
          totalRecords: 4,
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          sortBy: "createdAt DESC",
          filterBy: "",
        },
        links: {
          first:
            "https://localhost:8000/api/v1/posts/6612c79e-fc9a-4688-8135-75d99624fc35/comments?page=1&limit=10&sortField=createdAt&sortOrder=DESC&filterBy=",
          last: "https://localhost:8000/api/v1/posts/6612c79e-fc9a-4688-8135-75d99624fc35/comments?page=1&limit=10&sortField=createdAt&sortOrder=DESC&filterBy=",
          next: null,
          prev: null,
        },
      });
    }
  ),

  http.post(
    `${GLOBAL.API_URL}/posts/6612c79e-fc9a-4688-8135-75d99624fc35/comment`,
    async () => {
      return HttpResponse.json({
        uuid: "5e349d9d-ad3f-41d8-9c5c-10f1bb735f5g",
        content: "Comment by luis carlos two",
        createdAt: "2024-06-18T02:16:36.553Z",
        updatedAt: "2024-06-18T02:16:49.396Z",
        user: {
          uuid: "59cbfb5a-9891-4e8f-8180-5c9ca54be101",
          username: "luiscarlos",
          createdAt: "2024-06-18T02:12:55.229Z",
          updatedAt: "2024-06-18T02:12:55.229Z",
        },
        post: {
          uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
          name: "New post test",
          content: "Content of the post",
          createdAt: "2024-06-18T01:34:50.703Z",
          updatedAt: "2024-06-18T01:34:50.703Z",
        },
      });
    }
  ),

  http.patch(
    `${GLOBAL.API_URL}/posts/6612c79e-fc9a-4688-8135-75d99624fc35/comment/5e349d9d-ad3f-41d8-9c5c-10f1bb735f5f`,
    async () => {
      return HttpResponse.json([
        {
          uuid: "5e349d9d-ad3f-41d8-9c5c-10f1bb735f5f",
          content: "Comment by luis carlos edited",
          createdAt: "2024-06-18T02:16:36.553Z",
          updatedAt: "2024-06-18T02:16:49.396Z",
          user: {
            uuid: "59cbfb5a-9891-4e8f-8180-5c9ca54be101",
            username: "luiscarlos",
            createdAt: "2024-06-18T02:12:55.229Z",
            updatedAt: "2024-06-18T02:12:55.229Z",
          },
          post: {
            uuid: "6612c79e-fc9a-4688-8135-75d99624fc35",
            name: "New post test",
            content: "Content of the post",
            createdAt: "2024-06-18T01:34:50.703Z",
            updatedAt: "2024-06-18T01:34:50.703Z",
          },
        },
      ]);
    }
  ),

  http.delete(
    `${GLOBAL.API_URL}/posts/6612c79e-fc9a-4688-8135-75d99624fc35/comment/5e349d9d-ad3f-41d8-9c5c-10f1bb735f5f`,
    async () => {
      return HttpResponse.json({});
    }
  ),
];
