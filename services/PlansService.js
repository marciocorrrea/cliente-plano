const Database = require("../models/index")

class PlansService {

    constructor() {
        this.Plan = Database["Plan"]
    }

    async store(plans) {
        let errors = {}

        if (plans.inport == undefined) {
            plans.inport = false
        } else {
            plans.inport = true
        }

        let isValid = this.validate(plans, errors)

        if (isValid) {


            try {
                if (plans.id == undefined) {

                    await this.Plan.create(plans)
                    return true

                } else {
                    await this.Plan.update({
                        title: plans.title,
                        list: plans.list,
                        client: plans.client,
                        value: plans.value,
                        inport: plans.inport

                    }, {
                        where: {
                            id: plans.id
                        }
                    })
                    return true
                }


            } catch (error) {
                errors.system_msg = "Não foi possível salvar o plano"
                return errors
            }
        } else {
            return errors
        }

    }

    async deactivated(id, type) {
        try {
            let plan = await this.Plan.findByPk(id)

            switch (type) {
                case "true":
                    plan.deactivated = true
                    await plan.save()
                    return true
                case "false":
                    plan.deactivated = false
                    await plan.save()
                    return true
                default:
                    return false
            }

            // await this.Plan.update({
            //     deactivated: true
            // }, {
            //     where: {
            //         id: id
            //     }
            // })


        } catch (error) {
            return false
        }

    }

    validate(plan, errors) {

        let errorCount = 0

        if (plan == undefined || plan.title.length < 2) {
            errors.title_msg = "Titulo é inválido"
            errorCount++
        }

        if (plan.list == undefined || plan.list < 1) {
            errors.list_msg = "Quantidade de lista invalida"
            errorCount++
        }

        if (errorCount == 0) {
            return true
        } else {
            return false
        }
    }

    async list(status) {
        try {
            var plans = await this.Plan.findAll({}).then(plans => {
                return plans
            })
        } catch (error) {
            return error
        }
        return plans
    }

    async destroy(id) {
        try {
            await this.Plan.destroy({
                where: {
                    id: id
                }
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }

    async findPlan(id) {

        try {
            var plan = await this.Plan.findByPk(id)
            return plan
        } catch (error) {
            return error
        }
    }


}

module.exports = new PlansService()