'use strict';

const util = require('util');
const express = require('express');
const Notes = require('../models/notes-memory');

const router = express.Router();

router.get('/add', (req, res, next) => {
    res.render('noteedit', {
        title: 'Add a Note',
        docreate: true,
        notekey: '',
        note: undefined
    });
});

router.post('/save', (req, res, next) => {
    let databaseOperation;
    if (req.body.docreate === 'create') {
        databaseOperation = Notes.create(req.body.notekey, req.body.title, req.body.body);
    } else {
        databaseOperation = Notes.update(req.body.notekey, req.body.title, req.body.body);
    }

    databaseOperation
        .then(() => res.redirect(`/notes/view?key=${req.body.notekey}`))
        .catch(err => next(err));
});

router.get('/view', (req, res, next) => {
    Notes.read(req.query.key)
        .then(note => {
            res.render('noteview', {
                title: note ? note.title : '',
                notekey: req.query.key,
                note
            });
        })
        .catch(err => next(err));
});

module.exports = router;
