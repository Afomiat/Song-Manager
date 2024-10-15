package Usecase

import (
	"errors"
	"fmt"

	"github.com/Afomiat/Song-Manager/Domain"
)

type SongUsecase struct {
	SongRepo Domain.SongRepository
}

func NewSongUsecase(songRepo Domain.SongRepository) *SongUsecase {
	return &SongUsecase{
		SongRepo: songRepo,
	}
}

func (su *SongUsecase) AddSong(song Domain.Song) error {
	fmt.Println("song", song)
	if song.Title == "" || song.Artist == "" {

		return errors.New("title and Artist are required")
	}

	_, err := su.SongRepo.AddSong(song)
	return err
}

func (su *SongUsecase) GetSongs() ([]Domain.Song, error) {
	return su.SongRepo.GetSong()
}

func (su *SongUsecase) GetSongByID(id string) (Domain.Song, error){
	return su.SongRepo.GetSongByID(id)
}

func (su *SongUsecase) DeleteSong(id string) (Domain.Song, error){
	return su.SongRepo.DeleteSong(id)
}