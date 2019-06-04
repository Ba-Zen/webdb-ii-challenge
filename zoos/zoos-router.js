const knex = require('knex');

const router = require('express').Router();

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3'
  },
  useNullAsDefault: true,
};

const db = knex(config);

router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
        res.status(200).json(zoos)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
        if (zoo) {
            res.status(200).json(zoo);
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body, "name")
    .then(zoo => {
        if(name) {
            res.status(201).json(zoo)
        } else {
            res.status(404).json({ message: 'please enter a name' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('zoos')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} record updated`})
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.delete('/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ message: `${count} record removed`})
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


module.exports = router;