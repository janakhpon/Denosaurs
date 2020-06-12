import React from 'react'
import Grid from '@material-ui/core/Grid'

import styles from './index.module.scss'
function Page404() {
    return (
        <Grid container spacing={1} className={styles.container}>
            <Grid item xs={12}>
                <h3> Oops! Sorry 404 is Here for a reason! </h3>
            </Grid>
        </Grid>
    )
}

export default Page404