package Repository

import (
	"context"

	"github.com/Afomiat/Song-Manager/Domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SongRepoImplement struct {
	collection *mongo.Collection
}

func NewSongRepoImplement(coll *mongo.Collection) Domain.SongRepository {
	return &SongRepoImplement{
		collection: coll,
	}
}

func (s *SongRepoImplement) AddSong(song Domain.Song) (Domain.Song, error) {
	_, err := s.collection.InsertOne(context.Background(), song)
	return song, err
}

func (s *SongRepoImplement) GetSong() ([]Domain.Song, error) {
	var cursor *mongo.Cursor
	var err error

	cursor, err = s.collection.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}

	var songs []Domain.Song

	for cursor.Next(context.Background()) {
		var song Domain.Song

		if err := cursor.Decode(&song); err != nil {
			return nil, err
		}
		songs = append(songs, song)
	}

	return songs, nil
}