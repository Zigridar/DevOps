import {useSnackbar} from "notistack"

/** Snackbar message types **/
const MessageTypes = {
    ERROR: 'error',
    DEFAULT: 'default',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success'
}

/** Set non-modified **/
Object.freeze(MessageTypes)

/**
 * Message hook
 * returns an enum of snackbar types and showMessage function
 *
 * */
export const useMessage = () => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const showSnackbar = (message, type = MessageTypes.DEFAULT) => {
        const snackBar = enqueueSnackbar(message, {
            variant: type,
            onClick: () => closeSnackbar(snackBar)
        })
    }

    return { showSnackbar, MessageTypes }
}