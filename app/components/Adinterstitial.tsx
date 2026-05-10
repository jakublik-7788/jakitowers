// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';
// import AdSense from './AdSense';

// interface AdInterstitialProps {
//   onClose: () => void;
// }

// const COUNTDOWN = 5;

// export default function AdInterstitial({ onClose }: AdInterstitialProps) {
//   const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN);
//   const [canClose, setCanClose] = useState(false);
//   const interval = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     interval.current = setInterval(() => {
//       setSecondsLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(interval.current!);
//           setCanClose(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => {
//       if (interval.current) clearInterval(interval.current);
//     };
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.2 }}
//       className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/97"
//     >
//       {/* Przycisk zamknięcia */}
//       <div className="absolute top-4 right-4">
//         {canClose ? (
//           <motion.button
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             onClick={onClose}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
//           >
//             <X size={16} />
//             Zamknij
//           </motion.button>
//         ) : (
//           <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-500 text-sm font-bold uppercase tracking-wider">
//             <span className="font-mono text-accent">{secondsLeft}s</span>
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
//         Reklama
//       </p>

//       {/* Reklama */}
//       <div className="w-full max-w-lg px-4">
//         <AdSense
//           adSlot="4879148545"
//           adFormat="rectangle"
//           style={{ minHeight: '250px' }}
//         />
//       </div>

//       {/* Pasek postępu */}
//       <div className="mt-6 w-full max-w-lg px-4">
//         <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
//           <motion.div
//             className="h-full bg-accent rounded-full"
//             initial={{ width: '100%' }}
//             animate={{ width: '0%' }}
//             transition={{ duration: COUNTDOWN, ease: 'linear' }}
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// }