'use strict';

const express = require('express');
const Notes = require('../models/notes-memory');

const router = express.Router();

// router.get('/', (req, res, next) => {
//   Notes.keylist()
//     .then(keylist => {
//       const keyPromises = [];
//       keylist.forEach(key => {
//         keyPromises.push(Notes.read(key)
//           .then(note => keyPromises.push({ key: note.key, title: note.title })));
//       });
//       return Promise.all(keyPromises); // combineLatest
//     })
//     .then(notelist => res.render('index', { title: 'Notes', notelist }))
//     .catch(err => next(err));
// });

// module.exports = router;

/* GET home page. */
router.get('/', (req, res, next) => {
  Notes.keylist()
    .then(keylist => {
      const keyPromises = [];
      keylist.forEach(key => {
        keyPromises.push(Notes.read(key)
          .then(note => {
            return { key: note.key, title: note.title };
        }));
      });
      return Promise.all(keyPromises);
  })
  .then(notelist => res.render('index', { title: 'Notes', notelist }))
  .catch(err => next(err));
});

module.exports = router;
