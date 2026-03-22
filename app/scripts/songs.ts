export interface Word {
  text: string;
  start: number;
  end: number;
}

export interface LyricLine {
  lineIndex: number;
  words: Word[];
}

export interface Song {
  id: number;
  day: number;
  title: string;
  artist: string;
  audioSrc: string;
  youtubeId: string;
  lyrics: LyricLine[];
  platforms?: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    tidal?: string;
  };
}

export const dailySongs: Song[] = [
  {
    id: 1,
    day: 1,
    title: "POMPA",
    artist: "PUSHER, BABA HASSAN, MERCURY",
    audioSrc: "./1_Pompa.mp3", 
    youtubeId: "AMYruSwj3Eg",
    platforms: {
      spotify:
        "https://open.spotify.com/track/5kg7VRIOn6ZnqRlRD4XWbk?si=fb86488acd404283",
      appleMusic:
        "https://music.apple.com/pl/album/pompa-single/1755710040?l=pl",
      tidal: "https://tidal.com/album/373401918/u",
    },
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "CO TY CHCESZ ODE MNIE WYNOCHA", start: 0.0, end: 1.75 },
          {
            text: "PRZECIEŻ WIDZĘ, ŻE TY WALISZ W NOCHA",
            start: 1.75,
            end: 3.65,
          },
          { text: "ALE WIOCHA ZA PASEM JEST OSTRA", start: 3.65, end: 5.5 },
          { text: "ODBEZPIECZONA, LAKO ZA NOSTRA", start: 5.5, end: 7.6 },
          { text: "EJ KOMPAN, ŚMIERDZI CI STOPA", start: 7.6, end: 9.5 },
        ],
      },
    ],
  },
  {
    id: 2,
    day: 2,
    title: "BALENCI",
    artist: "Malik Montana",
    audioSrc: "/2_Balenci.mp3",
    youtubeId: "PlDhjlnKihE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie chcę słuchać jej prеtensji", start: 0.0, end: 1.55 },
          { text: "Biorę na zakupy do Balеnci", start: 1.55, end: 4.45 },
          {
            text: "W kieszeni luźne czterdzieści tysięcy",
            start: 4.45,
            end: 7.05,
          },
          { text: "Doktor za to powiększy jej piersi", start: 7.05, end: 9.05 },
          { text: "Pościel, świeczki, no i szampan", start: 9.05, end: 12.35 },
        ],
      },
    ],
  },
  {
    id: 3,
    day: 3,
    title: "1998 (mam to we krwi)",
    artist: "Bedoes, Lanek",
    audioSrc: "/3_1998.mp3",
    youtubeId: "cpmWu9n7LaM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Żebym mógł zagrać pierwszy support przed Tede",
            start: 0.0,
            end: 1.95,
          },
          {
            text: "Więc mam w piździe, kto się znów ze mnie śmieje",
            start: 1.95,
            end: 3.4,
          },
          {
            text: "Czy jestem prawdziwy przed tamtym raperem czy nie",
            start: 3.4,
            end: 5.45,
          },
          { text: "Ja jestem Be do jebanego eS", start: 5.45, end: 7.05 },
          {
            text: "Mateusz, spoczywaj w pokoju w niebie",
            start: 7.05,
            end: 9.1,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    day: 4,
    title: "„Tak to leciało!”",
    artist: "Otsochodzi, Taco Hemingway, lohleq",
    audioSrc: "/4_Tak to leciało.mp3",
    youtubeId: "0c1wRHRJNUs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Studio, w którym siedzę, jest warte pięć milionów lub pięć domów",
            start: 0.0,
            end: 3.65,
          },
          {
            text: "Ty jedyne posiadłości masz w Monopolu — won od stołu",
            start: 3.65,
            end: 7.15,
          },
          {
            text: "Gra skończona — zbieraj się, pionku, byle do piątku, znów to samo (Oh)",
            start: 7.15,
            end: 10.85,
          },
          {
            text: "Twoja pani zna mnie dobrze — podpisałem jej krążek (Dobra — tak to leciało, haha)",
            start: 10.85,
            end: 15.15,
          },
          {
            text: "Jeszcze nie kończę (Ah), płyty, to nie numery na stypy (Ta-Tarcho Terror)",
            start: 15.15,
            end: 19.0,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    day: 5,
    title: "1 na 100",
    artist: "White 2115, Mata, Pedro, BroJustChill",
    audioSrc: "/5_1na100.mp3",
    youtubeId: "6-UVT5r8Ml0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ona chce lato z nami, bo zdążyłem ją do tego przyzwyczaić",
            start: 0.0,
            end: 3.55,
          },
          {
            text: "Ona chce lato z nami, przez różowe okulary mnie obczaić",
            start: 3.55,
            end: 7.35,
          },
          {
            text: "Jesteś jedna na sto, bo to dużo mniejsze miasto od Warszawy",
            start: 7.35,
            end: 11.1,
          },
          {
            text: "Mamy jedenastą, nie wpadła tutaj, żeby grać w warcaby",
            start: 11.05,
            end: 14.95,
          },
          {
            text: "Jeździłaś po mieście całą noc, tylko po to, żeby spotkać mnie",
            start: 14.95,
            end: 18.9,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    day: 6,
    title: "1DAY IN LA",
    artist: "francis, bambi, OKI",
    audioSrc: "/6_1DAY IN LA.mp3",
    youtubeId: "0DCmDBRunS8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Niski sufit, double cup i Don Julio w kieliszkach",
            start: 0.0,
            end: 4.05,
          },
          {
            text: "Bujam ciałem góra-dół, nie schodzę — tańcz ze mną",
            start: 4.05,
            end: 8.05,
          },
          {
            text: "Niski sufit, pełen klub, cały tłum dziś góra-dół",
            start: 8.05,
            end: 12.45,
          },
          {
            text: "LA w studio, ze mną skład, nie zasnę na pewno",
            start: 12.45,
            end: 16.45,
          },
          {
            text: "Niski sufit, double cup i Don Julio w kieliszkach",
            start: 16.45,
            end: 21.0,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    day: 7,
    title: "100 Tysięcy",
    artist: "Młody West",
    audioSrc: "/7_100 Tysięcy.mp3",
    youtubeId: "haDPE_AatW8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "(Rick) Rick Owens, ERD, hmm (Woo, ha, ha)",
            start: 0.0,
            end: 3.85,
          },
          {
            text: "Jedna noc w Berlinie, góra dwie, hmm (Never), huh",
            start: 3.85,
            end: 6.85,
          },
          { text: "B-B-B-B, B-Balenci' (B-B, B-B)", start: 6.85, end: 10.25 },
          {
            text: "Wyszedłem z bagna, mam wszystko Balenci' (Whau, Ba-Balenci')",
            start: 10.25,
            end: 14.15,
          },
          {
            text: "Znowu w duchu — Patrick Swayze, huh (Skrrt)",
            start: 14.15,
            end: 16.7,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    day: 8,
    title: "W GORĄCEJ WODZIE COMPANY",
    artist: "Bardal",
    audioSrc: "/8_W GORĄCEJ WODZIE COMPANY.mp3",
    youtubeId: "WmYMN3zSz70",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "To, co tak pierdolą, to zazwyczaj gówno prawda",
            start: 0.0,
            end: 2.65,
          },
          {
            text: "Wszedłem w słowo i se ujebałem kałem trampka",
            start: 2.65,
            end: 5.15,
          },
          {
            text: "Powiedziałeś co wiedziałeś, przestań kurwa ciamkać",
            start: 5.15,
            end: 7.65,
          },
          {
            text: "Spierdalaj już na górę Tadek, bo cię woła Danka",
            start: 7.65,
            end: 10.35,
          },
          {
            text: "Znowu jakaś szmata oferuje mi gorącą kąpiel",
            start: 10.35,
            end: 13.5,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    day: 9,
    title: "Luty",
    artist: "Otsochodzi",
    audioSrc: "/9_Luty.mp3",
    youtubeId: "joGbJTxzmrQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ehe, take znowu mam czysty", start: 0.0, end: 2.25 },
          {
            text: "Wziąłem ją od tyłu, kiedy grała sobie w Simsy, wow",
            start: 2.25,
            end: 5.1,
          },
          { text: "(Ehe) Włączył mi się Drizzy mode", start: 5.1, end: 7.05 },
          { text: "Dlatego w Londynie odwiedzamy OVO", start: 7.05, end: 9.35 },
          {
            text: "I kupuje sobie łaszki (Hehe), najdroższe ciuchy, no i najtańsze flaszki (Ej)",
            start: 9.35,
            end: 13.4,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    day: 10,
    title: "Mini Man",
    artist: "Okekel",
    audioSrc: "/10_Mini Man.mp3",
    youtubeId: "kiL_C0XjMD4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Prosta piła — sto koła, albo zawijam (Co? Co?)",
            start: 0.0,
            end: 2.25,
          },
          {
            text: "Dzieciaku, chcesz to zrobić? No to dawaj, z chaty wyłaź (Wyłaź)",
            start: 2.25,
            end: 5.4,
          },
          {
            text: "Płacze moja dusza, ale tata dumny z syna",
            start: 5.4,
            end: 8.05,
          },
          {
            text: "Piekło mam do przejścia, bo na murach ma być ksywa",
            start: 8.05,
            end: 11.05,
          },
          { text: "Oh, znowu czuję jakąś moc (Haha)", start: 11.05, end: 14.6 },
        ],
      },
    ],
  },
  {
    id: 11,
    day: 11,
    title: "Hit ’Em Up",
    artist: "Bedoes 2115",
    audioSrc: "/11_Hit 'Em Up.mp3",
    youtubeId: "EMAZETA-bXU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Rzuciłem, że będzie spokój, a Ty znów dajesz farmazon",
            start: 0.0,
            end: 2.35,
          },
          {
            text: "Trzymałem Twoją głowę wzywając ambulans",
            start: 2.35,
            end: 4.55,
          },
          {
            text: "Gdy Twoi ludzie stali obok i walili w chuja",
            start: 4.55,
            end: 6.75,
          },
          {
            text: "Ty, skoro było niehonorowo, czemu nikt nie pomógł?",
            start: 6.75,
            end: 9.45,
          },
          {
            text: "Bo było jeden na jednego — królu farmazonów",
            start: 9.45,
            end: 11.5,
          },
        ],
      },
    ],
  },
  {
    id: 12,
    day: 12,
    title: "CASABLANCA",
    artist: "Sentino, BNP",
    audioSrc: "/12_CASABLANCA.mp3",
    youtubeId: "B0B_mQZfeiY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Dookoła piękne panie, panie, panie", start: 0.0, end: 4.05 },
          {
            text: "Chcę tylko jedną dla mnie, dla mnie, dla mnie",
            start: 4.05,
            end: 7.65,
          },
          {
            text: "To, co chcę, to nie taniec, taniec, taniec",
            start: 7.65,
            end: 11.45,
          },
          {
            text: "Weź rzuć się lepiej na mnie, na mnie, na mnie",
            start: 11.45,
            end: 15.15,
          },
          {
            text: "Chodzą mi cały czas takie myśli po bani",
            start: 15.15,
            end: 18.7,
          },
        ],
      },
    ],
  },
  {
    id: 13,
    day: 13,
    title: "Papierosy_rmx",
    artist: "ReTo",
    audioSrc: "/13_Papierosy.mp3",
    youtubeId: "T0z4Sx2jpEk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie od wczoraj gram, żeby w życiu coś ugrać",
            start: 0.0,
            end: 1.95,
          },
          { text: "Dziś mam co ubrać, wypić, zapalić", start: 1.95, end: 3.55 },
          {
            text: "Nawet z tym trzecim sam widzę przesadę",
            start: 3.55,
            end: 5.35,
          },
          {
            text: "W życiu ze wszystkim umiem przesadzić",
            start: 5.35,
            end: 7.25,
          },
          {
            text: "Dlatego wciąż skacze z kwiatka na kwiatek",
            start: 7.25,
            end: 9.1,
          },
        ],
      },
    ],
  },
  {
    id: 14,
    day: 14,
    title: "Puerto Bounce",
    artist: "Żabson, ZetHa, Kizo",
    audioSrc: "/14_Puerto Bounce.mp3",
    youtubeId: "TZS-8J2Hczc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Zioło takie, że ohoho", start: 0.0, end: 1.95 },
          { text: "Mam zioło takie, że o mamma mia", start: 1.95, end: 3.75 },
          {
            text: "Pojechałem na przepyszne śniadanie, podawała je kelnerka, miała piękne siadanie",
            start: 3.75,
            end: 7.35,
          },
          {
            text: "Tutejszy buszek właśnie wjechał na banię",
            start: 7.35,
            end: 9.15,
          },
          {
            text: "Mogę wszystko, nie muszę, takie podsumowanie",
            start: 9.15,
            end: 11,
          },
        ],
      },
    ],
  },
  {
    id: 15,
    day: 15,
    title: "STRZELAM PETEM",
    artist: "Guzior",
    audioSrc: "/15_STRZELAM PETEM.mp3",
    youtubeId: "xT5BXK-ZIDU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Mam niunię bystrą, co zamknęłaby Ci pysk, yo, lecz nie chce",
            start: 0.0,
            end: 3.25,
          },
          {
            text: "Ale wiedz, że nie udałoby się wszystko to bez niej",
            start: 3.25,
            end: 6.65,
          },
          { text: "Dobre chłopaki ze złych stron, yo", start: 6.65, end: 9.75 },
          { text: "Dobre chłopaki ze złych...", start: 9.75, end: 11.85 },
          {
            text: "Mam niunię bystrą, co zamknęłaby Ci pysk, yo, lecz nie chce",
            start: 11.85,
            end: 15.4,
          },
        ],
      },
    ],
  },
  {
    id: 16,
    day: 16,
    title: "Rura musi yeah",
    artist: "Malik Montana, Kazior",
    audioSrc: "/16_Rura musi yeah.mp3",
    youtubeId: "tEy7kNvYYFw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "To dla wszystkich bandziorów na dyskotekach",
            start: 0.0,
            end: 2.25,
          },
          { text: "Co? Co? Rura musi jebać", start: 2.25, end: 4.75 },
          {
            text: "Dla szmulek, które lecą na dilerów w dresach",
            start: 4.75,
            end: 7.15,
          },
          { text: "Co? Co? Rura musi jebać", start: 7.15, end: 9.45 },
          {
            text: "To dla bandziorów w Mercedesach i Beemach",
            start: 9.45,
            end: 11.9,
          },
        ],
      },
    ],
  },
  {
    id: 17,
    day: 17,
    title: "Bellucci",
    artist: "Louis Villain, Guzior",
    audioSrc: "/17_Bellucci.mp3",
    youtubeId: "yZQEUYQ6bQE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ona mnie łapiе za rękę, mówi: Uważaj na jezdnie, robi się mokra",
            start: 0.0,
            end: 3.65,
          },
          {
            text: "Dzisiaj nie usnę, próbuję zapеłnić czymkolwiek tą pustkę",
            start: 3.65,
            end: 7.35,
          },
          {
            text: "Mam pełen bagaż doświadczeń cały wypchany w gotówce",
            start: 7.35,
            end: 11.05,
          },
          {
            text: "My wchodzimy, to na sto, odkładamy coś na bok, no i znowu witam rok, miasto",
            start: 11.05,
            end: 15.85,
          },
          {
            text: "Zawijamy sos, potem zawijamy stąd i idziemy dalej ponad to",
            start: 15.85,
            end: 20.0,
          },
        ],
      },
    ],
  },
  {
    id: 18,
    day: 18,
    title: "All Day Everyday (Łee)",
    artist: "Kaz Bałagane",
    audioSrc: "/18_All Day Everyday - Łee.mp3",
    youtubeId: "PVmZ9Lv7VBw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie dogadamy się, jak lubisz jarmuż",
            start: 0.0,
            end: 3.05,
          },
          {
            text: "Mam torbę pełną skarbów, jak przede mną Janusz",
            start: 3.05,
            end: 7.25,
          },
          { text: "Idę opierdolić Baba ghanoush", start: 7.25, end: 9.75 },
          {
            text: "Mordo, stylu nie wziąłem ze Stanów",
            start: 9.75,
            end: 12.05,
          },
          {
            text: "Mam chatę pełną stacków, jak bloki bałaganów",
            start: 12.05,
            end: 15.4,
          },
        ],
      },
    ],
  },
  {
    id: 19,
    day: 19,
    title: "W DRESACH",
    artist: "Jan-rapowanie, Szpaku",
    audioSrc: "/19_W DRESACH.mp3",
    youtubeId: "dEG8oAo2omI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "To nie kredyt na Rolexa, to owoce pracy, zawsze będzie ktoś bogatszy",
            start: 0.0,
            end: 6.05,
          },
          {
            text: "Nie odbierzesz satysfakcji, czemu nic nie robisz, tylko patrzysz, pa-pa-patrzysz?",
            start: 6.05,
            end: 11.85,
          },
          {
            text: "Pogoń nie ma sensu, cieszę się komfortem",
            start: 11.85,
            end: 14.45,
          },
          {
            text: "Nie chodzi o kwotę, tylko co z nią zrobić mogę (Yeah)",
            start: 14.45,
            end: 17.45,
          },
          {
            text: "Yo, uwierz, że doceniam, bo znam swoją drogę",
            start: 17.45,
            end: 20.3,
          },
        ],
      },
    ],
  },
  {
    id: 20,
    day: 20,
    title: "Impreza",
    artist: "Sobel",
    audioSrc: "/20_Impreza.mp3",
    youtubeId: "Sug433bP-mw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie wierzę, afera", start: 0.0, end: 2.1 },
          { text: "Ziomka chyba zabiera", start: 2.1, end: 4.05 },
          { text: "Nie wierzę, afera", start: 4.05, end: 5.95 },
          { text: "Uuuu, impreza", start: 5.95, end: 7.95 },
          {
            text: "(Ey), (Uuu) (Hehehe), (Ey) (U, u, u, uuuu), impreza",
            start: 7.95,
            end: 24.0,
          },
        ],
      },
    ],
  },
  {
    id: 21,
    day: 21,
    title: "Comme Des Garçons",
    artist: "Chivas",
    audioSrc: "/21_Comme.mp3",
    youtubeId: "wyp93o9erTs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Jagodowe Lucky Strike", start: 0.0, end: 2.15 },
          {
            text: "Chciałaś, bym się zmienił - jestem taki sam",
            start: 2.15,
            end: 4.85,
          },
          {
            text: "Tylko lajki mam, pokazuję znak pokoju na zdjęciach",
            start: 4.85,
            end: 9.55,
          },
          {
            text: "Ciekawe, czy Twój numer jest aktywny",
            start: 9.55,
            end: 11.75,
          },
          { text: "Bo pamiętam niektóre jego cyfry", start: 11.75, end: 14.7 },
        ],
      },
    ],
  },
  {
    id: 22,
    day: 22,
    title: "New York Freestyle",
    artist: "Otsochodzi, lohleq",
    audioSrc: "/22_NewYork.mp3",
    youtubeId: "DFVEGnt487Y",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Miałem bad trip po jebanej czekoladzie",
            start: 0.0,
            end: 2.55,
          },
          {
            text: "Mówili: zjedz kostkę, a został tylko papier — o mój Boże",
            start: 2.55,
            end: 5.25,
          },
          {
            text: "Muszę przestać, bo słyszałem strzały w głowie",
            start: 5.25,
            end: 7.65,
          },
          {
            text: "Muszę przetrwać, z tego pokoju nie wychodzę (Z tego pokoju nie wychodzę)",
            start: 7.65,
            end: 10.25,
          },
          {
            text: "Nie mam serca i to mnie wkurwia, przecież tyle mogę przegrać",
            start: 10.25,
            end: 13.6,
          },
        ],
      },
    ],
  },
  {
    id: 23,
    day: 23,
    title: "BIERZ TO NA WOLNO",
    artist: "vkie",
    audioSrc: "/23_BIERZ TO NA WOLNO.mp3",
    youtubeId: "K-xOPKGkI24",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "By niczego nie brakło, to właśnie oznaka męstwa (Tak jest)",
            start: 0.0,
            end: 2.65,
          },
          {
            text: "Myślałem, kurwa, że mnie ziomal wkręca",
            start: 2.65,
            end: 4.45,
          },
          {
            text: "Jak powiedział, że mu ukochana wyczyściła konto",
            start: 4.45,
            end: 6.75,
          },
          {
            text: "Suki to agentki, ale są też dobre baby",
            start: 6.75,
            end: 8.75,
          },
          {
            text: "Po prostu uważaj, dzieciak, zawsze bierz to na wolno (Na wolno)",
            start: 8.75,
            end: 11.6,
          },
        ],
      },
    ],
  },
  {
    id: 24,
    day: 24,
    title: "Zielona Flegma",
    artist: "Malik Montana, Dj.Frodo",
    audioSrc: "/24_Zielona flegma.mp3",
    youtubeId: "6RToRo0BXNg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Komu ufać? Każdy tylko w swoim interesie",
            start: 0.0,
            end: 2.65,
          },
          {
            text: "Jak tu czynić dobro kiedy myślą, że to słabość?",
            start: 2.65,
            end: 5.35,
          },
          {
            text: "Honor, duma to już tylko slogan a nie wartość",
            start: 5.35,
            end: 7.95,
          },
          {
            text: "Konkurencje ściągam w dół jak prostytutce majtki",
            start: 7.95,
            end: 10.35,
          },
          {
            text: "Chcieli wydymać Freda a zostali wydymani",
            start: 10.35,
            end: 13.3,
          },
        ],
      },
    ],
  },
  {
    id: 25,
    day: 25,
    title: "Skąd Ty To Znasz",
    artist: "Sentino, Diho",
    audioSrc: "/25_Skąd Ty To Znasz.mp3",
    youtubeId: "RBpDv4UpIFI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Twoje serce jest dzikie, serce jest dzikie, serce jest dzikie",
            start: 0.0,
            end: 4.75,
          },
          {
            text: "Pożałujesz jak zniknę, pożałujesz jak zniknę",
            start: 4.75,
            end: 8.15,
          },
          {
            text: "Kiedyś myślałem, że minie co złe i że do nas należy ten świat",
            start: 8.15,
            end: 12.15,
          },
          {
            text: "Dziś zgasła nadzieja jak jedna wśród milionów gwiazd",
            start: 12.15,
            end: 14.85,
          },
          { text: "Skąd ty to znasz?", start: 14.85, end: 16.4 },
        ],
      },
    ],
  },
  {
    id: 26,
    day: 26,
    title: "Szaman",
    artist: "Paluch",
    audioSrc: "/26_Szaman.mp3",
    youtubeId: "x7BtclKr5Jg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jak sam nie zarobisz, to nie miej pretensji",
            start: 0.0,
            end: 1.95,
          },
          {
            text: "Nie jesteś szamanem, jak nie ogarniasz",
            start: 1.95,
            end: 3.95,
          },
          {
            text: "Nieważne czy handel czy praca legalna",
            start: 3.95,
            end: 6.05,
          },
          {
            text: "Jak trzeba, kurwa, to wskakujesz w garniak",
            start: 6.05,
            end: 8.05,
          },
          { text: "Tak to wygląda, walka o standard", start: 8.05, end: 9.9 },
        ],
      },
    ],
  },
  {
    id: 27,
    day: 27,
    title: "Gustaw",
    artist: "Bedoes 2115",
    audioSrc: "/27_Gustaw.mp3",
    youtubeId: "fide4cDt_xo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Widziałem melanże", start: 0.0, end: 1.45 },
          {
            text: "Widziałem brzydkie suki, średnie suki, piękne suki, widziałem każde (każde)",
            start: 1.45,
            end: 4.95,
          },
          {
            text: "Prawie zamieszkałem na dnie (na dnie), prawie zostałem na winklu",
            start: 4.95,
            end: 8.25,
          },
          {
            text: "Gucci nie zmienia niczego, bo byłem tak samo prawdziwy",
            start: 8.25,
            end: 10.85,
          },
          {
            text: "Jak chodziłem w ciuchach kupionych na rynku, Borek!",
            start: 10.85,
            end: 13.1,
          },
        ],
      },
    ],
  },
  {
    id: 28,
    day: 28,
    title: "Magenta",
    artist: "Pezet",
    audioSrc: "/28_Magenta.mp3",
    youtubeId: "Cb-gaZHYoLs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ona na ucho mówi mi, bym uważał na zakrętach",
            start: 0.0,
            end: 2.25,
          },
          {
            text: "Gdy jedziemy przed siebie bez celu",
            start: 2.25,
            end: 4.25,
          },
          {
            text: "Za nami wszystko czego chcemy nie pamiętać",
            start: 4.25,
            end: 6.05,
          },
          { text: "I stajemy na chwilę na shellu", start: 6.05, end: 7.85 },
          { text: "Nad nami niebo różowe jak magenta", start: 7.85, end: 9.6 },
        ],
      },
    ],
  },
  {
    id: 29,
    day: 29,
    title: "Sorry Dolores",
    artist: "ReTo, Quebonafide",
    audioSrc: "/29_Sorry Dolores.mp3",
    youtubeId: "5ieKKxPN4ag",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Parkiet zna, przyszła poznać Marsellusa",
            start: 0.0,
            end: 2.65,
          },
          {
            text: "Jak Travolta tańczę sam, zostań, popatrz jak się ruszam",
            start: 2.65,
            end: 5.85,
          },
          {
            text: "Mia mijasz z prawdą się, razem nie będziemy tańczyć",
            start: 5.85,
            end: 9.05,
          },
          {
            text: "Nieraz gra na nerwach śmierć, taniec mógłby być ostatnim, goddamn",
            start: 9.05,
            end: 13.05,
          },
          {
            text: "Poznane z każdej strony, nie poznane by na ty przejść",
            start: 13.05,
            end: 16.4,
          },
        ],
      },
    ],
  },
  {
    id: 30,
    day: 30,
    title: "Sezon",
    artist: "Kabe, Opiat",
    audioSrc: "/30_Sezon.mp3",
    youtubeId: "fZZhXq607Rw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie przyszedłem tutaj na sezon (łoo)",
            start: 0.0,
            end: 3.95,
          },
          {
            text: "U ciebie w słuchawce słychać to echoo, (łooo)",
            start: 3.95,
            end: 7.65,
          },
          {
            text: "Gdy padają kulę nie wychodź na zewnątrz (woow)",
            start: 7.65,
            end: 11.35,
          },
          {
            text: "Za mną pusto nie ma już nic ostatnia prosta wchodzę na szczyt",
            start: 11.35,
            end: 14.95,
          },
          { text: "Nie przyszedłem tutaj na sezon", start: 14.95, end: 17.7 },
        ],
      },
    ],
  },
  {
    id: 31,
    day: 31,
    title: "Moment",
    artist: "Pusher, OSKA030, Baba Hassan",
    audioSrc: "/31_Moment.mp3",
    youtubeId: "Tv2YkKsvK5A",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Lepiej nie mów nic, bo jeszcze się zrobi gorzej",
            start: 0.0,
            end: 3.75,
          },
          {
            text: "Stolik VIP, nie patrz się tak, tylko polej",
            start: 3.75,
            end: 7.35,
          },
          {
            text: "Na zdrowie moja kolej, jak chcesz to cię zabiorę",
            start: 7.35,
            end: 11.05,
          },
          { text: "Mówi, że jest aniołem", start: 11.05, end: 12.85 },
          { text: "Uaaa", start: 12.85, end: 15.2 },
        ],
      },
    ],
  },
  {
    id: 32,
    day: 32,
    title: "AMG",
    artist: "Avi, Louis Villain",
    audioSrc: "/32_Avi.mp3",
    youtubeId: "cipFTmN1LTI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "A, że psy się patrzą z boku na furę (ty)",
            start: 0.0,
            end: 2.14,
          },
          { text: "Mam ich tam gdzie prokuraturę", start: 2.14, end: 6.19 },
          {
            text: "Chcieli dogonić nas, ale nie (ale nie)",
            start: 6.19,
            end: 11.22,
          },
          { text: "Bo my trzeci pas w AMG (A-M-G)", start: 11.22, end: 17.47 },
          {
            text: "Chcieli dogonić nas, ale nie (ale nie)",
            start: 17.47,
            end: 21.96,
          },
        ],
      },
    ],
  },
  {
    id: 33,
    day: 33,
    title: "FRISBEE",
    artist: "Sentino, BNP",
    audioSrc: "/33_FRISBEE.mp3",
    youtubeId: "afG4TG7LlEU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Patrz na mój chain, kamienie większe niż gluty u żula",
            start: 0.0,
            end: 3.05,
          },
          {
            text: "Teraz każdy słucha muzyki króla",
            start: 3.05,
            end: 5.35,
          },
          {
            text: "Gdzie się pojawię, to gruba rozróba",
            start: 5.35,
            end: 7.45,
          },
          {
            text: "Już nie żądamy, banknoty tu w stówach",
            start: 7.45,
            end: 9.45,
          },
          {
            text: "Same pięćsetki, same pięćsetki",
            start: 9.45,
            end: 11.8,
          },
        ],
      },
    ],
  },
  {
    id: 34,
    day: 34,
    title: "Jetlag",
    artist: "Malik Montana, DaChoyce, SRNO, The Plug",
    audioSrc: "/34_Jetlag.mp3",
    youtubeId: "xCBRhR11sJA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Prepara lo' palo', yo pongo el sushi, sí, sí, sí",
            start: 0.0,
            end: 4.74,
          },
          { text: "Si cae la noche yo me quedo aquí", start: 4.74, end: 8.62 },
          {
            text: "Si te queda' tampoco va' a dormir",
            start: 8.62,
            end: 10.93,
          },
          {
            text: "Ya 'tamo aquí, 'tamo full de pill",
            start: 10.93,
            end: 14.33,
          },
          {
            text: "Mezclé la sativa con el MD, se me va la cabeza",
            start: 14.33,
            end: 20.05,
          },
        ],
      },
    ],
  },
  {
    id: 35,
    day: 35,
    title: "KAMIKAZE",
    artist: "Mata, Khaid, Skolim",
    audioSrc: "/35_KAMIKAZE.mp3",
    youtubeId: "gBtbTl8r18U",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Pozycje przeróżne i nie będzie to misjonarz",
            start: 0.0,
            end: 2.95,
          },
          {
            text: "To nie Walentynki, ale wyjdziemy stąd w parze",
            start: 2.95,
            end: 5.65,
          },
          {
            text: "Robisz do mnie minki, siedząc samotnie przy barze",
            start: 5.65,
            end: 8.23,
          },
          {
            text: "Zamawiam dwa drinki, ty masz w głowie kamikaze",
            start: 8.23,
            end: 10.94,
          },
          {
            text: "Chcę robić uniki, ale zrobi, co jej każę",
            start: 10.94,
            end: 13.28,
          },
        ],
      },
    ],
  },
  {
    id: 36,
    day: 36,
    title: "ODTRUTKA",
    artist: "Taco Hemingway, Rumak, The Returners",
    audioSrc: "/36_ODTRUTKA.mp3",
    youtubeId: "GElaFQsJ8Fs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gdy z billboardu osaczają uśmiechnięci celebryci",
            start: 0.0,
            end: 3.56,
          },
          { text: "Chce się wyć mi, woah", start: 3.56, end: 5.6 },
          {
            text: "Czemu ciągle ją pamiętam, kiedy minęła już dekada",
            start: 5.6,
            end: 8.45,
          },
          {
            text: "Jeżeli spytasz tak, to wiem, że nie poznałeś, czym jest zdrada",
            start: 8.45,
            end: 11.41,
          },
          {
            text: "Terapeutka jest cierpliwa, ale myśli, że przesadzam",
            start: 11.41,
            end: 14.19,
          },
        ],
      },
    ],
  },
  {
    id: 37,
    day: 37,
    title: "Multisport",
    artist: "Kaz Bałagane, Oskar83",
    audioSrc: "/37_Multisport.mp3",
    youtubeId: "gDcNzblrePw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Lej pół na pół, może zniknie stres (lej)",
            start: 0.0,
            end: 3.66,
          },
          {
            text: "Uczuć nie lokuję, gdzie biznes (nie, nie)",
            start: 3.66,
            end: 6.73,
          },
          {
            text: "Jak dżinsy dół, to nie góra dres (ha)",
            start: 6.73,
            end: 10.18,
          },
          {
            text: "Wchodzę w tłum, scanner smash or pass (smash)",
            start: 10.18,
            end: 13.33,
          },
          {
            text: "Mieszam euforię i trochę tęsknoty (będzie ogień?)",
            start: 13.33,
            end: 16.83,
          },
        ],
      },
    ],
  },
  {
    id: 38,
    day: 38,
    title: "02:02",
    artist: "Louis Villain",
    audioSrc: "/38_02_02.mp3",
    youtubeId: "7znoP5LI8FY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nigdy nie wierzyłem w cuda",
            start: 0.0,
            end: 1.14,
          },
          {
            text: "Do momentu, gdy uwierzyłem że nam może się udać to",
            start: 1.14,
            end: 4.39,
          },
          {
            text: "Piszesz mi, że nie mam serca i to boli mnie",
            start: 4.39,
            end: 6.51,
          },
          {
            text: "Nie mam serca? Przecież dałem ci na dłoni je",
            start: 6.51,
            end: 10.21,
          },
          {
            text: "I to prawda, wcale nie tak dawno",
            start: 10.21,
            end: 13.71,
          },
        ],
      },
    ],
  },
  {
    id: 39,
    day: 39,
    title: "Trendsetter",
    artist: "Kaz Bałagane",
    audioSrc: "/39_Trendsette.mp3",
    youtubeId: "5j10QinC4dI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Mam na sobie nowy sweter, Jaca trendsetter",
            start: 0.0,
            end: 3.51,
          },
          {
            text: "Wszystko fituje mi jak parma do rukoli",
            start: 3.51,
            end: 6.71,
          },
          {
            text: "Tak, tak, tak twardo, ona czuje, jakby bawiła się dildem (yeah)",
            start: 6.71,
            end: 10.72,
          },
          {
            text: "Między piętrami znowu zatrzymuję windę (yeah)",
            start: 10.72,
            end: 14.28,
          },
          {
            text: "Czuję się jak Lil Durk, nie używam Tinder (o)",
            start: 14.28,
            end: 17.78,
          },
        ],
      },
    ],
  },
  {
    id: 40,
    day: 40,
    title: "Lucky Punch",
    artist: "Kizo, Wac Toja",
    audioSrc: "/40_Lucky.mp3",
    youtubeId: "7YphHO9T9As",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Pa-pantera, Lucky Punch", start: 0.0, end: 3.56 },
          { text: "Wa-wa-wa-Wacław Francuz", start: 3.56, end: 4.97 },
          { text: "We-we-we-we palę weedziora", start: 4.97, end: 7.21 },
          {
            text: "Groaca jak California, ona jest moją Sativą",
            start: 7.21,
            end: 10.98,
          },
          { text: "Amnestia Haze, White Widow", start: 10.98, end: 12.15 },
        ],
      },
    ],
  },
  {
    id: 41,
    day: 41,
    title: "Biblioteka Trap",
    artist: "Mata",
    audioSrc: "/41_Biblioteka.mp3",
    youtubeId: "vXTpoukGFIs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Od Fumar Matu u Hype, a tu nic się nie zmienia, nie straciłem nawet dziewictwa",
            start: 0.0,
            end: 3.4,
          },
          {
            text: "I darta jest japa, że tamta to ściera",
            start: 3.4,
            end: 5.24,
          },
          { text: "Szmata", start: 5.24, end: 6.03 },
          { text: "Dziwka", start: 6.03, end: 6.38 },
          {
            text: "Prawda jest taka, że Mata stuleja, dlatego nawijka jest aż tak",
            start: 6.38,
            end: 9.7,
          },
        ],
      },
    ],
  },
  {
    id: 42,
    day: 42,
    title: "Kickdown",
    artist: "PRO8L3M",
    audioSrc: "/42_Kickdown.mp3",
    youtubeId: "a1ieIPYhTNU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Dam spód, gniecie, raz, zrób miejsce",
            start: 0.0,
            end: 1.81,
          },
          { text: "Na pasach robię dla dup przejście", start: 1.81, end: 3.68 },
          { text: "Telefon dzwoni, to Steez", start: 3.68, end: 6.36 },
          {
            text: "Podjeżdżam, dupa z nim, to showbiz",
            start: 6.36,
            end: 8.14,
          },
          { text: "Ojoj mistrz, hello miss", start: 8.14, end: 10.83 },
        ],
      },
    ],
  },
  {
    id: 43,
    day: 43,
    title: "Baciata",
    artist: "Malik Montana",
    audioSrc: "/43_Baciata.mp3",
    youtubeId: "lODY-Ud02UQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Diamenty na szyi kurwo tańczą mi baciatę (oh",
            start: 0.0,
            end: 2.86,
          },
          {
            text: "Diamenty na szyi kurwo tańczą mi baciatę (ah)",
            start: 2.86,
            end: 5.89,
          },
          {
            text: "Twoje auto mordo warte mniej niż mój nadgarstek (uf)",
            start: 5.89,
            end: 9.1,
          },
          {
            text: "Na prawej mam AP, a na lewej Phillipe Patek (ah)",
            start: 9.1,
            end: 11.81,
          },
          {
            text: "Nadgarstek cały w ice'ie jak boisko do hokeja (au)",
            start: 11.81,
            end: 15.64,
          },
        ],
      },
    ],
  },
  {
    id: 44,
    day: 44,
    title: "VHS",
    artist: "PRO8L3M",
    audioSrc: "/44_VHS.mp3",
    youtubeId: "j2QcihNgDC8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Robiłem to jakbym pierwszy raz miał dziś dupę",
            start: 0.0,
            end: 3.6,
          },
          {
            text: "Gadamy se fucking super i raczę się, leżąc na wznak, ich szlugiem",
            start: 3.6,
            end: 7.52,
          },
          { text: "Głupio czuję się gdy wyszły", start: 7.52, end: 9.05 },
          {
            text: "Leżąc już samotnie paląc jointa w ciszy",
            start: 9.05,
            end: 11.14,
          },
          { text: "Ej nie będą miały chyba", start: 11.14, end: 12.56 },
        ],
      },
    ],
  },
  {
    id: 45,
    day: 45,
    title: "Numer o spodenkach krótkich",
    artist: "Kaz Bałagane",
    audioSrc: "/45_Numerospodenkachkrótkich.mp3",
    youtubeId: "fo7-ndfzCUw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Słyszałem, że mnie szukasz mordo, no to jestem w Żabce",
            start: 0.0,
            end: 3.77,
          },
          {
            text: "Mieszkam w domu, więc nie pierdol, że znasz moją klatkę",
            start: 3.77,
            end: 7.2,
          },
          {
            text: "Ten chodnik widział już sporo, to jest rzyg, czy był tu Pollock?",
            start: 7.2,
            end: 11.16,
          },
          {
            text: "Idzie gwiazda wakacji, na każdym zdjęciu jest solo",
            start: 11.16,
            end: 14.39,
          },
          {
            text: "Wszyscy wiedzą, że ci fotki robił sugar daddy",
            start: 14.39,
            end: 17.89,
          },
        ],
      },
    ],
  },
  {
    id: 46,
    day: 46,
    title: "Kulig",
    artist: "Kaz Bałagane, DMN",
    audioSrc: "/46_Kulig.mp3",
    youtubeId: "BM0EqIbkvek",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Leci pop, coś w nogawie mnie uwiera, to mój cock",
            start: 0.0,
            end: 3.4,
          },
          { text: "O, ona lubi kulig", start: 3.4, end: 5.87 },
          { text: "Ona lubi kulig, kulig", start: 5.87, end: 8.37 },
          { text: "Ona lubi kulig, kulig", start: 8.37, end: 10.94 },
          { text: "Ona lubi kulig", start: 10.94, end: 13.85 },
        ],
      },
    ],
  },
  {
    id: 47,
    day: 47,
    title: "PRZY SONECIE",
    artist: "Guzior",
    audioSrc: "/47_PRZY.mp3",
    youtubeId: "tuoUMzDtObE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Teksty na wzór konfesji, w Polbusie pisz notesy",
            start: 0.0,
            end: 3.05,
          },
          {
            text: "Szukałem swojej ścieżki, Jurij Orłow Odessy",
            start: 3.05,
            end: 6.14,
          },
          {
            text: "Wyminąłem uśmieszki, spoglądam na wykresy",
            start: 6.14,
            end: 8.92,
          },
          {
            text: "Kurwa, pierwsze trzy gesty, bro, każdego koleżki",
            start: 8.92,
            end: 12.04,
          },
          {
            text: "Przeczytałem jak zeszyt, trzecie oko jak Tenshin",
            start: 12.04,
            end: 15.19,
          },
        ],
      },
    ],
  },
  {
    id: 48,
    day: 48,
    title: "911",
    artist: "Malik Montana, ENZO EBK",
    audioSrc: "/48_911.mp3",
    youtubeId: "3i1DR4aQlag",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Sprawię, że twoja kobieta przejdzie na islam, (OO)",
            start: 0.0,
            end: 3.5,
          },
          {
            text: "Pięć gwiazdek hotel, 5k na stopie i 5 gramów w jointcie",
            start: 3.5,
            end: 7.45,
          },
          {
            text: "Hotel lobby, mam na wieczór eskortkę",
            start: 7.45,
            end: 9.52,
          },
          {
            text: "Kluczyk zostawiam, furę parkuje portier",
            start: 9.52,
            end: 11.56,
          },
          {
            text: "Powiedz co dzisiaj masz w planie",
            start: 11.56,
            end: 13.71,
          },
        ],
      },
    ],
  },
  {
    id: 49,
    day: 49,
    title: "Midas",
    artist: "Sentino",
    audioSrc: "/49_Midas.mp3",
    youtubeId: "vw66jzac17JY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Kiedyś nic tylko szary blok",
            start: 0.0,
            end: 1.41,
          },
          {
            text: "Pijaczyny na ławeczkach",
            start: 1.41,
            end: 3.06,
          },
          {
            text: "Tysiąc złotych mam w karmanie",
            start: 3.06,
            end: 4.8,
          },
          {
            text: "Bajzel w bani, układany włos",
            start: 4.8,
            end: 6.4,
          },
          {
            text: "Polo Ralph w kratę koszula",
            start: 6.4,
            end: 9.9,
          },
        ],
      },
    ],
  },
  {
    id: 50,
    day: 50,
    title: "Testarossa",
    artist: "Wiatr, Sobel, be vis",
    audioSrc: "/50_Testarossa.mp3",
    youtubeId: "xm_ujA1CXCc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Przed nami wiele tras, mmmh Testarossa (Testarossa)",
            start: 0.0,
            end: 4.21,
          },
          {
            text: "Testarossa, mmmh Testarossa",
            start: 4.21,
            end: 9.33,
          },
          {
            text: "Mamy pełen bak (ey), rozpędzimy fure (ey)",
            start: 9.33,
            end: 14.03,
          },
          {
            text: "Rozbijemy bank, powiedz mi co czujesz",
            start: 14.03,
            end: 19.6,
          },
          {
            text: "Przed nami wiele tras, mmmh Testarossa (Testarossa)",
            start: 19.6,
            end: 23.1,
          },
        ],
      },
    ],
  },
  {
    id: 51,
    day: 51,
    title: "Jesteś ładniejsza niż na zdjęciach (na zawsze)",
    artist: "Bedoes 2115, Lanek",
    audioSrc: "/51_Jesteś.mp3",
    youtubeId: "SmMLOZltgh8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ja nie chciałem tak szybko umierać", start: 0.0, end: 2.35 },
          {
            text: "I nie śpiewam tego, dlatego byś do mnie wróciła lub żeby współczuli mi",
            start: 2.35,
            end: 6.57,
          },
          {
            text: "Lecz muszę to z siebie wyrzucić, bo nie pomogło Fendi, Gucci czy Louis V",
            start: 6.57,
            end: 12.48,
          },
          {
            text: "Wiem, że oglądasz mnie z innego konta",
            start: 12.48,
            end: 16.89,
          },
          { text: "Skąd wiem? Ja też oglądam", start: 16.89, end: 19.2 },
        ],
      },
    ],
  },
  {
    id: 52,
    day: 52,
    title: "Monza",
    artist: "PRO8L3M",
    audioSrc: "/52_Monza.mp3",
    youtubeId: "CFHy1WEO4rQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Więcej, więcej, zawsze chciałem mieć więcej",
            start: 0.0,
            end: 3.0,
          },
          {
            text: "Jeszcze, jeszcze, zawsze chciałem M5 mieć",
            start: 3.0,
            end: 6.24,
          },
          {
            text: "Pięćset, sześćset, dni które straciłem",
            start: 6.24,
            end: 9.35,
          },
          {
            text: "Pięknie, w piekle będę się smażył za chwilę",
            start: 9.35,
            end: 13.2,
          },
          { text: "(bit)", start: 13.2, end: 24.59 },
        ],
      },
    ],
  },
  {
    id: 53,
    day: 53,
    title: "Plan B",
    artist: "Pezet, Mata, Kaz Bałagane, Pedro, Frenkie G",
    audioSrc: "/53_Plan.mp3",
    youtubeId: "3SnaP_-umQc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Po co pokazujesz te ćwiczenia na brzuch",
            start: 0.0,
            end: 2.24,
          },
          {
            text: "Jak ty robiłaś sobie lipo, a nie trening za dwóch",
            start: 2.24,
            end: 4.93,
          },
          {
            text: "Na Insta tylko solo tripy i do tego seafood",
            start: 4.93,
            end: 7.65,
          },
          {
            text: "A Kazek to naprawdę lata, ale bardziej jak duch, oh",
            start: 7.65,
            end: 11.01,
          },
          {
            text: "Ja to nie wierzę w tą drogę, która tu stworzyła Jacka",
            start: 11.01,
            end: 13.69,
          },
        ],
      },
    ],
  },
  {
    id: 54,
    day: 54,
    title: "Tamagotchi",
    artist: "TACONAFIDE, Quebonafide, Taco Hemingway",
    audioSrc: "/54_Tamagotchi.mp3",
    youtubeId: "odWxQ5eEnfE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Robiliśmy biznes jak czytałeś Kajko i Kokosz",
            start: 0.0,
            end: 2.44,
          },
          {
            text: "Robię pliki dla niej, liczę pliki dla niej",
            start: 2.44,
            end: 4.2,
          },
          {
            text: "Nie mam siły się uśmiechać, nienawidzę kamer",
            start: 4.2,
            end: 6.59,
          },
          {
            text: "Oni znowu się sprzedają, no bo kwitnie handel",
            start: 6.59,
            end: 8.74,
          },
          {
            text: "Gdy robiłem hajs oglądałeś Disney Channel",
            start: 8.74,
            end: 10.85,
          },
        ],
      },
    ],
  },
  {
    id: 55,
    day: 55,
    title: "Trójkąt Bermudzki",
    artist: "Sentino, Nitro, MASNY BEN, mgng",
    audioSrc: "/55_Trójkąt.mp3",
    youtubeId: "pjDxVMlz4B0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie noszę podróbek, ja noszę Hermès",
            start: 0.0,
            end: 1.89,
          },
          { text: "Louis Vui Trainer i złoty Rolex", start: 1.89, end: 3.7 },
          {
            text: "Boże jak fresh, muszę z tym przestać",
            start: 3.7,
            end: 5.82,
          },
          {
            text: "Marzę o hajsie na grubych baletach",
            start: 5.82,
            end: 7.52,
          },
          {
            text: "Piję te shoty jak skurwiele w Texas (wrra)",
            start: 7.52,
            end: 9.69,
          },
        ],
      },
    ],
  },
  {
    id: 56,
    day: 56,
    title: "Wiecznie",
    artist: "Sentino",
    audioSrc: "/56_Wiecznie.mp3",
    youtubeId: "J64bbJBmpt4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wszyscy się pytali co u ciebie tak jest",
            start: 0.0,
            end: 2.73,
          },
          {
            text: "Przez lata już nie mieliśmy nic razem wspólnego",
            start: 2.73,
            end: 5.61,
          },
          {
            text: "Czasem myśli mnie doprowadzają do łez",
            start: 5.61,
            end: 8.36,
          },
          {
            text: "Byłem małolatem co zaczynał nawijać",
            start: 8.36,
            end: 10.9,
          },
          {
            text: "Pomogłeś mi napisać tutaj pierwszy mój tekst",
            start: 10.9,
            end: 14.4,
          },
        ],
      },
    ],
  },
  {
    id: 57,
    day: 57,
    title: "Szampana do ręki",
    artist: "Diho, Sentino",
    audioSrc: "/57_Szampanado.mp3",
    youtubeId: "edVgkrF92M8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Proszę pani dosypie tu lodu do wiadra",
            start: 0.0,
            end: 3.55,
          },
          {
            text: "Mała chcę się bzykać tu znowu po dragach",
            start: 3.55,
            end: 6.22,
          },
          {
            text: "To atak na bar sto poleję kamikaze",
            start: 6.22,
            end: 9.06,
          },
          {
            text: "Nikt z tych co poleje da mi kasę",
            start: 9.06,
            end: 11.21,
          },
          {
            text: "Ja płace a Ty paczysz jak sroka",
            start: 11.21,
            end: 14.02,
          },
        ],
      },
    ],
  },
  {
    id: 58,
    day: 58,
    title: "Tour de France",
    artist: "Kabe, Favst, PLK, Gibbs",
    audioSrc: "/58_TourdeFran.mp3",
    youtubeId: "SA42K2N8P5Q",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gazu do dechy daj więcej",
            start: 0.0,
            end: 2.09,
          },
          {
            text: "Pull-up robimy na mieście",
            start: 2.09,
            end: 4.28,
          },
          {
            text: "Kasy do torby daj więcej",
            start: 4.28,
            end: 6.16,
          },
          {
            text: "W klubie nie czekam na wejście",
            start: 6.16,
            end: 8.08,
          },
          {
            text: "Gazu do dechy daj więcej",
            start: 8.08,
            end: 11.79,
          },
        ],
      },
    ],
  },
  {
    id: 59,
    day: 59,
    title: "Molly",
    artist: "PRO8L3M",
    audioSrc: "/59_Molly.mp3",
    youtubeId: "KRgYXAMXg84",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Cruisin' together...", start: 0.0, end: 6.94 },
          { text: "Forever...", start: 6.94, end: 10.49 },
          {
            text: "Ona szpile, diamenty, ja t-shirty XL-ki",
            start: 10.49,
            end: 13.76,
          },
          {
            text: "Dwa promile, trzy skręty, Mercedesy i felgi",
            start: 13.76,
            end: 17.15,
          },
          {
            text: "Ona pije cranberry, Roleksy, smile, wisienki",
            start: 17.15,
            end: 20.48,
          },
        ],
      },
    ],
  },
  {
    id: 60,
    day: 60,
    title: "#hot16challenge2 20CALI",
    artist: "Kizo",
    audioSrc: "/60_August.mp3",
    youtubeId: "aJ1VQhU6Dlc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Bonus przewidział ile będę wart", start: 0.0, end: 1.87 },
          {
            text: "Pod jego skrzydłem miałem pierwszy start",
            start: 1.87,
            end: 3.73,
          },
          {
            text: "Mimo że przyjaciel, jestem dalej fan - nigdy mało no i dalej mało mam",
            start: 3.73,
            end: 7.54,
          },
          {
            text: "Wielkie bloki, co nie są z mąki - to nie Havana",
            start: 7.54,
            end: 11.26,
          },
          {
            text: "Choć tak samo dupy chcą koki - Tony Montana",
            start: 11.26,
            end: 15.11,
          },
        ],
      },
    ],
  },
  {
    id: 61,
    day: 61,
    title: "Kawałek nieba",
    artist: "Kaz Bałagane, Kukon",
    audioSrc: "/61_Kawałek.mp3",
    youtubeId: "6ajMUVPdF-U",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Lubi dostawać kwiaty, choć woli dostawać liście",
            start: 0.0,
            end: 2.65,
          },
          {
            text: "Nie da się oglądać z nią seriali, zaraz przyśnie",
            start: 2.65,
            end: 6.0,
          },
          {
            text: "Inna lubi na odległość ciągle psuć łeb",
            start: 6.0,
            end: 8.87,
          },
          {
            text: "Ma siedem profili, z czego każdy to jest kret",
            start: 8.87,
            end: 11.65,
          },
          {
            text: "Mama nie lubiła mężczyzn, widać to jedna krew",
            start: 11.65,
            end: 14.01,
          },
        ],
      },
    ],
  },
  {
    id: 62,
    day: 62,
    title: "PALMA DE MALLORCA",
    artist: "Mata, Żabson",
    audioSrc: "/62_PALMA.mp3",
    youtubeId: "aD0hAJKWv88",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Odbiła mi Palma de Mallorca (Mallorca)",
            start: 0.0,
            end: 2.44,
          },
          {
            text: "Don-don-don-do-ron-di-ron-don (ron-don)",
            start: 2.44,
            end: 4.61,
          },
          {
            text: "Czekam na spotkanie z Tobą (z Tobą)",
            start: 4.61,
            end: 6.75,
          },
          { text: "Zobaczymy się pod kołdrą (kołdrą)", start: 6.75, end: 9.08 },
          { text: "Odbiła mi Palma de Mallorca", start: 9.08, end: 12.04 },
        ],
      },
    ],
  },
  {
    id: 63,
    day: 63,
    title: "FRASCATI",
    artist: "Taco Hemingway, Zeppy Zep, Livka",
    audioSrc: "/63_FRASCATI.mp3",
    youtubeId: "qe1puXx4BpM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Taki jeden dobry kumpel dał mi radę wieki temu",
            start: 0.0,
            end: 3.32,
          },
          {
            text: "W sumie mogłem go posłuchać, jeśli piłeś, nie DM'uj",
            start: 3.32,
            end: 7.1,
          },
          {
            text: "Jakaś para jest na skarpie (gdzie?) zanurzona w pocałunku",
            start: 7.1,
            end: 10.73,
          },
          {
            text: "Chcę typowi wytłumaczyć, że nie znajdzie w niej ratunku",
            start: 10.73,
            end: 14.41,
          },
          {
            text: "Gdy go rzuci jak zły nawyk i zostawi go na bruku (no)",
            start: 14.41,
            end: 17.99,
          },
        ],
      },
    ],
  },
  {
    id: 64,
    day: 64,
    title: "Grill u Gawrona",
    artist: "Białas, Lanek",
    audioSrc: "/64_Grill.mp3",
    youtubeId: "_7rz2P6jUqc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie wejdziesz, bo brama zamknięta", start: 0.0, end: 1.82 },
          { text: "Patrzę na parkiet jak stolarz", start: 1.82, end: 3.46 },
          { text: "Tu jestem tylko kolegą Gawrona", start: 3.46, end: 5.32 },
          {
            text: "A co druga dupa, chociaż ma chłopaka",
            start: 5.32,
            end: 6.99,
          },
          {
            text: "To chemię co jest między nimi wypaca",
            start: 6.99,
            end: 9.08,
          },
        ],
      },
    ],
  },
  {
    id: 65,
    day: 65,
    title: "DMT",
    artist: "Żabson",
    audioSrc: "/65_DMT.mp3",
    youtubeId: "oZbo4l0BvwQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Sam dla siebie byłem wrogiem, pasja pogodziła",
            start: 0.0,
            end: 1.75,
          },
          {
            text: "Chory łeb, Johnny Blash, czaszka się nie ostudziła",
            start: 1.75,
            end: 3.35,
          },
          {
            text: "Palę tony, wiesz, zawieszony gdzieś",
            start: 3.35,
            end: 5.20,
          },
          {
            text: "Wrotas klepie bit, piszę nowy tekst",
            start: 5.20,
            end: 6.55,
          },
          {
            text: "Trzeba robić flex, trzeba robić kwit, nie stać mnie na wolny dzień",
            start: 6.55,
            end: 10.15,
          },
        ],
      },
    ],
  },
  {
    id: 66,
    day: 66,
    title: "Belly Dance",
    artist: "Malik Montana",
    audioSrc: "/66_Belly.mp3",
    youtubeId: "D73aEjo_l-Y",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Hello Kitty, mokra Pipi, chuj twardy jak narkotyki",
            start: 0.0,
            end: 3.23,
          },
          {
            text: "Przyleciała do mnie LOT-em z południowej Ameryki",
            start: 3.23,
            end: 6.31,
          },
          { text: "Z tyłu, z przodu ma plastiki", start: 6.31, end: 8.29 },
          { text: "I nosi Birkin", start: 8.29, end: 10.12 },
          { text: "Ma Prady szpilki", start: 10.12, end: 11.38 },
        ],
      },
    ],
  },
  {
    id: 67,
    day: 67,
    title: "LET IT B",
    artist: "bambi",
    audioSrc: "/67_LET.mp3",
    youtubeId: "Bkube07aMvE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "W głowie zbieram historię (yeah), jakbym pisała książkę",
            start: 0.0,
            end: 2.62,
          },
          {
            text: "Wpadam powoli w obłęd, nic już nie będzie gorsze (yeah, yeah)",
            start: 2.62,
            end: 5.37,
          },
          {
            text: "Podpinają mi mikrofon i prostują moje włosy",
            start: 5.37,
            end: 8.01,
          },
          {
            text: "Kiedy nieprzytomna leżę na kanapie",
            start: 8.01,
            end: 10.19,
          },
          {
            text: "Obok głosy, że pięć minut już się kończy i mam wstawać albo żegnać",
            start: 10.19,
            end: 13.7,
          },
        ],
      },
    ],
  },
  {
    id: 68,
    day: 68,
    title: "Rundki",
    artist: "Malik Montana, Diho, Alberto, Bibič",
    audioSrc: "/68_Rundki.mp3",
    youtubeId: "bo2kIBNKqrM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Rucham sobie dupy, głównie to fanki Malika",
            start: 0.0,
            end: 2.99,
          },
          {
            text: "I dalej na was sram jak psy na trawnikach",
            start: 2.99,
            end: 5.99,
          },
          {
            text: "Rundki w AMG, mordeczko, moje cardio",
            start: 5.99,
            end: 9.14,
          },
          {
            text: "Grudę traktuję kartą, traktuję kartą",
            start: 9.14,
            end: 11.87,
          },
          {
            text: "W moim świecie, mordo, nie ma nic za darmo",
            start: 11.87,
            end: 14.95,
          },
        ],
      },
    ],
  },
  {
    id: 69,
    day: 69,
    title: "Łyk i buch",
    artist: "SB Maffija, GOMBAO 33, Pedro, francis",
    audioSrc: "/69_Łyk.mp3",
    youtubeId: "KxyD4-wvWDE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "I znowu łyk, łyk, łyk, łyk, łyk, łyk, łyk",
            start: 0.0,
            end: 4.36,
          },
          {
            text: "A potem buch, buch, buch, buch, buch, buch, buch",
            start: 4.36,
            end: 9.33,
          },
          {
            text: "I znowu łyk, łyk, łyk, łyk, łyk, łyk, łyk",
            start: 9.33,
            end: 14.09,
          },
          {
            text: "A potem buch, buch, buch, buch, buch, buch, buch",
            start: 14.09,
            end: 18.84,
          },
          { text: "Najebałem się w chuj", start: 18.84, end: 21.79 },
        ],
      },
    ],
  },
  {
    id: 70,
    day: 70,
    title: "Driftem",
    artist: "Kizo, Young Igi",
    audioSrc: "/70_Driftem.mp3",
    youtubeId: "rLaslaE8AIQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "portfel pełen, pełen, pełen, Bak jest pełen pełen pełen",
            start: 0.0,
            end: 3.25,
          },
          {
            text: "Omijam driftem biedę (skrrt, skrrt)",
            start: 3.25,
            end: 4.71,
          },
          {
            text: "Nie biorę siana z każdego tytułu",
            start: 4.71,
            end: 5.95,
          },
          {
            text: "Bo gdybym brał siano z każdego tytułu",
            start: 5.95,
            end: 7.4,
          },
          {
            text: "To nie miałbym w ogóle żadnego tytułu",
            start: 7.4,
            end: 10.9,
          },
        ],
      },
    ],
  },
  {
    id: 71,
    day: 71,
    title: "Eldorado",
    artist: "Deemz, Bedoes 2115, PlanBe",
    audioSrc: "/71_Eldorado.mp3",
    youtubeId: "Od6Y--1jrKY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wiem, że masz już dosyć piekła, mała weź mą dłoń",
            start: 0.0,
            end: 3.65,
          },
          {
            text: "Jeśli ktoś ma jakiś problem no to pierdol go",
            start: 3.65,
            end: 7.27,
          },
          {
            text: "Wybudujmy własne Eldorado",
            start: 7.27,
            end: 9.14,
          },
          {
            text: "Daj mi tylko jedną noc",
            start: 9.14,
            end: 11.29,
          },
          {
            text: "Zapomnij o swoich przejściach, skarbie ze mną chodź",
            start: 11.29,
            end: 14.79,
          },
        ],
      },
    ],
  },
  {
    id: 72,
    day: 72,
    title: "Zonda",
    artist: "Pezet",
    audioSrc: "/72_Tip.mp3",
    youtubeId: "IueYnR8WyZ8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jesteś naraz zimna i gorąca (zimna i gorąca)",
            start: 0.0,
            end: 3.81,
          },
          {
            text: "Twoje włosy blond jak ze złota, mokre teraz jak mokra Włoszka",
            start: 3.81,
            end: 7.79,
          },
          {
            text: "Jawisz mi się jak Matka Boska, bawimy się jak mafia włoska",
            start: 7.79,
            end: 11.41,
          },
          {
            text: "Takie jak ty potrafią zostać i do rana pić zdrowie do dna",
            start: 11.41,
            end: 15.32,
          },
          {
            text: "Za to życie szybkie i drogie, coś jak sportowe Pagani Zonda",
            start: 15.32,
            end: 19.4,
          },
        ],
      },
    ],
  },
  {
    id: 73,
    day: 73,
    title: "kokaina nie pomaga ci w depresji",
    artist: "Kukon, Julia Mikuła, Ka-Meal",
    audioSrc: "/73_kokaina.mp3",
    youtubeId: "y0P3CZ5SVQw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Problemem dla ciebie i rodziców i przyjaciół",
            start: 0.0,
            end: 2.0,
          },
          {
            text: "Idolem patusów, którzy biorą dopalacze",
            start: 2.0,
            end: 3.68,
          },
          {
            text: "I przygodą modelek, które lubią swoją pracę",
            start: 3.68,
            end: 5.96,
          },
          {
            text: "Staraj się milczeć, jak zmieniam się w diabła",
            start: 5.96,
            end: 8.01,
          },
          {
            text: "Nie wiesz jak ryje mi głowę ta branża",
            start: 8.01,
            end: 10.36,
          },
        ],
      },
    ],
  },
  {
    id: 74,
    day: 74,
    title: "Huragan",
    artist: "Kizo, BeMelo",
    audioSrc: "/74_Huragan.mp3",
    youtubeId: "c9A21mQXm9M",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Zrób mi huragan, zrób mi huragan",
            start: 0.0,
            end: 1.89,
          },
          {
            text: "Kupię ci Lambo Huracán",
            start: 1.89,
            end: 4.06,
          },
          {
            text: "Zrób mi huragan, zrób mi huragan",
            start: 4.06,
            end: 5.8,
          },
          {
            text: "Kupię ci Lambo Huracán",
            start: 5.8,
            end: 7.85,
          },
          {
            text: "Zrób mi huragan, zrób mi huragan",
            start: 7.85,
            end: 11.35,
          },
        ],
      },
    ],
  },
  {
    id: 75,
    day: 75,
    title: "NICKI",
    artist: "Trill Pem, Wac Toja",
    audioSrc: "/75_NICKI.mp3",
    youtubeId: "RwY-sKsuCpY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Niegrzeczna bądź", start: 0.0, end: 1.09 },
          {
            text: "Dupą kręć tak jak Nicki, Nicki (Minaj)",
            start: 1.09,
            end: 3.49,
          },
          { text: "Wieczorem fiku miki", start: 3.49, end: 4.94 },
          { text: "Białe dupsko, czarne figi", start: 4.94, end: 6.87 },
          { text: "Niegrzeczna bądź", start: 6.87, end: 8.25 },
        ],
      },
    ],
  },
  {
    id: 76,
    day: 76,
    title: "Plain Jane",
    artist: "Malik Montana",
    audioSrc: "/76_Plain.mp3",
    youtubeId: "QuXmIbQ6g6w",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Pliki robię, double wock", start: 0.0, end: 1.58 },
          { text: "Ona ma Double D's", start: 1.58, end: 3.16 },
          { text: "Double dizzy bubble butt", start: 3.16, end: 5.89 },
          { text: "Pliki robię, double wock", start: 5.89, end: 7.7 },
          { text: "Ona ma Double D's", start: 7.7, end: 9.15 },
        ],
      },
    ],
  },
  {
    id: 77,
    day: 77,
    title: "Wschód (lubię zapierdalać)",
    artist: "Bedoes, Lanek, Kosa, White 2115",
    audioSrc: "/77_Bedoes.mp3",
    youtubeId: "YShJHtEP82U",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Kochasz mnie, kochasz gang", start: 0.0, end: 1.8 },
          {
            text: "Mała lepiej zapnij pas, mała lepiej załóż kask",
            start: 1.8,
            end: 5.07,
          },
          {
            text: "Jeżdżę jak jebany cham, żartowałem albo nie",
            start: 5.07,
            end: 8.82,
          },
          { text: "Kto wie? Kto wie? Kto wie?", start: 8.82, end: 13.74 },
          {
            text: "- Dobry wieczór, prawo jazdy i dowód rejestracyjny",
            start: 13.74,
            end: 15.53,
          },
        ],
      },
    ],
  },
  {
    id: 78,
    day: 78,
    title: "Ground Zero",
    artist: "PRO8L3M",
    audioSrc: "/78_Ground.mp3",
    youtubeId: "65oz_e0B1zo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Zsuń najpierw drżąca, zdejmij całkiem, ej",
            start: 0.0,
            end: 3.26,
          },
          {
            text: "Znowu zombie życie, jesteś slajdem, ej",
            start: 3.26,
            end: 6.66,
          },
          {
            text: "Znowu Bonnie i znowu jestem Clydem",
            start: 6.66,
            end: 9.37,
          },
          { text: "You're taking me higher", start: 9.37, end: 12.65 },
          { text: "High as I could be", start: 12.65, end: 16.11 },
        ],
      },
    ],
  },
  {
    id: 79,
    day: 79,
    title: "Jungle Girl",
    artist: "Young Leosia, Żabson",
    audioSrc: "/79_Jungle.mp3",
    youtubeId: "lbaFm6USBZA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ja to nie Doktor Dolittle, nie gadam z psami",
            start: 0.0,
            end: 3.35,
          },
          {
            text: "Raperzy sami podchodzą zbić featy, a później pierdolą coś za plecami",
            start: 3.3,
            end: 7.4,
          },
          {
            text: "Jeśli taki z ciebie król dżungli, czemu po mieście bujasz się z gorylami?",
            start: 7.5,
            end: 11.15,
          },
          {
            text: "Ja wychowałem się wśród kundli, dlatego jesteśmy tak wyszczekani",
            start: 11.15,
            end: 15,
          },
          { text: "Jungle Girl, moje kwiaty z Cali", start: 15, end: 16.47 },
        ],
      },
    ],
  },
  {
    id: 80,
    day: 80,
    title: "MOLO",
    artist: "favst, KBLEAX, Kizo, Mr. Polska",
    audioSrc: "/80_MOLO.mp3",
    youtubeId: "_libnrgXdmE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "A dzisiaj ja widzę cię w Sea, kiedy w tle leci to Techno",
            start: 0.0,
            end: 4.06,
          },
          {
            text: "I w dłoni masz pixy, dzisiaj weźmiemy już tylko tą jedną",
            start: 4.06,
            end: 8.05,
          },
          {
            text: "Bo wtedy na molo mówiłeś mi, mała chyba to jest to",
            start: 8.05,
            end: 11.88,
          },
          {
            text: "Klasyczne Audi S8 D2, przecinamy osiedla (styl GDA!)",
            start: 11.88,
            end: 17.08,
          },
          {
            text: "Chodzimy tylko w Nike'ach, nowy ukraiński starter Lyca",
            start: 17.08,
            end: 20.66,
          },
        ],
      },
    ],
  },
  {
    id: 81,
    day: 81,
    title: "Ona Mówi",
    artist: "730 Huncho, Kazior, Malik Montana",
    audioSrc: "/81_Ona.mp3",
    youtubeId: "p6ppQzS2caM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Mam na sobie fancy Gucci", start: 0.0, end: 1.31 },
          { text: "Miasto nocą mnie nie nudzi", start: 1.31, end: 2.72 },
          { text: "Znowu kluby pełne ludzi", start: 2.72, end: 4.12 },
          { text: "Ona mówi, że chce buzi", start: 4.12, end: 6.23 },
          { text: "Ona mówi do mnie zostań dziś", start: 6.23, end: 9.01 },
        ],
      },
    ],
  },
  {
    id: 82,
    day: 82,
    title: "Palo Santo",
    artist: "Opał, Gibbs",
    audioSrc: "/82_Palo.mp3",
    youtubeId: "m2b0W_3CpRU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Voodoo, voodoo, voodoo, ej, ej", start: 0.0, end: 2.64 },
          {
            text: "Oczyszczam energię jak Palo Santo, znosiłem już wiele, więc oddaję duszę na custom, ej",
            start: 2.64,
            end: 9.65,
          },
          {
            text: "Tłumić emocje nauczył mnie tatko, ciągle powtarzaną mantrą, że chłopaki nie płaczą, wiesz",
            start: 9.65,
            end: 17.03,
          },
          {
            text: "Oczyszczam energię jak Palo Santo, znosiłem już wiele, więc oddaję duszę na custom, ej",
            start: 17.03,
            end: 24.34,
          },
          {
            text: "Tłumić emocje nauczył mnie tatko, ciągle powtarzaną mantrą, że chłopaki nie płaczą, wiesz",
            start: 24.34,
            end: 31.08,
          },
        ],
      },
    ],
  },
  {
    id: 83,
    day: 83,
    title: "BBS",
    artist: "Wiatr, Sitek",
    audioSrc: "/83_BBS.mp3",
    youtubeId: "qFHDmC5eJlk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gabloty szybkie jak przelew koledzy chcą",
            start: 0.0,
            end: 4.8,
          },
          {
            text: "Obok kogoś, kto wyciszy ich stres, yeah",
            start: 4.8,
            end: 9.68,
          },
          { text: "BBS, ooh, BBS", start: 9.68, end: 14.25 },
          { text: "Toczymy życia fele", start: 14.25, end: 16.12 },
          { text: "Tu dzień i noc (dzień i noc)", start: 16.12, end: 18.55 },
        ],
      },
    ],
  },
  {
    id: 84,
    day: 84,
    title: "BEZ STRESU",
    artist: "Taco Hemingway, Rumak, Livka",
    audioSrc: "/84_BEZ.mp3",
    youtubeId: "1H6R4iULqUc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: 'Barek, który mówić miał: "Jestem dorosły", mhm, jego usta miały smak Marlboro',
            start: 0.0,
            end: 5.77,
          },
          {
            text: "Dopija trzecią lampkę Porto, nie potrafi zdjąć stanika, bo się palce plączą",
            start: 5.77,
            end: 10.4,
          },
          {
            text: "Myślę, że to będzie jawny horror, ale cóż, najwyżej zostanę z anegdotką",
            start: 10.4,
            end: 15.24,
          },
          {
            text: "Zagubiony jak pasażer na gapę, wysiadł na następnej stacji i padł na kanapę",
            start: 15.24,
            end: 19.13,
          },
          {
            text: "Białe pasy na blacie i Jack White na plakacie, nie ma co płakać, biorę taxi i spierdalam na chatę",
            start: 19.13,
            end: 24.29,
          },
        ],
      },
    ],
  },
  {
    id: 85,
    day: 85,
    title: "DYLEMAT",
    artist: "Sentino",
    audioSrc: "/85_DYLEMAT.mp3",
    youtubeId: "NwueDxp6dqk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Bo to pretekst na urazy, a uraza doprowadzi do burdelu",
            start: 0.0,
            end: 4.38,
          },
          {
            text: "Żebyś płacił sutenerom tu podatek od procentów",
            start: 4.38,
            end: 7.54,
          },
          { text: "Wymyślone bajki", start: 7.54, end: 9.27 },
          { text: "Wielcy biznesmeni", start: 9.27, end: 11.09 },
          { text: "Noszą znoszone Najki", start: 11.09, end: 12.65 },
        ],
      },
    ],
  },
  {
    id: 86,
    day: 86,
    title: "GOMBAO 33",
    artist: "Mata, Adam33, Gombao 33, Szczepan, Wyguś",
    audioSrc: "/86_GOMBAO.mp3",
    youtubeId: "NXnIdVUMsWo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gombao 33, diabełki na barkach tak jak browary na flankach",
            start: 0.0,
            end: 3.73,
          },
          {
            text: "Mamy te ściemy na kartkach, mamy sklepy na karkach",
            start: 3.73,
            end: 6.01,
          },
          {
            text: "A jak japa jest darta, to do ranka w parkach",
            start: 6.01,
            end: 8.05,
          },
          {
            text: "Mamy w nucie instynkt, to jest Uber Eats styl",
            start: 8.05,
            end: 10.04,
          },
          {
            text: "Bo cię dojedziemy i jesteśmy pyszni",
            start: 10.04,
            end: 11.59,
          },
        ],
      },
    ],
  },
  {
    id: 87,
    day: 87,
    title: "Turkus",
    artist: "Kaz Bałagane",
    audioSrc: "/87_Turkus.mp3",
    youtubeId: "TgVjdAsR4kc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Powiedziała, że nie znajdę drugiej, jak ona na świecie",
            start: 0.0,
            end: 3.68,
          },
          {
            text: "Ja widziałem taką w klubie, widziałem w aptece",
            start: 3.68,
            end: 7.28,
          },
          {
            text: "Ja widziałem taką w sumie na poczcie, w markecie",
            start: 7.28,
            end: 11.24,
          },
          {
            text: "W branży rozrywkowej, dobrze znanym kabarecie",
            start: 11.24,
            end: 15.27,
          },
          {
            text: "Wszędzie widzę tych coachy, każdy chce być jak top G",
            start: 15.27,
            end: 18.77,
          },
        ],
      },
    ],
  },
  {
    id: 88,
    day: 88,
    title: "Forza",
    artist: "Epis Dym KNF",
    audioSrc: "/88_Forza.mp3",
    youtubeId: "woyI_xe82pQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Więc dlaczego we mnie kierowana jest suszara?",
            start: 0.0,
            end: 2.26,
          },
          {
            text: "Para to para, dwie sztuki lub wodna",
            start: 2.26,
            end: 4.38,
          },
          {
            text: "Zimną mam krew, a człowiek pochodnia",
            start: 4.38,
            end: 6.42,
          },
          {
            text: "Sporna to sprawa, lecz nie do końca",
            start: 6.42,
            end: 8.89,
          },
          {
            text: "Imponują mi ludzie, a nie ich Forsa",
            start: 8.89,
            end: 11.0,
          },
        ],
      },
    ],
  },
  {
    id: 89,
    day: 89,
    title: "Plaster",
    artist: "Szpaku, Deemz",
    audioSrc: "/89_Plaster.mp3",
    youtubeId: "1jqkDDh0v6o",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jeszcze wszystko będzie dobrze, wiem jak jest",
            start: 0.0,
            end: 5.11,
          },
          {
            text: "Ta piosenka jest jak plaster, gdy Ci źle",
            start: 5.11,
            end: 10.49,
          },
          {
            text: "Będą chcieli ludzie smutni Twoich łez",
            start: 10.49,
            end: 16.02,
          },
          {
            text: "Ty nie pozwól temu światu zepsuć Cię",
            start: 16.02,
            end: 21.14,
          },
          {
            text: "Jeszcze wszystko będzie dobrze, wiem jak jest",
            start: 21.14,
            end: 26.69,
          },
        ],
      },
    ],
  },
  {
    id: 90,
    day: 90,
    title: "RATATATA",
    artist: "Sentino",
    audioSrc: "/90_RATATATA.mp3",
    youtubeId: "zMN5nSSQIAA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Coke Cherry z dwa litry, nie potrzebna koka żadna mi",
            start: 0.0,
            end: 3.71,
          },
          {
            text: "Hotel w Nice, otwarte okna, palę tylko yummy CBD",
            start: 3.71,
            end: 6.99,
          },
          {
            text: "Rozwijam brandy na iPhonie, odmawiam koncerty, bo za dużo chcę",
            start: 6.99,
            end: 10.62,
          },
          {
            text: "Jak nie mówimy o dużych cyferkach to lepiej kasuj numer do mnie",
            start: 10.62,
            end: 14.05,
          },
          {
            text: "Nie jestem oni, oni nie mną, człowiek z klasą jak Alain Delon",
            start: 14.05,
            end: 17.84,
          },
        ],
      },
    ],
  },
  {
    id: 91,
    day: 91,
    title: "Ritz Carlton (Remix)",
    artist: "PRO8L3M, Vito Bambino",
    audioSrc: "/91_Ritz.mp3",
    youtubeId: "9TUJ0_dMQDU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Jak jest flota to zabieram", start: 0.0, end: 1.93 },
          { text: "Jak jest wróg to żywcem pożeram", start: 1.93, end: 3.89 },
          { text: "Jak arsenał to snajpera", start: 3.89, end: 5.66 },
          { text: "Jak fajera to ma się zbierać", start: 5.66, end: 7.43 },
          { text: "Jak kwatera to dajesz melanż", start: 7.43, end: 9.32 },
        ],
      },
    ],
  },
  {
    id: 92,
    day: 92,
    title: "Brunetki",
    artist: "Kaz Bałagane, Smolasty",
    audioSrc: "/92_Brunetki.mp3",
    youtubeId: "8_sNdAlXXgc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Że cała tutaj się wygina, jakby porobiona ryżem (oh)",
            start: 0.0,
            end: 3.46,
          },
          {
            text: "YouTube jako DJ, zawsze żółwie nas unoszą wyżej (he)",
            start: 3.46,
            end: 6.81,
          },
          {
            text: "Chuj wie co tam za składowe, z gigantami na Ibizie",
            start: 6.81,
            end: 10.28,
          },
          {
            text: "(Oh) jestem każda niż Ty bardziej charakterna (he)",
            start: 10.28,
            end: 13.63,
          },
          {
            text: "Kiedy mnie ujeżdża, wie kiedy podchodzi, mm",
            start: 13.63,
            end: 16.66,
          },
        ],
      },
    ],
  },
  {
    id: 93,
    day: 93,
    title: "NA KRAŃCU ŚWIATA",
    artist: "2115, Bedoes 2115, White 2115, kuqe 2115, @atutowy",
    audioSrc: "/93_NAKRACUWIA.mp3",
    youtubeId: "7AlDl7xuIDo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Bo bym ciebie znalazł (boom, boom, boom) nawet na krańcu świata",
            start: 0.0,
            end: 3.16,
          },
          {
            text: "(Boom, boom, boom)",
            start: 3.16,
            end: 4.54,
          },
          {
            text: "Gdy minął dzień, a słońce poszło spać",
            start: 4.54,
            end: 8.8,
          },
          {
            text: "To szukaj mnie na jednej z dzikich plaż",
            start: 8.8,
            end: 12.75,
          },
          {
            text: "Daj muzykę w górę, też lubię ten numer",
            start: 12.75,
            end: 17.58,
          },
        ],
      },
    ],
  },
  {
    id: 94,
    day: 94,
    title: "Generał",
    artist: "Malik Montana, Gzuz",
    audioSrc: "/94_Generał.mp3",
    youtubeId: "J_8B5Wtjdfg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Po seksie wygląda jak przez demona opętana",
            start: 0.0,
            end: 3.08,
          },
          {
            text: "Po jednym strzale szczęka rozjebana — porcelana",
            start: 3.08,
            end: 6.19,
          },
          {
            text: "A twoja głowa tak jak piłka będzie przekopana",
            start: 6.19,
            end: 9.24,
          },
          {
            text: "Przyjechał sahbi z Maroka, jest świeża czekolada",
            start: 9.24,
            end: 12.31,
          },
          {
            text: "Polscy raperzy kalki, mój styl nie do podjebania",
            start: 12.31,
            end: 15.41,
          },
        ],
      },
    ],
  },
  {
    id: 95,
    day: 95,
    title: "Fitness",
    artist: "Kizo, Trill Pem",
    audioSrc: "/95_Fitness.mp3",
    youtubeId: "k0QHxjnrpwU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ćwiczę tylko z obciążeniem, fitness, fitness, fitness",
            start: 0.0,
            end: 3.32,
          },
          {
            text: "Złoty łańcuch i kamienie, fitness, fitness, fitness",
            start: 3.32,
            end: 6.2,
          },
          {
            text: "Worek z grudą i paleniem, fitness, fitness, fitness",
            start: 6.2,
            end: 9.26,
          },
          {
            text: "Przed bieganiem gadaj o cenie, fitness",
            start: 9.26,
            end: 12.85,
          },
          {
            text: "Suka na chacie ćwiczy z Mel B",
            start: 12.85,
            end: 16.35,
          },
        ],
      },
    ],
  },
  {
    id: 96,
    day: 96,
    title: "Młody Bachor (outro)",
    artist: "Mata, GOMBAO 33, Deemz",
    audioSrc: "/96_Młody.mp3",
    youtubeId: "c4tyHYLs2eE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Pachnę baką, a nie Paco Rabanne", start: 0.0, end: 2.96 },
          {
            text: "Pierdolę Moët, ponieważ wolę Dorato",
            start: 2.96,
            end: 5.77,
          },
          {
            text: "Wznieśmy toast za to, żeby pierwszy milion nic nie zmienił w nas",
            start: 5.77,
            end: 10.08,
          },
          {
            text: "Mło... Młody Bachor, siedzę na schodach z flachą",
            start: 10.08,
            end: 13.51,
          },
          { text: "Pachnę baką, a nie Paco Rabanne", start: 13.51, end: 16.34 },
        ],
      },
    ],
  },
  {
    id: 97,
    day: 97,
    title: "VOGUE",
    artist: "Bedoes 2115, Lanek",
    audioSrc: "/97_VOGUE.mp3",
    youtubeId: "74awmTEOSOs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Podjeżdżam na blok, blok, blok, blok, blok",
            start: 0.0,
            end: 1.88,
          },
          {
            text: "Zmienię go w Vogue, Vogue, Vogue, Vogue, Vogue",
            start: 1.88,
            end: 3.94,
          },
          {
            text: "Podjeżdżam na blok, blok, blok, blok, blok",
            start: 3.94,
            end: 6.06,
          },
          {
            text: "Zmienię go w Vogue, Vogue, Vogue, Vogue, Vogue",
            start: 6.06,
            end: 8.06,
          },
          {
            text: "Podjeżdżam na blok, blok, blok, blok, blok",
            start: 8.06,
            end: 10.26,
          },
        ],
      },
    ],
  },
  {
    id: 98,
    day: 98,
    title: "Dior",
    artist: "Malik Montana",
    audioSrc: "/98_Dior.mp3",
    youtubeId: "NELIS_XlHhI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Szofer nas wiezie (ajajajaj)", start: 0.0, end: 2.52 },
          { text: "Ty i ja - tylne siedzenie", start: 2.52, end: 4.46 },
          { text: "Dior, Stempel na cegle, Dior", start: 4.46, end: 7.82 },
          { text: "Mi amore", start: 7.82, end: 10.49 },
          { text: "Truskawki Don Perignon", start: 10.49, end: 13.88 },
        ],
      },
    ],
  },
  {
    id: 99,
    day: 99,
    title: "NIE CHCĘ WRACAĆ",
    artist: "Fukaj, charlie moncler, Hubert.",
    audioSrc: "/99_NIE.mp3",
    youtubeId: "zDIPIqWF6LY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Dźwigałem dużo na barkach, a fala to zmywa jak pralka i zmywa też nas",
            start: 0.0,
            end: 3.48,
          },
          {
            text: "Druga już butla, wódka, bujam się jak łódka, bujam po podwórkach",
            start: 3.48,
            end: 6.5,
          },
          {
            text: "Noc już jest krótka, powtórka dopiero za rok, już miejscówka wybrana, no więc robię skok, beng",
            start: 6.5,
            end: 11.5,
          },
          {
            text: "Za oknem rozpadał się deszcz, ostatni taki jak chcesz",
            start: 11.5,
            end: 14.1,
          },
          {
            text: "Ostatni dzień, więc wyszedłem z domu by spojrzeć jaki dziś zmywa cień",
            start: 14.1,
            end: 17.28,
          },
        ],
      },
    ],
  },
  {
    id: 100,
    day: 100,
    title: "Zapłakane Matki (Def Jam World Tour)",
    artist: "Yung Adisz, Rusina, Def Jam World Tour",
    audioSrc: "/100_Zapakanema.mp3",
    youtubeId: "DaOOjDafAhM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Od eller pachnie im skuna",
            start: 0.0,
            end: 2.07,
          },
          {
            text: "Uważaj na głowę, bo trafi cię kula",
            start: 2.07,
            end: 4.02,
          },
          {
            text: "For her omkring tylko liczy się suma",
            start: 4.02,
            end: 7.31,
          },
          {
            text: "Teraz zarabiam z muzyki",
            start: 7.31,
            end: 8.39,
          },
          {
            text: "Nie wale tematu nie wierzysz to testuj mi siki",
            start: 8.39,
            end: 11.89,
          },
        ],
      },
    ],
  },
  {
    id: 101,
    day: 101,
    title: "Mówiłaś",
    artist: "Young Igi",
    audioSrc: "/101_Mwia.mp3",
    youtubeId: "693Tz-Rli5M",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Zobacz na co one wszystkie lecą",
            start: 0.0,
            end: 2.63,
          },
          {
            text: "Te stówy, te dwie, te pięć",
            start: 2.63,
            end: 4.46,
          },
          {
            text: "Jeśli Cię denerwuje, mów który",
            start: 4.46,
            end: 6.82,
          },
          {
            text: "Które mam wybrać, ze wspólnych zdjęć?",
            start: 6.82,
            end: 9.12,
          },
          {
            text: "Budowa związku z tektury (uu, wo-ow)",
            start: 9.12,
            end: 12.62,
          },
        ],
      },
    ],
  },
  {
    id: 102,
    day: 102,
    title: "COWABONGA",
    artist: "Żabson",
    audioSrc: "/102_COWABONGA.mp3",
    youtubeId: "MTHvecw7NZ4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "I zrobił to łeb poryty, i zrobił to łeb poryty",
            start: 0.0,
            end: 3,
          },
          {
            text: "Nie jakiś raper z fabryki, jaram temat Wiz Khalif'y",
            start: 3,
            end: 6.07,
          },
          {
            text: 'Robię se telefon z forsy: "Hello" jak Lionel Richie',
            start: 6.07,
            end: 9.34,
          },
          {
            text: "Mi też chcieli wmówić, że jestem gorszy przez to, że palę te spliff'y",
            start: 9.34,
            end: 12.68,
          },
          { text: "Kiedy zajaram stuff - cowabonga", start: 12.68, end: 16.13 },
        ],
      },
    ],
  },
  {
    id: 103,
    day: 103,
    title: "Patoreakcja",
    artist: "Mata",
    audioSrc: "/103_Patoreakcja.mp3",
    youtubeId: "t4O1LLk6qlY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wpada mi spam jak w chuj dymu do płuc",
            start: 0.0,
            end: 1.87,
          },
          { text: "Special One jak Mourinho", start: 1.87, end: 3.96 },
          { text: "Na Powązkach pomału kopią mi grób", start: 3.96, end: 6.08 },
          {
            text: "(Huff, huff, huff...) Jak mam się czuć?",
            start: 6.08,
            end: 9.2,
          },
          {
            text: "(Huff, huff, huff...) Jak mam się czuć?",
            start: 9.2,
            end: 12.19,
          },
        ],
      },
    ],
  },
  {
    id: 104,
    day: 104,
    title: "SIE KLEI",
    artist: "javier",
    audioSrc: "/104_SIE.mp3",
    youtubeId: "R1asZhTWAQc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jak rozpierdolę ten cash, chcę, żeby mi wpadał nowy",
            start: 0.0,
            end: 2.37,
          },
          {
            text: "Teraz polecę klasyczkiem, ona chce mi dawać głowy, yeah",
            start: 2.37,
            end: 5.28,
          },
          {
            text: "Młoda jesteś słodka, widzę, że się klei gadka",
            start: 5.28,
            end: 7.89,
          },
          {
            text: "Ciągle praca przy tym, wiesz, że nie liczę na farta",
            start: 7.89,
            end: 10.31,
          },
          {
            text: "Bary tak gorące, że się przypaliła kartka",
            start: 10.31,
            end: 12.59,
          },
        ],
      },
    ],
  },
  {
    id: 105,
    day: 105,
    title: "PO TEMACIE",
    artist: "vkie, Jacob.shawty, HUGEPAT",
    audioSrc: "/105_POTEMACIE.mp3",
    youtubeId: "0KSQvLq8jUY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ziomal najebany piłuje te mordę jak Bruce Buffer",
            start: 0.0,
            end: 3.07,
          },
          {
            text: "Siedzi we mnie małe miasto jestem, kurwa, z walk uppers",
            start: 3.07,
            end: 5.73,
          },
          {
            text: "Pisze do mnie pojebana — co mi zrobisz jak mnie złapiesz?",
            start: 5.73,
            end: 8.39,
          },
          {
            text: "Wpadła tutaj po temacie, jedna noc i po temacie",
            start: 8.39,
            end: 11.22,
          },
          {
            text: "Siedzę ze szlaufem po winach i nakurwia Speaker Knockerz",
            start: 11.22,
            end: 14.72,
          },
        ],
      },
    ],
  },
  {
    id: 106,
    day: 106,
    title: "DAM CI PORADY",
    artist: "vkie",
    audioSrc: "/106_DAM.mp3",
    youtubeId: "nlwUvZuWWS4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Zdzira nawija, że nie miałeś siana, jak wziąłeś ją w obrót obiecałeś ogień",
            start: 0.0,
            end: 3.35,
          },
          {
            text: "Słyszałem, że rzucasz słowa na luft i ponoć przez to zostałeś na lodzie",
            start: 3.35,
            end: 6.51,
          },
          {
            text: "Zdzira nawija, że nie chce na mrozie stać, że może wbije, że może pomogę",
            start: 6.51,
            end: 10.02,
          },
          {
            text: "Chyba widziała mnie na monitorze, chyba poczuła, że nie może odejść",
            start: 10.02,
            end: 13.6,
          },
          {
            text: "Zdzira nawija, że nie miałeś siana, jak wziąłeś ją w obrót obiecałeś ogień",
            start: 13.6,
            end: 16.72,
          },
        ],
      },
    ],
  },
  {
    id: 107,
    day: 107,
    title: "Kamień z serca",
    artist: "Bedoes 2115, Kubi Producent",
    audioSrc: "/107_Kamień.mp3",
    youtubeId: "WFCr2UrLOV8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ale nigdy nie zawiodłem brata, każdą bułką dzieląc się po równo",
            start: 0.0,
            end: 4.19,
          },
          { text: "Bedopies, Bedośmieć, Bedoes", start: 4.19, end: 5.84 },
          {
            text: "Bedoes jest jednocześnie tak zakłamanym, populistycznym, grubym, kurwa, wieprzem i cwelem",
            start: 5.84,
            end: 10.83,
          },
          { text: "Bedopies, Bedośmieć, Bedoes", start: 10.83, end: 13.5 },
          {
            text: "I, i ogólnie widzę to w Borysie, że bardzo jest pomocny",
            start: 13.5,
            end: 17.29,
          },
        ],
      },
    ],
  },
  {
    id: 108,
    day: 108,
    title: "CAŁE LATO",
    artist: "Sobel",
    audioSrc: "/108_July.mp3",
    youtubeId: "rzPl9ou6SVU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Bo dziś chcę pić, pić, pić, na trzeźwo - no, no, no",
            start: 0.0,
            end: 3.05,
          },
          {
            text: "To nie na moje nerwy, yeah, podaj mi rękę, rękę",
            start: 3.05,
            end: 6.48,
          },
          {
            text: "Mam brudne buty, dres i krzywe zęby i",
            start: 6.48,
            end: 9.12,
          },
          { text: "Całe lato chcę pić do rana", start: 9.12, end: 12.39 },
          {
            text: "Wszystkie kolorowe drinki do dna",
            start: 12.39,
            end: 15.44,
          },
        ],
      },
    ],
  },
  {
    id: 109,
    day: 109,
    title: "dopóki się nie znüdzisz",
    artist: "MIÜ, Zalia, Koder, Leon Krześniak",
    audioSrc: "/109_dopóki.mp3",
    youtubeId: "jn6ZnlgfnO4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "I nawet jak w tym momencie myślę, gdzie jesteś",
            start: 0.0,
            end: 2.35,
          },
          { text: "Wooo", start: 2.35, end: 3.48 },
          {
            text: "Wiem jak działają słowa i wiem co masz w głowie",
            start: 3.48,
            end: 7.8,
          },
          {
            text: "I powiem Ci dokładnie to co chce-e-e-esz",
            start: 7.8,
            end: 11.84,
          },
          {
            text: "Gdy mówisz, że mnie kochasz, wiem, że to nie o mnie",
            start: 11.84,
            end: 15.81,
          },
        ],
      },
    ],
  },
  {
    id: 110,
    day: 110,
    title: "Polski Karnawał",
    artist: "Żabson, Young Igi",
    audioSrc: "/110_Polski.mp3",
    youtubeId: "LUPXy3jJCrw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Lo-lo-lo, karnawał", start: 0.0, end: 2.4 },
          {
            text: "Leci tynk ze ścian, sąsiedzi myślą, że to zamach (wow)",
            start: 2.4,
            end: 6.41,
          },
          {
            text: "Nie ma tu zamuły, chociaż każdy z ziomów spawa (u-u)",
            start: 6.41,
            end: 9.65,
          },
          {
            text: "Wieczór wciąż przyspiesza, jakbym jebnął włada",
            start: 9.65,
            end: 13.34,
          },
          {
            text: "Pa, pa, pa, pa na mój poker face jak Lady Gaga",
            start: 13.34,
            end: 16.9,
          },
        ],
      },
    ],
  },
  {
    id: 111,
    day: 111,
    title: "Czarne BMW",
    artist: "Kukon, Magiera, Avi",
    audioSrc: "/111_Czarne.mp3",
    youtubeId: "gqaLQekhkuc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Chciałbym tak jak Universe umieć zmienić w perły deszcz",
            start: 0.0,
            end: 3.82,
          },
          { text: "Nasze życie jest inne niż twoje", start: 3.82, end: 6.92 },
          {
            text: "Patrzy suka z Porsche na mój łysy łeb",
            start: 6.92,
            end: 10.62,
          },
          {
            text: "W stylu chcę cię mieć, ale trochę się boję",
            start: 10.62,
            end: 14.06,
          },
          {
            text: "Na początku musisz wiedzieć czego chcesz",
            start: 14.06,
            end: 21.02,
          },
        ],
      },
    ],
  },
  {
    id: 112,
    day: 112,
    title: "Dom Nad Wodą",
    artist: "Pezet",
    audioSrc: "/112_DomNadWodą.mp3",
    youtubeId: "KaIsU6kSh90",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "I to stało się popkulturowym dziełеm jak Banksy",
            start: 0.0,
            end: 3.27,
          },
          {
            text: "I to nie sen ona ma czarne Louboutin, oh",
            start: 3.27,
            end: 5.93,
          },
          {
            text: "I jеst sztuką jakby malował ją Gauguin, oh",
            start: 5.93,
            end: 8.57,
          },
          {
            text: "Jemy śniadanie jakby gotował nam Bourdain",
            start: 8.57,
            end: 10.68,
          },
          {
            text: "Bo to jest życie o którym każdy kłamie na Instagramie, oh",
            start: 10.68,
            end: 13.9,
          },
        ],
      },
    ],
  },
  {
    id: 113,
    day: 113,
    title: "La Vida Loca",
    artist: "White 2115",
    audioSrc: "/113_La.mp3",
    youtubeId: "OUNkvORWKIU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Powiedz mi czemu traktujesz mnie jako ideał?",
            start: 0.0,
            end: 3.41,
          },
          {
            text: "Palę papierosa, jak gwiazda rocka robię hajs",
            start: 3.41,
            end: 6.45,
          },
          {
            text: "Nie na pokaz, chociaż mam widownie na blokach",
            start: 6.45,
            end: 9.42,
          },
          {
            text: "Tam nie ma Boga, wychowywani na prochach",
            start: 9.42,
            end: 12.08,
          },
          { text: "A ta mała ma to w oczach", start: 12.08, end: 13.86 },
        ],
      },
    ],
  },
  {
    id: 114,
    day: 114,
    title: "Pogo",
    artist: "Kizo, OKI",
    audioSrc: "/114_Pogo.mp3",
    youtubeId: "BjMcH1BF2hw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "W moim mieście się kręci biznes (woo)",
            start: 0.0,
            end: 2.1,
          },
          { text: "Pogo, pogo, pogo, pogo", start: 2.1, end: 5.15 },
          { text: "Ludzie palą, fury mielą kapcie", start: 5.15, end: 6.78 },
          { text: "Nocą wykładamy farmację (ey!)", start: 6.78, end: 8.66 },
          { text: "Pogo, pogo, pogo, pogo", start: 8.66, end: 12.01 },
        ],
      },
    ],
  },
  {
    id: 115,
    day: 115,
    title: "KING",
    artist: "Malik Montana, Lanberry",
    audioSrc: "/115_KINGfeatLa.mp3",
    youtubeId: "CZKC3RKaV1s",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie patrzę nigdy wstecz a swoich wrogów trzymam blisko",
            start: 0.0,
            end: 6.01,
          },
          {
            text: "Wpadasz w moją sieć, owinięty wokół palca błagasz mnie o litość",
            start: 6.01,
            end: 11.81,
          },
          {
            text: "Biorę to co chcę, mi się nie odmawia",
            start: 11.81,
            end: 14.76,
          },
          {
            text: "Biorę to co chcę, mam na imię Karma",
            start: 14.76,
            end: 17.33,
          },
          {
            text: "Co Ty o mnie wiesz?",
            start: 17.33,
            end: 20.83,
          },
        ],
      },
    ],
  },
  {
    id: 116,
    day: 116,
    title: "up! up! up!",
    artist: "Mata",
    audioSrc: "/116_up!.mp3",
    youtubeId: "Z5Qv3WJqR4w",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Dla mnie to takie proste", start: 0.0, end: 3.25 },
          {
            text: "Zakładam maskę czasami, no i udaję przed wami, że dorosłem",
            start: 3.25,
            end: 9.36,
          },
          {
            text: "Składam jak origami moje marzenia, czasami idzie gorzej, czasem lepiej",
            start: 9.36,
            end: 15.46,
          },
          { text: "Up, up, up — znowu lecę", start: 15.46, end: 17.61 },
          {
            text: "Zazwyczaj o tej porze z ziomkami pod sklepem",
            start: 17.61,
            end: 20.47,
          },
        ],
      },
    ],
  },
  {
    id: 117,
    day: 117,
    title: "Hinata",
    artist: "Szpaku",
    audioSrc: "/117_Hinata.mp3",
    youtubeId: "seCaY4Gzj5k",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Chcę być (woah)", start: 0.0, end: 2.09 },
          {
            text: "Jeśli mogę być kimś więcej niż tylko sobą",
            start: 2.09,
            end: 6.19,
          },
          { text: "Jeśli mogę żyć – to tylko z tobą", start: 6.19, end: 10.24 },
          { text: "I chcę być tu na zawsze", start: 10.24, end: 12.57 },
          { text: "I chcę być tu na zawsze", start: 12.57, end: 14.75 },
        ],
      },
    ],
  },
  {
    id: 118,
    day: 118,
    title: "HIPNOZA",
    artist: "NIKOŚ",
    audioSrc: "/118_HIPNOZA.mp3",
    youtubeId: "Xkob5a_oIEY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Zaraz mi ktoś ją ukradnie, każdy chce takie kobiety",
            start: 0.0,
            end: 2.85,
          },
          { text: "Życie pokaże, czy ma sens to (ej)", start: 2.85, end: 5.44 },
          {
            text: "Czy długopisem mażę, a to tylko zwykły tekst",
            start: 5.44,
            end: 8.04,
          },
          { text: "Ona chyba mnie zahipnotyzowała", start: 8.04, end: 11.07 },
          { text: "Bo gdy się na nią patrzę", start: 11.07, end: 12.39 },
        ],
      },
    ],
  },
  {
    id: 119,
    day: 119,
    title: "Lawenda",
    artist:
      "SB Maffija, White 2115, Białas, Kinny Zimmer, Pedro, francis, Bedoes 2115",
    audioSrc: "/119_Lawenda.mp3",
    youtubeId: "Qsqp34TbskQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Mała, jesteś już bezpieczna", start: 0.0, end: 2.6 },
          {
            text: "Wyrzuć tamte wspomnienia i tamte zdjęcia",
            start: 2.6,
            end: 6.4,
          },
          {
            text: "Bo my chcemy żyć, bo my chcemy kraść",
            start: 6.4,
            end: 9.42,
          },
          { text: "No i żadna kurwa nie zabroni nam", start: 9.42, end: 12.85 },
          {
            text: "Już wybija szósta, ja się nie chcę kłaść",
            start: 12.85,
            end: 16.39,
          },
        ],
      },
    ],
  },
  {
    id: 120,
    day: 120,
    title: "8 kobiet - Remix",
    artist: "TACONAFIDE, Quebonafide, Taco Hemingway, Bedoes 2115",
    audioSrc: "/120_8.mp3",
    youtubeId: "7kHsddf-6es",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Prawie wjechał w szlaban, bo nikt nie otworzył bramy",
            start: 0.0,
            end: 3.35,
          },
          {
            text: "Zawsze to robiła, znowu o tym zapomniałem",
            start: 3.35,
            end: 7.04,
          },
          {
            text: "Po koncertach setne zdjęcie robię z fanem",
            start: 7.04,
            end: 9.85,
          },
          {
            text: "Pyta czego słucham, czy znam taki raper Tory Lanez?",
            start: 9.85,
            end: 14.04,
          },
          {
            text: "Ho? Nawet nie mówię, że mówi się Tory Lanez, ej",
            start: 14.04,
            end: 17.53,
          },
        ],
      },
    ],
  },
  {
    id: 121,
    day: 121,
    title: "Alicja",
    artist: "Szpaku",
    audioSrc: "/121_Alicja.mp3",
    youtubeId: "QchSBiNxoVQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jak na Minimini płacze po nim, zawsze mówiłeś:",
            start: 0.0,
            end: 2.72,
          },
          {
            text: "Będę pierwszy, jebać ludzi, jebać błędy",
            start: 2.72,
            end: 5.96,
          },
          {
            text: "Cioty pierdolone muszą wiedzieć kto jest lepszy",
            start: 5.96,
            end: 8.64,
          },
          {
            text: "Muszą gadać, bardzo brzydko, bardzo źle",
            start: 8.64,
            end: 11.41,
          },
          {
            text: "Młodym wilkiem nie zostałem, zawsze byłem kurwa lwem",
            start: 11.41,
            end: 14.91,
          },
        ],
      },
    ],
  },
  {
    id: 122,
    day: 122,
    title: "Pistolet",
    artist: "Sentino",
    audioSrc: "/122_Pistolet.mp3",
    youtubeId: "Onchctfy9I4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Z głową w chmurach a w ręku whisky",
            start: 0.0,
            end: 2.27,
          },
          {
            text: "A teraz tylko ja i ten pistolet tu",
            start: 2.27,
            end: 6.04,
          },
          {
            text: "Teraz tylko ja i ten pistolet tu",
            start: 6.04,
            end: 9.82,
          },
          {
            text: "Ciągle czegoś mi brak jak miałem nic to byłem szczęśliwszy",
            start: 9.82,
            end: 13.48,
          },
          {
            text: "Najlepszy miałem swój czas",
            start: 13.48,
            end: 16.98,
          },
        ],
      },
    ],
  },
  {
    id: 123,
    day: 123,
    title: "Fluid",
    artist: "ReTo",
    audioSrc: "/123_Największe.mp3",
    youtubeId: "MOOvQvA7sRw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Poniżając ją sam będziesz poniżony", start: 0.0, end: 3.14 },
          {
            text: "Są chłopacy, są faceci, są kondomy",
            start: 3.14,
            end: 6.44,
          },
          { text: "Ona rozsypała fluid obok głowy", start: 6.44, end: 9.82 },
          {
            text: "I na umywalce, choć umyłem ją na połysk",
            start: 9.82,
            end: 14.47,
          },
          { text: "Wszędzie fluid", start: 14.47, end: 16.03 },
        ],
      },
    ],
  },
  {
    id: 124,
    day: 124,
    title: "Cichosza",
    artist: "Taco Hemingway, Otsochodzi, Zeppy Zep",
    audioSrc: "/124_Cichosza.mp3",
    youtubeId: "rDMBzMcRuMg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "(Ziomek) mój ma ksywę Infantino, (bo się) nigdy nie rozstaje z FIFĄ",
            start: 0.0,
            end: 3.42,
          },
          {
            text: "(Toczy) noc się, tak jak każda inna, (znowu) pokłóciłem się z taryfą",
            start: 3.42,
            end: 6.82,
          },
          {
            text: "(Bowiem) chodzi tylko o zasady, gdzie bym się przejmował dychą? (dychą)",
            start: 6.82,
            end: 10.25,
          },
          {
            text: "Kolejny ziomek się rozstał z dziewczyną",
            start: 10.25,
            end: 12.08,
          },
          {
            text: "Nie odpowiada lecz wiem jaka prawda gdy pytanie zadam czy chodzi o inną (whoo)",
            start: 12.08,
            end: 15.95,
          },
        ],
      },
    ],
  },
  {
    id: 125,
    day: 125,
    title: "Dr. Traphouse",
    artist: "Kaz Bałagane, Belmondo",
    audioSrc: "/125_Dr..mp3",
    youtubeId: "DpUtcNiMe40",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Dawno to wiem, choć krajowej nigdy nie tykam, nie",
            start: 0.0,
            end: 4.5,
          },
          {
            text: "Musze się skupić na finansach, suki i tak mam",
            start: 4.5,
            end: 8.3,
          },
          { text: "Możesz mi mówić Daquan", start: 8.3, end: 10.07 },
          {
            text: "Możesz nie lubić, bo zwiedzam Twoich koleżanek gardła",
            start: 10.07,
            end: 14.05,
          },
          {
            text: "Młody G, doktor Traphouse, kolega od jebanka (squad)",
            start: 14.05,
            end: 18.83,
          },
        ],
      },
    ],
  },
  {
    id: 126,
    day: 126,
    title: "Alcantara",
    artist: "Avi, Kukon, @atutowy",
    audioSrc: "/126_Alcantara.mp3",
    youtubeId: "O6hEGvDGSZg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Mój Boże, tylko zobacz, jak to idzie (jak to idzie)",
            start: 0.0,
            end: 2.21,
          },
          {
            text: "Świat powoli już staje się za mały (się za mały)",
            start: 2.21,
            end: 4.57,
          },
          {
            text: "Ona trzyma nogi na kokpicie (na kokpicie)",
            start: 4.57,
            end: 7.26,
          },
          {
            text: "We wnętrzach zrobionych z Alcantary (Alcantary)",
            start: 7.26,
            end: 9.31,
          },
          {
            text: "Mój Boże, tylko zobacz, jak to idzie (jak to idzie)",
            start: 9.31,
            end: 12.81,
          },
        ],
      },
    ],
  },
  {
    id: 127,
    day: 127,
    title: "ZAKOCHAŁEM SIĘ POD APTEKĄ",
    artist: "Taco Hemingway, Rumak, Livka",
    audioSrc: "/127_ZAKOCHAŁEM.mp3",
    youtubeId: "8EI_cXZLJRA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Piłem, paliłem blanty z nią (yhm), żyłem, śpiewałem country z nią (yhm)",
            start: 0.0,
            end: 3.59,
          },
          {
            text: "Śniłem, łykałem tabsy z nią, na nowo odkryłem miasto z nią",
            start: 3.59,
            end: 7.52,
          },
          {
            text: "Kupowałem z nią papierosy i zielone Air Maxy z nią",
            start: 7.52,
            end: 11.32,
          },
          {
            text: "Pokochałem jej rdzawe włosy, oczy, co jak latarnie lśnią",
            start: 11.32,
            end: 14.86,
          },
          {
            text: "Gdybym cofnął czas, żeby coś naprawić, to to jedno chciałbym w sobie zabić, bo",
            start: 14.86,
            end: 18.89,
          },
        ],
      },
    ],
  },
  {
    id: 128,
    day: 128,
    title: "Taxi",
    artist: "Kizo, Bletka, BeMelo, Eddie Block, Adash",
    audioSrc: "/128_Taxi.mp3",
    youtubeId: "gtdjggvaqsg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ale", start: 0.0, end: 0.97 },
          { text: "Przy moim stole (stole)", start: 0.97, end: 2.53 },
          { text: "Nie ma waszej rezerwacji", start: 2.53, end: 4.2 },
          {
            text: "Zapytaj, co chcę oprócz wakacji (co)",
            start: 4.2,
            end: 5.87,
          },
          { text: "Zakochani w tym samym niebie", start: 5.87, end: 7.65 },
        ],
      },
    ],
  },
  {
    id: 129,
    day: 129,
    title: "Wyglądam Dobrze",
    artist: "Fagata, Natalisa",
    audioSrc: "/129_Wyglądam.mp3",
    youtubeId: "CBqVwv3S_cM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Pokażę tym szmatom", start: 0.0, end: 1.2 },
          { text: "Ej, ej, ej, ha, ha, ha", start: 1.2, end: 3.87 },
          { text: "Damn", start: 3.87, end: 4.46 },
          {
            text: "Znowu zaufałam chłopakowi, no i to był błąd",
            start: 4.46,
            end: 6.93,
          },
          {
            text: "Teraz moje wersy jako dowód — to ocenia sąd",
            start: 6.93,
            end: 9.34,
          },
        ],
      },
    ],
  },
  {
    id: 130,
    day: 130,
    title: "Zegar",
    artist: "Kaz Bałagane, Kabe, Chris Carson",
    audioSrc: "/130_Zegar.mp3",
    youtubeId: "1vJqb50GZ-A",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ale już tutaj nie mieszkam",
            start: 0.0,
            end: 3.65,
          },
          {
            text: "Rap czy jebane worki, Ciągle się pyta koleżka",
            start: 3.65,
            end: 5.0,
          },
          {
            text: "Dobre pytanie, bo jeśli nie rap będe lokalnym proboszczem",
            start: 5.0,
            end: 7.87,
          },
          {
            text: "Zrobimy tak, nowinę mam, gardzę Twoim kurwa koksem",
            start: 7.87,
            end: 11.43,
          },
          {
            text: "Szmaty z podziwem patrzą",
            start: 11.43,
            end: 13.46,
          },
        ],
      },
    ],
  },
  {
    id: 131,
    day: 131,
    title: "Blondynki",
    artist: "Kaz Bałagane",
    audioSrc: "/131_Blondynki.mp3",
    youtubeId: "_a5NpEvFL6k",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "To dla Ciebie jestem groupie hoe, jestem grupie hoe (oh)",
            start: 0.0,
            end: 3.51,
          },
          {
            text: "Big Boss Dawg, zawiozę Cię pod blok",
            start: 3.51,
            end: 6.11,
          },
          {
            text: "Charlotte Tilbury, pillow talk, ja Prada i Fear of God",
            start: 6.11,
            end: 9.63,
          },
          {
            text: "Ty myślisz, że jestem jak wino, bo",
            start: 9.63,
            end: 12.06,
          },
          {
            text: "Widzę ten wzrok i tą minę soft, minę soft",
            start: 12.06,
            end: 15.4,
          },
        ],
      },
    ],
  },
  {
    id: 132,
    day: 132,
    title: "Błoto",
    artist: "wane",
    audioSrc: "/132_Błoto.mp3",
    youtubeId: "TjYh71x4CtQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Mam przed sobą nowy deal", start: 0.0, end: 1.2 },
          { text: "Nowy deal, chyba mam talent", start: 1.2, end: 2.6 },
          {
            text: "Mam wiele wad, ale wiele zalet (woah)",
            start: 2.6,
            end: 4.57,
          },
          {
            text: "Noszę dużo sosu, mamy wiele marek (woah)",
            start: 4.57,
            end: 6.47,
          },
          {
            text: "Każdy dzień zabawa, niepotrzebny balet (yeah)",
            start: 6.47,
            end: 8.86,
          },
        ],
      },
    ],
  },
  {
    id: 133,
    day: 133,
    title: "Fresh Prince (trill 4ever)",
    artist: "Bedoes 2115, Lanek, Malik Montana",
    audioSrc: "/133_Fresh.mp3",
    youtubeId: "4Wjw0MlibFo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Pod oknem Mercedes-Benz, co mi z tego jak syn ciągle tęskni za tatą",
            start: 0.0,
            end: 6.85,
          },
          { text: "Moja młodość pełna błędów", start: 6.85, end: 8.31 },
          { text: "Serce pełne uczuć", start: 8.31, end: 9.57 },
          { text: "Buzia pełna zębów", start: 9.57, end: 11.02 },
          { text: "Bliscy pełni dumy", start: 11.02, end: 12.35 },
        ],
      },
    ],
  },
  {
    id: 134,
    day: 134,
    title: "Pieniądze, Dziewczyny, Zwrotki",
    artist: "OKI, @atutowy",
    audioSrc: "/134_Pieniądze,.mp3",
    youtubeId: "5X96R-NT0hw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "(Golden...) Kto nie lubi floty, pierwszy rzuci sianem",
            start: 0.0,
            end: 3.85,
          },
          {
            text: "(Golden...) Świeże szmaty, a w nich kieszenie napchane",
            start: 3.85,
            end: 7.32,
          },
          {
            text: "(Golden...) Proste rzeczy, na ich punkcie najebane mam",
            start: 7.32,
            end: 12.3,
          },
          {
            text: "Pieniądze, dziewczyny, zwrotki, yeah, yeah (hej, hej)",
            start: 12.3,
            end: 15.84,
          },
          {
            text: "Pieniądze, dziewczyny, zwrotki, yeah, yeah (hej, hej)",
            start: 15.84,
            end: 19.64,
          },
        ],
      },
    ],
  },
  {
    id: 135,
    day: 135,
    title: "Abu Dhabi",
    artist: "Baba Hassan, Oska030, Pusher, Oil Beatz",
    audioSrc: "/135_AbuDhabi.mp3",
    youtubeId: "SGHNzsh9GXw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Znowu odpierdalam, dokarmiam kurwy z prasy",
            start: 0.0,
            end: 2.66,
          },
          {
            text: "Liczę sobie zyski, oni liczą straty",
            start: 2.66,
            end: 5.63,
          },
          {
            text: "Przed oczami jeden cel, chcę być bogaty",
            start: 5.63,
            end: 7.82,
          },
          {
            text: "Jebany brudny świat, gram w otwarte karty",
            start: 7.82,
            end: 10.53,
          },
          {
            text: "Piękne kobiety, czerwone Ferrari",
            start: 10.53,
            end: 14.03,
          },
        ],
      },
    ],
  },
  {
    id: 136,
    day: 136,
    title: "Nie Mam Czasu Na Wakacje",
    artist: "Żabson, Waima, Pedro, francis",
    audioSrc: "/136_Nie.mp3",
    youtubeId: "ppbtxQrjmic",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "To duży hard, biegnę jak Hart na złamany kark, mordo",
            start: 0.0,
            end: 3.36,
          },
          {
            text: "Wykorzystałem dar i włożyłem w to czas",
            start: 3.36,
            end: 5.03,
          },
          {
            text: "Dziś czuję się jak as, mordo (yeah, yeah)",
            start: 5.03,
            end: 7.62,
          },
          {
            text: "Chociaż nie miałem super kart (o nie)",
            start: 7.62,
            end: 10.03,
          },
          {
            text: "Teraz mam super car, a będę miał Ferrari",
            start: 10.03,
            end: 14.04,
          },
        ],
      },
    ],
  },
  {
    id: 137,
    day: 137,
    title: "Skrrrt",
    artist: "Young Multi, Beteo",
    audioSrc: "/137_Skrrrt.mp3",
    youtubeId: "LumG7jxeOGk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ja ciągle śniłem, by spełniać te sny",
            start: 0.0,
            end: 2.3,
          },
          { text: "Teraz mój problem to co ubrać dziś", start: 2.3, end: 4.15 },
          { text: "W drogim aucie robimy", start: 4.15, end: 5.82 },
          { text: "Sk-sk-skrrrrt", start: 5.82, end: 7.6 },
          { text: "Robimy sk-sk-skrrrrt", start: 7.6, end: 9.15 },
        ],
      },
    ],
  },
  {
    id: 138,
    day: 138,
    title: "100 BPM",
    artist: "Kizo, @bletka",
    audioSrc: "/138_Every.mp3",
    youtubeId: "w4k_6tUw2mQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Conmigo o nadie", start: 0.0, end: 0.85 },
          {
            text: "Pasuje mi twoje tempo, niełatwo mi dotrzymać kroku",
            start: 0.85,
            end: 4.9,
          },
          {
            text: "Jakoś inaczej się czuje kiedy mam cię na oku",
            start: 4.9,
            end: 9.25,
          },
          { text: "Moje serce bije 100 B-P-M", start: 9.25, end: 13.25 },
          { text: "Moje serce bije 100 B-P-M", start: 13.25, end: 18.3 },
        ],
      },
    ],
  },
  {
    id: 139,
    day: 139,
    title: "Floyd Mayweather",
    artist: "Żabson",
    audioSrc: "/139_Floyd.mp3",
    youtubeId: "kFUQVbfIuvw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gucci flip-flopsy lub Rafa Simonsa (Gucci)",
            start: 0.0,
            end: 2.89,
          },
          {
            text: "Nie zszedłem na psy, no bo mam coś z kota (ej)",
            start: 2.89,
            end: 5.53,
          },
          {
            text: "Robię to dla matki, robię to dla ojca",
            start: 5.53,
            end: 7.86,
          },
          {
            text: "Płacę większe podatki, niż myślałem o zarobkach (swag)",
            start: 7.86,
            end: 11.1,
          },
          { text: "Dziesięć tysięcy w portfelu (ej)", start: 11.1, end: 13.91 },
        ],
      },
    ],
  },
  {
    id: 140,
    day: 140,
    title: "JEREMY SOCHAN",
    artist: "OKI, bvdy47",
    audioSrc: "/140_JEREMY.mp3",
    youtubeId: "RspDppBZumA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Payday mam jak JJ (ha)", start: 0.0, end: 1.64 },
          { text: "Mój blok, tak to mój blok", start: 1.64, end: 3.56 },
          {
            text: "Cały świat widzi ten blok, jak Jeremy Soch",
            start: 3.56,
            end: 5.94,
          },
          { text: "Skok jak Jeremy Soch", start: 5.94, end: 7.34 },
          {
            text: "Skaczę jak Kamil Stoch, jak Travis Scott",
            start: 7.34,
            end: 11.81,
          },
        ],
      },
    ],
  },
  {
    id: 141,
    day: 141,
    title: "Broly",
    artist: "White 2115",
    audioSrc: "/141_Broly.mp3",
    youtubeId: "pE4zoAFcf5I",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "W mojej krwi non stop THC oraz drink",
            start: 0.0,
            end: 3.28,
          },
          {
            text: "Blok mnie pamięta, a czy pamiętać będziesz mnie Ty?",
            start: 3.28,
            end: 7.03,
          },
          {
            text: "Ye-ye-ye-ye-ye-ye-yeah",
            start: 7.03,
            end: 9.96,
          },
          {
            text: "Mam zielone włosy tak jak Joker albo Broly",
            start: 9.96,
            end: 13.27,
          },
          {
            text: "I w sumie zgadza się to trochę, bo w mojej roli",
            start: 13.27,
            end: 17.61,
          },
        ],
      },
    ],
  },
  {
    id: 142,
    day: 142,
    title: "koleżanko mojej byłej",
    artist: "Chivas",
    audioSrc: "/142_koleankomo.mp3",
    youtubeId: "_SSXlFc-Pg0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Moja pierwsza dziewczyna udawała, że ma raka",
            start: 0.0,
            end: 3.52,
          },
          {
            text: "Dawno temu, no i wcale nie umarła",
            start: 3.52,
            end: 6.43,
          },
          {
            text: "Żyję z guzem, teraz chodzę po terapiach",
            start: 6.43,
            end: 10.38,
          },
          {
            text: "Teraz mam trzy serca i każde pęka",
            start: 10.38,
            end: 13.32,
          },
          {
            text: "Odciśnięta podeszwa, bo deptała butem, druga i ta pierwsza",
            start: 13.32,
            end: 17.83,
          },
        ],
      },
    ],
  },
  {
    id: 143,
    day: 143,
    title: "NIE MOGĘ SPAĆ",
    artist: "SVM!R",
    audioSrc: "/143_NIE.mp3",
    youtubeId: "ykluN7v4rvQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Siedzę dziś z modelkami, żadnej z nich nie płacę nic (Ooo-ooo-ooo)",
            start: 0.0,
            end: 4.26,
          },
          {
            text: "Nie mam już czasu na drobne, nawet nie rzucaj sumą (Ooo-ooo-ooo)",
            start: 4.26,
            end: 7.65,
          },
          { text: "Samolotowy tryb mam, bo", start: 7.65, end: 9.56 },
          {
            text: "Nie mogę spać, a wziąłem leki na sen",
            start: 9.56,
            end: 16.14,
          },
          {
            text: "Chciałem tylko wstać, a leżę już trzeci dzień-ień",
            start: 16.14,
            end: 22.31,
          },
        ],
      },
    ],
  },
  {
    id: 144,
    day: 144,
    title: "Delfin",
    artist: "Bedoes 2115, Kubi Producent, Koldi, Young Multi, Beteo",
    audioSrc: "/144_Delfin.mp3",
    youtubeId: "1YTnfIaSitk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Biały iPhone, fury robią hałas, Ty nas nienawidzisz, ale ona jest w tym zakochana",
            start: 0.0,
            end: 5.56,
          },
          {
            text: "Kurwa! Puść to na podwórkach",
            start: 5.56,
            end: 9.31,
          },
          {
            text: "Ciągle jestem głodny, tak jak Gustaw",
            start: 9.31,
            end: 11.96,
          },
          {
            text: "Nie ma opcji, że ktoś ze mną nie ma kaski",
            start: 11.96,
            end: 14.7,
          },
          {
            text: "Szybkie życie od małego, jak Morawski",
            start: 14.7,
            end: 18.2,
          },
        ],
      },
    ],
  },
  {
    id: 145,
    day: 145,
    title: "XO",
    artist: "Chivas",
    audioSrc: "/145_XO.mp3",
    youtubeId: "b3UUIg7NOcM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Byłem głupcem, myślałem, że to dobre",
            start: 0.0,
            end: 2.9,
          },
          {
            text: "Dni są gorące, lód na sercu topnie",
            start: 2.9,
            end: 5.36,
          },
          {
            text: "To tak, jakbym miał drip, a wszystko co na mnie moknie",
            start: 5.36,
            end: 7.95,
          },
          {
            text: "Wpadam Ci na ekran czasem, gdzie spada jedna łezka po drugiej",
            start: 7.95,
            end: 12.72,
          },
          {
            text: "Kiedyś byłem beksa w szkole, a przez Ciebie i podobne mało czuję",
            start: 12.72,
            end: 18.04,
          },
        ],
      },
    ],
  },
  {
    id: 146,
    day: 146,
    title: "KETCHUP",
    artist: "2115, Bedoes 2115, Blacha 2115, White 2115, kuqe 2115",
    audioSrc: "/146_KETCHUP.mp3",
    youtubeId: "vKTW8aqBDD4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gdy podjeżdżam z kumplami, to ci zmieniamy plany na wieczór (ej, baby)",
            start: 0.0,
            end: 3.05,
          },
          {
            text: "Czerwone dywany (to podjeżdżamy), czerwone bandany (zostawiamy)",
            start: 3.05,
            end: 6.6,
          },
          {
            text: "Wszędzie czerwone plamy, ale ten sos to nie ketchup, słuchaj",
            start: 6.6,
            end: 10.04,
          },
          {
            text: "Powiedz, jakie, jakie masz plany, plany na wieczór (ej, baby)",
            start: 10.04,
            end: 13.37,
          },
          {
            text: "Gdy podjeżdżam z kumplami, to ci zmieniamy plany na wieczór (ej, baby)",
            start: 13.37,
            end: 16.64,
          },
        ],
      },
    ],
  },
  {
    id: 147,
    day: 147,
    title: "KLAP KLAP",
    artist: "Dajczman",
    audioSrc: "/147_KLAP.mp3",
    youtubeId: "GC9dBPkGAkU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wysyła mi nudesa na Snapchat (wow), duża dupa robi klap, klap, klap, klap",
            start: 0.0,
            end: 4.25,
          },
          {
            text: "To nie nudes, przecież nagrała to w majtkach, nie śpię na poduszce, odkąd sypiam na pośladkach (Naajak)",
            start: 4.25,
            end: 9.21,
          },
          { text: "Hahaha", start: 9.21, end: 11.73 },
          { text: "Bitch, TM got that dope", start: 11.73, end: 14.22 },
          { text: "Dajczman, znowu to robisz", start: 14.22, end: 16.54 },
        ],
      },
    ],
  },
  {
    id: 148,
    day: 148,
    title: "Discopolo",
    artist: "Kizo, BeMelo, Gory",
    audioSrc: "/148_Discopolo.mp3",
    youtubeId: "IeWDL2co9R0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Chciałbym przeżyć z nimi dłużej niż dobę",
            start: 0.0,
            end: 2.11,
          },
          {
            text: "Sami specjaliści od muzyki, handlu i kalisteniki",
            start: 2.11,
            end: 5.45,
          },
          {
            text: "Robimy wyniki, więc robią się pliki",
            start: 5.45,
            end: 7.02,
          },
          {
            text: "W tym nigdy nie będziesz miał specjalistyki (nie, nie, nie)",
            start: 7.02,
            end: 9.38,
          },
          {
            text: "Z idiotami nie gadam, więc siedzę cicho",
            start: 9.38,
            end: 11.05,
          },
        ],
      },
    ],
  },
  {
    id: 149,
    day: 149,
    title: "Legendarne Duo",
    artist: "Aleshen, Yung Adisz, RYGOR, BAHsick",
    audioSrc: "/149_Legendarne.mp3",
    youtubeId: "JJStkberhcA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wyszedłem na ludzi, kto drugi taki z pionierów",
            start: 0.0,
            end: 2.91,
          },
          {
            text: "Po tych nieprzespanych nocach, czuje, że gubię emocje",
            start: 2.91,
            end: 6.13,
          },
          {
            text: "Plącze się za dnia, błąkam - jakbym miał insomie",
            start: 6.13,
            end: 9.26,
          },
          {
            text: "Gdzie kieruje swoją postać, znowu upadam na łokcie",
            start: 9.26,
            end: 12.25,
          },
          {
            text: "Wiem, co mam zrobić te uczucie nie jest obce",
            start: 12.25,
            end: 15.75,
          },
        ],
      },
    ],
  },
  {
    id: 150,
    day: 150,
    title: "Nie bój się bać",
    artist: "PRO8L3M, Anita Lipnicka, Luxon",
    audioSrc: "/150_Nie.mp3",
    youtubeId: "sPvrZziccek",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie bój się bać, gdy chcesz to płacz",
            start: 0.0,
            end: 2.77,
          },
          { text: "Idź szukać wiatru w polu", start: 2.77, end: 5.97 },
          { text: "Pocałuj noc w najwyższą z gwiazd", start: 5.97, end: 8.91 },
          { text: "Zapomnij się i tańcz", start: 8.91, end: 15.61 },
          { text: "(bit)", start: 15.61, end: 19.61 },
        ],
      },
    ],
  },
  {
    id: 151,
    day: 151,
    title: "Czarna Perła",
    artist:
      "SB Maffija, Szpaku, Białas, Fukaj, po prostu Kajtek, White 2115, 27.Fuckdemons, Chivas, Kubi Producent",
    audioSrc: "/151_Czarna.mp3",
    youtubeId: "wIPobNIK0MA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ja, na całe szczęście mam Twoje zdjęcie, trzymam je w starej kopercie",
            start: 0.0,
            end: 3.66,
          },
          {
            text: "I sobie zerkam, bo rude włosy na wietrze są najpiękniejsze (są najpiękniejsze)",
            start: 3.66,
            end: 9.48,
          },
          {
            text: "Nie wiedziałem, co mam zrobić, więc płynąłem oceanem łez",
            start: 9.48,
            end: 16.27,
          },
          {
            text: "Prawie już się pogubiłem, ale złapałem za ster",
            start: 16.27,
            end: 20.51,
          },
          { text: "Poszarpany jak żagle na statku", start: 20.51, end: 23.24 },
        ],
      },
    ],
  },
  {
    id: 152,
    day: 152,
    title: "Algeciras",
    artist: "Sentino",
    audioSrc: "/152_Algeciras.mp3",
    youtubeId: "7QYc5GdNRdE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "I nigdy więcej zapierdalać",
            start: 0.0,
            end: 1.25,
          },
          {
            text: "Machać moim wrogom świeżym cashem",
            start: 1.25,
            end: 3.29,
          },
          {
            text: "I dziś siedzę se tu jak ten prezes Uhh...",
            start: 3.29,
            end: 6.2,
          },
          {
            text: "Z złotym rolexem",
            start: 6.2,
            end: 7.01,
          },
          {
            text: "Mama mówiła synku uważaj, bo",
            start: 7.01,
            end: 9.7,
          },
        ],
      },
    ],
  },
  {
    id: 153,
    day: 153,
    title: "Karate Kid",
    artist: "Białas, Lanek, Malik Montana",
    audioSrc: "/153_KarateKid.mp3",
    youtubeId: "r6n1-N_xSU4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Robię ją w minutę, kop na dupę i za drzwi",
            start: 0.0,
            end: 2.31,
          },
          {
            text: "Karate kid, karate kid",
            start: 2.31,
            end: 5.93,
          },
          {
            text: "Czarny pas, to Białas, Malik, Mr. Miyagi",
            start: 5.93,
            end: 9.08,
          },
          {
            text: "Karate kid, karate kid",
            start: 9.08,
            end: 11.77,
          },
          {
            text: "Robię ją w minutę, kop na dupę i za drzwi",
            start: 11.77,
            end: 15.27,
          },
        ],
      },
    ],
  },
  {
    id: 154,
    day: 154,
    title: "Stonerki",
    artist: "Young Leosia, Oliwka Brazil",
    audioSrc: "/154_Stonerki.mp3",
    youtubeId: "DSk1w9_VTk4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "I mam lekko, a nie ciężko", start: 0.0, end: 1.28 },
          {
            text: "Za to każdy chce mnie strzepnąć ze sceny",
            start: 1.28,
            end: 3.04,
          },
          { text: "(I-i-i tak zrobię te numery)", start: 3.04, end: 4.7 },
          {
            text: "I-i znowu zrobię liczby chociaż żyję w środku dziczy",
            start: 4.7,
            end: 6.73,
          },
          {
            text: "Ludzi trochę pojebało, znowu brakuje mi ciszy",
            start: 6.73,
            end: 9.18,
          },
        ],
      },
    ],
  },
  {
    id: 155,
    day: 155,
    title: "Amerykańskie Teledyski",
    artist: "OKI, Young Igi, Otsochodzi, OIO, Kubi Producent",
    audioSrc: "/155_Amerykaski.mp3",
    youtubeId: "22YD5r9Wn60",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Poczuć się jak oni, a nie wszyscy (wow)",
            start: 0.0,
            end: 2.24,
          },
          {
            text: "Bliżej jest mi do idoli, niż do bliskich, yeah",
            start: 2.24,
            end: 6.31,
          },
          {
            text: "Bliżej do idoli ci niż bliskich, proste",
            start: 6.31,
            end: 8.77,
          },
          {
            text: "Bo łatwiej znosi wzrok się, gdy oczy są obce",
            start: 8.77,
            end: 11.44,
          },
          {
            text: "Ale ja mam tak samo, obserwuję ich postęp",
            start: 11.44,
            end: 14.94,
          },
        ],
      },
    ],
  },
  {
    id: 156,
    day: 156,
    title: "DRESSCODE",
    artist: "2115, Bedoes 2115, White 2115, prześwit, Taco Hemingway",
    audioSrc: "/156_DRESSCODE.mp3",
    youtubeId: "AYRRolY_pek",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Czuję się jak gwiazda, kiedy na mnie Céline i Dior",
            start: 0.0,
            end: 2.89,
          },
          {
            text: "Dziś mam humor znów na mały fell in love",
            start: 2.89,
            end: 5.48,
          },
          {
            text: "Każde moje słowo podpisuję jako Pretty Boy",
            start: 5.48,
            end: 7.96,
          },
          { text: "Ona ma na sobie tank top (hej)", start: 7.96, end: 10.72 },
          {
            text: "Ja na głowie znowu bankroll, honey",
            start: 10.72,
            end: 13.35,
          },
        ],
      },
    ],
  },
  {
    id: 157,
    day: 157,
    title: "Crash Test",
    artist: "PRO8L3M",
    audioSrc: "/157_CrashTest.mp3",
    youtubeId: "zKOzQdmXotI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ja, ona, zawsze, niszczę to jak kastet (to jak kastet)",
            start: 0.0,
            end: 3.93,
          },
          {
            text: "Odpalam Kraftwerk, auto, mur, crash test",
            start: 3.93,
            end: 7.5,
          },
          {
            text: "(I've been so lonely since you went away)",
            start: 7.5,
            end: 11.05,
          },
          {
            text: "(I've been so lonely without you everyday)",
            start: 11.05,
            end: 14.09,
          },
          {
            text: 'Ja nie mówię jej "kocham", gdy pyta czy zostać',
            start: 14.09,
            end: 17.59,
          },
        ],
      },
    ],
  },
  {
    id: 158,
    day: 158,
    title: "JUŻ PÓŹNO ALE PIENIĄDZ NIE ŚPI",
    artist: "vkie, YPNTY",
    audioSrc: "/158_JUŻ.mp3",
    youtubeId: "eKqEJautpns",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Własne siano lubię wydać, no i lubię (cash) je w dotyku (cash)",
            start: 0.0,
            end: 2.76,
          },
          {
            text: "Terapeutka nie uwierzy, ile tabsów jadłem w peaku (ja pierdole)",
            start: 2.76,
            end: 6.06,
          },
          {
            text: "Twoja małpa ma trociny w głowie, rzuć ją dla termitów (thehe)",
            start: 6.06,
            end: 9.3,
          },
          {
            text: "Weź się nie ryj, byku, wiesz, mój ziomal od razu to wyczuł (byku)",
            start: 9.3,
            end: 12.31,
          },
          {
            text: "Znowu awantura, może się obejdzie bez prawników (bez prawników)",
            start: 12.31,
            end: 14.86,
          },
        ],
      },
    ],
  },
  {
    id: 159,
    day: 159,
    title: "SKUTE BOBO",
    artist: "SKUTE BOBO",
    audioSrc: "/159_SKUTE.mp3",
    youtubeId: "jM4voQJrYs0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Bermudy, wyspy Bergamuty, Boliwia", start: 0.0, end: 1.76 },
          { text: "A u nas cię czeka sromotna kara", start: 1.76, end: 3.43 },
          { text: "Nie kończę jarać", start: 3.43, end: 4.56 },
          {
            text: "I-jo, i-jo, szkoda, że muszę spierdalać",
            start: 4.56,
            end: 6.63,
          },
          { text: "Za skuna mandat, a nie krata", start: 6.63, end: 8.25 },
        ],
      },
    ],
  },
  {
    id: 160,
    day: 160,
    title: "SEXTAPE",
    artist: "Sobel, OKI, Deemz, Magiera, PSR",
    audioSrc: "/160_SEXTAPE.mp3",
    youtubeId: "8de5Ts9-qD0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Buja się budynek", start: 0.0, end: 1.5 },
          { text: "Bujają się ziomki", start: 1.5, end: 3.05 },
          { text: "Wyjebało mi łeb i wyjebało korki", start: 3.05, end: 6.01 },
          {
            text: "Buja się budynek, bujają się ziomki",
            start: 6.01,
            end: 9.65,
          },
          {
            text: "In my white tee (w białej koszulce)",
            start: 9.65,
            end: 12.44,
          },
        ],
      },
    ],
  },
  {
    id: 161,
    day: 161,
    title: "Speed Racing",
    artist: "White Widow",
    audioSrc: "/161_Speed.mp3",
    youtubeId: "j2UfqVTDjD8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "No i tańczę kankan na twojej posesji (rrrhra)",
            start: 0.0,
            end: 1.95,
          },
          {
            text: "Ten twój blok cały, kurwa spakowany (ra, ra)",
            start: 1.95,
            end: 3.52,
          },
          {
            text: "Będą pisać pakty o nieagresji (ra)",
            start: 3.52,
            end: 5.42,
          },
          {
            text: "Lubię damy, coco w kancelarii (okej)",
            start: 5.42,
            end: 6.9,
          },
          {
            text: "Lubię wasze mamy, i nie lubię leszczy (ej-jo)",
            start: 6.9,
            end: 8.71,
          },
        ],
      },
    ],
  },
  {
    id: 162,
    day: 162,
    title: "Do Tanca",
    artist: "Malik Montana, Żabson, Eurosoundz",
    audioSrc: "/162_Do.mp3",
    youtubeId: "tONC33XYxfk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ciągle spełniam marzenia, nie śpię, bo gonię sny",
            start: 0.0,
            end: 4.08,
          },
          {
            text: "Do tańca zapraszam (pa, pa, pa, pa, pa, pa, pa)",
            start: 4.08,
            end: 8.53,
          },
          {
            text: "Moja klamka nabita (pa, pa, pa, pa, pa, pa, pa)",
            start: 8.53,
            end: 12.74,
          },
          {
            text: "Do tańca zapraszam (pa, pa, pa, pa, pa, pa, pa)",
            start: 12.74,
            end: 16.46,
          },
          {
            text: "Moja klamka nabita (pa, pa, pa, pa, pa, pa, pa)",
            start: 16.46,
            end: 20.96,
          },
        ],
      },
    ],
  },
  {
    id: 163,
    day: 163,
    title: "Tenten",
    artist: "Wenext, Młody West, Okekel, wane",
    audioSrc: "/163_Tenten.mp3",
    youtubeId: "OF9MeyErYyM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Same fejki, kurwa, dookoła, macie rację, to są wasi ludzie",
            start: 0.0,
            end: 3.22,
          },
          {
            text: "Ziom ma ojca tam, gdzie mury, tam, gdzie kraty",
            start: 3.22,
            end: 7.23,
          },
          {
            text: "Jaka prosta droga? Wszyscy po tym, wszyscy na tym",
            start: 7.23,
            end: 10.34,
          },
          {
            text: "Czemu braciak zawsze tam, gdzie, kurwa, tarapaty? (Tarapaty)",
            start: 10.34,
            end: 13.84,
          },
          {
            text: "Dużo ciapy w kieszeni, diabeł wciąż tarabani, yeah",
            start: 13.84,
            end: 17.72,
          },
        ],
      },
    ],
  },
  {
    id: 164,
    day: 164,
    title: "Interpol",
    artist: "PRO8L3M",
    audioSrc: "/164_Interpol.mp3",
    youtubeId: "LbByBWDvHOA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ty płaczesz oceanem łez",
            start: 0.0,
            end: 2.55,
          },
          {
            text: "Zatrzyjmy zapachy, ślady",
            start: 2.55,
            end: 5.5,
          },
          {
            text: "Żyjmy nie chcąc się naprawić",
            start: 5.5,
            end: 8.08,
          },
          {
            text: "A widząc w tle światła obławy",
            start: 8.08,
            end: 10.69,
          },
          {
            text: "Niech pomaga nam deszcz",
            start: 10.69,
            end: 14.19,
          },
        ],
      },
    ],
  },
  {
    id: 165,
    day: 165,
    title: "Przester",
    artist: "Young Leosia, bambi, PG$, francis",
    audioSrc: "/165_Przester.mp3",
    youtubeId: "IVjtPjqjZWs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "W weekend szaleć, gdzieś przy barze",
            start: 0.0,
            end: 2.17,
          },
          { text: "Każdy koncert pełne sale", start: 2.17, end: 3.94 },
          { text: "Za dużo wódki, za dużo ludzi", start: 3.94, end: 6.0 },
          { text: "Za dużo hajsu, za dużo spraw", start: 6.0, end: 8.13 },
          {
            text: "Wyłącz ten budzik, dziś nie chcę się budzić",
            start: 8.13,
            end: 10.01,
          },
        ],
      },
    ],
  },
  {
    id: 166,
    day: 166,
    title: "Worki W Tłum",
    artist: "OKI, Young Igi, Otsochodzi, OIO",
    audioSrc: "/166_Worki.mp3",
    youtubeId: "kDp-MYkjJ5A",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Kto łapie, ten jara", start: 0.0, end: 1.79 },
          { text: "Kto łapie, ten jara", start: 1.79, end: 5.59 },
          { text: "Kto łapie, ten jara", start: 5.59, end: 9.24 },
          { text: "Kto łapie, ten jara", start: 9.24, end: 12.97 },
          { text: "Kto łapie, ten jar a", start: 12.97, end: 14.85 },
        ],
      },
    ],
  },
  {
    id: 167,
    day: 167,
    title: "RS7",
    artist: "ReTo, SecretRank",
    audioSrc: "/167_RS7.mp3",
    youtubeId: "wMISg19hvSk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wiemy obydwaj, wziąłem cię w pierwszym lapsie",
            start: 0.0,
            end: 1.79,
          },
          {
            text: "Bo skill nową Betą i mam stylu coś z M5-ki",
            start: 1.79,
            end: 4.47,
          },
          {
            text: "Wjeżdża styl jak Toledo z V-maxem, Seicento sporty",
            start: 4.47,
            end: 7.82,
          },
          {
            text: "ReTo powiedz jak ty tak umiesz, a bo chłopie umiem się streszczać",
            start: 7.82,
            end: 10.85,
          },
          {
            text: "A jedynie siedzę na dupie, kiedy widzisz długie w lusterkach, to ja",
            start: 10.85,
            end: 14.35,
          },
        ],
      },
    ],
  },
  {
    id: 168,
    day: 168,
    title: "Smoki",
    artist: "Bedoes 2115, Lanek",
    audioSrc: "/168_Smoki.mp3",
    youtubeId: "3KbKSOJ4P4s",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Rozbite rodziny dzielone na pół", start: 0.0, end: 2.91 },
          {
            text: "By nic nie czuć jarałem lufę na dwóch",
            start: 2.91,
            end: 5.82,
          },
          { text: "Jedni idą na pole drudzy na dwór", start: 5.82, end: 8.71 },
          { text: "Ale wszyscy tak samo nosimy ból", start: 8.71, end: 11.77 },
          {
            text: "Smoki przylatują zawsze kiedy płacze",
            start: 11.77,
            end: 15.07,
          },
        ],
      },
    ],
  },
  {
    id: 169,
    day: 169,
    title: "Miniówa",
    artist: "Kukon",
    audioSrc: "/169_Miniówa.mp3",
    youtubeId: "ESj1fxCv_gs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Stoimy na parkingu, a bagażnik jest otwarty",
            start: 0.0,
            end: 2.79,
          },
          {
            text: "Mój ziomek jest wczuty, podkręca sobie te lalki",
            start: 2.79,
            end: 5.14,
          },
          {
            text: "Ja w sumie wyjebane, jestem skuty jak Al Bundy",
            start: 5.14,
            end: 8.14,
          },
          {
            text: "Ciasna miniówa na jej dupie w jakieś kwiatki",
            start: 8.14,
            end: 10.39,
          },
          {
            text: "Tak samo nieśmiało pyta mnie czy lubię zabawki",
            start: 10.39,
            end: 13.28,
          },
        ],
      },
    ],
  },
  {
    id: 170,
    day: 170,
    title: "Yabadabadoo",
    artist: "Salvador",
    audioSrc: "/170_Yabadabadoo.mp3",
    youtubeId: "pjfWwHAILQk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ya-ya-ya-ya-yabadabadoo, smażę babola z moim gangiem",
            start: 0.0,
            end: 3.64,
          },
          {
            text: "Zapierdalam furą albo kurwa dinozaurem",
            start: 3.64,
            end: 6.55,
          },
          {
            text: "Dino pizga szczura kiedy niunie pukam w wannie (Pusia)",
            start: 6.55,
            end: 10.27,
          },
          {
            text: "Na mnie szata i krawacik, suko to designer",
            start: 10.27,
            end: 12.37,
          },
          {
            text: "Ya-ya-ya-ya-yabadabadoo, smażę babola z moim gangiem",
            start: 12.37,
            end: 15.54,
          },
        ],
      },
    ],
  },
  {
    id: 171,
    day: 171,
    title: "6.3 AMG",
    artist: "Malik Montana",
    audioSrc: "/171_6.3.mp3",
    youtubeId: "KdHqdBWMYmA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jak nie zmieniam biegu to rękę trzymam na gratach",
            start: 0.0,
            end: 3.43,
          },
          {
            text: "Drapię się po jajach i w zagłówku mam masaż",
            start: 3.43,
            end: 6.68,
          },
          {
            text: "Mówi mi, że jestem słodki, to chyba ananas",
            start: 6.68,
            end: 10.25,
          },
          {
            text: "Bez wytwórni, niezależny, Get Money Live Life",
            start: 10.25,
            end: 13.45,
          },
          {
            text: 'Ty drapiesz się po głowie myśląć, "Skąd on bierze hajs?"',
            start: 13.45,
            end: 16.88,
          },
        ],
      },
    ],
  },
  {
    id: 172,
    day: 172,
    title: "WWA Melanż",
    artist: "Otsochodzi, Oskar83",
    audioSrc: "/172_WWA.mp3",
    youtubeId: "GP_HWyS9JWw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Czarny Mercedes, a nie pierdolony Panek",
            start: 0.0,
            end: 2.11,
          },
          { text: "Ale dwie jebane paki na blacie", start: 2.11, end: 4.41 },
          {
            text: "Wisłostradą nie używam Yanosika, jestem Warszawą",
            start: 4.41,
            end: 7.19,
          },
          {
            text: "W mojej furze jebie tylko dwusetą i trawą",
            start: 7.19,
            end: 9.64,
          },
          { text: "Ale to nie ja prowadzę, halo", start: 9.64, end: 11.45 },
        ],
      },
    ],
  },
  {
    id: 173,
    day: 173,
    title: "California",
    artist: "White 2115",
    audioSrc: "/173_California.mp3",
    youtubeId: "1WBFpkEBnN4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "I wszyscy ze mną muszą pić", start: 0.0, end: 1.68 },
          { text: "To jak dziewczyny, budzą by", start: 1.68, end: 3.73 },
          { text: "Ruszyć gdzieś nad wodę, hej", start: 3.73, end: 5.31 },
          { text: "Jechać samochodem", start: 5.31, end: 7.05 },
          { text: "Pierdol nawigację bracie", start: 7.05, end: 8.62 },
        ],
      },
    ],
  },
  {
    id: 174,
    day: 174,
    title: "Robie YEAH",
    artist: "Malik Montana, K Koke",
    audioSrc: "/174_RobieYEAH.mp3",
    youtubeId: "u9sz3_Avmlo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Przyszedłem sam, zabrałem dwie",
            start: 0.0,
            end: 2.26,
          },
          {
            text: "Wychodzimy we troje do nowego AMG",
            start: 2.26,
            end: 4.58,
          },
          {
            text: "Przyszedłem sam, zabrałem dwie",
            start: 4.58,
            end: 7.46,
          },
          {
            text: "Wychodzimy we troje, w samochodzie robię yeah",
            start: 7.46,
            end: 9.72,
          },
          {
            text: "Na podłodze robię yeah",
            start: 9.72,
            end: 13.22,
          },
        ],
      },
    ],
  },
  {
    id: 175,
    day: 175,
    title: "Lato",
    artist: "Sentino, CrackHouse",
    audioSrc: "/175_Lato.mp3",
    youtubeId: "3bhmtb_ouI8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gadaliśmy w trzech językach, całowaliśmy się, wybacz",
            start: 0.0,
            end: 3.29,
          },
          {
            text: "Że tak szybko Cię poznałem, ale nie mogłem wytrzymać",
            start: 3.29,
            end: 6.6,
          },
          {
            text: "Byłaś moim fenomenem, a ja twoją schizofrenią",
            start: 6.6,
            end: 10.62,
          },
          {
            text: "Bo u Ciebie w domu też było dużo przygód",
            start: 10.62,
            end: 13.12,
          },
          {
            text: "Nikt nie chcę wiedzieć, co tam było między nami",
            start: 13.12,
            end: 16.62,
          },
        ],
      },
    ],
  },
  {
    id: 176,
    day: 176,
    title: "RiRi",
    artist: "White 2115",
    audioSrc: "/176_RiRi.mp3",
    youtubeId: "hQnh_13QDf0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Spędziłem trzy lata w klasie C, dalej latam w klasie C",
            start: 0.0,
            end: 3.73,
          },
          {
            text: "Tylko tym razem w AMG i tak przykładem stałem się",
            start: 3.73,
            end: 7.28,
          },
          {
            text: "Mimo że wcale nie chciałem nim być",
            start: 7.28,
            end: 9.5,
          },
          {
            text: "Bo w moich planach ja nie miałem nic",
            start: 9.5,
            end: 11.11,
          },
          {
            text: "Jedynie plaża, picie do rana, piękne kobiety, marihuana",
            start: 11.11,
            end: 14.61,
          },
        ],
      },
    ],
  },
  {
    id: 177,
    day: 177,
    title: "Złote Tarasy",
    artist: "Mr. Polska, Abel de Jong",
    audioSrc: "/177_Złote.mp3",
    youtubeId: "yrutjnO2jYs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Znamy wasze sztuczki, ra-ra-ra-ra-ra",
            start: 0.0,
            end: 4.87,
          },
          { text: "Ona chcę być jak Mona Lisa", start: 4.87, end: 6.77 },
          { text: "Mam cash i kartę Visa", start: 6.77, end: 8.79 },
          { text: "Moje życie loco la vida", start: 8.79, end: 10.73 },
          { text: "(Oo, oo, oohh)", start: 10.73, end: 12.69 },
        ],
      },
    ],
  },
  {
    id: 178,
    day: 178,
    title: "Młody Manson",
    artist: "Young Multi, Szpaku, Kubi Producent, Lucassi",
    audioSrc: "/178_Młody.mp3",
    youtubeId: "PPU_r3bz-V0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "I te diamentowe chainy", start: 0.0, end: 3.46 },
          {
            text: "W pogo sami nieśmiertelni (sami nieśmiertelni)",
            start: 3.46,
            end: 7.21,
          },
          { text: "Jak death metalowe bandy, ah", start: 7.21, end: 10.62 },
          {
            text: "Czuję się jak młody Marilyn, tylko 808",
            start: 10.62,
            end: 13.82,
          },
          { text: "I te diamentowe chainy", start: 13.82, end: 17.27 },
        ],
      },
    ],
  },
  {
    id: 179,
    day: 179,
    title: "Robotniczy Trap",
    artist: "Żabson, Young Igi",
    audioSrc: "/179_Robotniczy.mp3",
    youtubeId: "PXpNrL3muyE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jestem robotnikiem, rozstawiam pachołki tam, gdzie mają stać",
            start: 0.0,
            end: 3.5,
          },
          {
            text: "I kieruję ruchem, stawiam wam drogowskaz",
            start: 3.5,
            end: 6.03,
          },
          {
            text: "A jeśli nie ja, to kto ci da nad głową dach?",
            start: 6.03,
            end: 8.75,
          },
          {
            text: "Zbudowałem coś z niczego, teraz zamek, kiedyś piach",
            start: 8.75,
            end: 12.51,
          },
          {
            text: "Gdzie jest kierownik budowy? (Gdzie?)",
            start: 12.51,
            end: 13.81,
          },
        ],
      },
    ],
  },
  {
    id: 180,
    day: 180,
    title: "Icey",
    artist: "Żabson, Young Igi",
    audioSrc: "/180_Icey.mp3",
    youtubeId: "CcScseLdEDo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Trochę odjechałeś tak jak sanki", start: 0.0, end: 2.43 },
          {
            text: "Chociaż noszę lód na szyi to ty jesteś minus 464 Fahrenheity",
            start: 2.43,
            end: 7.47,
          },
          {
            text: "Nie mogłem być obsrany, no, bo noszę białe majty",
            start: 7.47,
            end: 10.19,
          },
          {
            text: "Z banku jak z piekarni se wynoszę całe pajdy",
            start: 10.19,
            end: 12.97,
          },
          {
            text: "Kupuję se LV, kupuję Off White'y",
            start: 12.97,
            end: 16.37,
          },
        ],
      },
    ],
  },
  {
    id: 181,
    day: 181,
    title: "Alejami gwiazd",
    artist: "Kaz Bałagane",
    audioSrc: "/181_Alejamigwi.mp3",
    youtubeId: "S2I1h4qLROo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Nie pierdol, że prawda zawsze wychodzi na jaw, bo nie wychodzi",
            start: 0.0,
            end: 3.15,
          },
          {
            text: "I nie każdy wróg do ciebie szczerzy zęby",
            start: 3.15,
            end: 7.35,
          },
          {
            text: "No bo częściej on słodzi (Mordko, mordeczko)",
            start: 7.35,
            end: 11,
          },
          {
            text: "I nie zawsze wraca ta karma",
            start: 11,
            end: 13.55,
          },
          {
            text: "I te plotki nie noszą prawdy ziarna",
            start: 13.55,
            end: 16.71,
          },
        ],
      },
    ],
  },
  {
    id: 182,
    day: 182,
    title: "Pojechałem 200",
    artist: "Alan",
    audioSrc: "/182_Pojechaem2.mp3",
    youtubeId: "ihUfpfcX4l4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Palą wroty pizdy, nie myślę co kurwa będzie jutro",
            start: 0.0,
            end: 2.19,
          },
          {
            text: "Pokryją szmaty na sorze lub za siedem koła futro",
            start: 2.19,
            end: 4.9,
          },
          {
            text: "Moje fazy dają znaki, ciężko tańczą mi na bani",
            start: 4.9,
            end: 7.06,
          },
          {
            text: "Nie wiem czy będzie na zawsze, czy tylko zostawi stanik",
            start: 7.06,
            end: 9.53,
          },
          {
            text: "On ci płaci za jebanie, za to nigdy mu nie ścielisz",
            start: 9.53,
            end: 13.03,
          },
        ],
      },
    ],
  },
  {
    id: 183,
    day: 183,
    title: "Jeżyk!",
    artist: "OKI, Nolyrics Beats",
    audioSrc: "/183_Jeżyk!.mp3",
    youtubeId: "wlOdTniCvt0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "(Ej, okej)", start: 0.0, end: 2.35 },
          {
            text: "Młody jeżyk, bo chciałbym tylko przeżyć",
            start: 2.35,
            end: 5.75,
          },
          {
            text: "Suszyć jedynki, po prostu zęby szczerzyć (okej)",
            start: 5.75,
            end: 9.15,
          },
          {
            text: "Bujać budynki, w końcu w siebie wierzyć",
            start: 9.15,
            end: 12.15,
          },
          { text: "Młody je-e-e-e-e-e-eż...", start: 12.15, end: 14.77 },
        ],
      },
    ],
  },
  {
    id: 184,
    day: 184,
    title: "Miyabi",
    artist: "PRO8L3M",
    audioSrc: "/184_Miyabi.mp3",
    youtubeId: "DzpJ2zX5jN8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "To drżenie, nie, to nie to", start: 0.0, end: 2.92 },
          {
            text: "Zniszczenie, nałóg, horror, stres, wyczerpanie, walka",
            start: 2.92,
            end: 11.83,
          },
          { text: "Nie, to tylko seks", start: 11.83, end: 14.05 },
          { text: "O mój boże, dupę ma jak Porsche", start: 14.05, end: 16.64 },
          {
            text: "To nie głosy serca to odgłos, że kończę",
            start: 16.64,
            end: 19.48,
          },
        ],
      },
    ],
  },
  {
    id: 185,
    day: 185,
    title: "Imago",
    artist: "Avi, Pezet, Jan-Rapowanie, Czarny HIFI",
    audioSrc: "/185_Imago.mp3",
    youtubeId: "CbjGzyvDSQg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Biała kreska i moja młoda-stara wersja",
            start: 0.0,
            end: 2.56,
          },
          {
            text: "A najmniej znaczy pies, co najgłośniej ujada",
            start: 2.56,
            end: 5.37,
          },
          {
            text: "Ta naga prawda stara jest jak arabeska",
            start: 5.37,
            end: 7.88,
          },
          {
            text: "Jestem imago - dojrzała postać owada",
            start: 7.88,
            end: 10.41,
          },
          {
            text: "Co wciąż upada, bo utkana cała z człowieczeństwa",
            start: 10.41,
            end: 13.49,
          },
        ],
      },
    ],
  },
  {
    id: 186,
    day: 186,
    title: "KRESKI",
    artist: "Yung Adisz",
    audioSrc: "/186_KRESKI.mp3",
    youtubeId: "tL5wxvhvWMs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Biorę ją, walę z nią, idę z nią znów do łazienki",
            start: 0.0,
            end: 4.23,
          },
          {
            text: "Telefon, mefedron, walę skądś, śnią mi się kreski",
            start: 4.23,
            end: 8.18,
          },
          {
            text: "Biorę ją, walę z nią, idę z nią znów do łazienki",
            start: 8.18,
            end: 11.97,
          },
          {
            text: "Mam zejście, ej, mam zejście, ja, mam zejście",
            start: 11.97,
            end: 20.38,
          },
          {
            text: "Skończył się towar na wejście, tera chujowe podejście mam do tych ludzi",
            start: 20.38,
            end: 24.3,
          },
        ],
      },
    ],
  },
  {
    id: 187,
    day: 187,
    title: "PANAMERA",
    artist: "Gedz, SHDØW, LOAA",
    audioSrc: "/187_PANAMERA.mp3",
    youtubeId: "InQQ0qxbkI8",
    platforms: {
      spotify:
        "https://open.spotify.com/track/7AhR3UOgKTcrgsNn7NWEv1?si=d5a92e10317f4bfe",
      appleMusic:
        "https://music.apple.com/pl/album/panamera-single/1540082998?l=pl",
      tidal: "https://tidal.com/track/161965935/u",
    },
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "BOR, NNJL, FnD, chory Gedz (ye, ye)",
            start: 0.0,
            end: 8.75,
          },
          {
            text: "U mnie non stop diabelski młyn (non stop)",
            start: 8.75,
            end: 11.22,
          },
          {
            text: "Moje życie Lunapark, kręcę ciężki film",
            start: 11.22,
            end: 13.92,
          },
          {
            text: "W końcu wpada dobry plik mi",
            start: 13.92,
            end: 16.04,
          },
          {
            text: "Robię nim flip i wydaję przez blik, blik",
            start: 16.04,
            end: 19.54,
          },
        ],
      },
    ],
  },
  {
    id: 188,
    day: 188,
    title: "Proste fakty",
    artist:
      "SB Maffija, Bedoes 2115, White 2115, kuqe 2115, Flexxy 2115, Blacha 2115, Kubi Producent",
    audioSrc: "/188_Proste.mp3",
    youtubeId: "lnaIzDPRTSo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Po latach wylanych łez", start: 0.0, end: 1.75 },
          { text: "Mama płacze tylko ze szczęścia", start: 1.75, end: 3.49 },
          {
            text: "Po latach wylanych łez, dzisiaj szampan leję na łeb",
            start: 3.49,
            end: 6.32,
          },
          {
            text: "PKS zmienił się w Benz, ja wciąż 2115",
            start: 6.32,
            end: 9.87,
          },
          { text: "(Proste fakty!)", start: 9.87, end: 10.76 },
        ],
      },
    ],
  },
  {
    id: 189,
    day: 189,
    title: "Atlanta",
    artist: "Aleshen",
    audioSrc: "/189_Atlanta.mp3",
    youtubeId: "Vt4BOob0mKQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Kiedy-kiedy to biorę, to ból ustaje",
            start: 0.0,
            end: 1.73,
          },
          {
            text: "Nie-nie czają rzeczy, które ja wyznaję",
            start: 1.73,
            end: 3.91,
          },
          {
            text: "Ro-robię to pierwszy, ty masz pytanie",
            start: 3.91,
            end: 5.6,
          },
          {
            text: "Moi koledzy na przypale, twoi koledzy na sygnale",
            start: 5.6,
            end: 9.52,
          },
          {
            text: "Jestem w tym dziki jak kojot, z gleby do góry jak jojo",
            start: 9.52,
            end: 12.88,
          },
        ],
      },
    ],
  },
  {
    id: 190,
    day: 190,
    title: "Jagodzianki",
    artist: "Malik Montana, Mr. Polska",
    audioSrc: "/190_Jagodzianki.mp3",
    youtubeId: "JcV-q-Mv06U",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "7 żyć i baluję całą noc", start: 0.0, end: 2.66 },
          { text: "Tak jak kot", start: 2.66, end: 3.69 },
          { text: "7 żyć i baluję", start: 3.69, end: 5.97 },
          { text: "Mam sałatę, ale brudną no", start: 5.97, end: 7.86 },
          { text: "Łapie ją za dupę, ona lubi to", start: 7.86, end: 9.68 },
        ],
      },
    ],
  },
  {
    id: 191,
    day: 191,
    title: "Apollo",
    artist: "Avi, Louis Villain, Sarius",
    audioSrc: "/191_Apollo.mp3",
    youtubeId: "xIfCyGNn-nA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Spadam jak z nieba pył", start: 0.0, end: 2.96 },
          {
            text: "A ty jak moje serce, musisz zostać",
            start: 2.96,
            end: 5.35,
          },
          { text: "W noc widzę w górze sny", start: 5.35, end: 7.74 },
          {
            text: "Oglądam kosmos i nie mogę wciąż spać",
            start: 7.74,
            end: 10.32,
          },
          { text: "Nikt nie zabroni mi", start: 10.32, end: 13.07 },
        ],
      },
    ],
  },
  {
    id: 192,
    day: 192,
    title: "Mercedes GLE Coupé",
    artist:
      "Bedoes 2115, Kubi Producent, Blacha 2115, FLEXXY2115, kuqe 2115",
    audioSrc: "/192_Mercedes.mp3",
    youtubeId: "7wRKrdQ4nvg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Wysyłają nudle nudne białe dupy", start: 0.0, end: 2 },
          {
            text: "Moja babcia zawsze prała moje brudne, białe buty",
            start: 2,
            end: 4.45,
          },
          { text: "Nie pytała czemu są we krwi", start: 4.45, end: 6.52 },
          {
            text: "Czarne auto, czarne szyby, czarne bluzy",
            start: 6.52,
            end: 8.9,
          },
          { text: "Wysyłają nudle nudne białe dupy", start: 8.9, end: 10.95 },
        ],
      },
    ],
  },
  {
    id: 193,
    day: 193,
    title: "Chodzę po Luwrze",
    artist:
      "SB Maffija, Bedoes 2115, Solar, Białas, Janusz Walczuk, Pedro, francis, Jan-Rapowanie",
    audioSrc: "/193_Chodzę.mp3",
    youtubeId: "22hEkseI2tA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Coś wyrzeźbię, taki jestem i chuj", start: 0.0, end: 2.25 },
          {
            text: "Wyjebane mam na presję, wjedzie pierdolony Bentley",
            start: 2.25,
            end: 6.15,
          },
          { text: "Tam gdzie zacząłem knuć", start: 6.15, end: 7.18 },
          {
            text: "Jestem pierdolonym ghettem, ale mojej córce nigdy nie pozwolę tego czuć",
            start: 7.18,
            end: 12.12,
          },
          { text: "Za to pokażę jej Luwr", start: 12.12, end: 14.51 },
        ],
      },
    ],
  },
  {
    id: 194,
    day: 194,
    title: "Drive",
    artist: "Gibbs, Opał, Jonatan, 4Money",
    audioSrc: "/194_Drive.mp3",
    youtubeId: "y7FBy4eIxig",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Potrzebna mi przestrzeń",
            start: 0.0,
            end: 1.59,
          },
          {
            text: "W drodze rodzę nowy plan",
            start: 1.59,
            end: 3.18,
          },
          {
            text: "Beat, dobry bas, autostrada, lewy pas",
            start: 3.18,
            end: 5.66,
          },
          {
            text: "I nowe miejsce, gdzie nie oceniają nas",
            start: 5.66,
            end: 8.68,
          },
          {
            text: "Wchodzę w to va banque, kiedy uśmiech zdobi gaz",
            start: 8.68,
            end: 12.18,
          },
        ],
      },
    ],
  },
  {
    id: 195,
    day: 195,
    title: "Polsilver",
    artist: "PRO8L3M",
    audioSrc: "/195_Polsilver.mp3",
    youtubeId: "iqjSlVmJSmM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ciała sklejone jak w upalny dzień w BMW do skóry (skóry)",
            start: 0.0,
            end: 6.93,
          },
          {
            text: "Prawdy nie mówią usta mi, prawda się w głębi oczu tli",
            start: 6.93,
            end: 12.3,
          },
          { text: "Nie wszystko da się kamuflować", start: 12.3, end: 18.4 },
          { text: "Nie obiecywał nic mi nikt", start: 18.4, end: 21.35 },
          {
            text: "Ja coś mówiłem, ale dziś już wiem, że to są tylko słowa",
            start: 21.35,
            end: 29.33,
          },
        ],
      },
    ],
  },
  {
    id: 196,
    day: 196,
    title: "Mówili",
    artist: "Malik Montana",
    audioSrc: "/196_Mówili.mp3",
    youtubeId: "ZUq4GqKKeb0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Czas i pieniądz zweryfikował przyjaźnie",
            start: 0.0,
            end: 2.4,
          },
          {
            text: "Z uśmiechem po plecach klepią, a chcą widzieć na dnie",
            start: 2.4,
            end: 5.15,
          },
          {
            text: "Wznoszę dłonie, dziękując za błogosławieństwa",
            start: 5.15,
            end: 8.22,
          },
          {
            text: "Bo tacy jak ja to kończą w dwóch miejscach",
            start: 8.22,
            end: 14.11,
          },
          {
            text: "Bo tacy jak ja to kończą w dwóch miejscach",
            start: 14.11,
            end: 16.83,
          },
        ],
      },
    ],
  },
  {
    id: 197,
    day: 197,
    title: "No to cyk",
    artist: "Diho",
    audioSrc: "/197_No.mp3",
    youtubeId: "j4dqXYcsB9w",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "No to cyk (nej)", start: 0.0, end: 3.03 },
          {
            text: "No to cyk, kiedy otwiera się butla",
            start: 3.03,
            end: 5.95,
          },
          {
            text: "No to cyk, jeszcze noc nie jest późna",
            start: 5.95,
            end: 9.1,
          },
          {
            text: "No to cyk, przecież po to jest kapusta",
            start: 9.1,
            end: 12.02,
          },
          {
            text: "No to cyk, pani da buty i kurtka",
            start: 12.02,
            end: 14.92,
          },
        ],
      },
    ],
  },
  {
    id: 198,
    day: 198,
    title: "Prawie straciłem głos",
    artist: "Chivas",
    audioSrc: "/198_Prawiestra.mp3",
    youtubeId: "GWs3NZKYC_o",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ciekawe co o mnie myśli?",
            start: 0.0,
            end: 2.77,
          },
          {
            text: "Pewnie, że to jakiś typ, który się dopiero rozstał",
            start: 2.77,
            end: 6.15,
          },
          {
            text: "Czemu on tak krzyczy?",
            start: 6.15,
            end: 7.7,
          },
          {
            text: "Po to żeby usłyszała cała polska",
            start: 7.7,
            end: 10.11,
          },
          {
            text: "Miałem trochę dość, bo czekając na nią",
            start: 10.11,
            end: 13.61,
          },
        ],
      },
    ],
  },
  {
    id: 199,
    day: 199,
    title: "BFF",
    artist: "bambi, Young Leosia, PG$, @atutowy",
    audioSrc: "/199_BFF.mp3",
    youtubeId: "U_FirAt6UKg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Tu nie mam nic, dlatego dalej biegnę",
            start: 0.0,
            end: 3.35,
          },
          {
            text: "Chodź ze mną, cho-cho-chodź ze mną",
            start: 3.35,
            end: 6.56,
          },
          {
            text: "Może w afekcie znajdziemy lepsze miejsce",
            start: 6.56,
            end: 9.96,
          },
          {
            text: "Chodź ze mną, cho-cho-chodź ze mną",
            start: 9.96,
            end: 13.21,
          },
          {
            text: "Rzucę wszystko, żeby znaleźć szczęście",
            start: 13.21,
            end: 16.58,
          },
        ],
      },
    ],
  },
  {
    id: 200,
    day: 200,
    title: "ULALA",
    artist: "Żabson, Young Leosia, Beteo, Borucci",
    audioSrc: "/200_ULALA.mp3",
    youtubeId: "daHqrcskqjM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Tańczy cały klub, tańczy cała sala, tańczy moje crew i cała Warszawa",
            start: 0.0,
            end: 4.83,
          },
          {
            text: "Mordo nie znam nut, więc nie będę kłamał, ona zapomniała słów, bo się najebała",
            start: 4.83,
            end: 10.82,
          },
          {
            text: "Teraz śpiewa tylko u-lala, aha! U-lala (aha!)",
            start: 10.82,
            end: 17.61,
          },
          {
            text: "U-lala, aha! U-lala (aha!)",
            start: 17.61,
            end: 23.42,
          },
          {
            text: "Tańczę shoot jak Blocboy JB (Blocboy)",
            start: 23.42,
            end: 26.92,
          },
        ],
      },
    ],
  },
  {
    id: 201,
    day: 201,
    title: "Stan",
    artist: "Gibbs, Jonatan, 4Money",
    audioSrc: "/201_Stan.mp3",
    youtubeId: "efQJmUr4wAM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Trzydzieści wiosen już prawie",
            start: 0.0,
            end: 1.72,
          },
          {
            text: "By w końcu się nazwać szczęśliwym człowiekiem",
            start: 1.72,
            end: 4.77,
          },
          {
            text: "A ja lubię ten stan jak śmiech i parę promieni słońca",
            start: 4.77,
            end: 8.78,
          },
          {
            text: "Zostać tam, gdzie chcesz, nie tam, gdzie każą nam koszta",
            start: 8.78,
            end: 12.71,
          },
          {
            text: "Żadna łza na sen nie będzie żegnać nas co dnia",
            start: 12.71,
            end: 16.21,
          },
        ],
      },
    ],
  },
  {
    id: 202,
    day: 202,
    title: "Zdrowie",
    artist: "Kizo, Janusz Walczuk",
    audioSrc: "/202_Zdrowie.mp3",
    youtubeId: "rAiIrtEmsxg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ej, nic tak nie boli jak słowa, którymi strzelasz w serce",
            start: 0.0,
            end: 3.48,
          },
          {
            text: "Od życia chcę tylko zdrowia, całą resztę sam wezmę",
            start: 3.48,
            end: 6.56,
          },
          {
            text: "Z wiarą ludzi we mnie, czuję się jak w kamizelce",
            start: 6.56,
            end: 9.98,
          },
          {
            text: "Wszystkie moje marzenia stoją gęsiego w kolejce",
            start: 9.98,
            end: 13.04,
          },
          {
            text: "Nie jestem z cukru, bo zmokłem już w deszczu z ciemnych chmur",
            start: 13.04,
            end: 16.08,
          },
        ],
      },
    ],
  },
  {
    id: 203,
    day: 203,
    title: "Prometazyna",
    artist: "SB Maffija, Lanek, Beteo, Fukaj, White 2115, Pedro, francis",
    audioSrc: "/203_Prometazyna.mp3",
    youtubeId: "mpblM92-3Ng",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Rano w gardle czuję krew", start: 0.0, end: 1.87 },
          { text: "Bo jest zima, a ja chodzę gdzieś", start: 1.87, end: 4.24 },
          {
            text: "Z pałacu do studia biegłem dziś przez śnieg",
            start: 4.24,
            end: 6.01,
          },
          { text: "Bolą plecy, nogi, boli kark i łeb", start: 6.01, end: 8.15 },
          { text: 'Tarczyca mówi, "Proszę, nie!"', start: 8.15, end: 10.09 },
        ],
      },
    ],
  },
  {
    id: 204,
    day: 204,
    title: "Szyby",
    artist: "Diho, Alberto, Bibič, Josef Bratan",
    audioSrc: "/204_Szyby.mp3",
    youtubeId: "7apItC_TKyA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jestem małpa i mam stado goryli (woof)",
            start: 0.0,
            end: 2.96,
          },
          {
            text: "Jeden Afganistan, drugi z Afryki (woof)",
            start: 2.96,
            end: 5.95,
          },
          {
            text: "Trzeci Yugo, ma dwa granatniki",
            start: 5.95,
            end: 8.75,
          },
          {
            text: "No to Frugo, to smak egzotyki, kurwo",
            start: 8.75,
            end: 12.95,
          },
          {
            text: "Przestań mi pierdolić, kozak to ty jesteś w grupie (boom)",
            start: 12.95,
            end: 16.45,
          },
        ],
      },
    ],
  },
  {
    id: 205,
    day: 205,
    title: "Szmata",
    artist: "Mata",
    audioSrc: "/205_Szmata.mp3",
    youtubeId: "vsDFEK-7xOE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Bierzesz termometr do buzi, no to uważaj na rtęć",
            start: 0.0,
            end: 2.76,
          },
          {
            text: "Bierzesz kęs mnie, mój materac to pręgierz",
            start: 2.76,
            end: 5.51,
          },
          {
            text: "Jestem tylko na teraz, ale jak zechcesz to będę",
            start: 5.51,
            end: 8.36,
          },
          {
            text: "Bo jestem, kurwa, męską prostytutką",
            start: 8.36,
            end: 11.0,
          },
          {
            text: "Wszystkie moje wersy dedykuję moim sutkom",
            start: 11.0,
            end: 14.5,
          },
        ],
      },
    ],
  },
  {
    id: 206,
    day: 206,
    title: "Ciapakwybujany",
    artist: "GM2L, Malik Montana, Kazior, Alberto, OLEK",
    audioSrc: "/206_Ciapakwybujany.mp3",
    youtubeId: "zpWJNJNBObI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ciapak wybujany jak cyce starej baby",
            start: 0.0,
            end: 3.6,
          },
          {
            text: "Z pierwszej ręki sort (tak), czyste materiały",
            start: 3.6,
            end: 6.66,
          },
          {
            text: "Ściągam ludzi wzrok, jak dach, czary mary",
            start: 6.66,
            end: 9.63,
          },
          {
            text: "Wszystko za gotówkę, nie na kredyt, nie na raty",
            start: 9.63,
            end: 12.46,
          },
          {
            text: "Ciapak wybujany jak cyce starej baby",
            start: 12.46,
            end: 15.42,
          },
        ],
      },
    ],
  },
  {
    id: 207,
    day: 207,
    title: "Blueface",
    artist: "Kaz Bałagane, Młody Dron, Sher7ock",
    audioSrc: "/207_Blueface.mp3",
    youtubeId: "wrXPXRULrBA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Pytasz skąd jestem, skąd Ty się w ogóle wziąłeś?",
            start: 0.0,
            end: 2.54,
          },
          {
            text: "Dojebałeś jak Fernando Torres",
            start: 2.54,
            end: 4.78,
          },
          {
            text: "Umiem beatbox, kolega umie crip-walk",
            start: 4.78,
            end: 6.91,
          },
          {
            text: "Słuchasz tego na przerwie w szkole",
            start: 6.91,
            end: 9.53,
          },
          {
            text: "Trzymam fiuta między cycem (ybly-bly-bly-ly-ly-ly-ly)",
            start: 9.53,
            end: 13.03,
          },
        ],
      },
    ],
  },
  {
    id: 208,
    day: 208,
    title: "MAMA POWTARZAŁA",
    artist: "Sobel, Deemz",
    audioSrc: "/208_MAMA.mp3",
    youtubeId: "7AeG6p-r2-0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Po tym wszystkim wylać swoje żale w pościel",
            start: 0.0,
            end: 2.75,
          },
          {
            text: "Już nigdy się nie smucić, nie dzielić ludzi na pół",
            start: 2.75,
            end: 5.24,
          },
          {
            text: "Na mądrzejszych i tych głupich, sprzedać wszystko w jednej puli",
            start: 5.24,
            end: 7.91,
          },
          {
            text: "Dochód dać matuli, dwulicowych odpulić",
            start: 7.91,
            end: 10.48,
          },
          {
            text: "Zranionych przytulić, uchronić od każdej następnej kuli, yeah",
            start: 10.48,
            end: 14.48,
          },
        ],
      },
    ],
  },
  {
    id: 209,
    day: 209,
    title: "Sexoholik",
    artist: "Żabson",
    audioSrc: "/209_Sexoholik.mp3",
    youtubeId: "Jq2n3C3f9v8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ale sama dobrze wiesz, że masz być schludna i pachnąca (fresh)",
            start: 0.0,
            end: 3.43,
          },
          {
            text: "Każda moja suka specjalnie dla mnie wygląda",
            start: 3.43,
            end: 6.76,
          },
          {
            text: "Lubię białe, lubię małe, lubię duży rozmiar",
            start: 6.76,
            end: 9.84,
          },
          {
            text: "Lubię czekoladę tak jak Willy Wonka",
            start: 9.84,
            end: 12.83,
          },
          {
            text: "One są tu przekonane, co je we mnie w noc pociąga",
            start: 12.83,
            end: 16.33,
          },
        ],
      },
    ],
  },
  {
    id: 210,
    day: 210,
    title: "PLAC TRZECH KRZYŻY",
    artist: "Taco Hemingway, @atutowy, The Returners",
    audioSrc: "/210_PLAC.mp3",
    youtubeId: "xYlpfgG4S14",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "A ten, kto z nami nie (ta) wypije (ta), niech pod stołem (ta) zaśnie",
            start: 0.0,
            end: 2.6,
          },
          {
            text: "Gdy w dno kieliszka zaglądamy w noce bez kochanek",
            start: 2.6,
            end: 5.49,
          },
          {
            text: "Grube dno, jak okulary naszych przedszkolanek",
            start: 5.49,
            end: 8.05,
          },
          {
            text: "Mistrzowie powiatowi w wylewaniu łez do szklanek",
            start: 8.05,
            end: 11.01,
          },
          {
            text: "Nie sypiamy, zanim nie pojawi się poranek",
            start: 11.01,
            end: 13.56,
          },
        ],
      },
    ],
  },
  {
    id: 211,
    day: 211,
    title: "Bogini",
    artist: "Quebonafide",
    audioSrc: "/211_Bogini.mp3",
    youtubeId: "gtgpGmqmCP4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Jej skóra wygląda i pachnie jak Latte Macchiato",
            start: 0.0,
            end: 2.75,
          },
          {
            text: "A wzrok na mnie działa jak Mate",
            start: 2.75,
            end: 4.82,
          },
          {
            text: "To już nie jest normalne, mylę kawę z herbatą",
            start: 4.82,
            end: 7.26,
          },
          {
            text: 'Ale w razie "W" dam ci erratę',
            start: 7.26,
            end: 9.31,
          },
          {
            text: "Byle bez cukru jak na filmach",
            start: 9.31,
            end: 12.81,
          },
        ],
      },
    ],
  },
  {
    id: 212,
    day: 212,
    title: "Kawior",
    artist: "Avi, BL Beatz",
    audioSrc: "/212_Kawior.mp3",
    youtubeId: "oQ5nnjou8Wo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ale będą spływać sumy, coś jakby miały tarło (cyk)",
            start: 0.0,
            end: 2.85,
          },
          {
            text: "W końcu mam szerszy obraz od Matejki (ta)",
            start: 2.85,
            end: 5.35,
          },
          {
            text: "Wygłodniali, to kroję grube plasterki",
            start: 5.35,
            end: 7.79,
          },
          {
            text: "Nie muszę kołować po płycie tak jak Lufthansa (już)",
            start: 7.79,
            end: 11.06,
          },
          {
            text: "Piękne to życie, choć skurwiała branża",
            start: 11.06,
            end: 13.72,
          },
        ],
      },
    ],
  },
  {
    id: 213,
    day: 213,
    title: "Przypadkiem",
    artist: "OKI, Young Igi, Otsochodzi, OIO, Michał Anioł",
    audioSrc: "/213_Przypadkie.mp3",
    youtubeId: "_V-IU5npVn8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Znowu mordo żałuję, że wybiłem sam z domu",
            start: 0.0,
            end: 1.75,
          },
          {
            text: "Kiedyś bym pizgał z buta na M01",
            start: 1.75,
            end: 4.57,
          },
          {
            text: "Dziś pizgam wolne jak jadę Uberem (ty się jarasz)",
            start: 4.57,
            end: 7.69,
          },
          {
            text: "Bo z klubu wyrwałeś Żanetę",
            start: 7.69,
            end: 9.04,
          },
          {
            text: "Co jebie od niej piwskiem i starym kiepem",
            start: 9.04,
            end: 12.54,
          },
        ],
      },
    ],
  },
  {
    id: 214,
    day: 214,
    title: "Nasze lato",
    artist: "Kizo, Wac Toja, BeMelo",
    audioSrc: "/214_Naszelato.mp3",
    youtubeId: "pDg6mV79AC4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Bruschetta w porcie, ty z jointem jak świeczka na torcie",
            start: 0.0,
            end: 4.03,
          },
          {
            text: "Na blokach jak w kurorcie, też mamy jak świeci słońce",
            start: 4.03,
            end: 7.51,
          },
          {
            text: "Nasze lato, Bentley, Lambo, Cali, Gelato",
            start: 7.51,
            end: 13.16,
          },
          {
            text: "Toast za to",
            start: 13.16,
            end: 14.9,
          },
          {
            text: "Czy oddacie nam wolność czy nie",
            start: 14.9,
            end: 18.4,
          },
        ],
      },
    ],
  },
  {
    id: 215,
    day: 215,
    title: "KIEDYŚ CIĘ ZNAJDĘ (REMIX)",
    artist: "Otsochodzi, Reni Jusis, lohleq, Kusha, OKI, Young Multi",
    audioSrc: "/215_KIEDYŚ.mp3",
    youtubeId: "IEDMq5VI3jE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Tylko (Fiu), to zostało żeby chwilowo zakleić rany",
            start: 0.0,
            end: 3.63,
          },
          {
            text: "Mimo, że plany te same, dziś nie mogę zasnąć",
            start: 3.63,
            end: 5.91,
          },
          { text: "Czuję, że się oddalamy", start: 5.91, end: 7.39 },
          { text: "Powiedz, dlaczego tak boli?", start: 7.39, end: 8.62 },
          {
            text: "Żyjemy w agonii, słowa będą pociskami",
            start: 8.62,
            end: 11.08,
          },
        ],
      },
    ],
  },
  {
    id: 216,
    day: 216,
    title: "Gozier",
    artist: "PLK, Paluch",
    audioSrc: "/216_Gozier.mp3",
    youtubeId: "RAHXECrCC6E",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gdybym urodził się w Stanach, miałbym ksywę (Lil Block)",
            start: 0.0,
            end: 2.98,
          },
          {
            text: "Styl to wizytówka stara, a nie kurwa (crip walk)",
            start: 2.98,
            end: 6.1,
          },
          {
            text: "Kciuk to żaden Corleone, tylko zawsze swój chłop",
            start: 6.1,
            end: 9.22,
          },
          {
            text: "B-O, B-O, B-O-R w cały show-biz wbija faki",
            start: 9.22,
            end: 12.26,
          },
          {
            text: "Chcę być kojarzony z rapu, a nie z salonowych akcji",
            start: 12.26,
            end: 15.76,
          },
        ],
      },
    ],
  },
  {
    id: 217,
    day: 217,
    title: "MY KONTRA ONI",
    artist: "vkie",
    audioSrc: "/217_MYKONTRA.mp3",
    youtubeId: "e3mOiNM_qEQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Mocno uczą błędy mnie, a jeszcze mocniej bad tripy (nie, nie)",
            start: 0.0,
            end: 2.84,
          },
          {
            text: "Lepiej nisko chowaj łeb, strzelamy jak karabiny",
            start: 2.84,
            end: 5.4,
          },
          {
            text: "Za oknami pierdolony beton, a nie Karaiby (Karaiby)",
            start: 5.4,
            end: 8.1,
          },
          {
            text: "W internecie na mnie wloty lecą, nie znam twojej ksywy (nie znam)",
            start: 8.1,
            end: 10.75,
          },
          {
            text: "Sprawdzę czy nie mam cię pod podeszwą, jesteś taki mini (taki mini)",
            start: 10.75,
            end: 14.25,
          },
        ],
      },
    ],
  },
  {
    id: 218,
    day: 218,
    title: "Patointeligencja",
    artist: "Mata",
    audioSrc: "/218_Patointeli.mp3",
    youtubeId: "XcIwxVUzrzA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Mój ziom na odwagę pierdolnął trzy piwka",
            start: 0.0,
            end: 2.05,
          },
          {
            text: "W pubie, w Londynie przed interview na Kingsa",
            start: 2.05,
            end: 3.52,
          },
          {
            text: "Mój ziomo się dostał na Oxford",
            start: 3.52,
            end: 5.56,
          },
          {
            text: "A całe liceum raz pigwa, raz wiśnia, raz czysta",
            start: 5.56,
            end: 7.85,
          },
          {
            text: "Mój ziomo w Toyocie Corolli woził tu te parę baseballi i kryształ",
            start: 7.85,
            end: 11.35,
          },
        ],
      },
    ],
  },
  {
    id: 219,
    day: 219,
    title: "Disney",
    artist: "Kizo",
    audioSrc: "/219_Disney.mp3",
    youtubeId: "_29dLT6OMTU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ona mi ufa, daje mi rękę, wszystko zamieniam w bajeczne",
            start: 0.0,
            end: 3.92,
          },
          {
            text: "Niech trwa jeszcze hotelowa doba w apartamencie",
            start: 3.92,
            end: 7.37,
          },
          {
            text: "Świat jest zepsuty, jakoś to zniosę, zawsze mogło być gorzej",
            start: 7.37,
            end: 10.82,
          },
          {
            text: "O tej porze zazwyczaj wille z basenem wychodziły drożej",
            start: 10.82,
            end: 14.34,
          },
          {
            text: "Dla was to temat jak żyje artysta, ale zachowaj dystans",
            start: 14.34,
            end: 18.52,
          },
        ],
      },
    ],
  },
  {
    id: 220,
    day: 220,
    title: "La la la (oh oh)",
    artist: "Mata, White 2115",
    audioSrc: "/220_La.mp3",
    youtubeId: "qw3fiKty6l4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "La, la, la, la, la, la, la", start: 0.0, end: 6.13 },
          { text: "La, la, la, la, la, la, la", start: 6.13, end: 10.23 },
          { text: "Teraz śpiewaj z nami", start: 10.23, end: 11.82 },
          { text: "La, la, la, la, la, la, la", start: 11.82, end: 17.27 },
          { text: "La, la, la, la, la", start: 17.27, end: 18.83 },
        ],
      },
    ],
  },
  {
    id: 221,
    day: 221,
    title: "Futurama 3",
    artist: "Quebonafide",
    audioSrc: "/221_Futurama.mp3",
    youtubeId: "MMryYio0v6k",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Właściwie teraz też jest jeszcze pojebany trochę",
            start: 0.0,
            end: 2.46,
          },
          {
            text: "Tylko, że teraz robię muzykę do mycia okien",
            start: 2.46,
            end: 5.12,
          },
          {
            text: "Mentalnie to ciągle mam Nokię i się wożę Astrą",
            start: 5.12,
            end: 7.63,
          },
          {
            text: "A realnie Tesla Roadster mi ładuje iPhone",
            start: 7.63,
            end: 10.17,
          },
          {
            text: "Marzę o tym, gdzie pojadę, gdy wyrobię paszport",
            start: 10.17,
            end: 12.94,
          },
        ],
      },
    ],
  },
  {
    id: 222,
    day: 222,
    title: "Parapetówa",
    artist:
      "SB Maffija, White 2115, Adi Nowak, Kacperczyk, Janusz Walczuk, Białas, Fukaj, SKUTE BOBO, Beteo, Kinny Zimmer, Solar",
    audioSrc: "/222_Parapetwaf.mp3",
    youtubeId: "tm5Z88WFiqs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Pozdrawiam panią, eh, z którą za tydzień mam ustny",
            start: 0.0,
            end: 2.59,
          },
          {
            text: "Ustną maturę, ale tym się będę martwił później",
            start: 2.59,
            end: 5.25,
          },
          {
            text: "W pałacu na kacu leję wódę, aż usnę i się nie obudzę, ej",
            start: 5.25,
            end: 9.81,
          },
          {
            text: "W pałacu, na kacu, pachnie skunem",
            start: 9.81,
            end: 13.26,
          },
          {
            text: "Stawiaj stówę, że znów to powtórzę",
            start: 13.26,
            end: 16.76,
          },
        ],
      },
    ],
  },
  {
    id: 223,
    day: 223,
    title: "Lloret de Mar",
    artist: "Mata",
    audioSrc: "/223_LloretdeMa.mp3",
    youtubeId: "6mB-EH98PiA",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Shawty, move your body, ándale",
            start: 0.0,
            end: 2.51,
          },
          {
            text: "Pokaż, jak się bawisz nam",
            start: 2.51,
            end: 4.6,
          },
          {
            text: "Mój skład jest z Warszawy, ona nie",
            start: 4.6,
            end: 6.76,
          },
          {
            text: "Poznałem ją na plaży w Lloret de Mar",
            start: 6.76,
            end: 9.35,
          },
          {
            text: "Na plaży w Lloret de Mar",
            start: 9.35,
            end: 12.85,
          },
        ],
      },
    ],
  },
  {
    id: 224,
    day: 224,
    title: "05:05",
    artist: "Bedoes 2115, Kubi Producent",
    audioSrc: "/224_05_05.mp3",
    youtubeId: "HAWSBEhPiY8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Moja mała ma depresję, kłócimy się przez Messenger",
            start: 0.0,
            end: 3.46,
          },
          {
            text: "Mówi mi, że jestem dzieckiem, wielka pani studiująca medycynę",
            start: 3.46,
            end: 6.83,
          },
          {
            text: "Mam miłość dla moich ludzi w Milanówku, Krakowie albo Szczecinie",
            start: 6.83,
            end: 10.2,
          },
          {
            text: "Jeśli jesteś z nami, no to jesteś i nieważne gdzie się urodziłeś",
            start: 10.2,
            end: 13.69,
          },
          {
            text: "Czy w Poznaniu, Gdańsku, Słupsku",
            start: 13.69,
            end: 17.19,
          },
        ],
      },
    ],
  },
  {
    id: 225,
    day: 225,
    title: "Bandyta",
    artist: "Sobel ",
    audioSrc: "/225_Desce.mp3",
    youtubeId: "QUS0LS_DkKU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Żaden ze mnie bandyta, pierwsze słyszę",
            start: 0.0,
            end: 2.45,
          },
          {
            text: "Chcę pomóc pani babci przejść przez jebaną ulicę",
            start: 2.45,
            end: 5.59,
          },
          { text: "Chcę pomóc pani babci, oh yeah", start: 5.59, end: 8.35 },
          { text: "Jara mnie spokój i cisza", start: 8.35, end: 11.43 },
          {
            text: "Nie poruszam wielu tematów dla mnie to siupa (ye-ye)",
            start: 11.43,
            end: 15.49,
          },
        ],
      },
    ],
  },
  {
    id: 226,
    day: 226,
    title: "Kapitan",
    artist: "Wac Toja",
    audioSrc: "/226_Kapitan.mp3",
    youtubeId: "7bqn2Kq5WQI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Mordo to nie Lato z Radiem",
            start: 0.0,
            end: 1.84,
          },
          {
            text: "Lecę i wiatr wieje w żagle",
            start: 1.84,
            end: 3.61,
          },
          {
            text: "Zatonę tu ze statkiem",
            start: 3.61,
            end: 5.33,
          },
          {
            text: "Francuz mały wariat Bonaparte",
            start: 5.33,
            end: 6.78,
          },
          {
            text: "Płynie melanż swoim kursem",
            start: 6.78,
            end: 10.28,
          },
        ],
      },
    ],
  },
  {
    id: 227,
    day: 227,
    title: "Buzi",
    artist: "Young Igi",
    audioSrc: "/227_Buzi.mp3",
    youtubeId: "Z6lGoiB9fqc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Musisz trzymać głowy tylko w spokoju z dala od ludzi",
            start: 0.0,
            end: 3.52,
          },
          {
            text: "Skarbie dawaj mi buzi, skarbie dawaj mi buzi",
            start: 3.52,
            end: 7.02,
          },
          {
            text: "Mówię nigdy nie było nic z inną suką",
            start: 7.02,
            end: 9.75,
          },
          {
            text: "Ona przegląda telefon jakby coś było bardzo długo (Bardzo długo)",
            start: 9.75,
            end: 13.72,
          },
          {
            text: "Bierze to w usta zanim weźmiemy się na grubo",
            start: 13.72,
            end: 15.96,
          },
        ],
      },
    ],
  },
  {
    id: 228,
    day: 228,
    title: "WMTB",
    artist: "OKI, Young Igi, Otsochodzi, OIO, @atutowy",
    audioSrc: "/228_WMTB.mp3",
    youtubeId: "AFAHY0LOhWw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Powiedz na osiedlu, że wychodzi OIO płyta",
            start: 0.0,
            end: 2.55,
          },
          {
            text: "Nie, nie, nie na żadnych featach, ze sceną jesteśmy kwita",
            start: 2.55,
            end: 5.28,
          },
          {
            text: "Po-po-powiedz na osiedlu, że wychodzi OIO płyta",
            start: 5.28,
            end: 8.0,
          },
          {
            text: "Nie, nie, nie na żadnych featach, ze sceną jesteśmy kwita",
            start: 8.0,
            end: 11.05,
          },
          {
            text: "Chcę uprawiać seks jak Pamela Anderson i Tommy Lee",
            start: 11.05,
            end: 13.64,
          },
        ],
      },
    ],
  },
  {
    id: 229,
    day: 229,
    title: "Nie ma",
    artist: "Dedis",
    audioSrc: "/229_Nie_ma.mp3",
    youtubeId: "r1GS9Y7EOr8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "W oczach widzę obłęd, jakby znała Lucyfera",
            start: 0.0,
            end: 2.45,
          },
          {
            text: "kanjpy, wino, kwiaty u niej nie mają znaczenia",
            start: 2.45,
            end: 4.29,
          },
          {
            text: "Ona chce się bawić, bo nie ma nic do stracenia",
            start: 4.29,
            end: 6.89,
          },
          {
            text: "Nie ma tu miłości, ona chce tylko dilera",
            start: 6.89,
            end: 9.32,
          },
          {
            text: "W oczach widzę obłęd, jakby znała Lucyfera",
            start: 9.32,
            end: 11.41,
          },
        ],
      },
    ],
  },
  {
    id: 230,
    day: 230,
    title: "Bossman",
    artist: "ReTo",
    audioSrc: "/230_Bossman.mp3",
    youtubeId: "FNF5ZQAXuXM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Płynę bywa zjadam ogon ginie w moich szczękach",
            start: 0.0,
            end: 2.25,
          },
          {
            text: "Co noc będziesz się trzymał tratwy blady niczym Jack",
            start: 2.25,
            end: 4.65,
          },
          {
            text: "Leżąc na niej stwierdzę, że nie ma miejsca na dwóch goodbye",
            start: 4.65,
            end: 7.25,
          },
          {
            text: "Mniej pozytywna wersja, nie będę po tobie płakał",
            start: 7.25,
            end: 9.75,
          },
          {
            text: "Patrząc jak tonie reszta odejdę i nie pomacham (oh)",
            start: 9.75,
            end: 13.83,
          },
        ],
      },
    ],
  },
  {
    id: 231,
    day: 231,
    title: "OBOK",
    artist: "Żabson",
    audioSrc: "/231_OBOK.mp3",
    youtubeId: "BjtzLtxr7OU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Kiedy jesteś obok mnie, a ja jestem obok ciebie",
            start: 0.0,
            end: 3.88,
          },
          {
            text: "Wszystko zdaje proste się, chociaż wcale takie nie jest",
            start: 3.88,
            end: 7.72,
          },
          { text: "Kiedy jesteś obok mnie", start: 7.72, end: 9.67 },
          {
            text: "Nawet strach wygląda jak złudzenie (jak złudzenie)",
            start: 9.67,
            end: 13.71,
          },
          {
            text: "Cały świat przestaje mieć znaczenie",
            start: 13.71,
            end: 16.49,
          },
        ],
      },
    ],
  },
  {
    id: 232,
    day: 232,
    title: "BMW",
    artist: "ReTo, Avi",
    audioSrc: "/232_BMW.mp3",
    youtubeId: "N_o-rwIV7pg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "W cztery sekundy od zera do setki", start: 0.0, end: 2.3 },
          {
            text: "Coś jakbym uciekał, tylko że nie ma przed kim",
            start: 2.3,
            end: 4.9,
          },
          {
            text: "Powiedz ziomkom, że wyjeżdżam z Warszawy",
            start: 4.9,
            end: 7.23,
          },
          {
            text: "Lewym się ciągną, więc wyprzedzam prawym",
            start: 7.23,
            end: 9.77,
          },
          { text: "Bez punktów na psach ani na BP", start: 9.77, end: 11.87 },
        ],
      },
    ],
  },
  {
    id: 233,
    day: 233,
    title: "Mów",
    artist: "Otsochodzi",
    audioSrc: "/233_Mw.mp3",
    youtubeId: "LmVoRtpmUus",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wielu z nich chyba serio już nie rozumiem",
            start: 0.0,
            end: 3.49,
          },
          {
            text: "Kiedy jestem sam, znowu czuję, że ginę",
            start: 3.49,
            end: 6.07,
          },
          {
            text: "Gubię się w tym, gubię furię",
            start: 6.07,
            end: 8.31,
          },
          {
            text: "Nie pytaj czemu rzadko tak widujesz mnie w tym klubie",
            start: 8.31,
            end: 11.96,
          },
          {
            text: "Stres mnie ciągle budzi, choć ciągle więcej chcę",
            start: 11.96,
            end: 15.46,
          },
        ],
      },
    ],
  },
  {
    id: 234,
    day: 234,
    title: "Jungle Boyz",
    artist: "Malik Montana",
    audioSrc: "/234_JungleBoyz.mp3",
    youtubeId: "yq3hsG4BBvc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gdzie nie pójdę, wszędzie obserwacja",
            start: 0.0,
            end: 2.23,
          },
          {
            text: "ABW, przestępczość gospodarcza",
            start: 2.23,
            end: 4.43,
          },
          {
            text: "VAT się kręci, tak rząd sie okrada",
            start: 4.43,
            end: 6.66,
          },
          {
            text: "Procenty, lichwa, mieszkania pod zastaw",
            start: 6.66,
            end: 9.05,
          },
          {
            text: "Ja, ich hör' sie labern, doch ist alles egal",
            start: 9.05,
            end: 12.55,
          },
        ],
      },
    ],
  },
  {
    id: 235,
    day: 235,
    title: "BLUEBERRY",
    artist: "Guzior, Favst",
    audioSrc: "/235_BLUEBERRY.mp3",
    youtubeId: "vClqvioJETU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Ta druga na drugiej, kręcą się panny jak para alufelg",
            start: 0.0,
            end: 4.55,
          },
          { text: "Wow, wow mamy basen", start: 4.55, end: 7.5 },
          {
            text: "Wyszedłem na blanta, a wróciłem zmęczony z trasy",
            start: 7.5,
            end: 10.51,
          },
          { text: "Się wjebię w ten basen (oh)", start: 10.51, end: 12.53 },
          { text: "Olewam party i palę blueberry", start: 12.53, end: 15.73 },
        ],
      },
    ],
  },
  {
    id: 236,
    day: 236,
    title: "ADHD",
    artist: "OKI, Taco Hemingway",
    audioSrc: "/236_ADHD.mp3",
    youtubeId: "mQ7h1ujKiG4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Poryty bez muzyki (ha), to już są moje tiki (hu)",
            start: 0.0,
            end: 3.21,
          },
          {
            text: "Ona widzi we mnie ADHD, ja w głowie mam melodyjki (ej)",
            start: 3.21,
            end: 6.76,
          },
          {
            text: "Ona widzi we mnie ADHD, ja w głowie mam linijki (ej)",
            start: 6.76,
            end: 10.55,
          },
          { text: "Tylko muzę w głowie mam i ADHD", start: 10.55, end: 13.93 },
          { text: "", start: 13.93, end: 17.93 },
        ],
      },
    ],
  },
  {
    id: 237,
    day: 237,
    title: "Prawy do Lewego",
    artist: "Mata",
    audioSrc: "/237_PrawydoLew.mp3",
    youtubeId: "wV9mdnvelVE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Wielka plaża w sercu miasta",
            start: 0.0,
            end: 3.38,
          },
          {
            text: "Pokaż mi, gdzie masz tak",
            start: 3.38,
            end: 6.72,
          },
          {
            text: "Nad Tamizą jest muzeum",
            start: 6.72,
            end: 8.86,
          },
          {
            text: "Nad Tybrem Koloseum",
            start: 8.86,
            end: 10.8,
          },
          {
            text: "Nad Sekwaną jest Notre-Dame",
            start: 10.8,
            end: 14.3,
          },
        ],
      },
    ],
  },
  {
    id: 238,
    day: 238,
    title: "Różowe Diamenty",
    artist: "Young Leosia, Deemz",
    audioSrc: "/238_Różowe.mp3",
    youtubeId: "tDcUgQ5J928",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "A world is under attack", start: 0.0, end: 2.4 },
          {
            text: "Blondynki, brunetki, różowe są sexy",
            start: 2.4,
            end: 5.37,
          },
          { text: "Masz ochotę na zabawę, to call me", start: 5.37, end: 7.59 },
          {
            text: "Tagi na ścianie, opuszczamy bar nad ranem (all in)",
            start: 7.59,
            end: 9.98,
          },
          { text: "Kelner, leje nam Dom Perignon", start: 9.98, end: 12.54 },
        ],
      },
    ],
  },
  {
    id: 239,
    day: 239,
    title: "Gelato",
    artist: "Taco Hemingway, Rumak",
    audioSrc: "/239_Gelato.mp3",
    youtubeId: "k9HbCQiuJfk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "Gelato, Gelato",
            start: 0.0,
            end: 1.38,
          },
          {
            text: "Zapomnij o tym, nie warto, nie warto",
            start: 1.38,
            end: 4.8,
          },
          {
            text: "Gdzie lato? Gdzie lato?",
            start: 4.8,
            end: 6.69,
          },
          {
            text: "Galliano, Gazpacho, Gelato",
            start: 6.69,
            end: 9.76,
          },
          {
            text: "Gelato, Gelato",
            start: 9.76,
            end: 13.26,
          },
        ],
      },
    ],
  },
  {
    id: 240,
    day: 240,
    title: "THC",
    artist: "Young Igi, Włodi",
    audioSrc: "/240_Young.mp3",
    youtubeId: "91F-2HsKTXw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
            text: "To po tym tworzę zwrotki, ty przy mnie palisz wrotki",
            start: 0.0,
            end: 3.85,
          },
          { text: "Chcę THC", start: 3.85, end: 5.05 },
          {
            text: "Pan władza zagląda do spodni, pewnie spodziewa się roślin",
            start: 5.05,
            end: 9.45,
          },
          {
            text: "Chcą zabrać mnie na komisariat, ja się pytam czy jesteśmy dorośli?",
            start: 9.45,
            end: 13.56,
          },
          {
            text: "Tak dużo osób to jara, że ciężko jest zrobić im pościg",
            start: 13.56,
            end: 17.19,
          },
        ],
      },
    ],
  },
{
    id: 241,
    day: 241,
    title: "P.S.W.I.S. (DJ Eprom Remix)",
    artist: "Belmondawg, Expo 2000, DJ Eprom",
    audioSrc: "Belmondo/241_PSWISDJEpr.mp3",
    youtubeId: "J-loV6A0Tg0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
                    "text": "Mimo chaosu ciągle iść do przodu",
                    "start": 0.0,
                    "end": 2.39
          },
          {
                    "text": "Nie wysnuwać zbyt pochopnych wniosków",
                    "start": 2.39,
                    "end": 5.11
          },
          {
                    "text": "Nie powielać donikąd idących wzorców",
                    "start": 5.11,
                    "end": 10.67
          },
          {
                    "text": "Nie robić błędów popełnionych przez praojców",
                    "start": 10.67,
                    "end": 15.75
          },
          {
                    "text": "Poradzimy sobie w inny sposób",
                    "start": 15.75,
                    "end": 19.25
          }
]
      }
    ]
  },
  {
    id: 255,
    day: 255,
    title: "Te Tereny",
    artist: "Belmondawg, Expo 2000",
    audioSrc: "Belmondo/255_TeTereny.mp3",
    youtubeId: "_nkvpdeJ0Ho",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
                    "text": "Kiedy musieliśmy z mamą wyprowadzić się z tej ziemi",
                    "start": 0.0,
                    "end": 4.75
          },
          {
                    "text": "Powodem były PLN'y, damn it",
                    "start": 4.75,
                    "end": 8
          },
          {
                    "text": "Może dzięki temu szybko zdążyłem docenić naturalne otoczenie",
                    "start": 8,
                    "end": 13.55
          },
          {
                    "text": "To co, to co było kiedyś",
                    "start": 13.55,
                    "end": 18.15
          },
          {
                    "text": "Kwestia pochodzenia jest istotna",
                    "start": 18.15,
                    "end": 21.28
          }
]
      }
    ]
  },
  {
    id: 238,
    day: 283,
    title: "Followup",
    artist: "Belmondawg, Expo 2000, Dizkret",
    audioSrc: "Belmondo/283_Followup.mp3",
    youtubeId: "Tllu5JRkmMc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          {
                    "text": "Jadę, nie wiadomo po co i gdzie",
                    "start": 0.0,
                    "end": 2.55
          },
          {
                    "text": "I'm the passenger",
                    "start": 2.55,
                    "end": 4
          },
          {
                    "text": "Follow-upy, follow-upy",
                    "start": 4,
                    "end": 5.95
          },
          {
                    "text": "Na ścianie napisy, Poppyn",
                    "start": 5.95,
                    "end": 8
          },
          {
                    "text": "Kto jest mistrzem gadki",
                    "start": 8,
                    "end": 11.31
          }
]
      }
    ]
  },
];
