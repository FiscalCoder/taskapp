const express = require('express') 
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelEmail} = require('../emails/account') //es6 destructuring 

//users endpoints for CRUD

router.post('/users', async (req, res) =>
{
    const user = new User(req.body)

    try
    {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken() //generate token2
        res.status(201).send({ user,token })
    } 
    catch (e)
    {
        res.status(400).send(e)
    }
    
})

 
router.post('/users/login', async (req, res) =>
{
    try
    {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken() //user for single user and not the USer dataabse
        res.send({ user, token })
    }
    catch(e)
    {
        res.status(400).send()
    }
})


router.post('/users/logout', auth, async (req, res) =>
{
    try 
    {
        req.user.tokens = req.user.tokens.filter((token) =>
        {
           
            
            //tokens got filtered and transferred as a parameter 
            // token.token represent (tokens.token) as tokens object trasferred from the  User database 
           
            return token.token !== req.token 
            
            
            //comparing tokens object from database to token obtained from header
           //refer auth.js

           //if they are not equal it will return true, keeping it in the tokens array
           //if  they are equal it will end up returnung false filtering it out removing it
        })

        await req.user.save()

        res.send()
    } catch(e)
    {
        res.status(500).send()
    }
})


router.post('/users/logoutall', auth, async(req, res) =>
{
    try
    {
    req.user.tokens = []
    await req.user.save()
    res.send()
    } catch(e)
    {
        res.status(500).send()
    }
}) 


router.get('/users/me', auth, async (req,res) =>
{
    res.send(req.user)
})


router.patch('/users/me', auth, async (req, res) => 
{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) 
    {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach( (update) => req.user[update] = req.body[update])
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        await req.user.save()


        res.send(req.user)
    } 
    catch (e) 
    {
        res.status(400).send(e)
    }   
})


router.delete('/users/me', auth, async (req, res) =>
{
    try
    {
        await req.user.remove() 
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    }
    catch (e)
    {
        res.status(500).send()
    }
})

module.exports = router  