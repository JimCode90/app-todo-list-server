const TaskSchema = require("../models/Tasks");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tareas = await TaskSchema.find();
        //console.log({tareas})
        res.send(tareas);
    } catch (error) {
        res.send(error);
    }
});

router.post("/", (req, res) => {
    console.log(req.body.nombre)
    const task = new TaskSchema()
    task.nombre = req.body.nombre
    task.state = false
    task.save((err, taskSaved) => {
        if (err) {
            console.log(err)
            return res.status(500).send({message: 'Error al insertar la tarea en la BD', err})
        }

        res.status(201).send({task: taskSaved});
    })
});

router.put("/", (req, res) => {
    if (req?.body?.['_id'] && req?.body?.nombre) {
        const tareaEditada = {
            nombre: req.body.nombre
        }
        TaskSchema.findByIdAndUpdate(req.body._id, tareaEditada, {new: true}, (err, updatedTask) => {
            if (err) {
                console.log(err)
                return res.status(500).send({message: 'Error al actualizar tarea en BD.'})
            }
            console.log(updatedTask)
            res.status(200).send({task: updatedTask})
        })
    } else {
        return res.status(400).send({message: 'Error en la actualización debido a que no se ha enviado id y/o objeto updates.'});
    }
});

router.put("/refrescar-datos", (req, res) => {
    try {
        TaskSchema.updateMany({}, {
            "$set": {state: false},
        }, {new: true}, (err, tasks) => {
            if (err) {
                console.log("error ", err)
            } else {
                res.send(tasks)
            }
        })

    } catch (error) {
        res.send(error);
    }

});

router.put("/marcar-tarea/:_id", (req, res) => {

    if (req?.params?.['_id']) {
        const tareaEditada = {
            state: true
        }
        TaskSchema.findByIdAndUpdate(req.params._id, tareaEditada, {new: true}, (err, updatedTask) => {
            if (err) {
                console.log(err)
                return res.status(500).send({message: 'Error al actualizar tarea en BD.'})
            }
            console.log(updatedTask)
            res.status(200).send({task: updatedTask})
        })
    } else {
        return res.status(400).send({message: 'Error en la actualización debido a que no se ha enviado id y/o objeto updates.'});
    }
});


router.delete("/", (req, res) => {
    if (req?.body?.['_id']) {

        TaskSchema.findByIdAndRemove(req.body._id, (err, updatedTask) => {
            if (err) {
                console.log(err)
                return res.status(500).send({message: 'Error al eliminar tarea en BD.'})
            }
            console.log(updatedTask)
            res.status(200).send({task: updatedTask})
        })
    } else {
        return res.status(400).send({message: 'Error en la eliminación debido a que no se ha enviado id'});
    }
});


module.exports = router;