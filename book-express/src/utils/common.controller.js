export const commonController = (service) => {

    const getAll = async (req,res,next)=>{
        try{
            const result = await service.getAll()
            res.send(result)
        }catch(err){
            next(err)
        }
    }

    const getById = async (req,res,next)=>{
        try{
            const {id} = req.params
            const result = await service.getById(id)
            res.send(result)
        }catch(err){
            next(err)
        }
    }

    const create = async (req,res,next)=>{
        try{
            const result = await service.add(req.body)
            res.status(201).send(result)
        }catch(err){
            next(err)
        }
    }

    const update = async (req,res,next)=>{
        try{
            const {id} = req.params
            const result = await service.update(id,req.body)
            res.send(result)
        }catch(err){
            next(err)
        }
    }

    const remove = async (req,res,next)=>{
        try{
            const {id} = req.params
            await service.remove(id)
            res.status(204).send()
        }catch(err){
            next(err)
        }
    }

    return {
        getAll,
        getById,
        create,
        update,
        remove
    }
}