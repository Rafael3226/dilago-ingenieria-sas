import type { APIRoute } from "astro";
import EmailService from "../../services/EmailService";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = await request.json();
      await EmailService.send(body);
      return ResponseFactory({});
    } catch (error) {
      return ResponseFactory({ status: 500, message: error });
    }
  }
};

function ResponseFactory({
  data = undefined,
  status = 200,
  message = undefined,
}) {
  return new Response(JSON.stringify({ data, status, message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
