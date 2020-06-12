import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Dinosaur } from '../Types'
import * as URL from '../Constants'

const dinosaur = {
    id: 0,
    name: "haha",
    description: "haha",
    weight: 100,
    length: 100,
    type: "haha",
    environment: "hhaha"
}

const dinosaurs = [dinosaur]

export const DinoContext = createContext({
})

export const DinoProvider = (props: any) => {
    const [dinosaurlist, setDinosaurlist] = useState<Dinosaur[]>([])

    useEffect(() => {

        const getData = async () => {
            let data = await axios.request<Dinosaur[]>({
                method: 'get',
                url: URL.MAIN_URL,
                headers: { 'Content-Type': 'application/json' },
            })
            setDinosaurlist(data.data)
        }

        try {
            getData()
        } catch (err) { }

    }, [dinosaurlist])


    return (
        <DinoContext.Provider value={[dinosaurlist, setDinosaurlist]}>
            {props.children}
        </DinoContext.Provider>
    )
}