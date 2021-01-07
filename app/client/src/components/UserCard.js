import React, {useState, useEffect} from "react"
import Card from "@material-ui/core/Card"
import FullWidthTabs from "./FullWidthTabs"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import {makeStyles} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import CardActions from "@material-ui/core/CardActions"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '50vh'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const UserCard = (props) => {

    const { user, isInEdit, isInView, isInCreate, onEditSave, onCreateSave, onCancel, loading } = props

    /** styles for user card **/
    const classes = useStyles()

    /** form state **/
    const [form, setForm] = useState({})

    /** auto update user card when mode is changed **/
    useEffect(() => {
        setForm(user || {})
    }, [isInEdit, isInView, isInCreate, user])

    /** form change handler **/
    const formChangeHandler = event => {
        setForm({
            ...user,
            ...form,
            [event.target.name]: (event.target.type === 'checkbox' ? event.target.checked : event.target.value)
        })
    }

    /** render password fields flag **/
    const showPassField = isInEdit || isInView ? 'none' : 'block'

    /** render action buttons flag (save, cancel) **/
    const showActionButtons = isInView ? 'none' : 'block'

    /** property getter from current form **/
    const propertyByName = (propName) => form[propName]

    /** form validator **/
    // eslint-disable-next-line
    const validateForm = async () => {
        //todo
    }

    /** tabs for FullWidthTabs **/
    const tabs = [
        {
            label: "Основная информация",
            content: <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <form className={classes.form} onChange={formChangeHandler} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    error={false}
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Имя"
                                    autoFocus
                                    value={propertyByName('name')}
                                    InputProps={{
                                        readOnly: isInView
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Фамилия"
                                    name="lastName"
                                    value={propertyByName('lastName')}
                                    InputProps={{
                                        readOnly: isInView
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="middleName"
                                    label="Отчество"
                                    name="middleName"
                                    value={propertyByName('middleName')}
                                    InputProps={{
                                        readOnly: isInView
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Логин"
                                    name="login"
                                    value={propertyByName('login')}
                                    InputProps={{
                                        readOnly: isInView
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={propertyByName('email')}
                                    InputProps={{
                                        readOnly: isInView
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Телефон"
                                    name="phoneNumber"
                                    value={propertyByName('phoneNumber')}
                                    InputProps={{
                                        readOnly: isInView
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    style={{display: showPassField}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="re-password"
                                    label="Подтвердите пароль"
                                    type="password"
                                    id="re-password"
                                    autoComplete="current-password"
                                    style={{display: showPassField}}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        },
        {
            label: "Права доступа",
            content: <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <form className={classes.form} onChange={formChangeHandler} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={propertyByName('loginAccess')}
                                            name="loginAccess"
                                            color="primary"
                                            disabled={isInView}
                                        />
                                    }
                                    label="Вход в приложение"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={propertyByName('testAccess')}
                                            name="testAccess"
                                            color="primary"
                                            disabled={isInView}
                                        />
                                    }
                                    label="Упрваление тестами"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={propertyByName('resultAccess')}
                                            name="resultAccess"
                                            color="primary"
                                            disabled={isInView}
                                        />
                                    }
                                    label="Результаты тестов"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={propertyByName('analyticAccess')}
                                            name="analyticAccess"
                                            color="primary"
                                            disabled={isInView}
                                        />
                                    }
                                    label="Аналитика"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={propertyByName('adminAccess')}
                                            name="adminAccess"
                                            color="primary"
                                            disabled={isInView}
                                        />
                                    }
                                    label="Управление"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        }
    ]

    return (
        <Card>
            <FullWidthTabs tabs={tabs} />
            <CardActions style={{display: showActionButtons}}>
                <Button
                    size="medium"
                    color="primary"
                    onClick={() => (isInEdit ? onEditSave(form) : onCreateSave(form))}
                    disabled={loading}
                >
                    Сохранить
                </Button>
                <Button
                    size="medium"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Отмена
                </Button>
            </CardActions>
        </Card>
    )
}

export default UserCard