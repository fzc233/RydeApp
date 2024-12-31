import { neon } from "@neondatabase/serverless";
import Const from "ajv/lib/vocabularies/validation/const";

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`select * from drivers`;
    return Response.json({ data: response });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
