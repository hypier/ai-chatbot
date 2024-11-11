
import { getChatsByUserId } from "@/db/queries";
import { userId } from "@/service/user";

export async function GET() {
  const sessionId = await userId();

  if (!sessionId) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  const chats = await getChatsByUserId({ id: sessionId });
  return Response.json(chats);
}
