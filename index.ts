import { Application } from 'https://deno.land/x/oak/mod.ts'
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from './routes/index.ts'
import { PORT_URL } from './utils/index.ts'

const port = Deno.env.get("PORT") || 5500
const app = new Application()

app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes())
// app.use(router.allowedMethods())

console.log(`${PORT_URL} ${port}`)
await app.listen({ port: +port })