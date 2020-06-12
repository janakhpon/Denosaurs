import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import PageListItem from '../ListItem'
import PageListForm from '../ListForm'
import { Dinosaur } from '../../Types'
import { DinoContext } from '../../Context'
import styles from './index.module.scss'


const PageList = () => {
    const [dinosaurlist] = useContext<any>(DinoContext)

    return (
        <Grid container spacing={4} className={styles.container}>
            <Grid item xs={12} className={styles.listform}>
                <PageListForm />
            </Grid>
            <Grid item xs={12} className={styles.listitem}>
                {
                    dinosaurlist&&dinosaurlist.data&&dinosaurlist.data.map((dino: Dinosaur, key: any) => {
                        return <PageListItem dino={dino} key={key} />
                    })
                }
            </Grid>
        </Grid>
    )
}


export default PageList