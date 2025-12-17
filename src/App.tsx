import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Cake, Sparkles } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';

type Stage = 'opening' | 'blowing' | 'wish' | 'letter';

function App() {
  const [stage, setStage] = useState<Stage>('opening');
  const [blowProgress, setBlowProgress] = useState(0);
  const [wish, setWish] = useState('');
  const [submittedWish, setSubmittedWish] = useState('');
  const [celebrationHappened, setCelebrationHappened] = useState(false);

  const handleBlowCandle = () => {
    if (blowProgress < 100) {
      const newProgress = Math.min(blowProgress + 12, 100);
      setBlowProgress(newProgress);

      if (newProgress >= 100 && !celebrationHappened) {
        setCelebrationHappened(true);
        triggerConfetti();
        setTimeout(() => setStage('wish'), 2000);
      }
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#B76E79', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#B76E79', '#FFB6C1', '#FF69B4', '#FF1493', '#C71585'],
      });
    }, 250);
  };

  const handleSubmitWish = () => {
    if (wish.trim()) {
      setSubmittedWish(wish);
      setStage('letter');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {stage === 'opening' && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1 }}
              className="text-center max-w-2xl w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="mb-8 inline-block"
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-rose-gold to-warm-pink mx-auto overflow-hidden border-4 border-rose-gold shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center">
                      <Heart size={80} className="text-white fill-white opacity-30" />
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(183, 110, 121, 0.5)',
                        '0 0 60px rgba(183, 110, 121, 0.8)',
                        '0 0 20px rgba(183, 110, 121, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-serif text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-gold via-warm-pink to-rose-gold mb-4"
              >
                Happy 22nd Birthday, Sayang
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-8"
              >
                <p className="font-serif text-3xl md:text-4xl text-warm-pink italic mb-2">
                  Fitri Awaliyah Muslim
                </p>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      size={16}
                      className="text-rose-gold fill-rose-gold animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mb-12"
              >
                <div className="relative inline-block">
                  <Cake size={100} className="text-warm-pink mx-auto mb-4" />
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                    <motion.div
                      animate={{ scaleY: [1, 0.9, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1 h-8 bg-gradient-to-t from-yellow-500 to-orange-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scaleY: [1, 0.9, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1 h-8 bg-gradient-to-t from-yellow-500 to-orange-400 rounded-full"
                    />
                  </div>
                </div>
                <p className="text-warm-pink text-xl font-sans">22</p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('blowing')}
                className="bg-gradient-to-r from-rose-gold to-warm-pink text-white px-10 py-4 rounded-full font-sans text-lg font-semibold shadow-2xl hover:shadow-rose-gold/50 transition-all duration-300"
              >
                Bantu aku tiup lilinnya ya...
              </motion.button>
            </motion.div>
          )}

          {stage === 'blowing' && (
            <motion.div
              key="blowing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl w-full"
            >
              <motion.div
                animate={{
                  scale: blowProgress >= 100 ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <Cake size={120} className="text-warm-pink mx-auto mb-4" />
                  <AnimatePresence>
                    {blowProgress < 100 && (
                      <motion.div
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2"
                      >
                        <motion.div
                          animate={{
                            scaleY: [1, 0.9, 1],
                            opacity: 1 - blowProgress / 100,
                            x: [-2, 2, -2],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-2 h-10 bg-gradient-to-t from-yellow-500 to-orange-400 rounded-full"
                        />
                        <motion.div
                          animate={{
                            scaleY: [1, 0.9, 1],
                            opacity: 1 - blowProgress / 100,
                            x: [2, -2, 2],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-10 bg-gradient-to-t from-yellow-500 to-orange-400 rounded-full"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {blowProgress >= 100 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2"
                      >
                        <Sparkles size={60} className="text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {blowProgress < 100 && (
                <>
                  <motion.p
                    key={blowProgress}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-warm-pink text-2xl font-sans mb-8"
                  >
                    {blowProgress === 0 && 'Tiup lagi yang kuat... 🥰'}
                    {blowProgress > 0 && blowProgress < 50 && 'Ayo sayang, lagi... 💕'}
                    {blowProgress >= 50 && blowProgress < 100 && 'Hampir, hampir... ❤️'}
                  </motion.p>

                  <div className="w-full max-w-md mx-auto mb-8">
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-rose-gold to-warm-pink"
                        initial={{ width: 0 }}
                        animate={{ width: `${blowProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBlowCandle}
                    className="relative bg-gradient-to-r from-rose-gold to-warm-pink text-white px-12 py-5 rounded-full font-sans text-xl font-semibold shadow-2xl hover:shadow-rose-gold/50 transition-all duration-300"
                  >
                    <motion.div
                      key={`blow-${blowProgress}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: 0, y: 0, opacity: 0 }}
                          animate={{
                            x: Math.cos((i * Math.PI * 2) / 5) * 100,
                            y: Math.sin((i * Math.PI * 2) / 5) * 100,
                            opacity: [0, 1, 0],
                          }}
                          transition={{ duration: 0.8 }}
                        >
                          <Heart size={20} className="text-rose-gold fill-rose-gold" />
                        </motion.div>
                      ))}
                    </motion.div>
                    Tiup! 💨
                  </motion.button>
                </>
              )}

              {blowProgress >= 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-warm-pink text-3xl font-serif mb-4">
                    Yay! Lilinnya padam! 🎉
                  </p>
                  <p className="text-rose-gold text-xl font-sans">
                    Sekarang waktunya bikin harapan...
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {stage === 'wish' && (
            <motion.div
              key="wish"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <Sparkles size={60} className="text-yellow-400 fill-yellow-400 mx-auto mb-6" />
                <h2 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-gold to-warm-pink mb-4">
                  Sekarang, sebutkan satu harapanmu di usia 22 ini...
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Tuliskan harapanmu di sini..."
                  className="w-full h-40 px-6 py-4 bg-gray-900/50 border-2 border-rose-gold/30 rounded-2xl text-warm-pink placeholder-rose-gold/40 font-sans text-lg focus:outline-none focus:border-rose-gold transition-all duration-300 resize-none"
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitWish}
                disabled={!wish.trim()}
                className="bg-gradient-to-r from-rose-gold to-warm-pink text-white px-10 py-4 rounded-full font-sans text-lg font-semibold shadow-2xl hover:shadow-rose-gold/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aamiin. Kirim Harapan ✨
              </motion.button>
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-gray-900/80 to-red-950/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl border-2 border-rose-gold/30 shadow-2xl"
              >
                <Heart size={60} className="text-rose-gold fill-rose-gold mx-auto mb-6" />

                <h2 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-gold to-warm-pink mb-8">
                  Untuk Kamu...
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-left mb-8"
                >
                  <p className="text-warm-pink font-sans text-lg md:text-xl leading-relaxed mb-4">
                    Selamat ulang tahun, cantik. Semoga di angka 22 ini kamu makin bahagia,
                    makin dewasa, dan terus sama aku ya. Aku sayang banget sama kamu.
                  </p>
                  <p className="text-warm-pink font-sans text-lg md:text-xl leading-relaxed mb-4">
                    Terima kasih sudah jadi yang terbaik buat aku. Semoga semua harapan dan
                    mimpi kamu di tahun ini bisa terwujud. Aku akan selalu ada buat kamu.
                  </p>
                  <p className="text-rose-gold font-serif text-2xl italic text-center mt-6">
                    Love you! ❤️
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gray-900/50 p-6 rounded-2xl border border-rose-gold/20"
                >
                  <p className="text-rose-gold font-sans text-sm mb-3 italic">
                    Harapanmu sudah tercatat di hatiku:
                  </p>
                  <p className="text-warm-pink font-sans text-base leading-relaxed">
                    "{submittedWish}"
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 flex justify-center gap-2"
                >
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <Heart size={20} className="text-rose-gold fill-rose-gold" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
