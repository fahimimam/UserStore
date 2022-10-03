var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }
    // new User
    const user = new Userdb({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        phone: req.body.phone,
        tags:req.body.tags
    })

    // send user to the db
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error Occurred"
            });
        })
}

// retrieve user/s
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(400).send({
                        message: "No User found with id" + id
                    })
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving user with id: " + id
                })
            })
    }
    else {
        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occured while retrieving." })
            })
    }
}

// update
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Can not Update user with id: ${id}. User not found` });
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update information" });
        })
}

// Delete a user with id
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id: ${id}. Id invalid` });
            }
            else {
                res.send({
                    message: "User deleted Successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Couldnt Delete User with id: ${id}!`
            });
        });
}

// get a single User
exports.view = (req, res) => {
    const id = req.params.id;
    Userdb.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Find with id: ${id}. Id invalid` });
            }
            else {
                // const status = res.status;
                res.status(200).send({
                    id: data._id,
                    name: data.firstName + " " + data.lastName,
                    phone: data.phone,
                    // status: status
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Couldnt View User with id: ${id}!`
            });
        });
}