import { Client } from "https://deno.land/x/postgres/mod.ts"
import { Dinosaur } from '../interfaces/index.ts'
import { DBCreds } from '../config/index.ts'


const client = new Client(DBCreds)


const getDinosaurs = async ({ response }: { response: any }) => {
    try {
        await client.connect()

        const result = await client.query("SELECT * FROM dinosaurs")

        const products = new Array()

        result.rows.map(p => {
            let obj: any = new Object()

            result.rowDescription.columns.map((el, i) => {
                obj[el.name] = p[i]
            })

            products.push(obj)
        })

        response.body = {
            success: true,
            data: products
        }
    } catch (err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    } finally {
        await client.end()
    }
}

const addDinosaur = async ({ request, response }: { request: any, response: any }) => {    
    const body = await request.body()
    const dino = body.value 

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        try {
            await client.connect()

            await client.query("INSERT INTO dinosaurs(name,description,weight,length,type,environment) VALUES($1,$2,$3,$4,$5,$6)", 
            dino.name, 
            dino.description, 
            dino.weight,
            dino.length,
            dino.type,
            dino.environment)

            response.status = 201
            response.body = {
                success: true,
                data: dino
            }
        } catch (err) {
            response.status = 500
            response.body = {
                success: false,
                msg: err.toString()
            }
        } finally {
            await client.end()
        }
    }
}

export { getDinosaurs, addDinosaur }