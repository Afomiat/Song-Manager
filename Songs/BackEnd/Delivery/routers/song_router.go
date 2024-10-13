package routers

import (
	"github.com/Afomiat/Song-Manager/Database"
	"github.com/Afomiat/Song-Manager/Delivery/controllers"
	"github.com/Afomiat/Song-Manager/Repository"
	"github.com/Afomiat/Song-Manager/Usecase"
	"github.com/gin-gonic/gin"
)

func SetupSongRouter(router *gin.Engine) {
	songRepo := Repository.NewSongRepoImplement(Database.SongCollection)
	songUsecase := Usecase.NewSongUsecase(songRepo)
	songController := controllers.NewSongController(songUsecase)
	songRoutes := router.Group("/songs")
	
	songRoutes.POST("/", songController.AddSong)
	songRoutes.GET("/", songController.GetSongs)

}