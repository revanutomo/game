import { ChoiceQuestion, WordBuildQuestion, SequenceStep, MemoryCardItem } from '../types/game';

// --- QUIZ QUESTIONS PER GAME ID ---
export const QUIZ_QUESTIONS: Record<string, ChoiceQuestion[]> = {
  'huruf-a-z': [
    {
      id: 'h1',
      prompt: 'Manakah Huruf "A" besar?',
      visual: 'A',
      visualType: 'text',
      audioText: 'Manakah huruf A besar?',
      options: [
        { id: 'o1', label: 'A', isCorrect: true },
        { id: 'o2', label: 'B', isCorrect: false },
        { id: 'o3', label: 'C', isCorrect: false },
      ],
      hint: 'Huruf A bentuknya seperti atap rumah bertangga!',
    },
    {
      id: 'h2',
      prompt: 'Manakah Huruf "B"?',
      visual: 'B',
      visualType: 'text',
      audioText: 'Manakah huruf B?',
      options: [
        { id: 'o1', label: 'D', isCorrect: false },
        { id: 'o2', label: 'B', isCorrect: true },
        { id: 'o3', label: 'P', isCorrect: false },
      ],
      hint: 'Huruf B mempunyai dua perut gendut di kanan!',
    },
    {
      id: 'h3',
      prompt: 'Manakah Huruf "C"?',
      visual: 'C',
      visualType: 'text',
      audioText: 'Manakah huruf C?',
      options: [
        { id: 'o1', label: 'O', isCorrect: false },
        { id: 'o2', label: 'U', isCorrect: false },
        { id: 'o3', label: 'C', isCorrect: true },
      ],
      hint: 'Huruf C melengkung seperti bulan sabit manis.',
    },
    {
      id: 'h4',
      prompt: 'Manakah Huruf "M"?',
      visual: 'M',
      visualType: 'text',
      audioText: 'Manakah huruf M?',
      options: [
        { id: 'o1', label: 'M', isCorrect: true },
        { id: 'o2', label: 'W', isCorrect: false },
        { id: 'o3', label: 'N', isCorrect: false },
      ],
      hint: 'Huruf M mempunyai dua puncak gunung berdiri!',
    },
    {
      id: 'h5',
      prompt: 'Manakah Huruf "S"?',
      visual: 'S',
      visualType: 'text',
      audioText: 'Manakah huruf S?',
      options: [
        { id: 'o1', label: 'Z', isCorrect: false },
        { id: 'o2', label: 'S', isCorrect: true },
        { id: 'o3', label: 'C', isCorrect: false },
      ],
      hint: 'Huruf S berkelok-kelok anggun seperti pita!',
    },
  ],

  'cocok-huruf-gambar': [
    {
      id: 'ch1',
      prompt: 'Huruf "A" adalah awalan untuk kata apa?',
      visual: '🍎',
      visualType: 'emoji',
      audioText: 'Huruf A untuk benda apa ya?',
      options: [
        { id: 'o1', label: 'Apel (A - P - E - L)', visual: '🍎', isCorrect: true },
        { id: 'o2', label: 'Bola (B - O - L - A)', visual: '⚽', isCorrect: false },
        { id: 'o3', label: 'Ceri (C - E - R - I)', visual: '🍒', isCorrect: false },
      ],
      hint: 'A untuk Apel yang manis dan renyah!',
    },
    {
      id: 'ch2',
      prompt: 'Huruf "B" adalah awalan untuk kata apa?',
      visual: '⚽',
      visualType: 'emoji',
      audioText: 'Huruf B untuk benda apa?',
      options: [
        { id: 'o1', label: 'Ikan (I - K - A - N)', visual: '🐟', isCorrect: false },
        { id: 'o2', label: 'Bola (B - O - L - A)', visual: '⚽', isCorrect: true },
        { id: 'o3', label: 'Gajah (G - A - J - A - H)', visual: '🐘', isCorrect: false },
      ],
      hint: 'B untuk Bola bulat yang menggelinding.',
    },
    {
      id: 'ch3',
      prompt: 'Huruf "K" adalah awalan untuk kata apa?',
      visual: '🐱',
      visualType: 'emoji',
      audioText: 'Huruf K untuk hewan apa?',
      options: [
        { id: 'o1', label: 'Kucing (K - U - C - I - N - G)', visual: '🐱', isCorrect: true },
        { id: 'o2', label: 'Ayam (A - Y - A - M)', visual: '🐔', isCorrect: false },
        { id: 'o3', label: 'Sapi (S - A - P - I)', visual: '🐮', isCorrect: false },
      ],
      hint: 'K untuk Kucing berbulu lembut yang suka mengeong.',
    },
    {
      id: 'ch4',
      prompt: 'Huruf "P" adalah awalan untuk kata apa?',
      visual: '✈️',
      visualType: 'emoji',
      audioText: 'Huruf P untuk apa ya?',
      options: [
        { id: 'o1', label: 'Mobil', visual: '🚗', isCorrect: false },
        { id: 'o2', label: 'Pesawat', visual: '✈️', isCorrect: true },
        { id: 'o3', label: 'Kereta', visual: '🚆', isCorrect: false },
      ],
      hint: 'P untuk Pesawat yang terbang tinggi di awan!',
    },
  ],

  'cari-huruf': [
    {
      id: 'cr1',
      prompt: 'Pecahkan gelembung dengan huruf "D"!',
      visual: 'D',
      visualType: 'text',
      audioText: 'Pilih huruf D!',
      options: [
        { id: 'o1', label: 'B', isCorrect: false },
        { id: 'o2', label: 'D', isCorrect: true },
        { id: 'o3', label: 'O', isCorrect: false },
      ],
    },
    {
      id: 'cr2',
      prompt: 'Pecahkan gelembung dengan huruf "K"!',
      visual: 'K',
      visualType: 'text',
      audioText: 'Pilih huruf K!',
      options: [
        { id: 'o1', label: 'X', isCorrect: false },
        { id: 'o2', label: 'K', isCorrect: true },
        { id: 'o3', label: 'H', isCorrect: false },
      ],
    },
    {
      id: 'cr3',
      prompt: 'Pecahkan gelembung dengan huruf "R"!',
      visual: 'R',
      visualType: 'text',
      audioText: 'Pilih huruf R!',
      options: [
        { id: 'o1', label: 'P', isCorrect: false },
        { id: 'o2', label: 'B', isCorrect: false },
        { id: 'o3', label: 'R', isCorrect: true },
      ],
    },
  ],

  'huruf-vokal': [
    {
      id: 'hv1',
      prompt: 'Manakah yang termasuk huruf vokal?',
      visual: '🗣️',
      visualType: 'emoji',
      audioText: 'Manakah salah satu dari lima huruf vokal?',
      options: [
        { id: 'o1', label: 'Huruf A', isCorrect: true },
        { id: 'o2', label: 'Huruf B', isCorrect: false },
        { id: 'o3', label: 'Huruf T', isCorrect: false },
      ],
      hint: 'Ingat kata: A - I - U - E - O!',
    },
    {
      id: 'hv2',
      prompt: 'Huruf vokal apakah yang berbunyi seperti kata "IKAN"?',
      visual: '🐟',
      visualType: 'emoji',
      audioText: 'Huruf vokal untuk ikan?',
      options: [
        { id: 'o1', label: 'Huruf U', isCorrect: false },
        { id: 'o2', label: 'Huruf I', isCorrect: true },
        { id: 'o3', label: 'Huruf O', isCorrect: false },
      ],
      hint: 'I-kan diawali huruf vokal I!',
    },
    {
      id: 'hv3',
      prompt: 'Huruf vokal apakah yang berbentuk bulat penuh?',
      visual: '⭕',
      visualType: 'emoji',
      audioText: 'Huruf vokal bulat?',
      options: [
        { id: 'o1', label: 'Huruf O', isCorrect: true },
        { id: 'o2', label: 'Huruf E', isCorrect: false },
        { id: 'o3', label: 'Huruf A', isCorrect: false },
      ],
      hint: 'Huruf O bulat seperti donat!',
    },
  ],

  'angka-dasar': [
    {
      id: 'ad1',
      prompt: 'Manakah lambang Angka "3"?',
      visual: '3',
      visualType: 'text',
      audioText: 'Pilih angka tiga!',
      options: [
        { id: 'o1', label: '1', isCorrect: false },
        { id: 'o2', label: '3', isCorrect: true },
        { id: 'o3', label: '8', isCorrect: false },
      ],
      hint: 'Angka 3 seperti burung terbang di langit!',
    },
    {
      id: 'ad2',
      prompt: 'Manakah lambang Angka "5"?',
      visual: '5',
      visualType: 'text',
      audioText: 'Pilih angka lima!',
      options: [
        { id: 'o1', label: '2', isCorrect: false },
        { id: 'o2', label: '5', isCorrect: true },
        { id: 'o3', label: '6', isCorrect: false },
      ],
      hint: 'Angka 5 punya topi datar dan perut buncit!',
    },
    {
      id: 'ad3',
      prompt: 'Manakah lambang Angka "10"?',
      visual: '10',
      visualType: 'text',
      audioText: 'Pilih angka sepuluh!',
      options: [
        { id: 'o1', label: '10', isCorrect: true },
        { id: 'o2', label: '01', isCorrect: false },
        { id: 'o3', label: '100', isCorrect: false },
      ],
      hint: 'Angka 10 terdiri dari angka 1 dan angka 0!',
    },
  ],

  'cocok-angka': [
    {
      id: 'ca1',
      prompt: 'Berapakah jumlah bintang berkilau ini? ⭐ ⭐ ⭐',
      visual: '⭐⭐⭐',
      visualType: 'emoji',
      audioText: 'Ada berapa bintang di layar?',
      options: [
        { id: 'o1', label: '2 Bintang', isCorrect: false },
        { id: 'o2', label: '3 Bintang', isCorrect: true },
        { id: 'o3', label: '4 Bintang', isCorrect: false },
      ],
      hint: 'Satu, dua, tiga bintang!',
    },
    {
      id: 'ca2',
      prompt: 'Berapakah jumlah bebek berenang ini? 🦆 🦆 🦆 🦆',
      visual: '🦆🦆🦆🦆',
      visualType: 'emoji',
      audioText: 'Hitung bebek lucu ini!',
      options: [
        { id: 'o1', label: '3 Bebek', isCorrect: false },
        { id: 'o2', label: '4 Bebek', isCorrect: true },
        { id: 'o3', label: '5 Bebek', isCorrect: false },
      ],
      hint: 'Ada empat ekor bebek kwek-kwek!',
    },
  ],

  'warna-dasar': [
    {
      id: 'wd1',
      prompt: 'Manakah warna MERAH cerah seperti buah stroberi?',
      visual: '🍓',
      visualType: 'emoji',
      audioText: 'Pilihlah warna merah!',
      options: [
        { id: 'o1', label: 'Merah (Red)', visual: '🔴', isCorrect: true },
        { id: 'o2', label: 'Kuning (Yellow)', visual: '🟡', isCorrect: false },
        { id: 'o3', label: 'Biru (Blue)', visual: '🔵', isCorrect: false },
      ],
      hint: 'Merah seperti stroberi dan tomat segar!',
    },
    {
      id: 'wd2',
      prompt: 'Manakah warna KUNING cerah seperti buah pisang?',
      visual: '🍌',
      visualType: 'emoji',
      audioText: 'Pilihlah warna kuning!',
      options: [
        { id: 'o1', label: 'Hijau (Green)', visual: '🟢', isCorrect: false },
        { id: 'o2', label: 'Kuning (Yellow)', visual: '🟡', isCorrect: true },
        { id: 'o3', label: 'Ungu (Purple)', visual: '🟣', isCorrect: false },
      ],
      hint: 'Kuning seperti matahari dan pisang matang!',
    },
    {
      id: 'wd3',
      prompt: 'Manakah warna BIRU indah seperti langit siang hari?',
      visual: '🌤️',
      visualType: 'emoji',
      audioText: 'Pilihlah warna biru!',
      options: [
        { id: 'o1', label: 'Biru (Blue)', visual: '🔵', isCorrect: true },
        { id: 'o2', label: 'Merah (Red)', visual: '🔴', isCorrect: false },
        { id: 'o3', label: 'Jingga (Orange)', visual: '🟠', isCorrect: false },
      ],
      hint: 'Biru seperti samudra luas dan langit cerah!',
    },
  ],

  'cari-benda-warna': [
    {
      id: 'cbw1',
      prompt: 'Benda manakah yang memiliki warna HIJAU alami?',
      visual: '🌿',
      visualType: 'emoji',
      audioText: 'Mana benda berwarna hijau?',
      options: [
        { id: 'o1', label: 'Daun Segar (Hijau)', visual: '🍃', isCorrect: true },
        { id: 'o2', label: 'Wortel (Oranye)', visual: '🥕', isCorrect: false },
        { id: 'o3', label: 'Apel (Merah)', visual: '🍎', isCorrect: false },
      ],
    },
    {
      id: 'cbw2',
      prompt: 'Benda manakah yang memiliki warna KUNING terang?',
      visual: '☀️',
      visualType: 'emoji',
      audioText: 'Mana benda berwarna kuning?',
      options: [
        { id: 'o1', label: 'Matahari Pagi', visual: '☀️', isCorrect: true },
        { id: 'o2', label: 'Awan Hujan Kelabu', visual: '🌧️', isCorrect: false },
        { id: 'o3', label: 'Terong Ungu', visual: '🍆', isCorrect: false },
      ],
    },
  ],

  'bentuk-geometri': [
    {
      id: 'bg1',
      prompt: 'Bentuk apakah yang bundar seperti roda sepeda dan bola?',
      visual: '⭕',
      visualType: 'emoji',
      audioText: 'Bentuk apa yang bundar tanpa sudut?',
      options: [
        { id: 'o1', label: 'Lingkaran (Bulat)', visual: '⭕', isCorrect: true },
        { id: 'o2', label: 'Persegi (Kotak)', visual: '⏹️', isCorrect: false },
        { id: 'o3', label: 'Segitiga', visual: '🔺', isCorrect: false },
      ],
      hint: 'Lingkaran bisa berputar tanpa henti!',
    },
    {
      id: 'bg2',
      prompt: 'Bentuk apakah yang mempunyai 3 sudut tajam?',
      visual: '🔺',
      visualType: 'emoji',
      audioText: 'Bentuk apa yang mempunyai tiga sudut?',
      options: [
        { id: 'o1', label: 'Persegi', visual: '⏹️', isCorrect: false },
        { id: 'o2', label: 'Segitiga', visual: '🔺', isCorrect: true },
        { id: 'o3', label: 'Bintang', visual: '⭐', isCorrect: false },
      ],
      hint: 'Segitiga seperti sepotong pizza lezat!',
    },
    {
      id: 'bg3',
      prompt: 'Bentuk apakah yang mempunyai 4 sisi sama panjang?',
      visual: '⏹️',
      visualType: 'emoji',
      audioText: 'Bentuk dengan empat sisi sama panjang?',
      options: [
        { id: 'o1', label: 'Persegi (Kotak)', visual: '⏹️', isCorrect: true },
        { id: 'o2', label: 'Lingkaran', visual: '⭕', isCorrect: false },
        { id: 'o3', label: 'Hati', visual: '❤️', isCorrect: false },
      ],
      hint: 'Persegi seperti jendela rumah dan dadu mainan!',
    },
  ],

  'cocok-bentuk': [
    {
      id: 'cb1',
      prompt: 'Bentuk apa yang cocok dengan siluet atap rumah? 🔺',
      visual: '🏠',
      visualType: 'emoji',
      audioText: 'Bentuk apa yang mirip atap rumah?',
      options: [
        { id: 'o1', label: 'Segitiga', visual: '🔺', isCorrect: true },
        { id: 'o2', label: 'Lingkaran', visual: '⭕', isCorrect: false },
        { id: 'o3', label: 'Bintang', visual: '⭐', isCorrect: false },
      ],
    },
    {
      id: 'cb2',
      prompt: 'Bentuk apa yang cocok dengan siluet roda mobil? ⭕',
      visual: '🚗',
      visualType: 'emoji',
      audioText: 'Bentuk apa yang cocok untuk roda mobil?',
      options: [
        { id: 'o1', label: 'Persegi', visual: '⏹️', isCorrect: false },
        { id: 'o2', label: 'Lingkaran', visual: '⭕', isCorrect: true },
        { id: 'o3', label: 'Hati', visual: '❤️', isCorrect: false },
      ],
    },
  ],

  'suara-hewan': [
    {
      id: 'sh1',
      prompt: 'Hewan apakah yang bersuara "Meong... meong..."?',
      visual: '🐱',
      visualType: 'emoji',
      audioText: 'Hewan apa yang bunyinya meong meong?',
      options: [
        { id: 'o1', label: 'Kucing Manis', visual: '🐱', isCorrect: true },
        { id: 'o2', label: 'Anjing Setia', visual: '🐶', isCorrect: false },
        { id: 'o3', label: 'Sapi Gemuk', visual: '🐮', isCorrect: false },
      ],
      hint: 'Kucing suka dielus bulunya dan makan ikan!',
    },
    {
      id: 'sh2',
      prompt: 'Hewan apakah yang bersuara "Mooo... mooo..." dan menghasilkan susu segar?',
      visual: '🐮',
      visualType: 'emoji',
      audioText: 'Hewan apa yang berbunyi moo dan menghasilkan susu?',
      options: [
        { id: 'o1', label: 'Ayam Jago', visual: '🐔', isCorrect: false },
        { id: 'o2', label: 'Sapi', visual: '🐮', isCorrect: true },
        { id: 'o3', label: 'Bebek', visual: '🦆', isCorrect: false },
      ],
      hint: 'Sapi makan rumput hijau di padang rumput!',
    },
    {
      id: 'sh3',
      prompt: 'Hewan apakah yang berkokok "Kukuruyuk!" di pagi hari?',
      visual: '🐔',
      visualType: 'emoji',
      audioText: 'Hewan apa yang berkokok kukuruyuk?',
      options: [
        { id: 'o1', label: 'Ayam Jantan', visual: '🐔', isCorrect: true },
        { id: 'o2', label: 'Burung Elang', visual: '🦅', isCorrect: false },
        { id: 'o3', label: 'Kambing', visual: '🐐', isCorrect: false },
      ],
      hint: 'Ayam membangunkan kita untuk salat subuh!',
    },
  ],

  'habitat-hewan': [
    {
      id: 'hh1',
      prompt: 'Di manakah ikan lumba-lumba dan hiu tinggal?',
      visual: '🐬',
      visualType: 'emoji',
      audioText: 'Di mana ikan lumba-lumba tinggal?',
      options: [
        { id: 'o1', label: 'Di Dalam Air / Laut', visual: '🌊', isCorrect: true },
        { id: 'o2', label: 'Di Atas Pohon', visual: '🌳', isCorrect: false },
        { id: 'o3', label: 'Di Gua Batu', visual: '⛰️', isCorrect: false },
      ],
    },
    {
      id: 'hh2',
      prompt: 'Di manakah burung elang membuat sarang dan terbang?',
      visual: '🦅',
      visualType: 'emoji',
      audioText: 'Di mana burung elang bersarang?',
      options: [
        { id: 'o1', label: 'Di Dalam Danau', visual: '🌊', isCorrect: false },
        { id: 'o2', label: 'Di Pohon Tinggi / Udara', visual: '🌲', isCorrect: true },
        { id: 'o3', label: 'Di Bawah Tanah', visual: '🕳️', isCorrect: false },
      ],
    },
  ],

  'makanan-hewan': [
    {
      id: 'mh1',
      prompt: 'Makanan apakah yang paling disukai kelinci lucu bertelinga panjang?',
      visual: '🐰',
      visualType: 'emoji',
      audioText: 'Apa makanan kesukaan kelinci?',
      options: [
        { id: 'o1', label: 'Wortel Segar', visual: '🥕', isCorrect: true },
        { id: 'o2', label: 'Daging Panggang', visual: '🥩', isCorrect: false },
        { id: 'o3', label: 'Es Krim', visual: '🍦', isCorrect: false },
      ],
      hint: 'Kelinci suka mengunyah wortel oranye renyah!',
    },
    {
      id: 'mh2',
      prompt: 'Makanan apakah yang paling disukai monyet pintar di dahan pohon?',
      visual: '🐵',
      visualType: 'emoji',
      audioText: 'Apa makanan kesukaan monyet?',
      options: [
        { id: 'o1', label: 'Cabai Pedas', visual: '🌶️', isCorrect: false },
        { id: 'o2', label: 'Buah Pisang Manis', visual: '🍌', isCorrect: true },
        { id: 'o3', label: 'Cokelat', visual: '🍫', isCorrect: false },
      ],
    },
  ],

  'huruf-hijaiyah': [
    {
      id: 'hj1',
      prompt: 'Manakah huruf Hijaiyah "Alif" ( ا )?',
      visual: 'ا',
      visualType: 'text',
      audioText: 'Manakah huruf hijaiyah Alif?',
      options: [
        { id: 'o1', label: 'Alif ( ا )', isCorrect: true },
        { id: 'o2', label: 'Ba ( ب )', isCorrect: false },
        { id: 'o3', label: 'Ta ( ت )', isCorrect: false },
      ],
      hint: 'Alif tegak lurus seperti tongkat!',
    },
    {
      id: 'hj2',
      prompt: 'Manakah huruf Hijaiyah "Ba" ( ب ) dengan 1 titik di bawah?',
      visual: 'ب',
      visualType: 'text',
      audioText: 'Manakah huruf Ba dengan titik di bawah?',
      options: [
        { id: 'o1', label: 'Ta ( ت )', isCorrect: false },
        { id: 'o2', label: 'Ba ( ب )', isCorrect: true },
        { id: 'o3', label: 'Tsa ( ث )', isCorrect: false },
      ],
      hint: 'Ba seperti perahu dengan 1 batu mutiara di bawahnya!',
    },
    {
      id: 'hj3',
      prompt: 'Manakah huruf Hijaiyah "Ta" ( ت ) dengan 2 titik di atas?',
      visual: 'ت',
      visualType: 'text',
      audioText: 'Manakah huruf Ta dengan dua titik di atas?',
      options: [
        { id: 'o1', label: 'Ta ( ت )', isCorrect: true },
        { id: 'o2', label: 'Ba ( ب )', isCorrect: false },
        { id: 'o3', label: 'Jim ( ج )', isCorrect: false },
      ],
      hint: 'Ta punya 2 titik di atas seperti mata tersenyum!',
    },
    {
      id: 'hj4',
      prompt: 'Manakah huruf Hijaiyah "Jim" ( ج )?',
      visual: 'ج',
      visualType: 'text',
      audioText: 'Manakah huruf Jim?',
      options: [
        { id: 'o1', label: 'Ha ( ح )', isCorrect: false },
        { id: 'o2', label: 'Jim ( ج )', isCorrect: true },
        { id: 'o3', label: 'Kha ( خ )', isCorrect: false },
      ],
      hint: 'Jim punya satu titik di dalam perutnya yang bundar!',
    },
  ],

  'angka-arab': [
    {
      id: 'aa1',
      prompt: 'Manakah angka Arab untuk bilangan "Satu" ( ١ / Wahidun)?',
      visual: '١',
      visualType: 'text',
      audioText: 'Manakah angka Arab satu wahidun?',
      options: [
        { id: 'o1', label: 'Wahid ( ١ )', isCorrect: true },
        { id: 'o2', label: 'Itsnan ( ٢ )', isCorrect: false },
        { id: 'o3', label: 'Tsalatsah ( ٣ )', isCorrect: false },
      ],
    },
    {
      id: 'aa2',
      prompt: 'Manakah angka Arab untuk bilangan "Dua" ( ٢ / Itsnani)?',
      visual: '٢',
      visualType: 'text',
      audioText: 'Manakah angka Arab dua itsnan?',
      options: [
        { id: 'o1', label: 'Arba\'ah ( ٤ )', isCorrect: false },
        { id: 'o2', label: 'Itsnan ( ٢ )', isCorrect: true },
        { id: 'o3', label: 'Wahid ( ١ )', isCorrect: false },
      ],
    },
  ],

  'rukun-islam': [
    {
      id: 'ri1',
      prompt: 'Ada berapakah Rukun Islam yang wajib kita amalkan?',
      visual: '🕌',
      visualType: 'emoji',
      audioText: 'Ada berapa rukun Islam?',
      options: [
        { id: 'o1', label: '5 Rukun Islam', isCorrect: true },
        { id: 'o2', label: '3 Rukun Islam', isCorrect: false },
        { id: 'o3', label: '6 Rukun Islam', isCorrect: false },
      ],
      hint: 'Rukun Islam ada 5: Syahadat, Salat, Zakat, Puasa, dan Haji!',
    },
    {
      id: 'ri2',
      prompt: 'Apa Rukun Islam yang pertama kali diucapkan seorang muslim?',
      visual: '☝️',
      visualType: 'emoji',
      audioText: 'Apa rukun Islam yang pertama?',
      options: [
        { id: 'o1', label: 'Mengucap Dua Kalimat Syahadat', isCorrect: true },
        { id: 'o2', label: 'Mengerjakan Salat Lima Waktu', isCorrect: false },
        { id: 'o3', label: 'Berpuasa di Bulan Ramadan', isCorrect: false },
      ],
      hint: 'Asyhadu alla ilaha illallah wa asyhadu anna Muhammadar Rasulullah.',
    },
    {
      id: 'ri3',
      prompt: 'Berapa kali kita mendirikan salat wajib dalam sehari semalam?',
      visual: '⏰',
      visualType: 'emoji',
      audioText: 'Berapa waktu salat wajib sehari semalam?',
      options: [
        { id: 'o1', label: '5 Waktu (Subuh, Zuhur, Asar, Magrib, Isya)', isCorrect: true },
        { id: 'o2', label: '3 Waktu', isCorrect: false },
        { id: 'o3', label: '7 Waktu', isCorrect: false },
      ],
    },
  ],

  'rukun-iman': [
    {
      id: 'rm1',
      prompt: 'Ada berapakah Rukun Iman yang wajib kita yakini?',
      visual: '⭐',
      visualType: 'emoji',
      audioText: 'Ada berapa rukun iman?',
      options: [
        { id: 'o1', label: '6 Rukun Iman', isCorrect: true },
        { id: 'o2', label: '5 Rukun Iman', isCorrect: false },
        { id: 'o3', label: '4 Rukun Iman', isCorrect: false },
      ],
      hint: 'Rukun iman ada 6!',
    },
    {
      id: 'rm2',
      prompt: 'Rukun Iman yang pertama adalah beriman kepada siapa?',
      visual: '🌌',
      visualType: 'emoji',
      audioText: 'Rukun iman pertama iman kepada siapa?',
      options: [
        { id: 'o1', label: 'Beriman kepada Allah SWT', isCorrect: true },
        { id: 'o2', label: 'Beriman kepada Malaikat', isCorrect: false },
        { id: 'o3', label: 'Beriman kepada Kitab Suci', isCorrect: false },
      ],
      hint: 'Allah adalah Tuhan Pencipta alam semesta.',
    },
  ],

  'doa-harian': [
    {
      id: 'dh1',
      prompt: 'Sebelum menikmati makanan lezat dan berkah, kita berdoa memohon apa?',
      visual: '🍽️',
      visualType: 'emoji',
      audioText: 'Doa apakah sebelum kita makan?',
      options: [
        { id: 'o1', label: 'Allahumma barik lana fi ma razaqtana...', isCorrect: true },
        { id: 'o2', label: 'Bismika Allahumma ahya wa bismika amut', isCorrect: false },
        { id: 'o3', label: 'Alhamdulillahilladzi ath\'amana...', isCorrect: false },
      ],
      hint: 'Memohon keberkahan rezeki dari Allah SWT.',
    },
    {
      id: 'dh2',
      prompt: 'Sebelum tidur di kasur empuk, kita membaca doa apa?',
      visual: '🛌',
      visualType: 'emoji',
      audioText: 'Doa apakah sebelum tidur malam?',
      options: [
        { id: 'o1', label: 'Bismika Allahumma ahya wa bismika amut', isCorrect: true },
        { id: 'o2', label: 'Rabbighfirli waliwalidayya...', isCorrect: false },
        { id: 'o3', label: 'Bismillahi tawakkaltu alallah', isCorrect: false },
      ],
      hint: 'Dengan nama-Mu ya Allah, aku hidup dan aku mati.',
    },
    {
      id: 'dh3',
      prompt: 'Doa untuk kedua orang tua tercinta memohon kasih sayang seperti...',
      visual: '👨‍👩‍👧',
      visualType: 'emoji',
      audioText: 'Doa untuk ayah dan ibu tercinta?',
      options: [
        { id: 'o1', label: 'Rabbighfirli waliwalidayya warhamhuma kama rabbayani shaghira', isCorrect: true },
        { id: 'o2', label: 'Allahumma yassir wala tu\'assir', isCorrect: false },
        { id: 'o3', label: 'Alhamdulillah', isCorrect: false },
      ],
      hint: 'Ya Allah ampunilah dosaku dan dosa kedua orang tuaku.',
    },
  ],

  'adab-akhlak-anak': [
    {
      id: 'aa_1',
      prompt: 'Ketika bertemu guru atau teman di sekolah, apa yang sebaiknya kita ucapkan?',
      visual: '🤝',
      visualType: 'emoji',
      audioText: 'Apa yang kita ucapkan saat bertemu teman dan guru?',
      options: [
        { id: 'o1', label: 'Mengucap "Assalamu\'alaikum" dan tersenyum', isCorrect: true },
        { id: 'o2', label: 'Diam saja dan berpaling', isCorrect: false },
        { id: 'o3', label: 'Berlari kencang', isCorrect: false },
      ],
      hint: 'Salam menebarkan kedamaian dan kasih sayang!',
    },
    {
      id: 'aa_2',
      prompt: 'Jika teman ingin meminjam mainan kita, sikap terpuji apa yang kita lakukan?',
      visual: '🧸',
      visualType: 'emoji',
      audioText: 'Sikap baik saat teman ingin bermain bersama?',
      options: [
        { id: 'o1', label: 'Berbagi mainan dan bermain bersama ceria', isCorrect: true },
        { id: 'o2', label: 'Menyembunyikan mainan', isCorrect: false },
        { id: 'o3', label: 'Marah-marah', isCorrect: false },
      ],
      hint: 'Anak yang suka berbagi memiliki banyak teman.',
    },
    {
      id: 'aa_3',
      prompt: 'Di manakah tempat yang tepat untuk membuang bungkus makanan atau sampah?',
      visual: '🗑️',
      visualType: 'emoji',
      audioText: 'Di mana membuang sampah yang benar?',
      options: [
        { id: 'o1', label: 'Di Tempat Sampah', isCorrect: true },
        { id: 'o2', label: 'Di Lantai Kamar', isCorrect: false },
        { id: 'o3', label: 'Di Halaman Sekolah', isCorrect: false },
      ],
      hint: 'Kebersihan adalah sebagian dari iman!',
    },
  ],

  'anggota-tubuh': [
    {
      id: 'at1',
      prompt: 'Bagian tubuh manakah yang kita gunakan untuk MELIHAT warna pelangi?',
      visual: '👀',
      visualType: 'emoji',
      audioText: 'Bagian tubuh untuk melihat?',
      options: [
        { id: 'o1', label: 'Mata yang Sehat', visual: '👀', isCorrect: true },
        { id: 'o2', label: 'Telinga', visual: '👂', isCorrect: false },
        { id: 'o3', label: 'Hidung', visual: '👃', isCorrect: false },
      ],
      hint: 'Kita punya dua mata yang indah.',
    },
    {
      id: 'at2',
      prompt: 'Bagian tubuh manakah yang kita gunakan untuk MENDENGARKAN musik merdu?',
      visual: '👂',
      visualType: 'emoji',
      audioText: 'Bagian tubuh untuk mendengar?',
      options: [
        { id: 'o1', label: 'Telinga Kanan & Kiri', visual: '👂', isCorrect: true },
        { id: 'o2', label: 'Lidah', visual: '👅', isCorrect: false },
        { id: 'o3', label: 'Tangan', visual: '✋', isCorrect: false },
      ],
    },
    {
      id: 'at3',
      prompt: 'Bagian tubuh manakah yang kita gunakan untuk BERLARI kencang di taman?',
      visual: '🏃',
      visualType: 'emoji',
      audioText: 'Bagian tubuh untuk berlari?',
      options: [
        { id: 'o1', label: 'Kaki yang Kuat', visual: '🦶', isCorrect: true },
        { id: 'o2', label: 'Siku', visual: '💪', isCorrect: false },
        { id: 'o3', label: 'Hidung', visual: '👃', isCorrect: false },
      ],
    },
  ],

  'buah-sayuran': [
    {
      id: 'bs1',
      prompt: 'Buah manis berbulir kuning yang dikupas sebelum dimakan adalah...',
      visual: '🍌',
      visualType: 'emoji',
      audioText: 'Buah kuning yang manis dikupas?',
      options: [
        { id: 'o1', label: 'Pisang Manis', visual: '🍌', isCorrect: true },
        { id: 'o2', label: 'Semangka', visual: '🍉', isCorrect: false },
        { id: 'o3', label: 'Alpukat', visual: '🥑', isCorrect: false },
      ],
    },
    {
      id: 'bs2',
      prompt: 'Sayuran oranye kaya vitamin A yang sangat baik untuk mata sehat adalah...',
      visual: '🥕',
      visualType: 'emoji',
      audioText: 'Sayuran oranye yang baik untuk mata sehat?',
      options: [
        { id: 'o1', label: 'Wortel Bergizi', visual: '🥕', isCorrect: true },
        { id: 'o2', label: 'Bayam', visual: '🥬', isCorrect: false },
        { id: 'o3', label: 'Kentang', visual: '🥔', isCorrect: false },
      ],
    },
  ],

  'kendaraan-transportasi': [
    {
      id: 'kt1',
      prompt: 'Kendaraan yang memiliki sayap lebar dan terbang tinggi di atas awan adalah...',
      visual: '✈️',
      visualType: 'emoji',
      audioText: 'Kendaraan yang terbang di awan?',
      options: [
        { id: 'o1', label: 'Pesawat Terbang', visual: '✈️', isCorrect: true },
        { id: 'o2', label: 'Kapal Laut', visual: '🚢', isCorrect: false },
        { id: 'o3', label: 'Mobil Sedan', visual: '🚗', isCorrect: false },
      ],
    },
    {
      id: 'kt2',
      prompt: 'Kendaraan yang melaju di atas rel besi panjang sambil berbunyi "Tut... tut... gujes!" adalah...',
      visual: '🚆',
      visualType: 'emoji',
      audioText: 'Kendaraan yang berjalan di rel besi?',
      options: [
        { id: 'o1', label: 'Kereta Api', visual: '🚆', isCorrect: true },
        { id: 'o2', label: 'Sepeda Motor', visual: '🛵', isCorrect: false },
        { id: 'o3', label: 'Helikopter', visual: '🚁', isCorrect: false },
      ],
    },
  ],

  'bahasa-inggris-dasar': [
    {
      id: 'bi1',
      prompt: 'What color is "RED" in Bahasa Indonesia?',
      visual: '🔴',
      visualType: 'emoji',
      audioText: 'Apa arti kata Red?',
      options: [
        { id: 'o1', label: 'Merah', isCorrect: true },
        { id: 'o2', label: 'Kuning', isCorrect: false },
        { id: 'o3', label: 'Biru', isCorrect: false },
      ],
    },
    {
      id: 'bi2',
      prompt: 'What animal is "CAT" in Bahasa Indonesia?',
      visual: '🐱',
      visualType: 'emoji',
      audioText: 'Apa arti kata Cat?',
      options: [
        { id: 'o1', label: 'Kucing', isCorrect: true },
        { id: 'o2', label: 'Anjing', isCorrect: false },
        { id: 'o3', label: 'Kelinci', isCorrect: false },
      ],
    },
    {
      id: 'bi3',
      prompt: 'What number is "THREE" in Bahasa Indonesia?',
      visual: '3️⃣',
      visualType: 'emoji',
      audioText: 'Berapa angka Three?',
      options: [
        { id: 'o1', label: 'Tiga (3)', isCorrect: true },
        { id: 'o2', label: 'Satu (1)', isCorrect: false },
        { id: 'o3', label: 'Lima (5)', isCorrect: false },
      ],
    },
  ],
};

// --- WORD BUILDER QUESTIONS (Menyusun Kata) ---
export const WORD_BUILDER_QUESTIONS: WordBuildQuestion[] = [
  {
    id: 'wb1',
    targetWord: 'BOLA',
    hint: 'Benda bulat untuk ditendang ke gawang',
    emoji: '⚽',
    scrambledLetters: ['L', 'B', 'A', 'O'],
  },
  {
    id: 'wb2',
    targetWord: 'APEL',
    hint: 'Buah merah manis dan renyah',
    emoji: '🍎',
    scrambledLetters: ['P', 'A', 'L', 'E'],
  },
  {
    id: 'wb3',
    targetWord: 'SAPI',
    hint: 'Hewan penghasil susu segar yang suka makan rumput',
    emoji: '🐮',
    scrambledLetters: ['P', 'S', 'I', 'A'],
  },
  {
    id: 'wb4',
    targetWord: 'IKAN',
    hint: 'Hewan berenang lincah di dalam air',
    emoji: '🐟',
    scrambledLetters: ['K', 'I', 'N', 'A'],
  },
  {
    id: 'wb5',
    targetWord: 'BUKU',
    hint: 'Jendela ilmu penuh cerita bergambar',
    emoji: '📚',
    scrambledLetters: ['K', 'B', 'U', 'U'],
  },
  {
    id: 'wb6',
    targetWord: 'AYAM',
    hint: 'Hewan bertelur yang berkokok kukuruyuk di pagi hari',
    emoji: '🐔',
    scrambledLetters: ['Y', 'A', 'M', 'A'],
  },
  {
    id: 'wb7',
    targetWord: 'ROTI',
    hint: 'Makanan sarapan lembut bersama selai buah',
    emoji: '🍞',
    scrambledLetters: ['T', 'R', 'I', 'O'],
  },
  {
    id: 'wb8',
    targetWord: 'MATA',
    hint: 'Bagian tubuh kita untuk melihat keindahan ciptaan Allah',
    emoji: '👀',
    scrambledLetters: ['T', 'M', 'A', 'A'],
  },
];

// --- SEQUENCE ORDER QUESTIONS ---
export const SEQUENCE_SETS: Record<string, { title: string; steps: SequenceStep[] }> = {
  'urut-angka': {
    title: 'Urutkan Angka dari Terkecil ke Terbesar',
    steps: [
      { id: 's1', order: 1, label: 'Angka 1', emoji: '1️⃣', description: 'Bilangan satu' },
      { id: 's2', order: 2, label: 'Angka 2', emoji: '2️⃣', description: 'Bilangan dua' },
      { id: 's3', order: 3, label: 'Angka 3', emoji: '3️⃣', description: 'Bilangan tiga' },
      { id: 's4', order: 4, label: 'Angka 4', emoji: '4️⃣', description: 'Bilangan empat' },
      { id: 's5', order: 5, label: 'Angka 5', emoji: '5️⃣', description: 'Bilangan lima' },
    ],
  },
  'wudhu-salat': {
    title: 'Urutan Berwudhu yang Benar',
    steps: [
      { id: 'w1', order: 1, label: 'Mencuci Tangan', emoji: '🧼', description: 'Basuh kedua telapak tangan hingga bersih' },
      { id: 'w2', order: 2, label: 'Kumur & Hidung', emoji: '💧', description: 'Berkumur-kumur dan basuh hidung' },
      { id: 'w3', order: 3, label: 'Membasuh Muka', emoji: '🫧', description: 'Basuh wajah 3 kali secara merata' },
      { id: 'w4', order: 4, label: 'Membasuh Tangan', emoji: '💪', description: 'Basuh tangan kanan & kiri hingga siku' },
      { id: 'w5', order: 5, label: 'Membasuh Kaki', emoji: '🦶', description: 'Basuh kaki kanan & kiri hingga mata kaki' },
    ],
  },
  'urutan-proses': {
    title: 'Siklus Tumbuhnya Pohon Apel',
    steps: [
      { id: 'p1', order: 1, label: '1. Biji Ditanam', emoji: '🌰', description: 'Menanam benih di tanah subur' },
      { id: 'p2', order: 2, label: '2. Tunas Kecil', emoji: '🌱', description: 'Tunas hijau mulai muncul ke atas' },
      { id: 'p3', order: 3, label: '3. Pohon Rindang', emoji: '🌳', description: 'Tumbuh cabang dan daun hijau lebat' },
      { id: 'p4', order: 4, label: '4. Berbuah Manis', emoji: '🍎', description: 'Pohon menghasilkan buah apel lezat' },
    ],
  },
};

// --- MEMORY CARD FLIP ITEMS ---
export const MEMORY_CARDS_POOL: MemoryCardItem[] = [
  { id: 'm1', label: 'Singa Berani', emoji: '🦁' },
  { id: 'm2', label: 'Gajah Ramah', emoji: '🐘' },
  { id: 'm3', label: 'Kucing Lucu', emoji: '🐱' },
  { id: 'm4', label: 'Kelinci Putih', emoji: '🐰' },
  { id: 'm5', label: 'Panda Gemuk', emoji: '🐼' },
  { id: 'm6', label: 'Katak Hijau', emoji: '🐸' },
];

// --- COLORING TEMPLATES ---
export interface ColoringTemplate {
  id: string;
  title: string;
  description: string;
  shapes: {
    id: string;
    label: string;
    path: string; // SVG path
    defaultFill: string;
  }[];
}

export const COLORING_TEMPLATES: ColoringTemplate[] = [
  {
    id: 'ct_fish',
    title: 'Ikan Lucu Berenang di Samudra',
    description: 'Beri warna sirip, ekor, dan tubuh ikan!',
    shapes: [
      { id: 'body', label: 'Tubuh Ikan', path: 'M 50 150 C 120 70, 260 70, 320 150 C 260 230, 120 230, 50 150 Z', defaultFill: '#ffffff' },
      { id: 'tail', label: 'Ekor Ikan', path: 'M 50 150 L 10 90 L 10 210 Z', defaultFill: '#ffffff' },
      { id: 'fin', label: 'Sirip Atas', path: 'M 180 100 C 190 40, 240 40, 250 100 Z', defaultFill: '#ffffff' },
      { id: 'eye', label: 'Mata Ikan', path: 'M 270 140 A 12 12 0 1 0 270 141 Z', defaultFill: '#1e293b' },
    ],
  },
  {
    id: 'ct_house',
    title: 'Rumah Impian Masa Depan',
    description: 'Warnai atap segitiga, dinding persegi, dan pintu ceria!',
    shapes: [
      { id: 'roof', label: 'Atap Segitiga', path: 'M 80 140 L 200 40 L 320 140 Z', defaultFill: '#ffffff' },
      { id: 'walls', label: 'Dinding Rumah', path: 'M 100 140 L 300 140 L 300 280 L 100 280 Z', defaultFill: '#ffffff' },
      { id: 'door', label: 'Pintu Masuk', path: 'M 170 200 L 230 200 L 230 280 L 170 280 Z', defaultFill: '#ffffff' },
      { id: 'window', label: 'Jendela Kaca', path: 'M 120 160 L 155 160 L 155 195 L 120 195 Z', defaultFill: '#ffffff' },
    ],
  },
  {
    id: 'ct_flower',
    title: 'Bunga Matahari Mekar Berseri',
    description: 'Warnai kelopak bunga, daun, dan tangkainya!',
    shapes: [
      { id: 'center', label: 'Pusat Bunga', path: 'M 200 150 A 40 40 0 1 0 200 151 Z', defaultFill: '#ffffff' },
      { id: 'petal1', label: 'Kelopak Atas', path: 'M 180 110 C 180 50, 220 50, 220 110 Z', defaultFill: '#ffffff' },
      { id: 'petal2', label: 'Kelopak Kanan', path: 'M 240 130 C 300 130, 300 170, 240 170 Z', defaultFill: '#ffffff' },
      { id: 'petal3', label: 'Kelopak Bawah', path: 'M 180 190 C 180 250, 220 250, 220 190 Z', defaultFill: '#ffffff' },
      { id: 'petal4', label: 'Kelopak Kiri', path: 'M 160 130 C 100 130, 100 170, 160 170 Z', defaultFill: '#ffffff' },
      { id: 'stem', label: 'Tangkai Batang', path: 'M 195 230 L 205 230 L 205 320 L 195 320 Z', defaultFill: '#ffffff' },
    ],
  },
];
