import { Router } from "https://deno.land/x/oak/mod.ts"
import { getDinosaurs, addDinosaur, fetchDinosaur, updateDinosaur, deleteDinosaur } from "../controllers/index.ts"
import { URL, URL_BY_ID } from '../utils/index.ts'

const router = new Router()
router.get(URL, getDinosaurs)
    .get(URL_BY_ID, fetchDinosaur)
    .post(URL, addDinosaur)
    .put(URL_BY_ID, updateDinosaur)
    .delete(URL_BY_ID, deleteDinosaur)

export default router

