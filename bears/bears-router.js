const knex = require('knex');

const router = require('express').Router();

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3'
  },
  useNullAsDefault: true,
};

const bearsDb = knex(config);

router.get('/', (req, res) => {
    bearsDb('bears')
    .then(bears => {
        res.status(200).json(bears)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    bearsDb('bears')
    .where({ id: req.params.id })
    .first()
    .then(bear => {
        if (bear) {
            res.status(200).json(bear);
        } else {
            res.status(404).json({ message: 'id not found' })
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', (req, res) => {
    bearsDb('bears')
    .insert(req.body, "id")
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    bearsDb('bears')
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
    bearsDb('bears')
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