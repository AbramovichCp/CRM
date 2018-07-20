const bcrypt = require('bcryptjs')
const webToken = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req,res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            //пароли совпали, генерация token
            const token = webToken.sign({
                email: candidate.email, 
                userId: candidate._id
            }, keys.webToken, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //ошибка Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают.'
            })
        }
    } else {
        //ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }

}

module.exports.register = async(req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //Пользователь существует, выводи ошибку
        res.status(409).json({
            message: 'Данный email занят. Введите другой.'
        })
    } else {
        //Создаем пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
        
    }
}