import React, { useState, useEffect, useRef } from 'react';
import { LinkedList, ListNode } from '../ListMusic';

//Se importan las canciones de la lista de music dentro de assets
//igual se tiene que llamar una por una en MOCK_SONGS (no pude recorrer la carpeta para que fuera automatico)
import song1 from '../assets/Music/Goodbye Horses - Q Lazzarus - BossGotheric.mp3';
import song2 from '../assets/Music/Greil Goldin - Jane Doe (Official Music Video) - Greil Goldin.mp3';
import song3 from '../assets/Music/Losin\' Streak Sing-Along - Hazbin Hotel S2  Prime Video - Prime Video.mp3';
import song4 from '../assets/Music/Sub Urban - Skinny Loser (Official Music Video) - Sub Urban.mp3';

const MOCK_SONGS = [
    { id: 1, title: 'Goodbye Horses', artist: 'Q Lazzarus', src: song1 },
    { id: 2, title: 'Jane Doe', artist: 'Greil Goldin', src: song2 },
    { id: 3, title: "Losin' Streak Sing-Along", artist: 'Hazbin Hotel S2', src: song3 },
    { id: 4, title: 'Skinny Loser', artist: 'Sub Urban', src: song4 }
];

export const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playlist] = useState(() => {
        const list = new LinkedList<typeof MOCK_SONGS[0]>();
        MOCK_SONGS.forEach(song => list.append(song));
        return list;
    });

    const [currentNode, setCurrentNode] = useState<ListNode<typeof MOCK_SONGS[0]> | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (playlist.head) {
            setCurrentNode(playlist.head);
        }
    }, [playlist]);

    const handleNext = () => {
        if (currentNode && currentNode.next) {
            setCurrentNode(currentNode.next);
        } else {
            //esto es para que no se detenga la musica cuando llega al final de la lista
            setCurrentNode(playlist.head);
        }
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };


    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.warn("Auto-play blocked", e));
        }
    }, [currentNode, isPlaying]);

    return (
        <div className="player-container">
            <h2>Music Player</h2>

            {currentNode ? (
                <div className="now-playing">
                    <div className={`disc-icon ${isPlaying ? '' : 'paused'}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>💿</div>
                    <div className="song-info">
                        <h3>{currentNode.value.title}</h3>
                        <p>{currentNode.value.artist}</p>

                        {/* reproductor de audio */}
                        <audio
                            ref={audioRef}
                            src={currentNode.value.src}
                            onEnded={handleNext}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                    </div>
                    <div className="controls">
                        <button onClick={handlePlayPause} className="control-btn" style={{ marginRight: '1rem' }}>
                            {isPlaying ? 'Pause ⏸' : 'Play ▶️'}
                        </button>
                        <button onClick={handleNext} className="control-btn">
                            Next ⏭
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading playlist...</p>
            )}

            <div className="up-next">
                <h3>Playlist</h3>
                <ul>
                    {playlist.getArray().map((song) => (
                        <li key={song.id} className={currentNode?.value.id === song.id ? 'active' : ''}>
                            <strong>{song.title}</strong> - {song.artist}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
