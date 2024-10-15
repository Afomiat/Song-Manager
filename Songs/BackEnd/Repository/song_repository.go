package Repository

import (
	"context"

	"github.com/Afomiat/Song-Manager/Domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (s *SongRepoImplement) GetSongByID(id string)(Domain.Song, error){
	var song Domain.Song
	newId, err :=  primitive.ObjectIDFromHex(id)

	if err != nil{
		return Domain.Song{}, err
	}

	err = s.collection.FindOne(context.Background(),bson.M{"_id": newId}).Decode(&song)
	if err != nil{
		return Domain.Song{}, err
	}
	return song, err
}

func (s *SongRepoImplement) DeleteSong(id string) (Domain.Song, error){
	newId, err := primitive.ObjectIDFromHex(id) 
	var song Domain.Song

	if err != nil{
		return Domain.Song{}, err
	}

	err = s.collection.FindOneAndDelete(context.Background(), bson.M{"_id": newId}).Decode(&song)
	return song, err

}

func (s *SongRepoImplement) UpdateSong(id string, song Domain.Song) (Domain.Song, error){
	newId , err := primitive.ObjectIDFromHex(id)
	if err != nil{
		return Domain.Song{}, err
	}

	_, err = s.collection.UpdateOne(context.Background(), bson.M{"_id":newId}, bson.M{"$set":song})
	return song, err
}