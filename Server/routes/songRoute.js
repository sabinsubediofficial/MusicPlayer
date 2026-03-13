const express = require('express');
const router = express.Router();
const Song = require('../models/songs');

const {
  searchSongs,
  postSongs,
  getSongsById,
  deleteSongs,
  getSongs,
} = require('../controllers/songController');

//Get Songs
router.get('/', getSongs);

//post songs
router.post('/', postSongs);

//Get songs by id
router.get('/:id', getSongsById);

//Get songs by strings
router.get('/search/:query', searchSongs);

//Delete Songs
router.delete('/delete/:id', deleteSongs);

module.exports = router;
