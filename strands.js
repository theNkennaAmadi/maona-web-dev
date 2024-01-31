class videoPlayer {
  static currentPlaying = null; // Static property to keep track of the currently playing video

  constructor(film) {
    this.film = film;
    this.filmTrailer = this.film.querySelector("video");
    this.playPauseBlock = this.film.querySelector(".play-pause-block");
    this.pauseBlock = this.film.querySelector(".pause-block");
    this.playBlock = this.film.querySelector(".play-block");
    this.mute = this.film.querySelector(".mute");
    this.unmute = this.film.querySelector(".unmute");
    this.muteWrapper = this.film.querySelector(".mute-wrapper");
    this.strandInfo = this.film.querySelectorAll("[strand-info]");
    this.filmProgress = this.film.querySelector(".film-progress");
    this.isPlaying = false;
    this.initTimelines();
    this.addEventListeners();
  }

  initTimelines() {
    this.tlPaused = gsap
      .timeline({ paused: true })
      .set(this.pauseBlock, { opacity: 1, duration: 0.1 })
      .set(this.playBlock, { opacity: 0, duration: 0.1 }, ">");

    this.tlShow = gsap.timeline({ paused: true }).to(
      this.strandInfo,
      {
        yPercent: 120,
        duration: 0.85,
        ease: "power4.inOut",
      },
      "0"
    );

    this.tlMute = gsap
      .timeline({ paused: true })
      .to(this.mute, { yPercent: -100, duration: 0.3 })
      .to(this.unmute, { yPercent: -100, duration: 0.3 }, "<");
  }

  addEventListeners() {
    this.playPauseBlock.addEventListener(
      "click",
      this.togglePlayPause.bind(this)
    );
    this.filmTrailer.addEventListener(
      "timeupdate",
      this.updateProgress.bind(this)
    );
    this.muteWrapper.addEventListener("click", this.toggleMute.bind(this));
  }

  togglePlayPause() {
    if (this.filmTrailer.paused) {
      if (videoPlayer.currentPlaying && videoPlayer.currentPlaying !== this) {
        videoPlayer.currentPlaying.pauseVideo(); // Pause the currently playing video
      }
      videoPlayer.currentPlaying = this; // Update the currently playing video
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  playVideo() {
    this.tlPaused.play();
    this.tlShow.play();
    this.filmTrailer.play();
    this.isPlaying = true;
  }

  pauseVideo() {
    this.tlPaused.reverse();
    this.tlShow.reverse();
    this.filmTrailer.pause();
    this.isPlaying = false;
  }

  updateProgress() {
    const progress = this.filmTrailer.currentTime / this.filmTrailer.duration;
    gsap.to(this.filmProgress, {
      width: `${progress * 100}%`,
      ease: "expo.out",
    });
  }

  toggleMute() {
    if (this.filmTrailer.muted) {
      this.tlMute.reverse();
      this.filmTrailer.muted = false;
    } else {
      this.tlMute.play();
      this.filmTrailer.muted = true;
    }
  }
}

document.querySelectorAll(".strands-film-item").forEach((film) => {
  new videoPlayer(film);
});
