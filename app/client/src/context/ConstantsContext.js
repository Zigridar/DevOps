import {createContext} from "react"


export const ConstantsContext = createContext({
    API: {
        auth: {
            login: '/api/auth/login',
            register: '/api/auth/register',
        },
        admin: {
            users: '/api/admin/users',
            deleteUser: '/api/admin/delete-user',
            editUser: '/api/admin/edit-user',
            register: '/api/admin/register'
        }
    }
})