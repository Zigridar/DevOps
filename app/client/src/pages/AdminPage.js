import MUIDataTable from "mui-datatables"
import React, {useContext, useState} from "react"
import {Grid} from "@material-ui/core"
import textLabels from "../components/muiTablaLocalization"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import UserCard from "../components/UserCard"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import {Add, Delete, Edit, Info} from "@material-ui/icons"
import ConfirmDialog from "../components/ConfirmDialog"
import {useMessage} from "../hooks/message.hook"
import {ConstantsContext} from "../context/ConstantsContext"


/** static column names and options **/
const columns = [
    {
        name: "lastName",
        label: "Фамилия"
    },
    {
        name: "name",
        label: "Имя"
    },
    {
        name: "middleName",
        label: "Отчество"
    }
]

/**
 * Admin page for user management
 *
 * */
const AdminPage = () => {

    /** table content (users) **/
    const [data, setData] = useState([])

    /** selected user **/
    const [current, setCurrent] = useState(null)

    /** edit mode flag **/
    const [isInEdit, setEdit] = useState(false)

    /** create mode flag **/
    const [isInCreate, setCreate] = useState(false)

    /** view mode flag **/
    const [isInView, setView] = useState(false)

    /** dialog state flag **/
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    /** http hook **/
    const { request, loading } = useHttp()

    /** message hook **/
    const { MessageTypes, showSnackbar } = useMessage()

    /** auth context **/
    const auth = useContext(AuthContext)

    /** get global constants **/
    const constants = useContext(ConstantsContext)

    /** http headers **/
    const headers = auth.headers()

    /** fetch data and refresh table **/
    const refreshTable = async () => {
        try {
            const requestData = await request(
                constants.API.admin.users,
                'GET',
                null,
                headers
            )
            setData(() => requestData.users)
        }
        catch (e) {
            showSnackbar(e.message, MessageTypes.ERROR)
        }
    }

    /** delete user **/
    const onDelete = () => {
        setOpenDeleteDialog(() => true)
    }

    /** confirm delete **/
    const onOkDelete = async () => {
        setOpenDeleteDialog(false)

        try {
            const res = await request(
                constants.API.admin.deleteUser,
                'POST',
                { userId: current.userId },
                headers
            )
            setData(data.filter(item => item !== current))
            showSnackbar(res.message, MessageTypes.INFO)
        }
        catch (e) {
            showSnackbar(e.message, MessageTypes.ERROR)
        }
    }

    /** cancel delete **/
    const onCancelDelete = () => {
        setOpenDeleteDialog(false)
    }

    const onEdit = async () => {
        setEdit(prev => !prev)
        setView(() => false)
        setCreate(() => false)
    }

    /** on create user **/
    const onCreate = async () => {
        setCurrent(() => null)
        setCreate(() => true)
        setView(() => false)
        setEdit(() => false)
    }

    /** on view user **/
    const onView = () => {
        setView(prev => !prev)
        setEdit(() => false)
        setCreate(() => false)
    }

    /** save user in edit mode **/
    const onEditSave = async user => {
        try {
            const res = await request(
                constants.API.admin.editUser,
                'POST',
                user,
                headers
            )
            await refreshTable()
            setCurrent(() => null)
            setEdit(() => false)
            setCreate(() => false)
            showSnackbar(res.message, MessageTypes.SUCCESS)
        }
        catch (e) {
            showSnackbar(e.message, MessageTypes.ERROR)
        }
    }

    /** save in create mode **/
    const onCreateSave = async user => {
        try {
            const res = await request(
                constants.API.admin.register,
                'POST',
                user,
                headers
            )
            await refreshTable()
            setCurrent(() => null)
            setCreate(() => false)
            showSnackbar(res.message, MessageTypes.SUCCESS)
        }
        catch (e) {
            showSnackbar(e.message, MessageTypes.ERROR)
        }
    }

    /** cancel create or edit **/
    const onCancel = () => {
        setCurrent(() => null)
        setEdit(() => false)
        setCreate(() => false)
    }

    /** table toolbar **/
    const Toolbar = () => {
        return (
            <React.Fragment>
                <Tooltip title={"Создать"}>
                    <IconButton disabled={isInCreate || isInView || isInEdit || loading} onClick={onCreate}>
                        <Add />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Просмотр"} >
                    <IconButton disabled={!current || isInEdit || isInCreate || loading} onClick={onView}>
                        <Info />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Редактировать"} onClick={onEdit}>
                    <IconButton disabled={!current || isInCreate || loading}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Удалить"}>
                    <IconButton disabled={!current || loading} onClick={onDelete}>
                        <Delete />
                    </IconButton>
                </Tooltip>
                {current &&
                <ConfirmDialog
                    isOpen={openDeleteDialog}
                    onOk={onOkDelete}
                    onCancel={onCancelDelete}
                    title={'Удаление учетной записи'}
                    textContent={`Удалить учетную запись пользователя ${current.lastName}`}
                />}
            </React.Fragment>
        )
    }

    /** table options **/
    const options = {
        print: false,
        download: false,
        filter: false,
        viewColumns: false,
        selectableRowsHideCheckboxes: true,
        selectableRowsHeader: false,
        rowsPerPage: 6,
        rowsPerPageOptions: [],
        /** can't select in create or edit mode **/
        rowsSelected: isInCreate || isInEdit ? [] : undefined,
        /** custom localization table **/
        textLabels: textLabels,
        selectableRows: isInCreate || isInEdit || isInView ? 'none' : 'single',
        selectableRowsOnClick: true,
        selectToolbarPlacement: 'none',
        onRowSelectionChange (currentRowsSelected, allRowsSelected) {
            /** When selectableRows is set to 'single' allRowsSelected length will be 0 or 1 **/
            allRowsSelected.forEach(({ dataIndex }) => {
                setCurrent(() => data[dataIndex])
            })

            if (allRowsSelected.length === 0) {
                setCurrent(() => null)
            }
        },
        async onTableInit (action, tableState) {
            //todo lazy method (useEffect)
            await refreshTable()
        },
        customToolbar () {
            return <Toolbar/>
        }
    }

    return(
        <Grid container spacing={3}>
            <Grid item md={7}>
                <MUIDataTable
                     title={"Пользователи"}
                     data={data}
                     columns={columns}
                     options={options}
                 />
            </Grid>
            {/*eslint-disable-next-line*/}
            <Grid item md={5} hidden={!(current && (isInView || isInEdit) || isInCreate)}>
                <UserCard
                    user={current}
                    onEditSave={onEditSave}
                    onCreateSave={onCreateSave}
                    onCancel={onCancel}
                    isInEdit={isInEdit}
                    isInView={isInView}
                    isInCreate={isInCreate}
                    loading={loading}
                />
            </Grid>
        </Grid>
    )
}

export default AdminPage