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
];
