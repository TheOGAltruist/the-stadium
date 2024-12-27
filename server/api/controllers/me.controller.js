const prisma = require("../../prisma/index.js")

//Return me object
const getMe = async (req, res, next) => {
    try {
        const me = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.user.id
            }
        });

        const {id, password, ...rest} = me;

        res.json(rest)
    } catch (error) {
        next(error)
    }
}

//Edit me object
const editMe = async (req, res, next) => {

    const { firstname, lastname, password, email, address_street1, address_street2, address_city, address_state, address_country, address_zipcode } = req.body

    try {
        const existingAttributes = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        const response = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                firstname: firstname !== undefined ? firstname : existingAttributes.firstname,
                lastname: lastname !== undefined ? lastname : existingAttributes.lastname,
                password: password !== undefined ? bcrypt.hashSync(password, Math.floor(Math.random() * 10) + 1) : existingAttributes.password,
                email: email !== undefined ? email : existingAttributes.email,
                address_street1: address_street1 !== undefined ? address_street1 : existingAttributes.address_street1,
                address_street2: address_street2 !== undefined ? address_street2 : existingAttributes.address_street2,
                address_city: address_city !== undefined ? address_city : existingAttributes.address_city,
                address_state: address_state !== undefined ? address_state : existingAttributes.address_state,
                address_country: address_country !== undefined ? address_country : existingAttributes.address_country,
                address_zipcode: address_zipcode !== undefined ? address_zipcode : existingAttributes.address_zipcode,
                updated_at: new Date()
            }
        })

        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getMe,
    editMe
}