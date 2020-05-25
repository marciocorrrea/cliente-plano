const PlansService = require("../services/PlansService")
const { deactiveted } = require("../services/PlansService")
class PlansController {

    async index(req, res) {
        let plans = await PlansService.list()
        // res.json(plans)
        res.render("plans", {
            plans
        })
    }

    create(req, res) {
        res.render("plans/create", {
            title_msg: req.flash('title_msg'),
            list_msg: req.flash('list_msg')
        })
    }

    async store(req, res) {
        let {
            title,
            list,
            client,
            value,
            inport
        } = req.body

        var plan = {
            title,
            list,
            client,
            value,
            inport
        }

        var result = await PlansService.store(plan)

        if (result == true) {
            res.redirect("/admin/plans")
        } else {
            req.flash('title_msg', result.title_msg)
            req.flash('list_msg', result.list_msg)
            res.redirect("/admin/plans/create")
        }
    }

    async destroy(req, res) {
        let id = req.body.id

        if (isNaN(id)) {
            res.redirect("/admin/plans")
        } else {
            let destroy = await PlansService.destroy(id)

            if (destroy) {
                res.redirect("/admin/plans")
            } else {
                res.redirect("/admin/plans")
                // validação para não excluir
            }
        }
    }

    async edit(req, res){
       let id = parseInt(req.params.id)
       let plan = await PlansService.findPlan(id)

       if (isNaN(id) || plan == undefined) {
        res.redirect("/admin/plans")
       }else{
        res.render("plans/edit",{
            plan,
            title_msg: req.flash('title_msg'),
            list_msg: req.flash('list_msg'),
        })
       }
    }


    async update(req, res){

        let {        
            id,    
            title,
            list,
            client,
            value,
            inport
        } = req.body

        let plan = {
            id,
            title,
            list,
            client,
            value,
            inport
        }
        let result = await PlansService.store(plan)

        if (result == true) {   
            res.redirect("/admin/plans")
        } else {
            req.flash('title_msg', result.title_msg)
            req.flash('list_msg', result.list_msg)
            res.redirect(`/admin/plans/edit/${id}`)
        }

    }   

    async deactiveted(req, res){
        let id = req.params.id
        let type = req.params.type
        console.log(id, type)
        await PlansService.deactivated(id, type)
        res.redirect("/admin/plans")
    }

}



module.exports = new PlansController()