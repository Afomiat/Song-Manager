package Domain

import "go.mongodb.org/mongo-driver/bson/primitive"

type Song struct {
	ID     primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title  string             `json:"title" bson:"title"`
	Artist string             `json:"artist" bson:"artist"`
}

type SongRepository interface {
	AddSong(song Song) (Song, error)
	GetSong() ([]Song, error)
	GetSongByID(id string) (Song, error)
	UpdateSong(id string, song Song) (Song, error)
	DeleteSong(id string) (Song, error)
}
