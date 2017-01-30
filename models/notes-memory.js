const Note = require('./Note');

const notes = [];

exports.update = exports.create = (key, title, body) => (
    new Promise((resolve, reject) => {
        notes[key] = new Note(key, title, body);
        resolve(notes[key]);
    })
);

exports.read = (key) => (
    new Promise((resolve, reject) => {
        if (notes[key]) resolve(notes[key]);
        else reject(`Note ${key} does not exist`);
    })
);

exports.destroy = (key) => (
    new Promise((resolve, reject) => {
        if (notes[key]) {
            delete notes[key];
            resolve();
        } else {
            reject(`Note ${key} does not exist`);
        }
    })
);

exports.keylist = () => (
    new Promise((resolve, reject) => {
        resolve(Object.keys(notes));
    })
);

exports.count = () => (
    new Promise((resolve, reject) => {
        resolve(Object.keys(notes).length);
    })
);
