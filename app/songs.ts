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
}

export const dailySongs: Song[] = [
  {
    id: 1,
    day: 1,
    title: "POMPA",
    artist: "PUSHER, BABA HASSAN, MERCURY",
    audioSrc: "./Pompa.mp3", // Ścieżka do pliku w folderze public
    youtubeId: "AMYruSwj3Eg",
    lyrics: [
  {
    lineIndex: 0,
    words: [
      { text: "CO TY CHCESZ ODE MNIE WYNOCHA", start: 0.00, end: 1.75 },
      { text: "PRZECIEŻ WIDZĘ, ŻE TY WALISZ W NOCHA", start: 1.75, end: 3.65 },
      { text: "ALE WIOCHA ZA PASEM JEST OSTRA", start: 3.65, end: 5.50 },
      { text: "ODBEZPIECZONA, LAKO ZA NOSTRA", start: 5.50, end: 7.60 },
      { text: "EJ KOMPAN, ŚMIERDZI CI STOPA", start: 7.60, end: 9.50 }
    ]
  }
]
  },
  {
    id: 2,
    day: 2,
    title: "BALENCI",
    artist: "Malik Montana",
    audioSrc: "/Balenci.mp3",
    youtubeId: "PlDhjlnKihE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie chcę słuchać jej prеtensji", start: 0.00, end: 1.55 },
          { text: "Biorę na zakupy do Balеnci", start: 1.55, end: 4.45 },
          { text: "W kieszeni luźne czterdzieści tysięcy", start: 4.45, end: 7.05 },
          { text: "Doktor za to powiększy jej piersi", start: 7.05, end: 9.05 },
          { text: "Pościel, świeczki, no i szampan", start: 9.05, end: 12.35 }
        ]
      }
    ]
  },
  {
    id: 3,
    day: 3,
    title: "1998 (mam to we krwi)",
    artist: "Bedoes, Lanek",
    audioSrc: "/1998.mp3",
    youtubeId: "cpmWu9n7LaM",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Żebym mógł zagrać pierwszy support przed Tede", start: 0.0, end: 1.95 },
          { text: "Więc mam w piździe, kto się znów ze mnie śmieje", start: 1.95, end: 3.40 },
          { text: "Czy jestem prawdziwy przed tamtym raperem czy nie", start: 3.40, end: 5.45 },
          { text: "Ja jestem Be do jebanego eS", start: 5.45, end: 7.05 },
          { text: "Mateusz, spoczywaj w pokoju w niebie", start: 7.05, end: 9.1 }
        ]
      }
    ]
  },
  {
    id: 4,
    day: 4,
    title: "„Tak to leciało!”",
    artist: "Otsochodzi, Taco Hemingway, lohleq",
    audioSrc: "/Tak to leciało.mp3",
    youtubeId: "0c1wRHRJNUs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Studio, w którym siedzę, jest warte pięć milionów lub pięć domów", start: 0.0, end: 3.65 },
          { text: "Ty jedyne posiadłości masz w Monopolu — won od stołu", start: 3.65, end: 7.15 },
          { text: "Gra skończona — zbieraj się, pionku, byle do piątku, znów to samo (Oh)", start: 7.15, end: 10.85 },
          { text: "Twoja pani zna mnie dobrze — podpisałem jej krążek (Dobra — tak to leciało, haha)", start: 10.85, end: 15.15 },
          { text: "Jeszcze nie kończę (Ah), płyty, to nie numery na stypy (Ta-Tarcho Terror)", start: 15.15, end: 19.0 }
        ]
      }
    ]
  },
  {
    id: 5,
    day: 5,
    title: "1 na 100",
    artist: "White 2115, Mata, Pedro, BroJustChill",
    audioSrc: "/1na100.mp3",
    youtubeId: "6-UVT5r8Ml0",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ona chce lato z nami, bo zdążyłem ją do tego przyzwyczaić", start: 0.0, end: 3.55 },
          { text: "Ona chce lato z nami, przez różowe okulary mnie obczaić", start: 3.55, end: 7.35 },
          { text: "Jesteś jedna na sto, bo to dużo mniejsze miasto od Warszawy", start: 7.35, end: 11.1 },
          { text: "Mamy jedenastą, nie wpadła tutaj, żeby grać w warcaby", start: 11.05, end: 14.95 },
          { text: "Jeździłaś po mieście całą noc, tylko po to, żeby spotkać mnie", start: 14.95, end: 18.9 }
        ]
      }
    ]
  },
  {
    id: 6,
    day: 6,
    title: "1DAY IN LA",
    artist: "francis, bambi, OKI",
    audioSrc: "/1DAY IN LA.mp3",
    youtubeId: "0DCmDBRunS8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Niski sufit, double cup i Don Julio w kieliszkach", start: 0.0, end: 4.05},
          { text: "Bujam ciałem góra-dół, nie schodzę — tańcz ze mną", start: 4.05, end: 8.05 },
          { text: "Niski sufit, pełen klub, cały tłum dziś góra-dół", start: 8.05, end: 12.45 },
          { text: "LA w studio, ze mną skład, nie zasnę na pewno", start: 12.45, end: 16.45 },
          { text: "Niski sufit, double cup i Don Julio w kieliszkach", start: 16.45, end: 21.0 }
        ]
      }
    ]
  },
  {
    id: 7,
    day: 7,
    title: "100 Tysięcy",
    artist: "Młody West",
    audioSrc: "/100 Tysięcy.mp3",
    youtubeId: "haDPE_AatW8",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "(Rick) Rick Owens, ERD, hmm (Woo, ha, ha)", start: 0.0, end: 3.85 },
          { text: "Jedna noc w Berlinie, góra dwie, hmm (Never), huh", start: 3.85, end: 6.85 },
          { text: "B-B-B-B, B-Balenci' (B-B, B-B)", start: 6.85, end: 10.25 },
          { text: "Wyszedłem z bagna, mam wszystko Balenci' (Whau, Ba-Balenci')", start: 10.25, end: 14.15 },
          { text: "Znowu w duchu — Patrick Swayze, huh (Skrrt)", start: 14.15, end: 16.7 }
        ]
      }
    ]
  },
  {
    id: 8,
    day: 8,
    title: "W GORĄCEJ WODZIE COMPANY",
    artist: "Bardal",
    audioSrc: "/W GORĄCEJ WODZIE COMPANY.mp3",
    youtubeId: "WmYMN3zSz70",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "To, co tak pierdolą, to zazwyczaj gówno prawda", start: 0.0, end: 2.65 },
          { text: "Wszedłem w słowo i se ujebałem kałem trampka", start: 2.65, end: 5.15 },
          { text: "Powiedziałeś co wiedziałeś, przestań kurwa ciamkać", start: 5.15, end: 7.65 },
          { text: "Spierdalaj już na górę Tadek, bo cię woła Danka", start: 7.65, end: 10.35 },
          { text: "Znowu jakaś szmata oferuje mi gorącą kąpiel", start: 10.35, end: 13.5 }
        ]
      }
    ]
  },
  {
    id: 9,
    day: 9,
    title: "Luty",
    artist: "Otsochodzi",
    audioSrc: "/Luty.mp3",
    youtubeId: "joGbJTxzmrQ",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ehe, take znowu mam czysty", start: 0.0, end: 2.25 },
          { text: "Wziąłem ją od tyłu, kiedy grała sobie w Simsy, wow", start: 2.25, end: 5.10 },
          { text: "(Ehe) Włączył mi się Drizzy mode", start: 5.10, end: 7.05 },
          { text: "Dlatego w Londynie odwiedzamy OVO", start: 7.05, end: 9.35 },
          { text: "I kupuje sobie łaszki (Hehe), najdroższe ciuchy, no i najtańsze flaszki (Ej)", start: 9.35, end: 13.4 }
        ]
      }
    ]
  },
  {
    id: 10,
    day: 10,
    title: "Mini Man",
    artist: "Okekel",
    audioSrc: "/Mini Man.mp3",
    youtubeId: "kiL_C0XjMD4",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Prosta piła — sto koła, albo zawijam (Co? Co?)", start: 0.0, end: 2.25 },
          { text: "Dzieciaku, chcesz to zrobić? No to dawaj, z chaty wyłaź (Wyłaź)", start: 2.25, end: 5.4 },
          { text: "Płacze moja dusza, ale tata dumny z syna", start: 5.4, end: 8.05 },
          { text: "Piekło mam do przejścia, bo na murach ma być ksywa", start: 8.05, end: 11.05 },
          { text: "Oh, znowu czuję jakąś moc (Haha)", start: 11.05, end: 14.6 }
        ]
      }
    ]
  },
  {
    id: 11,
    day: 11,
    title: "Hit ’Em Up",
    artist: "Bedoes 2115",
    audioSrc: "/Hit 'Em Up.mp3",
    youtubeId: "EMAZETA-bXU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Rzuciłem, że będzie spokój, a Ty znów dajesz farmazon", start: 0.0, end: 2.35 },
          { text: "Trzymałem Twoją głowę wzywając ambulans", start: 2.35, end: 4.55 },
          { text: "Gdy Twoi ludzie stali obok i walili w chuja", start: 4.55, end: 6.75 },
          { text: "Ty, skoro było niehonorowo, czemu nikt nie pomógł?", start: 6.75, end: 9.45 },
          { text: "Bo było jeden na jednego — królu farmazonów", start: 9.45, end: 11.50 }
        ]
      }
    ]
  },
  {
    id: 12,
    day: 12,
    title: "CASABLANCA",
    artist: "Sentino, BNP",
    audioSrc: "/CASABLANCA.mp3",
    youtubeId: "B0B_mQZfeiY",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Dookoła piękne panie, panie, panie", start: 0.0, end: 4.05 },
          { text: "Chcę tylko jedną dla mnie, dla mnie, dla mnie", start: 4.05, end: 7.65 },
          { text: "To, co chcę, to nie taniec, taniec, taniec", start: 7.65, end: 11.45 },
          { text: "Weź rzuć się lepiej na mnie, na mnie, na mnie", start: 11.45, end: 15.15 },
          { text: "Chodzą mi cały czas takie myśli po bani", start: 15.15 , end: 18.7}
        ]
      }
    ]
  },
  {
    id: 13,
    day: 13,
    title: "Papierosy_rmx",
    artist: "ReTo",
    audioSrc: "/Papierosy.mp3",
    youtubeId: "T0z4Sx2jpEk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie od wczoraj gram, żeby w życiu coś ugrać", start: 0.0, end: 1.95 },
          { text: "Dziś mam co ubrać, wypić, zapalić", start: 1.95, end: 3.55 },
          { text: "Nawet z tym trzecim sam widzę przesadę", start: 3.55, end: 5.35 },
          { text: "W życiu ze wszystkim umiem przesadzić", start: 5.35, end: 7.25 },
          { text: "Dlatego wciąż skacze z kwiatka na kwiatek", start: 7.25, end: 9.1 }
        ]
      }
    ]
  },
  {
    id: 14,
    day: 14,
    title: "Puerto Bounce",
    artist: "Żabson, ZetHa, Kizo",
    audioSrc: "/Puerto Bounce.mp3",
    youtubeId: "TZS-8J2Hczc",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Zioło takie, że ohoho", start: 0.0, end: 1.95 },
          { text: "Mam zioło takie, że o mamma mia", start: 1.95, end: 3.75 },
          { text: "Pojechałem na przepyszne śniadanie, podawała je kelnerka, miała piękne siadanie", start: 3.75, end: 7.35 },
          { text: "Tutejszy buszek właśnie wjechał na banię", start: 7.35, end: 9.15 },
          { text: "Mogę wszystko, nie muszę, takie podsumowanie", start: 9.15, end: 11 }
        ]
      }
    ]
  },
  {
    id: 15,
    day: 15,
    title: "STRZELAM PETEM",
    artist: "Guzior",
    audioSrc: "/STRZELAM PETEM.mp3",
    youtubeId: "xT5BXK-ZIDU",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Mam niunię bystrą, co zamknęłaby Ci pysk, yo, lecz nie chce", start: 0.0, end: 3.25 },
          { text: "Ale wiedz, że nie udałoby się wszystko to bez niej", start: 3.25, end: 6.65 },
          { text: "Dobre chłopaki ze złych stron, yo", start: 6.65, end: 9.75 },
          { text: "Dobre chłopaki ze złych...", start: 9.75, end: 11.85 },
          { text: "Mam niunię bystrą, co zamknęłaby Ci pysk, yo, lecz nie chce", start: 11.85, end: 15.40 }
        ]
      }
    ]
  },
  {
    id: 16,
    day: 16,
    title: "Rura musi yeah",
    artist: "Malik Montana, Kazior",
    audioSrc: "/Rura musi yeah.mp3",
    youtubeId: "T0z4Sx2jpEk",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "To dla wszystkich bandziorów na dyskotekach", start: 0.0, end: 2.25 },
          { text: "Co? Co? Rura musi jebać", start: 2.25, end: 4.75 },
          { text: "Dla szmulek, które lecą na dilerów w dresach", start: 4.75, end: 7.15 },
          { text: "Co? Co? Rura musi jebać", start: 7.15, end: 9.45 },
          { text: "To dla bandziorów w Mercedesach i Beemach", start: 9.45, end: 11.9 }
        ]
      }
    ]
  },
  {
    id: 17,
    day: 17,
    title: "Bellucci",
    artist: "Louis Villain, Guzior",
    audioSrc: "/Bellucci.mp3",
    youtubeId: "yZQEUYQ6bQE",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ona mnie łapiе za rękę, mówi: Uważaj na jezdnie, robi się mokra", start: 0.0, end: 3.65 },
          { text: "Dzisiaj nie usnę, próbuję zapеłnić czymkolwiek tą pustkę", start: 3.65, end: 7.35 },
          { text: "Mam pełen bagaż doświadczeń cały wypchany w gotówce", start: 7.35, end: 11.05 },
          { text: "My wchodzimy, to na sto, odkładamy coś na bok, no i znowu witam rok, miasto", start: 11.05, end: 15.85 },
          { text: "Zawijamy sos, potem zawijamy stąd i idziemy dalej ponad to", start: 15.85, end: 20.0 }
        ]
      }
    ]
  },
  {
    id: 18,
    day: 18,
    title: "All Day Everyday (Łee)",
    artist: "Kaz Bałagane",
    audioSrc: "/All Day Everyday - Łee.mp3",
    youtubeId: "PVmZ9Lv7VBw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie dogadamy się, jak lubisz jarmuż", start: 0.0, end: 3.05 },
          { text: "Mam torbę pełną skarbów, jak przede mną Janusz", start: 3.05, end: 7.25 },
          { text: "Idę opierdolić Baba ghanoush", start: 7.25, end: 9.75 },
          { text: "Mordo, stylu nie wziąłem ze Stanów", start: 9.75, end: 12.05 },
          { text: "Mam chatę pełną stacków, jak bloki bałaganów", start: 12.05, end: 15.40 }
        ]
      }
    ]
  },
  {
    id: 19,
    day: 19,
    title: "W DRESACH",
    artist: "Jan-rapowanie, Szpaku",
    audioSrc: "/W DRESACH.mp3",
    youtubeId: "dEG8oAo2omI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "To nie kredyt na Rolexa, to owoce pracy, zawsze będzie ktoś bogatszy", start: 0.0, end: 6.05 },
          { text: "Nie odbierzesz satysfakcji, czemu nic nie robisz, tylko patrzysz, pa-pa-patrzysz?", start: 6.05, end: 11.85 },
          { text: "Pogoń nie ma sensu, cieszę się komfortem", start: 11.85, end: 14.45 },
          { text: "Nie chodzi o kwotę, tylko co z nią zrobić mogę (Yeah)", start: 14.45, end: 17.45 },
          { text: "Yo, uwierz, że doceniam, bo znam swoją drogę", start: 17.45, end: 20.3 }
        ]
      }
    ]
  },
  {
    id: 20,
    day: 20,
    title: "Impreza",
    artist: "Sobel",
    audioSrc: "/Impreza.mp3",
    youtubeId: "Sug433bP-mw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie wierzę, afera", start: 0.0, end: 2.10 },
          { text: "Ziomka chyba zabiera", start: 2.10, end: 4.05 },
          { text: "Nie wierzę, afera", start: 4.05, end: 5.95 },
          { text: "Uuuu, impreza", start: 5.95, end: 7.95 },
          { text: "(Ey), (Uuu) (Hehehe), (Ey) (U, u, u, uuuu), impreza", start: 7.95, end: 24.0 }
        ]
      }
    ]
  },
  {
    id: 21,
    day: 21,
    title: "Comme Des Garçons",
    artist: "Chivas",
    audioSrc: "/Comme.mp3",
    youtubeId: "wyp93o9erTs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Jagodowe Lucky Strike", start: 0.0, end: 2.15 },
          { text: "Chciałaś, bym się zmienił - jestem taki sam", start: 2.15, end: 4.85 },
          { text: "Tylko lajki mam, pokazuję znak pokoju na zdjęciach", start: 4.85, end: 9.55 },
          { text: "Ciekawe, czy Twój numer jest aktywny", start: 9.55, end: 11.75 },
          { text: "Bo pamiętam niektóre jego cyfry", start: 11.75, end: 14.7 }
        ]
      }
    ]
  },
  {
    id: 22,
    day: 22,
    title: "New York Freestyle",
    artist: "Otsochodzi, lohleq",
    audioSrc: "/NewYork.mp3",
    youtubeId: "DFVEGnt487Y",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Miałem bad trip po jebanej czekoladzie", start: 0.0, end: 2.55 },
          { text: "Mówili: zjedz kostkę, a został tylko papier — o mój Boże", start: 2.55, end: 5.25 },
          { text: "Muszę przestać, bo słyszałem strzały w głowie", start: 5.25, end: 7.65 },
          { text: "Muszę przetrwać, z tego pokoju nie wychodzę (Z tego pokoju nie wychodzę)", start: 7.65, end: 10.25 },
          { text: "Nie mam serca i to mnie wkurwia, przecież tyle mogę przegrać", start: 10.25, end: 13.6 }
        ]
      }
    ]
  },
  {
    id: 23,
    day: 23,
    title: "BIERZ TO NA WOLNO",
    artist: "vkie",
    audioSrc: "/BIERZ TO NA WOLNO.mp3",
    youtubeId: "K-xOPKGkI24",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "By niczego nie brakło, to właśnie oznaka męstwa (Tak jest)", start: 0.0, end: 2.65 },
          { text: "Myślałem, kurwa, że mnie ziomal wkręca", start: 2.65, end: 4.45 },
          { text: "Jak powiedział, że mu ukochana wyczyściła konto", start: 4.45, end: 6.75 },
          { text: "Suki to agentki, ale są też dobre baby", start: 6.75, end: 8.75 },
          { text: "Po prostu uważaj, dzieciak, zawsze bierz to na wolno (Na wolno)", start: 8.75, end: 11.6 }
        ]
      }
    ]
  },
  {
    id: 24,
    day: 24,
    title: "Zielona Flegma",
    artist: "Malik Montana, Dj.Frodo",
    audioSrc: "/Zielona flegma.mp3",
    youtubeId: "6RToRo0BXNg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Komu ufać? Każdy tylko w swoim interesie", start: 0.0, end: 2.65 },
          { text: "Jak tu czynić dobro kiedy myślą, że to słabość?", start: 2.65, end: 5.35 },
          { text: "Honor, duma to już tylko slogan a nie wartość", start: 5.35, end: 7.95 },
          { text: "Konkurencje ściągam w dół jak prostytutce majtki", start: 7.95, end: 10.35 },
          { text: "Chcieli wydymać Freda a zostali wydymani", start: 10.35, end: 13.3 }
        ]
      }
    ]
  },
  {
    id: 25,
    day: 25,
    title: "Skąd Ty To Znasz",
    artist: "Sentino, Diho",
    audioSrc: "/Skąd Ty To Znasz.mp3",
    youtubeId: "RBpDv4UpIFI",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Twoje serce jest dzikie, serce jest dzikie, serce jest dzikie", start: 0.0, end: 4.75 },
          { text: "Pożałujesz jak zniknę, pożałujesz jak zniknę", start: 4.75, end: 8.15 },
          { text: "Kiedyś myślałem, że minie co złe i że do nas należy ten świat", start: 8.15, end: 12.15 },
          { text: "Dziś zgasła nadzieja jak jedna wśród milionów gwiazd", start: 12.15, end: 14.85 },
          { text: "Skąd ty to znasz?", start: 14.85, end: 16.4 }
        ]
      }
    ]
  },
  {
    id: 26,
    day: 26,
    title: "Szaman",
    artist: "Paluch",
    audioSrc: "/Szaman.mp3",
    youtubeId: "x7BtclKr5Jg",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Jak sam nie zarobisz, to nie miej pretensji", start: 0.0, end: 1.95 },
          { text: "Nie jesteś szamanem, jak nie ogarniasz", start: 1.95, end: 3.95 },
          { text: "Nieważne czy handel czy praca legalna", start: 3.95, end: 6.05 },
          { text: "Jak trzeba, kurwa, to wskakujesz w garniak", start: 6.05, end: 8.05 },
          { text: "Tak to wygląda, walka o standard", start: 8.05, end: 9.9 }
        ]
      }
    ]
  },
  {
    id: 27,
    day: 27,
    title: "Gustaw",
    artist: "Bedoes 2115",
    audioSrc: "/Gustaw.mp3",
    youtubeId: "fide4cDt_xo",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Widziałem melanże", start: 0.0, end: 1.45 },
          { text: "Widziałem brzydkie suki, średnie suki, piękne suki, widziałem każde (każde)", start: 1.45, end: 4.95 },
          { text: "Prawie zamieszkałem na dnie (na dnie), prawie zostałem na winklu", start: 4.95, end: 8.25},
          { text: "Gucci nie zmienia niczego, bo byłem tak samo prawdziwy", start: 8.25, end: 10.85 },
          { text: "Jak chodziłem w ciuchach kupionych na rynku, Borek!", start: 10.85, end: 13.1 }
        ]
      }
    ]
  },
  {
    id: 28,
    day: 28,
    title: "Magenta",
    artist: "Pezet",
    audioSrc: "/Magenta.mp3",
    youtubeId: "Cb-gaZHYoLs",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Ona na ucho mówi mi, bym uważał na zakrętach", start: 0.0, end: 2.25 },
          { text: "Gdy jedziemy przed siebie bez celu", start: 2.25, end: 4.25 },
          { text: "Za nami wszystko czego chcemy nie pamiętać", start: 4.25, end: 6.05},
          { text: "I stajemy na chwilę na shellu", start: 6.05, end: 7.85 },
          { text: "Nad nami niebo różowe jak magenta", start: 7.85, end: 9.6 }
        ]
      }
    ]
  },
  {
    id: 29,
    day: 29,
    title: "Sorry Dolores",
    artist: "ReTo, Quebonafide",
    audioSrc: "/Sorry Dolores.mp3",
    youtubeId: "5ieKKxPN4ag",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Parkiet zna, przyszła poznać Marsellusa", start: 0.0, end: 2.65 },
          { text: "Jak Travolta tańczę sam, zostań, popatrz jak się ruszam", start: 2.65, end: 5.85 },
          { text: "Mia mijasz z prawdą się, razem nie będziemy tańczyć", start: 5.85, end: 9.05 },
          { text: "Nieraz gra na nerwach śmierć, taniec mógłby być ostatnim, goddamn", start: 9.05, end: 13.05 },
          { text: "Poznane z każdej strony, nie poznane by na ty przejść", start: 13.05, end: 16.4 }
        ]
      }
    ]
  },
  {
    id: 30,
    day: 30,
    title: "Sezon",
    artist: "Kabe, Opiat",
    audioSrc: "/Sezon.mp3",
    youtubeId: "fZZhXq607Rw",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Nie przyszedłem tutaj na sezon (łoo)", start: 0.0, end: 3.95 },
          { text: "U ciebie w słuchawce słychać to echoo, (łooo)", start: 3.95, end: 7.65 },
          { text: "Gdy padają kulę nie wychodź na zewnątrz (woow)", start: 7.65, end: 11.35 },
          { text: "Za mną pusto nie ma już nic ostatnia prosta wchodzę na szczyt", start: 11.35, end: 14.95 },
          { text: "Nie przyszedłem tutaj na sezon", start: 14.95, end: 17.7 }
        ]
      }
    ]
  },
  {
    id: 31,
    day: 31,
    title: "Moment",
    artist: "Pusher, OSKA030, Baba Hassan",
    audioSrc: "/Moment.mp3",
    youtubeId: "Tv2YkKsvK5A",
    lyrics: [
      {
        lineIndex: 0,
        words: [
          { text: "Lepiej nie mów nic, bo jeszcze się zrobi gorzej", start: 0.0, end: 3.75 },
          { text: "Stolik VIP, nie patrz się tak, tylko polej", start: 3.75, end: 7.35 },
          { text: "Na zdrowie moja kolej, jak chcesz to cię zabiorę", start: 7.35, end: 11.05 },
          { text: "Mówi, że jest aniołem", start: 11.05, end: 12.85 },
          { text: "Uaaa", start: 12.85, end: 15.2 }
        ]
      }
    ]
  },
];


