import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import * as routes from '../../Constants'
import Navbar from '../Navbar'
import PageList from '../List'
import Page404 from '../404'
import styles from './index.module.scss'

function Header() {
    let location = useLocation()
    return (
        <div className={styles.layout}>
            {
                location.pathname !== `${routes.PAGE_404}` && <Navbar />
            }
            <Grid container spacing={2} className={styles.container}>
                <Grid item xs={12}>
                    <Container fixed>
                    <Switch>
                        <Route exact path={routes.PAGE_LIST} component={() => <PageList />} />
                        <Route exact path={routes.PAGE_404} component={() => <Page404 />} />
                    </Switch>
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header