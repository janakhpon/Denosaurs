import React, { StatelessComponent, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as go from '../../Constants'
import { SerRep, ServerData, Dinosaur } from '../../Types'

import styles from './index.module.scss'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        background: 'transparent',
    },
    btn: {
        backgroundColor: '#bf1a2f',
        color: '#ffffff',
        margin: theme.spacing(2),
    },
    btn1: {
        backgroundColor: '#02c39a',
        color: '#ffffff',
        margin: theme.spacing(2),
    },
    Dialog: {
        background: '#46494C',
        color: '#ffffff',
    },
    Dialogcontent: {
        maxWidth: '100%',
        background: '#46494C',
        color: '#ffffff',
    },
    underline: {
        // normal style
        "&::before": {
            borderBottom: "1px solid #06D648"
        },
        // hover style
        "&:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #DFEF4C"
        },
        // focus style
        "&::after": {
            borderBottom: "3px solid red"
        },

        background: 'transparent',
        color: '#fff',
    },
    formLabel: {
        color: '#fff',
        '&.Mui-focused': {
            color: 'rgb(0, 124, 128)'
        }
    },
}));


export interface PageContextListItemProps {
    dino: SerRep
}

const PageListItem: StatelessComponent<any> = ({ dino }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState<String>(dino.name)
    const [description, setDescription] = useState<String>(dino.description)
    const [type, setType] = useState<String>(dino.type)
    const [environment, setEnvironment] = useState<String>(dino.environment)
    const [weight, setWeight] = useState<Number>(dino.weight)
    const [length, setLength] = useState<Number>(dino.length)

    const updateDinosaur = async (state: any) => {
        let url = `${go.URL_BY_ID}${dino.id}`
        try {
            let data = await axios.request<ServerData>({
                method: 'put',
                url,
                data: state
            })

            if (data) {
                const getData = async () => {
                    let data = await axios.request<Dinosaur[]>({
                        method: 'get',
                        url: go.MAIN_URL
                    })
                }

                try {
                    getData()
                } catch (err) { }
            }

        } catch (err) {

        }
    }

    const classes = useStyles();

    const updateDeno = async () => {
        const data = {
            name,
            description,
            weight,
            length,
            type,
            environment
        }
        await updateDinosaur(data)
        setOpen(false)
    }

    const handleopen = () => {
        setOpen(true)
    }

    const handleUpdateClose = () => {
        setOpen(false)
    }
    const deleteDinosaur = async () => {
        let url = `${go.URL_BY_ID}${dino.id}`
        try {
            await axios.request<ServerData>({
                method: 'delete',
                url: url
            })
        } catch (err) {

        }
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <h4>{dino.name}</h4>
                </Grid>
                <Grid item xs={4}>
                    <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
                        <Box p={1} width={1}>
                            <EditRoundedIcon className={styles.editbtn} onClick={handleopen} />
                        </Box>
                        <Box p={1} width={1}>
                            <DeleteRoundedIcon className={styles.delbtn} onClick={deleteDinosaur} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                keepMounted
                onClose={handleUpdateClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                PaperProps={{
                    classes: {
                        root: classes.Dialog
                    }
                }}
            >
                <DialogTitle id="alert-dialog-slide-title">Edit and Save your Data carefully!</DialogTitle>
                <DialogContent className={classes.Dialogcontent}>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="input-with-icon-grid" label="Name |" fullWidth
                                InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} className={styles.searchbox}
                                value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)} />

                            <TextField id="input-with-icon-grid" label="Description |" fullWidth
                                InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} className={styles.searchbox}
                                value={description}
                                name="description"
                                onChange={(e) => setDescription(e.target.value)} />

                            <TextField id="input-with-icon-grid" fullWidth
                                InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} className={styles.searchbox}
                                value={weight}
                                name="weight"
                                onChange={(e) => setWeight(+e.target.value)} />

                            <TextField id="input-with-icon-grid" fullWidth
                                InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} className={styles.searchbox}
                                value={length}
                                name="length"
                                onChange={(e) => setLength(+e.target.value)} />

                            <TextField id="input-with-icon-grid" label="Type |" fullWidth
                                InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} className={styles.searchbox}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />

                            <TextField id="input-with-icon-grid" label="Environment |" fullWidth
                                InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} className={styles.searchbox}
                                value={environment}
                                onChange={(e) => setEnvironment(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateDeno} color="primary" className={classes.btn}>
                        UPDATE
                            </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default PageListItem