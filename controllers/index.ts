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

const fetchDinosaur = async ({ params, response }: { params: { id: string }, response:any }) => {
    try{
        await client.connect()

        const result = await client.query("SELECT * FROM dinosaurs WHERE id = $1", params.id)
        if (result.rows.toString() === ""){
            response.status = 404
            response.body = {
                success: false,
                msg: `Can't find dinosaur with provided ID ${params.id}`
            }
            return;
        }else {
            const dino: any = new Object()
            result.rows.map(p => {
                result.rowDescription.columns.map((el:any, i:any) => {
                    dino[el.name] = p[i]
                })
            })

            response.body = {
                success: true,
                data: dino
            }
        }
    }catch(err) {
        response.status = 500
        response.body = {
            success: false,
            msg: err.toString()
        }
    }finally {
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


const updateDinosaur = async ({ params, request, response }: {params: { id: string }, request: any, response: any }) => {

    await fetchDinosaur({ params: {"id": params.id }, response})

    if (response.status === 404){
        response.body = {
            success: false,
            msg: response.body.msg
        }

        response.status = 404
        return
   }else {
       const body = await request.body()
       const dino = body.value

       if (!request.body){
           response.status = 400
           response.body = {
               success: false,
               msg: 'No data'
           }
       }else{
           try{
               await client.connect()

               const result = await client.query("UPDATE dinosaurs SET name=$1, description=$2, weight=$3, length=$4, type=$5, environment=$5",
               dino.name,
               dino.description,
               dino.weight,
               dino.length,
               dino.type,
               dino.environment
               )

               response.status = 200
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
           } finally{
               await client.end()
           }
       }
   }


}

export { getDinosaurs, addDinosaur, fetchDinosaur, updateDinosaur }