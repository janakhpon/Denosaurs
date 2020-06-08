import { Router } from "https://deno.land/x/oak/mod.ts"
import { getDinosaurs, addDinosaur } from "../controllers/index.ts"
import { URL } from '../utils/index.ts'

const router = new Router()
router.get(URL, getDinosaurs)
    .post(URL, addDinosaur)

export default router

