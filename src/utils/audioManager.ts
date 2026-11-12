/**
 * Web Audio API synthesizer & Indonesian Text-To-Speech for Revan Utomo Edu Games
 * 100% self-contained, offline-capable, and child-friendly.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmOscillators: { stop: () => void } | null = null;
  private isBgmPlaying = false;
  private soundEnabled = true;
  private musicEnabled = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundOn(): boolean {
    return this.soundEnabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
  }

  public isMusicOn(): boolean {
    return this.musicEnabled;
  }

  // Soft pop sound for button clicks and cards
  public playPop() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // ignore
    }
  }

  // Correct answer sound - joyful major chime
  public playCorrect() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.25, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // Soft encouraging boop on wrong answer (gentle and friendly, never scary!)
  public playWrong() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.18);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // ignore
    }
  }

  // Star collection sound
  public playStar() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [784, 988, 1175, 1568];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.05);

        gain.gain.setValueAtTime(0.18, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.25);
      });
    } catch {
      // ignore
    }
  }

  // Victory fanfare
  public playFanfare() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 523.25, d: 0.12, t: 0.12 },
        { f: 523.25, d: 0.12, t: 0.24 },
        { f: 659.25, d: 0.22, t: 0.36 },
        { f: 783.99, d: 0.22, t: 0.58 },
        { f: 1046.5, d: 0.45, t: 0.8 },
      ];
      melody.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + item.t);

        gain.gain.setValueAtTime(0.25, now + item.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + item.t);
        osc.stop(now + item.t + item.d);
      });
    } catch {
      // ignore
    }
  }

  // Xylophone instrument note (C4 to C5)
  public playXylophoneNote(index: number) {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [
      261.63, // Do / C4
      293.66, // Re / D4
      329.63, // Mi / E4
      349.23, // Fa / F4
      392.00, // Sol / G4
      440.00, // La / A4
      493.88, // Si / B4
      523.25, // Do high / C5
    ];
    const freq = notes[Math.max(0, Math.min(notes.length - 1, index))];

    try {
      const now = ctx.currentTime;
      // Fundamental
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      // Wooden overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 3.5, now);
      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);

      osc2.start(now);
      osc2.stop(now + 0.15);
    } catch {
      // ignore
    }
  }

  // Soothing background pentatonic lullaby music
  private startBgm() {
    if (this.isBgmPlaying) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    let timer: number | null = null;
    let step = 0;
    // Cheerful, calm pentatonic melody in F major
    const notes = [349.23, 392.0, 440.0, 523.25, 587.33, 523.25, 440.0, 392.0];

    const playNext = () => {
      if (!this.isBgmPlaying || !this.musicEnabled) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const freq = notes[step % notes.length];
        step++;

        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
      } catch {
        // ignore
      }

      timer = window.setTimeout(playNext, 600);
    };

    playNext();

    this.bgmOscillators = {
      stop: () => {
        if (timer) clearTimeout(timer);
        this.isBgmPlaying = false;
      },
    };
  }

  private stopBgm() {
    if (this.bgmOscillators) {
      this.bgmOscillators.stop();
      this.bgmOscillators = null;
    }
    this.isBgmPlaying = false;
  }

  // Indonesian Text-to-Speech
  public speakIndonesian(text: string) {
    if (!this.soundEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel(); // Stop previous utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9; // Friendly, slightly slower pace for kids
      utterance.pitch = 1.15; // Slightly cheerful, warm tone

      // Try finding Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(
        (v) => v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia')
      );
      if (idVoice) {
        utterance.voice = idVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }
}

export const audio = new SoundManager();
