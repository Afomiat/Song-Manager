package routers

import "github.com/gin-gonic/gin"

func SetupRouter() *gin.Engine {
	router := gin.Default()
	
	SetupSongRouter(router)
	return router

}