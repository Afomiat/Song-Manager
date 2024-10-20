package main

import (
    "github.com/Afomiat/Song-Manager/Database"
    "github.com/Afomiat/Song-Manager/Delivery/routers"
    "github.com/gorilla/handlers"
    "net/http"
)

func main() {
    Database.DBconnection() // Ensure this function successfully connects to your database
    router := routers.SetupRouter() // Setup the router without CORS configuration

    // Allowed origins for CORS
    allowedOrigins := []string{"http://localhost:5173"}

    // Wrap the router with Gorilla CORS
    corsHandler := handlers.CORS(
        handlers.AllowedOrigins(allowedOrigins),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
        handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
    )(router)

    // Start the server with the CORS handler
    http.ListenAndServe(":8080", corsHandler)
}
