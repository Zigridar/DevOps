import React, {useContext, useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {ConstantsContext} from "../context/ConstantsContext"

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

const SignIn = () => {

    /** get global auth context **/
    const auth = useContext(AuthContext)

    /** get global constants **/
    const constants = useContext(ConstantsContext)

    /** snackbar message hook **/
    const { showSnackbar, MessageTypes } = useMessage()

    /** http utils **/
    const { loading, request } = useHttp()

    /** form state **/
    const [form, setForm] = useState({})

    /** change form handler **/
    const formChangeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    /** on click login button handler **/
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            if (validate()) {
                const res = await request(constants.API.auth.login, 'POST', form)
                auth.login(res.token, res.userId)
            }
            else
                await setForm(prevState => prevState)
        }
        catch (e) {
            showSnackbar(e.message, MessageTypes.ERROR)
        }
    }

    /** validate form before submit **/
    // eslint-disable-next-line
    const validateProp = (prop) => form[prop] && form[prop].length > 0 || form[prop] === undefined

    const validate = () => validateProp('login') && validateProp('password')

    const classes = useStyles()

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <form className={classes.form} onChange={formChangeHandler} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        error={!validateProp('login')}
                        fullWidth
                        id="login"
                        label="Логин"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        requied={true}
                        error={!validateProp('password')}
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default SignIn