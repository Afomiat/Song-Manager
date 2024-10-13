package main

import (
	"github.com/Afomiat/Song-Manager/Database"
	"github.com/Afomiat/Song-Manager/Delivery/routers"
)

func main() {
	Database.DBconnection()
	router := routers.SetupRouter()
	router.Run(":8080")
}