'use strict'
const { Router } = require('express')
const { check, validationResult} = require('express-validator')
const router = Router()

/** Login "POST" request **/
router.post(
    '/login',
    [
        /** login validator **/
        check('login', 'incorrect login').exists().notEmpty(),
        /** password validator **/
        check('password', 'incorrect password').exists().notEmpty()
        //TODO add frontend form validation
    ],
    async (req, res) => {
        try {

            /** validate results **/
            const errors = validationResult(req)

            /** extract "email" and "password" data from request body **/
            const { login, password } = req.body

            /** if it is empty continue login **/ //todo test
            if (!errors.isEmpty() || login !== 'admin' || password !== 'admin') {
                return res.status(400).json( {
                    errors: errors.array(),
                    message: 'incorrect login data'
                } )
            }

            /** send token and user id **/
            await res.json({ token: 'test_token', userId: 1, message: 'Successfully login' })

        }
        catch (e) {
            /** write server error to server-err.log **/
            console.error(e)
            /** send error code **/
            res.status(500).json({ message: 'Something failed' })
        }
})


module.exports = router