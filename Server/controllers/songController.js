const Song = require('../models/songs');

//Get songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Search Songs by String
exports.searchSongs = async (req, res) => {
  try {
    const { query } = req.params;
    const searchRegex = new RegExp(query, 'i');

    const song = await Song.find({
      $or: [
        { title: { $regex: searchRegex } },
        { artist: { $regex: searchRegex } },
      ],
    });

    if (song.length === 0) {
      return res.status(404).json({ message: 'No matches found' });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UploadSongs
exports.postSongs = async (req, res) => {
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
};

exports.getSongsById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(400).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSongs = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      res.status(404).json({ message: 'No songs found' });
    }
    res.json({ message: 'song deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
