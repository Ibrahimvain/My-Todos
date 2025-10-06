// index.js
// ... (import Hono, serve, dll)

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import "dotenv/config";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import bcrypt from "bcryptjs";

const app = new Hono();

// API Registrasi
app.post("/api/register", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
      .insert(users)
      .values({ username, password: hashedPassword })
      .returning({ id: users.id, username: users.username });

    return c.json({ success: true, data: newUser[0] }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ success: false, message: "Registrasi gagal" }, 400);
  }
});

app.get("/", (c) => {
  return c.html("<h1>Tim Pengembang</h1><h2>Ibrahim</h2>");
});

// Jalankan Server
const port = 5000;
console.log(`Server is running on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
