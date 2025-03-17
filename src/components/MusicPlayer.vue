<template>
  <div class="music-control">
    <div class="music-panel-toggle" @click="toggleMusicPanel">
      <i class="fas fa-headphones-alt"></i>
    </div>
    <div class="music-panel" :class="{ active: isPanelActive }">
      <div class="music-info">
        <div class="song-cover">
          <img :src="currentSong.cover" alt="歌曲封面">
        </div>
        <div class="song-details">
          <div class="song-title">{{ currentSong.title }}</div>
          <div class="song-artist">{{ currentSong.artist }}</div>
        </div>
      </div>
      <div class="music-progress">
        <div class="progress-bar" @click="setProgress">
          <div class="progress-current" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="time-info">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <span class="total-time">{{ formatTime(duration) }}</span>
        </div>
      </div>
      <div class="music-controls">
        <button id="prevSong" class="control-btn" @click="prevSong"><i class="fas fa-step-backward"></i></button>
        <button id="musicToggle" class="control-btn play-btn" :class="{ playing: isPlaying }" @click="togglePlay">
          <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
        <button id="nextSong" class="control-btn" @click="nextSong"><i class="fas fa-step-forward"></i></button>
        <button id="shuffleBtn" class="control-btn" :class="{ active: isRandom }" @click="toggleRandom">
          <i class="fas fa-random"></i>
        </button>
        <button class="control-btn playlist-btn music-playlist-toggle" @click="togglePlaylist">
          <i class="fas fa-list"></i>
        </button>
      </div>
    </div>
    <div class="music-playlist" :class="{ active: isPlaylistActive }">
      <div class="playlist-header">
        <h3>播放列表</h3>
        <button class="close-playlist" @click="togglePlaylist"><i class="fas fa-times"></i></button>
      </div>
      <ul class="playlist-songs">
        <li v-for="(song, index) in songs" :key="index" 
            class="playlist-song" 
            :class="{ active: currentSongIndex === index }"
            @click="selectSong(index)">
          <div class="playlist-song-number">{{ index + 1 }}</div>
          <div class="playlist-song-info">
            <div class="playlist-song-title">{{ song.title }}</div>
            <div class="playlist-song-artist">{{ song.artist }}</div>
          </div>
          <div class="playlist-song-duration">{{ songDurations[index] || '--:--' }}</div>
        </li>
      </ul>
    </div>
    <audio ref="audio" @timeupdate="updateProgress" @ended="handleSongEnd"></audio>
  </div>
</template>

<script>
// 导入音频文件
import song1 from '../assets/bgm/The truth that you leave-Pianoboy高至豪.flac';
import song2 from '../assets/bgm/Secret Base-uBio高尾和树.mp3';
import song3 from '../assets/bgm/The Dawn-Dreamtale.flac';

// 导入图片
import cover1 from '../assets/img/avatar.jpg';
import cover2 from '../assets/img/pic2.png';
import cover3 from '../assets/img/pic3.png';

export default {
  name: 'MusicPlayer',
  data() {
    return {
      songs: [
        {
          title: 'The truth that you leave',
          artist: 'Pianoboy高至豪',
          src: song1,
          cover: cover1
        },
        {
          title: 'Secret Base',
          artist: 'uBio高尾和树',
          src: song2,
          cover: cover2
        },
        {
          title: 'The Dawn',
          artist: 'Dreamtale',
          src: song3,
          cover: cover3
        }
      ],
      currentSongIndex: 0,
      isPlaying: false,
      isRandom: false,
      isPanelActive: false,
      isPlaylistActive: false,
      currentTime: 0,
      duration: 0,
      progressPercent: 0,
      songDurations: []
    }
  },
  computed: {
    currentSong() {
      return this.songs[this.currentSongIndex]
    }
  },
  mounted() {
    this.loadSong(this.currentSongIndex)
    this.loadAllSongDurations()
    
    // 检查本地存储中的状态
    const savedMusicState = localStorage.getItem('bgMusicPlaying')
    const savedMusicIndex = localStorage.getItem('bgMusicIndex')
    const savedPanelState = localStorage.getItem('musicPanelOpen')
    const savedRandomState = localStorage.getItem('musicRandom')
    
    if (savedMusicIndex) {
      this.currentSongIndex = parseInt(savedMusicIndex)
      this.loadSong(this.currentSongIndex)
    }
    
    if (savedPanelState === 'true') {
      this.isPanelActive = true
    }
    
    if (savedRandomState === 'true') {
      this.isRandom = true
    }
    
    if (savedMusicState === 'true') {
      this.isPanelActive = true
      // 尝试播放音乐（需要用户交互才能自动播放）
      const playPromise = this.$refs.audio.play()
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPlaying = true
        }).catch(error => {
          // 自动播放被阻止，需要用户交互
          this.isPlaying = false
        })
      }
    }
  },
  methods: {
    loadSong(index) {
      const song = this.songs[index]
      this.$refs.audio.src = song.src
      this.currentSongIndex = index
    },
    loadAllSongDurations() {
      this.songs.forEach((song, index) => {
        this.loadSongDuration(song.src, index)
      })
    },
    loadSongDuration(src, index) {
      const tempAudio = new Audio()
      tempAudio.src = src
      tempAudio.addEventListener('loadedmetadata', () => {
        this.songDurations[index] = this.formatTime(tempAudio.duration)
      })
    },
    togglePlay() {
      if (this.isPlaying) {
        this.pauseSong()
      } else {
        this.playSong()
      }
      localStorage.setItem('bgMusicPlaying', this.isPlaying.toString())
      localStorage.setItem('bgMusicIndex', this.currentSongIndex.toString())
    },
    playSong() {
      this.$refs.audio.play()
      this.isPlaying = true
      this.isPanelActive = true
    },
    pauseSong() {
      this.$refs.audio.pause()
      this.isPlaying = false
    },
    nextSong() {
      if (this.isRandom) {
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * this.songs.length)
        } while (randomIndex === this.currentSongIndex && this.songs.length > 1)
        this.currentSongIndex = randomIndex
      } else {
        this.currentSongIndex++
        if (this.currentSongIndex > this.songs.length - 1) {
          this.currentSongIndex = 0 // 循环回到第一首
        }
      }
      this.loadSong(this.currentSongIndex)
      if (this.isPlaying) {
        this.playSong()
      }
    },
    prevSong() {
      if (this.isRandom) {
        let randomIndex
        do {
          randomIndex = Math.floor(Math.random() * this.songs.length)
        } while (randomIndex === this.currentSongIndex && this.songs.length > 1)
        this.currentSongIndex = randomIndex
      } else {
        this.currentSongIndex--
        if (this.currentSongIndex < 0) {
          this.currentSongIndex = this.songs.length - 1 // 循环到最后一首
        }
      }
      this.loadSong(this.currentSongIndex)
      if (this.isPlaying) {
        this.playSong()
      }
    },
    handleSongEnd() {
      this.nextSong()
    },
    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '00:00'
      const min = Math.floor(seconds / 60)
      const sec = Math.floor(seconds % 60)
      return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    },
    updateProgress() {
      const { duration, currentTime } = this.$refs.audio
      this.currentTime = currentTime
      this.duration = duration
      this.progressPercent = (currentTime / duration) * 100 || 0
    },
    setProgress(e) {
      const width = e.target.clientWidth
      const clickX = e.offsetX
      const duration = this.$refs.audio.duration
      this.$refs.audio.currentTime = (clickX / width) * duration
    },
    toggleMusicPanel() {
      this.isPanelActive = !this.isPanelActive
      
      // 当关闭音乐面板时，也关闭播放列表
      if (!this.isPanelActive) {
        this.isPlaylistActive = false
        // 如果是暂停状态，清除播放状态
        if (!this.isPlaying) {
          localStorage.removeItem('bgMusicPlaying')
        }
      }
      
      // 更新面板状态到本地存储
      if (this.isPanelActive) {
        localStorage.setItem('musicPanelOpen', 'true')
      } else {
        localStorage.removeItem('musicPanelOpen')
      }
    },
    togglePlaylist() {
      this.isPlaylistActive = !this.isPlaylistActive
    },
    toggleRandom() {
      this.isRandom = !this.isRandom
      localStorage.setItem('musicRandom', this.isRandom.toString())
    },
    selectSong(index) {
      this.currentSongIndex = index
      this.loadSong(this.currentSongIndex)
      this.playSong()
    }
  }
}
</script>

<style lang="less" scoped>
/* 音乐播放器样式 */
.music {
  &-control {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
  }

  &-panel {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 320px;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    
    &.active {
      visibility: visible;
      opacity: 1;
    }
    
    &-toggle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &-progress {
    margin-bottom: 20px;
  }

  &-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-playlist {
    position: absolute;
    bottom: 60px;
    left: 320px;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    
    &.active {
      visibility: visible;
      opacity: 1;
    }
  }
}

.song {
  &-cover {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 15px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-title {
    font-weight: 600;
    font-size: 1.1em;
    color: var(--dark-text);
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }

  &-artist {
    font-size: 0.9em;
    color: var(--light-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
}

.progress {
  &-bar {
    height: 6px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
  }

  &-current {
    height: 100%;
    background: var(--primary-color);
    border-radius: 3px;
    transition: width 0.1s linear;
  }
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: var(--light-text);
}

.control-btn {
  background: transparent;
  border: none;
  color: var(--light-text);
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    color: var(--primary-color);
  }
}

.play-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(to right bottom, var(--primary-color), var(--secondary-color));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(to right bottom, var(--secondary-color), var(--primary-color));
    box-shadow: 0 0 15px rgba(var(--primary-color-rgb), 0.5);
    color: white;
    transform: scale(1.05);
}

}

.playlist {
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    
    h3 {
      margin: 0;
      font-size: 1.1em;
      color: var(--dark-text);
    }
  }

  &-songs {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &-song {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    
    &.active {
      background: rgba(0, 0, 0, 0.05);
    }
    
    &-number {
      width: 25px;
      color: var(--light-text);
      font-size: 0.9em;
    }
    
    &-info {
      flex: 1;
      padding: 0 10px;
    }
    
    &-title {
      font-weight: 500;
      font-size: 0.9em;
      color: var(--dark-text);
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &-artist {
      font-size: 0.8em;
      color: var(--light-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    &-duration {
      font-size: 0.8em;
      color: var(--light-text);
    }
  }
}

.close-playlist {
  background: transparent;
  border: none;
  color: var(--light-text);
  cursor: pointer;
  font-size: 1.2em;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-panel {
    width: 280px;
    left: 0;
  }
  
  .music-playlist {
    width: 280px;
    left: 0;
    bottom: 320px;
  }
}
</style>