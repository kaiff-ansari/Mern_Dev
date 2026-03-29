const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')
const albumModel = require('../models/album.model')

async function createMusic(req, res) {


    const { title } = req.body;
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,

        }
    })




}

async function createAlbum(req, res) {



    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })

    res.status(201).json({
        message: "Album created successfully ",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.music,
        }
    })

}


async function getAllMusics(req, res){

    const musics = await musicModel.find().limit(10).populate("artist")

    res.status(200).json({
        message: "Music fetched successfully ",
        musics:musics
    })

}

async function getAllAlbums(req,res){

    const albums = await musicModel.find().select("title artist").populate("artist", "username email").populate("music")

    res.status(200).json({
        message : "aLbum fetched successfully ",
        albums:albums,
    })
    
}

async function getAlbumById(req,res){

    const albumId = req.params.albumId;

    const album = await musicModel.findById(albumId).populate("artist", "username email")

}
module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById }