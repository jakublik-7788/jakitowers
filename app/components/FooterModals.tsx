"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Shield, Cookie, BookOpen,
  Send, CheckCircle2, Loader2,
  Music, Bug, Lightbulb, HelpCircle, Heart, MessageCircle,
} from "lucide-react";
import { createPortal } from "react-dom";

// ─── Typy ─────────────────────────────────────────────────────────────────────

type InfoModalType = "rules" | "privacy" | "cookies" | null;
type ContactStep = "topic" | "form" | "sent";

const TOPICS = [
  { id: "song",   label: "Brakująca piosenka", icon: Music,       desc: "Chcę zgłosić piosenkę do dodania" },
  { id: "bug",    label: "Błąd w grze",         icon: Bug,         desc: "Coś nie działa jak powinno" },
  { id: "idea",   label: "Pomysł",               icon: Lightbulb,   desc: "Mam pomysł na nową funkcję" },
  { id: "praise", label: "Pochwała",             icon: Heart,       desc: "Chcę napisać coś miłego" },
  { id: "other",  label: "Inne",                 icon: HelpCircle,  desc: "Coś innego" },
] as const;

type TopicId = typeof TOPICS[number]["id"];

const INFO_LINKS: { key: InfoModalType & string; label: string; icon: React.ReactNode }[] = [
  { key: "rules",   label: "Zasady gry", icon: <BookOpen size={11} /> },
  { key: "privacy", label: "Prywatność", icon: <Shield size={11} /> },
  { key: "cookies", label: "Cookies",    icon: <Cookie size={11} /> },
];

// ─── Treści modali info ───────────────────────────────────────────────────────

const RulesContent = () => (
  <div className="flex flex-col gap-6 text-zinc-300 text-sm leading-relaxed">
    <p className="text-zinc-400">Jakitowers to polska gra muzyczna. Zgadnij piosenkę na podstawie fragmentu tekstu — im mniej prób, tym lepiej.</p>
    {[
      { n: "1", title: "Odtwórz fragment", desc: "Naciśnij play — usłyszysz fragment i zobaczysz pierwszą linijkę tekstu." },
      { n: "2", title: "Wpisz tytuł", desc: "Zacznij pisać tytuł lub artystę. Wybierz piosenkę z podpowiedzi i zatwierdź. Możesz też pominąć — odkryjesz wtedy kolejną linijkę." },
      { n: "3", title: "Masz 5 prób", desc: "Każda nieudana próba lub pominięcie odkrywa następny wers. Łącznie masz 5 szans." },
    ].map((s) => (
      <div key={s.n} className="flex gap-4 items-start">
        <span className="text-accent font-black text-2xl leading-none shrink-0 mt-0.5">{s.n}</span>
        <div>
          <p className="text-white font-bold uppercase tracking-widest text-xs mb-1">{s.title}</p>
          <p>{s.desc}</p>
        </div>
      </div>
    ))}
    <div className="grid grid-cols-3 gap-3 text-center text-xs">
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 mx-auto mb-2" />
        <p className="text-green-400 font-bold">ZIELONY</p>
        <p className="text-zinc-500 mt-1">Dobra odpowiedź</p>
      </div>
      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-3">
        <p className="text-yellow-400 font-black text-base leading-none mx-auto mb-1.5">~</p>
        <p className="text-yellow-400 font-bold">ŻÓŁTY</p>
        <p className="text-zinc-500 mt-1">Ten sam artysta</p>
      </div>
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 mx-auto mb-2" />
        <p className="text-red-400 font-bold">CZERWONY</p>
        <p className="text-zinc-500 mt-1">Zła odpowiedź</p>
      </div>
    </div>
    <div className="border-t border-white/5 pt-4 flex flex-col gap-1.5 text-xs text-zinc-500">
      <p><span className="text-white font-bold">TRYB DZIENNY</span> — jedna nowa piosenka każdego dnia.</p>
      <p><span className="text-white font-bold">BEZ LIMITU</span> — losowe piosenki, graj ile chcesz.</p>
    </div>
  </div>
);

const PrivacyContent = () => (
  <div className="flex flex-col gap-5 text-zinc-300 text-sm leading-relaxed">
    <p className="text-zinc-400">Jakitowers to niekomercyjny projekt hobbystyczny. Zależy nam na Twojej prywatności.</p>
    {[
      { title: "Dane osobowe", body: "Serwis nie zbiera, nie przetwarza ani nie przechowuje danych osobowych użytkowników. Nie wymagamy rejestracji, logowania ani podawania jakichkolwiek danych." },
      { title: "Dane lokalne (localStorage)", body: "Wyniki gry, historia prób i preferencje (głośność, motyw kolorystyczny) zapisywane są wyłącznie lokalnie w przeglądarce — tylko na Twoim urządzeniu, nigdy na serwerze." },
      { title: "YouTube", body: "Po zakończeniu rundy wyświetlamy teledysk z serwisu YouTube (Google LLC). YouTube może zbierać dane zgodnie z własną Polityką Prywatności Google, na którą nie mamy wpływu." },
      { title: "Prawa autorskie", body: "Fragmenty tekstów piosenek wykorzystywane są na podstawie prawa cytatu (art. 29 ustawy o prawie autorskim i prawach pokrewnych). Celem serwisu jest rozrywka edukacyjna i popularyzacja polskiej muzyki. Użyte fragmenty mają charakter ilustracyjny i nie zastępują oryginalnych utworów. Wszelkie prawa do muzyki należą do ich twórców i wydawców." },
      { title: "Kontakt", body: "W razie pytań, uwag lub zgłoszenia naruszenia praw autorskich — skontaktuj się z administratorem serwisu." },
    ].map((s) => (
      <div key={s.title}>
        <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">{s.title}</p>
        <p>{s.body}</p>
      </div>
    ))}
    <p className="text-zinc-600 text-xs border-t border-white/5 pt-4">Ostatnia aktualizacja: marzec 2026</p>
  </div>
);

const CookiesContent = () => (
  <div className="flex flex-col gap-5 text-zinc-300 text-sm leading-relaxed">
    <p className="text-zinc-400">Informacje o wykorzystaniu technologii przechowywania danych w serwisie Jakitowers.</p>
    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
      <p className="text-green-400 font-bold uppercase tracking-widest text-xs mb-1">Brak cookies śledzących</p>
      <p className="text-zinc-300 text-xs">Jakitowers nie używa plików cookie do śledzenia, profilowania ani celów reklamowych.</p>
    </div>
    <div>
      <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Co przechowujemy (localStorage)</p>
      <div className="flex flex-col gap-2">
        {[
          ["Historia wyników gry dziennej", "Żebyś widział swoje poprzednie wyniki w kalendarzu"],
          ["Preferencje głośności", "Żeby pamiętać ustawioną przez Ciebie głośność"],
          ["Motyw kolorystyczny", "Żeby zapamiętać wybrany przez Ciebie kolor akcentu"],
        ].map(([name, desc]) => (
          <div key={name} className="flex gap-3 items-start bg-white/3 rounded-xl p-3 border border-white/5">
            <span className="text-accent mt-0.5 shrink-0">—</span>
            <div>
              <p className="text-white font-bold text-xs">{name}</p>
              <p className="text-zinc-500 text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <p className="text-white font-bold uppercase tracking-widest text-xs mb-2">Jak usunąć swoje dane</p>
      <p>Możesz wyczyścić wszystkie dane w ustawieniach przeglądarki w sekcji Dane witryny lub przez DevTools: F12 → Application → Local Storage.</p>
    </div>
    <p className="text-zinc-600 text-xs border-t border-white/5 pt-4">Ostatnia aktualizacja: marzec 2026</p>
  </div>
);

const INFO_CONTENT: Record<string, { title: string; body: React.ReactNode }> = {
  rules:   { title: "ZASADY GRY",             body: <RulesContent /> },
  privacy: { title: "POLITYKA PRYWATNOŚCI",   body: <PrivacyContent /> },
  cookies: { title: "COOKIES I LOCALSTORAGE", body: <CookiesContent /> },
};

// ─── Modal kontaktowy ─────────────────────────────────────────────────────────

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
      const res = await fetch("https://formspree.io/f/xqeygjqg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          temat: selectedTopic?.label,
          nick: name.trim() || "Anonim",
          wiadomosc: message.trim(),
        }),
      });
      if (res.ok) { setStep("sent"); }
      else { setSendStatus("error"); }
    } catch {
      setSendStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ zIndex: 99999 }}
    >
      <div className="absolute inset-0 bg-black/95" />
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ type: "spring", damping: 28, stiffness: 380 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md flex flex-col rounded-[28px] border border-white/10 shadow-2xl overflow-hidden"
        style={{ background: "#0d0d0f" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            {step === "form" && (
              <button
                onClick={() => { setStep("topic"); setSendStatus("idle"); }}
                className="w-6 h-6 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <p className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: "var(--accent-main)" }}>
              {step === "topic" ? "NAPISZ DO NAS" : step === "sent" ? "WYSŁANO" : selectedTopic?.label.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X size={15} />
          </button>
        </div>

        {/* Treść */}
        <div className="px-7 py-6">
          <AnimatePresence mode="wait">

            {/* Krok 1 — wybór tematu */}
            {step === "topic" && (
              <motion.div key="topic" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="flex flex-col gap-3">
                <p className="text-zinc-400 text-sm mb-1">W jakiej sprawie piszesz?</p>
                {TOPICS.map((t) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setTopic(t.id); setStep("form"); }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-accent/30 transition-all duration-200 text-left group"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110" style={{ background: "var(--accent-main)22" }}>
                      <t.icon size={16} style={{ color: "var(--accent-main)" }} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.label}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{t.desc}</p>
                    </div>
                    <svg className="ml-auto text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Krok 2 — formularz */}
            {step === "form" && (
              <motion.form key="form" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.18 }} onSubmit={handleSubmit} className="flex flex-col gap-4">
                {selectedTopic && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 bg-white/3 w-fit">
                    <selectedTopic.icon size={13} style={{ color: "var(--accent-main)" }} />
                    <span className="text-xs text-zinc-300 font-medium">{selectedTopic.label}</span>
                  </div>
                )}
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
                    className="bg-zinc-900/60 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500">
                    Wiadomość <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      topic === "song"   ? "Podaj tytuł i artystę piosenki..." :
                      topic === "bug"    ? "Opisz co się dzieje i gdzie..." :
                      topic === "idea"   ? "Opisz swój pomysł..." :
                      topic === "praise" ? "Napisz co Ci się podoba..." :
                      "Napisz coś..."
                    }
                    required
                    maxLength={500}
                    rows={4}
                    className="bg-zinc-900/60 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-accent/50 transition-colors resize-none scrollbar-custom"
                  />
                  <p className="text-zinc-700 text-[10px] text-right">{message.length}/500</p>
                </div>
                {sendStatus === "error" && (
                  <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3">
                    Coś poszło nie tak. Spróbuj ponownie.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!message.trim() || sendStatus === "sending"}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 mt-1"
                  style={{ background: "var(--accent-main)", color: "#fff" }}
                >
                  {sendStatus === "sending" ? (
                    <><Loader2 size={16} className="animate-spin" /> WYSYŁANIE...</>
                  ) : (
                    <><Send size={15} /> WYŚLIJ</>
                  )}
                </button>
              </motion.form>
            )}

            {/* Krok 3 — potwierdzenie */}
            {step === "sent" && (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 className="text-green-400" size={32} />
                </div>
                <div>
                  <p className="text-white font-black text-lg uppercase italic tracking-tight">Wysłano!</p>
                  <p className="text-zinc-500 text-sm mt-1">Dziękujemy za wiadomość. Odezwiemy się wkrótce.</p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 text-[11px] font-black tracking-[0.2em] uppercase px-6 py-2.5 rounded-xl hover:opacity-80 transition-opacity"
                  style={{ background: "var(--accent-main)", color: "#fff" }}
                >
                  ZAMKNIJ
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Główny komponent ─────────────────────────────────────────────────────────

export const FooterModals = () => {
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const infoContent = infoModal ? INFO_CONTENT[infoModal] : null;

  return (
    <>
      {/* Linki wyśrodkowane pod paskiem */}
      <div className="flex items-center justify-center gap-1 pt-3 pb-2">
        {INFO_LINKS.map((link, i) => (
          <span key={link.key} className="flex items-center gap-1">
            {i > 0 && <span className="text-zinc-800 text-xs select-none">·</span>}
            <button
              onClick={() => setInfoModal(link.key as InfoModalType)}
              className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors duration-200 px-1 py-0.5"
            >
              <span className="opacity-60">{link.icon}</span>
              {link.label}
            </button>
          </span>
        ))}
      </div>

      {/* Przycisk kontaktu — fixed lewy dolny róg */}
      <div className="fixed bottom-2 left-4 z-[200] pointer-events-auto">
        <button
          onClick={() => setContactOpen(true)}
          className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
        >
          <MessageCircle size={11} className="opacity-60" />
          Kontakt
        </button>
      </div>

      {/* Portale */}
      {mounted && createPortal(
        <AnimatePresence>
          {/* Modal info */}
          {infoModal && infoContent && (
            <motion.div
              key={infoModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setInfoModal(null)}
              className="fixed inset-0 flex items-end sm:items-center justify-center p-4 sm:p-6"
              style={{ zIndex: 99999 }}
            >
              <div className="absolute inset-0 bg-black/95" />
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 32, scale: 0.97 }}
                transition={{ type: "spring", damping: 28, stiffness: 380 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-[28px] border border-white/10 shadow-2xl overflow-hidden"
                style={{ background: "#0d0d0f" }}
              >
                <div className="flex items-center justify-between px-7 py-5 border-b border-white/5 shrink-0">
                  <p className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: "var(--accent-main)" }}>
                    {infoContent.title}
                  </p>
                  <button onClick={() => setInfoModal(null)} className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-200">
                    <X size={15} />
                  </button>
                </div>
                <div className="overflow-y-auto scrollbar-custom px-7 py-6 flex-1">
                  {infoContent.body}
                </div>
                <div className="px-7 py-4 border-t border-white/5 shrink-0 flex items-center justify-between">
                  <p className="text-[10px] text-zinc-600 tracking-wider">jakitowers.pl</p>
                  <button onClick={() => setInfoModal(null)} className="text-[11px] font-black tracking-[0.2em] uppercase px-5 py-2 rounded-xl hover:opacity-80 transition-opacity" style={{ background: "var(--accent-main)", color: "#fff" }}>
                    ZAMKNIJ
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Modal kontaktowy */}
          {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};