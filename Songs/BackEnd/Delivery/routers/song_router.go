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

    // Add routes without trailing slashes
    songRoutes.POST("", songController.AddSong)       // Use empty string for POST
    songRoutes.GET("", songController.GetSongs)       // Use empty string for GET
    songRoutes.GET("/:id", songController.GetSongByID) // This can stay the same
    songRoutes.DELETE("/:id", songController.DeleteSong) // This can stay the same
    songRoutes.PUT("/:id", songController.UpdateSong) // This can stay the same
}
