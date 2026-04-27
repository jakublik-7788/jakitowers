"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Cookie,
  Send,
  CheckCircle2,
  Loader2,
  Music,
  Bug,
  Lightbulb,
  HelpCircle,
  Heart,
  ScrollText,
  Info,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Zap,
} from "lucide-react";
import { createPortal } from "react-dom";

// ─── Typy ─────────────────────────────────────────────────────────────────────
type InfoModalType = "privacy" | "cookies" | "terms" | "about" | "patch" | null;
type ContactStep = "topic" | "form" | "sent";

interface PatchEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  icon: React.ReactNode;
  changes: {
    type: "new" | "new2" | "improvement" | "fix" | "coming" | "info";
    title: string;
    description: string;
  }[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_PATCH_SEEN_KEY = "jakitowers_patch_seen_v3-0";

const TOPICS = [
  { id: "song",   label: "Brakująca piosenka", icon: Music,       desc: "Chcę zgłosić piosenkę do dodania" },
  { id: "bug",    label: "Błąd w grze",        icon: Bug,         desc: "Coś nie działa jak powinno" },
  { id: "idea",   label: "Pomysł",             icon: Lightbulb,   desc: "Mam pomysł na nową funkcję" },
  { id: "praise", label: "Pochwała",           icon: Heart,       desc: "Chcę napisać coś miłego" },
  { id: "other",  label: "Inne",               icon: HelpCircle,  desc: "Coś innego" },
] as const;

type TopicId = typeof TOPICS[number]["id"];

const FOOTER_LINKS: { key: InfoModalType; label: string; icon: React.ReactNode }[] = [
  { key: "patch",   label: "Aktualności",  icon: <Sparkles size={11} /> },
  { key: "about",   label: "O projekcie", icon: <Info size={11} /> },
  { key: "terms",   label: "Regulamin",  icon: <ScrollText size={11} /> },
  { key: "privacy", label: "Prywatność", icon: <Shield size={11} /> },
  { key: "cookies", label: "Cookies",    icon: <Cookie size={11} /> },
];

// ─── Dane aktualności ─────────────────────────────────────────────────────────
const PATCH_ENTRIES: PatchEntry[] = [
  {
    id: "v3-0",
    version: "INFORMACJA",
    date: "28 kwietnia 2026",
    title: "INFORMACJE",
    icon: <Zap size={14} />,
    changes: [
      { type: "info", title: "JEB*Ć RAKA", description: "Walczymy z rakiem i przyłączamy się do zbiórki pieniędzy dla chorych dzieci z fundacji Cancer Fighters. Każda wpłata na buycoffee z dzisiejszego dnia (28.04) zostanie przekazana na zbiórkę. Miłej gry!" },
    ],
  },
  {
    id: "v2-0",
    version: "Aktualizacja 2.0",
    date: "16 kwietnia 2026",
    title: "INFORMACJE",
    icon: <Zap size={14} />,
    changes: [
      { type: "info", title: "INFORMACJA", description: "Witam, chciałbym podziękować za dużą aktywność w pierwszych tygodniach gry. Wszystkie wiadomości kierowane do mnie poprzez formularz czytam i biorę pod uwagę. Strona będzie ulepszana i będą dodawane nowe kategorie na bieżąco z czasem. Musicie zrozumieć że zajmuję się stroną wyłącznie sam, a za 20 dni piszę maturę. W miarę możliwości będę pracował i ulepszał stronę. Dziękuje za zrozumienie i miłej gry!" },
      { type: "new", title: "Możliwość zmiany kursora", description: "Sporo osób twierdziło że  animowany kursor je irytuje, więc na życzenie dodaję możliwość zmiany kursora na systemowy. :)" },
    ],
  },
  {
    id: "v1-0",
    version: "Aktualizacja 1.0",
    date: "6 kwietnia 2026",
    title: "NOWE TRYBY I ULEPSZENIA",
    icon: <Zap size={14} />,
    changes: [
      { type: "new", title: "Nowa strona główna", description: "Wybierz tryb gry bezpośrednio ze strony głównej. Nawiguj po dniach strzałkami lub kalendarzem i wracaj do poprzednich wyzwań." },
      { type: "new", title: "Tryb KLASYKI", description: "Odgaduj kultowe polskie piosenki po wersach tekstu. Dostępny jako codzienny challenge od dnia 18 i w trybie Non-Limit." },
      { type: "new", title: "Tryb SOUNDTRACKI", description: "Odgaduj ścieżki dźwiękowe z filmów, seriali i gier po krótkim fragmencie audio — zaczynasz od 1 sekundy! Dostępny jako codzienny challenge od dnia 18 i w trybie Non-Limit." },
      { type: "new2", title: "Podpowiedzi w trybie SOUNDTRACKI", description: "Po każdej nieudanej próbie odkrywasz nową wskazówkę: rodzaj → gatunek → rok wydania → reżyser / studio." },
      { type: "new2", title: "Wygląd UI", description: "Nowy odświeżony wygląd strony. Starałem się aby był on intuicyjny i łatwy w użytkowaniu." },
      { type: "improvement", title: "NON-LIMIT z nowymi trybami", description: "RAP, KLASYKI i SOUNDTRACKI w jednym miejscu. Przełączaj się między trybami bez wychodzenia z gry." },
      { type: "improvement", title: "Ulepszona wyszukiwarka", description: "Możliwość odrzucenia odpowiedzi które uważamy za błędne. (Można je przywrócić)" },
      { type: "improvement", title: "Ulepszony odtwarzacz", description: "Użytkownik może wybrać, od którego wersu ma rozpocząć się odtwarzanie." },
      { type: "improvement", title: "Nawigacja na urządzeniach mobilnych", description: "Od teraz można używać swipe do przechodzenia między dniami na stronie głownej oraz na poszczególnych trybach." },
      { type: "fix", title: "Mobile UI", description: "Poprawione UI na urządzeniach mobilnych." },
    ],
  },
];

const TYPE_STYLES = {
  new: { bg: "bg-green-500/15", text: "text-green-400", border: "border-green-500/30", label: "NOWOŚĆ" },
  new2: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30", label: "NOWOŚĆ" },
  improvement: { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/30", label: "ULEPSZENIE" },
  fix: { bg: "bg-yellow-500/15", text: "text-yellow-400", border: "border-yellow-500/30", label: "POPRAWKA" },
  info: { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30", label: "INFORMACJA" },
  coming: { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30", label: "WKRÓTCE" },
};

// ─── Shared modal shell (wyśrodkowany na wszystkich urządzeniach) ─────────────
const ModalShell = ({
  onClose,
  title,
  icon,
  children,
  footer,
  wide = false,
}: {
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.18 }}
    onClick={onClose}
    className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
    style={{ zIndex: 99999, background: "rgba(0,0,0,0.97)" }}
  >
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.97 }}
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      onClick={(e) => e.stopPropagation()}
      className={`relative w-full flex flex-col rounded-[28px] border-2 border-white/8 shadow-2xl overflow-hidden ${wide ? "max-w-4xl" : "max-w-lg"}`}
      style={{
        background: "#0c0c0e",
        boxShadow: "0 0 60px var(--accent-glow, rgba(188,19,254,0.15))",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-accent">{icon}</span>}
          <div>
            <h2 className="text-base font-[1000] italic uppercase tracking-tight text-white leading-none">
              {title}
            </h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto scrollbar-custom flex-1 px-6 py-5 max-h-[72vh]">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-white/5 shrink-0 flex items-center justify-between">
          <p className="text-[10px] text-zinc-700 tracking-wider font-bold uppercase">jakitowers.pl</p>
          {footer}
        </div>
      )}
    </motion.div>
  </motion.div>
);

// ─── TREŚCI ───────────────────────────────────────────────────────────────────

const AboutContent = () => (
  <div className="flex flex-col gap-5 text-zinc-300 text-sm leading-relaxed">
    <div className="bg-accent/8 border border-accent/20 rounded-2xl p-5">
      <p className="text-accent text-[9px] font-black tracking-[0.3em] uppercase mb-2">Muzyczny projekt hobbystyczny</p>
      <p className="text-white font-[800] text-lg italic uppercase tracking-tight leading-tight">
        JakiTowers to gra muzyczna stworzona dla miłośników muzyki!
      </p>
    </div>
    <p>
      Projekt tworzę sam, z pomocą znajomych, którzy cały czas pomagają wyłapywać błędy i podsuwają nowe pomysły. To projekt hobbystyczny zrobiony po to, żeby dać ludziom chwilę odmóżdżenia.
    </p>
    <div>
      <p className="text-white font-black uppercase tracking-widest text-[10px] mb-2">Dlaczego zacząłem tworzyć stronę?</p>
      <p>Strona powstała żeby dać każdemu możliwość odetchnięcia od codziennej pracy, obowiązków lub po prostu umilenia czasu w ciągu dnia.</p>
    </div>
  </div>
);

const TermsContent = () => (
  <div className="flex flex-col gap-5 text-zinc-300 text-sm leading-relaxed">
    <div className="grid grid-cols-3 gap-2 text-xs mb-1">
      {[
        { label: "Charakter usługi", desc: "Darmowy serwis rozrywkowy" },
        { label: "Dostęp",           desc: "Bezpłatny i ogólnodostępny" },
        { label: "Kontakt",          desc: "Formularz na stronie" },
      ].map((item) => (
        <div key={item.label} className="bg-white/3 border border-white/6 rounded-xl p-3">
          <p className="text-white font-black text-[9px] uppercase tracking-wider mb-1">{item.label}</p>
          <p className="text-zinc-500 text-[10px] leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
    {[
      { n: "1", title: "Charakter usługi",        body: "JakiTowers to darmowy serwis rozrywkowy o charakterze muzycznym. Korzystanie z podstawowych funkcji serwisu jest zawsze bezpłatne." },
      { n: "2", title: "Prawa autorskie",         body: "Układ strony, identyfikacja wizualna i materiały przygotowane specjalnie dla serwisu są własnością JakiTowers. Prawa do utworów muzycznych należą do ich odpowiednich właścicieli." },
      { n: "3", title: "Fragmenty tekstów i audio", body: "Fragmenty tekstów i nagrań audio wykorzystywane są na podstawie prawa cytatu (art. 29 ustawy o prawie autorskim). Celem serwisu jest rozrywka i popularyzacja muzyki." },
      { n: "4", title: "Zasady korzystania",      body: "Z serwisu należy korzystać zgodnie z jego przeznaczeniem. Zabrania się podejmowania prób obchodzenia zabezpieczeń serwisu lub korzystania z niego niezgodnie z prawem." },
      { n: "5", title: "Darmowy dostęp",          body: "Korzystanie z JakiTowers jest zawsze darmowe. Jakiekolwiek formy wsparcia finansowego są w pełni dobrowolne i nie wpływają na dostęp do żadnych funkcji." },
      { n: "6", title: "Odpowiedzialność",        body: "Dokładamy starań, aby serwis działał stabilnie, ale nie gwarantujemy nieprzerwanej dostępności wszystkich funkcji." },
      { n: "7", title: "Kontakt i zgłoszenia",    body: "W sprawach związanych z działaniem serwisu lub prawami autorskimi możesz skontaktować się z nami przez formularz kontaktowy." },
    ].map((s) => (
      <div key={s.n}>
        <p className="text-white font-black uppercase tracking-widest text-[10px] mb-1.5">{s.n}. {s.title}</p>
        <p className="text-zinc-400">{s.body}</p>
      </div>
    ))}
    <p className="text-zinc-700 text-[10px] border-t border-white/5 pt-3">Ostatnia aktualizacja: 18 kwietnia 2026</p>
  </div>
);

const PrivacyContent = () => (
  <div className="flex flex-col gap-5 text-zinc-300 text-sm leading-relaxed">
    <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-4">
      <p className="text-green-400 font-black uppercase tracking-widest text-[10px] mb-1">Bez rejestracji, bez konta</p>
      <p className="text-zinc-300 text-xs">Serwis nie zbiera, nie przetwarza ani nie przechowuje danych osobowych użytkowników. Nie wymagamy rejestracji ani logowania.</p>
    </div>
    {[
      { title: "Dane lokalne (localStorage)", body: "Wyniki gry, historia prób i preferencje zapisywane są wyłącznie lokalnie w przeglądarce — tylko na Twoim urządzeniu, nigdy na serwerze." },
      { title: "Formularz kontaktowy",        body: "Jeśli napiszesz do nas, wiadomość trafia przez Formspree. Nie zbieramy adresów e-mail ani danych identyfikacyjnych — chyba że sam je podasz." },
      { title: "YouTube",                     body: "Po zakończeniu rundy możemy wyświetlić teledysk z YouTube (Google LLC). YouTube może zbierać dane zgodnie z własną polityką prywatności Google." },
      { title: "Prawa autorskie",             body: "Fragmenty tekstów wykorzystywane są na podstawie prawa cytatu (art. 29 ustawy o prawie autorskim). Wszelkie prawa do muzyki należą do ich twórców i wydawców." },
      { title: "Kontakt",                     body: "W razie pytań lub zgłoszenia naruszenia praw — skontaktuj się z nami przez formularz kontaktowy na stronie." },
    ].map((s) => (
      <div key={s.title}>
        <p className="text-white font-black uppercase tracking-widest text-[10px] mb-1.5">{s.title}</p>
        <p className="text-zinc-400">{s.body}</p>
      </div>
    ))}
    <p className="text-zinc-700 text-[10px] border-t border-white/5 pt-3">Ostatnia aktualizacja: 18 kwietnia 2026</p>
  </div>
);

const CookiesContent = () => (
  <div className="flex flex-col gap-5 text-zinc-300 text-sm leading-relaxed">
    <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-4">
      <p className="text-green-400 font-black uppercase tracking-widest text-[10px] mb-1">Brak cookies śledzących</p>
      <p className="text-zinc-300 text-xs">JakiTowers nie używa plików cookie do śledzenia, profilowania ani celów reklamowych. Brak Google Analytics, Google AdSense i podobnych.</p>
    </div>
    <div>
      <p className="text-white font-black uppercase tracking-widest text-[10px] mb-3">Co przechowujemy (localStorage)</p>
      <div className="flex flex-col gap-2">
        {[
          ["Historia wyników", "Żebyś widział swoje poprzednie wyniki w kalendarzu", "jakitowers_*_results"],
          ["Stan gry",         "Żeby móc wrócić do przerwanej gry",                  "jakitowers_day_*"],
          ["Głośność",         "Żeby pamiętać ustawioną głośność",                   "jakitowers_volume"],
          ["Kolor akcentu",    "Żeby zapamiętać wybrany kolor interfejsu",           "jakitowers_accent_color"],
          ["Seen states",      "Żeby nie pokazywać zasad za każdym razem",           "jakitowers_rules_seen_*"],
        ].map(([name, desc, key]) => (
          <div key={name} className="flex gap-3 items-start bg-white/3 border border-white/5 rounded-xl p-3">
            <span className="text-accent mt-0.5 shrink-0 text-xs">—</span>
            <div>
              <p className="text-white font-bold text-xs">{name}</p>
              <p className="text-zinc-500 text-[11px] mt-0.5">{desc}</p>
              <p className="text-zinc-700 text-[10px] mt-1 font-mono">{key}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <p className="text-white font-black uppercase tracking-widest text-[10px] mb-2">Jak usunąć swoje dane</p>
      <p className="text-zinc-400">Możesz wyczyścić wszystkie dane w ustawieniach przeglądarki lub przez DevTools: <span className="text-white font-mono text-[11px]">F12 → Application → Local Storage</span>.</p>
    </div>
    <p className="text-zinc-700 text-[10px] border-t border-white/5 pt-3">Ostatnia aktualizacja: kwiecień 2026</p>
  </div>
);

// ─── Komponent Aktualności ────────────────────────────────────────────────────
const PatchContent = () => {
  const [selectedId, setSelectedId] = useState(PATCH_ENTRIES[0].id);
  const selectedPatch = PATCH_ENTRIES.find(p => p.id === selectedId) || PATCH_ENTRIES[0];

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* Lewa kolumna - lista wpisów */}
      <div className="md:w-1/3 flex flex-col gap-1.5 border-r border-white/5 pr-4">
        {PATCH_ENTRIES.map((entry) => (
          <button
            key={entry.id}
            onClick={() => setSelectedId(entry.id)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
              selectedId === entry.id
                ? "bg-accent/10 border border-accent/30"
                : "hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              selectedId === entry.id ? "bg-accent/20 text-accent" : "bg-white/5 text-zinc-500"
            }`}>
              {entry.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-sm leading-tight">{entry.version}</p>
              <p className="text-zinc-500 text-[10px]">{entry.date}</p>
            </div>
            <ChevronRight size={14} className={`shrink-0 transition-all ${
              selectedId === entry.id ? "text-accent opacity-100" : "text-zinc-700 opacity-0 group-hover:opacity-100"
            }`} />
          </button>
        ))}
      </div>

      {/* Prawa kolumna - treść wybranego wpisu */}
      <div className="md:w-2/3 flex flex-col gap-4">
        <div>
          <h3 className="text-white font-[1000] italic uppercase text-lg tracking-tight">
            {selectedPatch.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-accent text-[9px] font-black tracking-widest">{selectedPatch.version}</span>
            <span className="text-zinc-700 text-[9px]">•</span>
            <span className="text-zinc-500 text-[9px]">{selectedPatch.date}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {selectedPatch.changes.map((change, idx) => {
            const style = TYPE_STYLES[change.type];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-3 rounded-xl bg-white/3 border border-white/5"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                    {style.label}
                  </span>
                </div>
                <p className="text-white font-bold text-sm mb-1">{change.title}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{change.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Metadane modali ──────────────────────────────────────────────────────────
const INFO_META: Record<string, { title: string; icon?: React.ReactNode; body: React.ReactNode; wide?: boolean }> = {
  about:   { title: "O PROJEKCIE",            icon: <Info size={14} />,     body: <AboutContent /> },
  terms:   { title: "REGULAMIN",              icon: <ScrollText size={14} />, body: <TermsContent /> },
  privacy: { title: "POLITYKA PRYWATNOŚCI",   icon: <Shield size={14} />,   body: <PrivacyContent /> },
  cookies: { title: "COOKIES & LOCALSTORAGE", icon: <Cookie size={14} />,   body: <CookiesContent /> },
  patch:   { title: "AKTUALNOŚCI",            icon: <Sparkles size={14} />, body: <PatchContent />, wide: true },
};

// ─── Modal kontaktowy (wyśrodkowany) ─────────────────────────────────────────
const ContactModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<ContactStep>("topic");
  const [topic, setTopic] = useState<TopicId | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "error">("idle");

  const selectedTopic = TOPICS.find((t) => t.id === topic);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !topic) return;
    setSendStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xzdyoddd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ temat: selectedTopic?.label, nick: name.trim() || "Anonim", wiadomosc: message.trim() }),
      });
      if (res.ok) setStep("sent");
      else setSendStatus("error");
    } catch { setSendStatus("error"); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999, background: "rgba(0,0,0,0.97)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg flex flex-col rounded-[28px] border-2 border-white/8 shadow-2xl overflow-hidden"
        style={{
          background: "#0c0c0e",
          boxShadow: "0 0 60px var(--accent-glow, rgba(188,19,254,0.15))",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <MessageCircle size={14} className="text-accent" />
            <h2 className="text-base font-[1000] italic uppercase tracking-tight text-white leading-none">
              {step === "sent" ? "WYSŁANO!" : step === "form" && selectedTopic ? selectedTopic.label.toUpperCase() : "NAPISZ DO NAS"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto scrollbar-custom flex-1 px-6 py-5 max-h-[72vh]">
          <AnimatePresence mode="wait">
            {/* ── Wybór tematu ── */}
            {step === "topic" && (
              <motion.div key="topic" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.15 }} className="flex flex-col gap-2">
                <p className="text-zinc-500 text-sm mb-3">W jakiej sprawie piszesz?</p>
                {TOPICS.map((t) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setTopic(t.id); setStep("form"); }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-accent/30 transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <t.icon size={16} className="text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{t.label}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{t.desc}</p>
                    </div>
                    <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* ── Formularz ── */}
            {step === "form" && (
              <motion.form key="form" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.15 }} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => { setStep("topic"); setSendStatus("idle"); }} className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white transition-all">
                    <ChevronLeft size={14} />
                  </button>
                  {selectedTopic && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20">
                      <selectedTopic.icon size={12} className="text-accent" />
                      <span className="text-accent text-[10px] font-black uppercase tracking-widest">{selectedTopic.label}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500">
                    Nick <span className="text-zinc-700 font-normal normal-case tracking-normal">(opcjonalne)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anonim"
                    maxLength={50}
                    className="bg-zinc-900/60 border border-white/8 hover:border-white/15 focus:border-accent/50 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500">
                    Wiadomość <span className="text-accent">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      topic === "song" ? "Podaj tytuł i artystę piosenki..."
                      : topic === "bug" ? "Opisz co się dzieje i gdzie..."
                      : topic === "idea" ? "Opisz swój pomysł..."
                      : topic === "praise" ? "Napisz co Ci się podoba..."
                      : "Napisz coś..."
                    }
                    required
                    maxLength={500}
                    rows={4}
                    className="bg-zinc-900/60 border border-white/8 hover:border-white/15 focus:border-accent/50 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none transition-colors resize-none scrollbar-custom"
                  />
                  <p className="text-zinc-700 text-[10px] text-right">{message.length}/500</p>
                </div>

                {sendStatus === "error" && (
                  <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3">
                    Coś poszło nie tak. Spróbuj ponownie.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={!message.trim() || sendStatus === "sending"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-[1000] text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-accent text-white shadow-[0_0_20px_var(--accent-glow)]"
                >
                  {sendStatus === "sending"
                    ? <><Loader2 size={15} className="animate-spin" /> WYSYŁANIE...</>
                    : <><Send size={14} /> WYŚLIJ</>}
                </motion.button>
              </motion.form>
            )}

            {/* ── Sukces ── */}
            {step === "sent" && (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-5 py-8 text-center">
                <div className="w-20 h-20 rounded-[24px] bg-green-500/15 border-2 border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={36} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white font-[1000] text-2xl uppercase italic tracking-tight">Wysłano!</p>
                  <p className="text-zinc-500 text-sm mt-1">Dziękujemy za wiadomość. Odezwiemy się wkrótce.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-8 py-3 rounded-2xl bg-accent text-white font-[1000] text-sm uppercase tracking-widest shadow-[0_0_20px_var(--accent-glow)]"
                >
                  Zamknij
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Globalny hook kontaktu ────────────────────────────────────────────────────
let globalOpenContact: (() => void) | null = null;
export const openContactModal = () => { if (globalOpenContact) globalOpenContact(); };

export const useContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ContactModalComponent = () => (
    <AnimatePresence>{isOpen && <ContactModal onClose={() => setIsOpen(false)} />}</AnimatePresence>
  );
  return { openContact: () => setIsOpen(true), ContactModalComponent };
};

// ─── Główny komponent ─────────────────────────────────────────────────────────
export const FooterModals = () => {
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasShownPatch, setHasShownPatch] = useState(false);

  useEffect(() => {
    setMounted(true);
    globalOpenContact = () => setContactOpen(true);
    
    // Sprawdź czy użytkownik widział już aktualności
    const patchSeen = localStorage.getItem(LS_PATCH_SEEN_KEY);
    if (!patchSeen && !hasShownPatch) {
      // Jeśli nie widział, pokaż modal z aktualnościami
      setInfoModal("patch");
      setHasShownPatch(true);
      // Zapisz w localStorage że użytkownik już widział
      localStorage.setItem(LS_PATCH_SEEN_KEY, "true");
    }
    
    return () => { globalOpenContact = null; };
  }, [hasShownPatch]);

  const meta = infoModal ? INFO_META[infoModal] : null;

  return (
    <>
      {/* Footer linki */}
      <div className="flex items-center justify-center flex-wrap gap-x-1 gap-y-1">
        {FOOTER_LINKS.map((link) => (
          <button
            key={link.key}
            onClick={() => setInfoModal(link.key)}
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors duration-150 px-2.5 py-1.5 rounded-lg hover:bg-white/5"
          >
            <span className="opacity-50">{link.icon}</span>
            {link.label}
          </button>
        ))}
      </div>

      {/* Portale */}
      {mounted && createPortal(
        <AnimatePresence>
          {infoModal && meta && (
            <ModalShell
              key={infoModal}
              onClose={() => setInfoModal(null)}
              title={meta.title}
              icon={meta.icon}
              wide={meta.wide}
              footer={
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInfoModal(null)}
                  className="px-5 py-2 rounded-xl bg-accent text-white font-[1000] text-xs uppercase tracking-widest shadow-[0_0_15px_var(--accent-glow)]"
                >
                  GRAJ TERAZ!
                </motion.button>
              }
            >
              {meta.body}
            </ModalShell>
          )}
          {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
};