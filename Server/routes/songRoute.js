const express = require('express');
const router = express.Router();
const Song = require('../models/songs');

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { title, artist, url } = req.body;
  const song = new Song({ title, artist, url });
  try {
    const newSong = await song.save();
    res.status(201).json({
      id: newSong._id,
      title: newSong.title,
      artist: newSong.artist,
      url: newSong.url,
      createdAt: newSong.createdAt,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
