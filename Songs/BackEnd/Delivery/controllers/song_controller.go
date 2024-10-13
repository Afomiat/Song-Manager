package controllers

import (
	"net/http"

	"github.com/Afomiat/Song-Manager/Domain"
	"github.com/Afomiat/Song-Manager/Usecase"
	"github.com/gin-gonic/gin"
)

type SongController struct {
	SongUsecase *Usecase.SongUsecase
}

func NewSongController(songUsecase *Usecase.SongUsecase) *SongController {
	return &SongController{
		SongUsecase: songUsecase,
	}
}

func (sc *SongController) AddSong(c *gin.Context) {
	var song Domain.Song

	if err := c.ShouldBindJSON(&song); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorAfi": err.Error()})
		return
	}

	// song.Artist = c.GetString("artist")
	if err := sc.SongUsecase.AddSong(song); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Song added successfully"})

}

func (sc *SongController) GetSongs(c *gin.Context) {
	songs, err := sc.SongUsecase.GetSongs()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"tasks": songs})
}