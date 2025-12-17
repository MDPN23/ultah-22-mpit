import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Cake, Sparkles, Flame, Music, } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import mpitKecil from './mpitkecil.jpeg';
import heavyBirthyay from './heavyBirthyay.mp3';

type Stage = 'opening' | 'blowing' | 'wish' | 'letter';

function App() {
  const [stage, setStage] = useState<Stage>('opening');
  const [blowProgress, setBlowProgress] = useState(0);
  const [celebrationHappened, setCelebrationHappened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useState(new Audio(heavyBirthyay))[0];

  useEffect(() => {
    audioRef.loop = true;
    const playAudio = async () => {
      try {
        await audioRef.play();
        setIsMusicPlaying(true);
      } catch (err) {
        console.log('Autoplay blocked:', err);
        setIsMusicPlaying(false);
      }
    };
    playAudio();
    return () => {
      audioRef.pause();
    };
  }, [audioRef]);

  // const toggleMusic = () => {
  //   if (isMusicPlaying) {
  //     audioRef.pause();
  //     setIsMusicPlaying(false);
  //   } else {
  //     audioRef.play();
  //     setIsMusicPlaying(true);
  //   }
  // };

  const handleBlowCandle = () => {
    if (blowProgress < 100) {
      const increment = blowProgress < 70 ? 10 : 1;
      const newProgress = Math.min(blowProgress + increment, 100);
      setBlowProgress(newProgress);

      if (newProgress >= 100 && !celebrationHappened) {
        setCelebrationHappened(true);
        triggerConfetti();
        setTimeout(() => setStage('letter'), 2000);
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
                  <div className="w-48 h-48 rounded-full border-4 border-rose-gold shadow-2xl mx-auto overflow-hidden">
                    <img
                      src={mpitKecil}
                      alt="Fitri Awaliyah Muslim"
                      className="w-full h-full object-cover"
                    />
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
                className="font-serif text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-gold via-warm-pink to-rose-gold mb-4"
              >
                Happy 22nd Birthday, Sayangnya Nares
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-8"
              >
                <p className="font-serif text-xl md:text-4xl text-warm-pink italic mb-2">
                  Ciee Yang Ulang Tahun Hari ini
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
                  <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 flex">
                    <motion.div
                      animate={{ scaleY: [1, 0.9, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="origin-bottom"
                    >
                      <Flame size={24} className="text-yellow-400 fill-yellow-400" />
                    </motion.div>
                    <motion.div
                      animate={{ scaleY: [1, 0.9, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="origin-bottom"
                    >
                      <Flame size={24} className="text-yellow-400 fill-yellow-400" />
                    </motion.div>
                    <motion.div
                      animate={{ scaleY: [1, 0.9, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="origin-bottom"
                    >
                      <Flame size={24} className="text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  </div>
                </div>
                <p className="text-warm-pink text-m font-serif">Ini Kuenya Online Dulu ya, nanti aslinya nyusul</p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (!isMusicPlaying) {
                    audioRef.play();
                    setIsMusicPlaying(true);
                  }
                  setStage('blowing');
                }}
                className="bg-gradient-to-r from-rose-gold to-warm-pink text-white px-10 py-4 rounded-full font-sans text-lg font-semibold shadow-2xl hover:shadow-rose-gold/50 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                {!isMusicPlaying ? <Music className="w-5 h-5" /> : null}
                Tap Tap Tiup Lilin
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
                        className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 flex"
                      >
                        <motion.div
                          animate={{
                            scaleY: [1, 0.9, 1],
                            opacity: 1 - blowProgress / 100,
                            x: [-2, 2, -2],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="origin-bottom"
                        >
                          <Flame size={24} className="text-yellow-400 fill-yellow-400" />
                        </motion.div>
                        <motion.div
                          animate={{
                            scaleY: [1, 0.9, 1],
                            opacity: 1 - blowProgress / 100,
                            x: [2, -2, 2],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="origin-bottom"
                        >
                          <Flame size={24} className="text-yellow-400 fill-yellow-400" />
                        </motion.div>
                        <motion.div
                          animate={{
                            scaleY: [1, 0.9, 1],
                            opacity: 1 - blowProgress / 100,
                            x: [-2, 2, -2],
                          }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          className="origin-bottom"
                        >
                          <Flame size={24} className="text-yellow-400 fill-yellow-400" />
                        </motion.div>
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
                    className="text-warm-pink text-xl font-serif mb-8"
                  >
                    {blowProgress === 0 && 'Tiup yang kuat tap tap ya 🥰'}
                    {blowProgress > 0 && blowProgress <= 10 && 'Ayo semangat sayang! 💕'}
                    {blowProgress > 10 && blowProgress <= 20 && 'Tiup Terus Biar Ga Dapet Lemburan Pa Hafif'}
                    {blowProgress > 20 && blowProgress <= 30 && 'Tiup Biar Dapet Kuenya 🎂'}
                    {blowProgress > 30 && blowProgress <= 40 && 'Lagi... Lagi... 🥰'}
                    {blowProgress > 40 && blowProgress <= 50 && 'Tiup Lagi Biar Dapet Motor nih! ❤️'}
                    {blowProgress > 50 && blowProgress <= 60 && 'Makin kuat tiupnya! 💨'}
                    {blowProgress > 60 && blowProgress <= 70 && 'Tiup Lagi Biar Dapet iPhone 17 Pro Max! 📱'}
                    {blowProgress === 71 && 'Tiup biar rezeki lancar, bisa healing terus! ✈️'}
                    {blowProgress === 72 && 'Manifesting saldo ATM tumpah tumpah! 💸'}
                    {blowProgress === 73 && 'Bebas overthinking tiap malem! 🧠'}
                    {blowProgress === 74 && 'Tiup biar skincare mahal dibayarin aku! ✨'}
                    {blowProgress === 75 && 'Tiup Biar Naik Gaji 📈'}
                    {blowProgress === 76 && 'Bisa checkout keranjang oren tanpa mikir harga! 🛒'}
                    {blowProgress === 77 && 'Dapet tiket konser BlackPink paling depan! 🎫'}
                    {blowProgress === 78 && 'Tiup biar dapet Princess Treatment tiap hari 👑'}
                    {blowProgress === 79 && 'Circle pertemanan yang no drama club! 👯‍♀️'}
                    {blowProgress === 80 && 'Sehat terus, kalo diet yang penting sehat! 🍔'}
                    {blowProgress === 81 && 'Karir Slay, Gaji Slay, Mental Slay! 💅'}
                    {blowProgress === 82 && 'Jauh dari atasan toxic & panggilan dadakan! 🚫'}
                    {blowProgress === 83 && 'Tiup demi Work-Life Balance yang HQQ! ⚖️'}
                    {blowProgress === 84 && 'Good Vibes & Good Rekening Only! 🌈'}
                    {blowProgress === 85 && 'Outfit lucu tiap hari tanpa bingung mau pake apa! 👗'}
                    {blowProgress === 86 && 'Jodohnya aku terus selamanya (ini wajib)! 💑'}
                    {blowProgress === 87 && 'Punya rumah estetik ala Pinterest! 🏠'}
                    {blowProgress === 88 && 'Tiup biar bisa WFA dari Bali! 🏖️'}
                    {blowProgress === 89 && 'Koleksi Labubu lengkap selemari! 🧸'}
                    {blowProgress === 90 && 'Internet kenceng, rezeki makin kenceng! 🚀'}
                    {blowProgress === 91 && 'Dikit lagi menuju Financial Freedom usia muda! 💰'}
                    {blowProgress === 92 && 'Tiup sekuat tenaga demi masa depan cerah! ☀️'}
                    {blowProgress === 93 && 'Ayo sayang, demi wishlist terkabul semua! 📝'}
                    {blowProgress === 94 && 'Energi Main Character keluarin semua! ✨'}
                    {blowProgress === 95 && 'Tiup biar ga kena macetnya jalanan kalo dah punya motor!'}
                    {blowProgress === 96 && '4% lagi menuju saldo atm 100 Juta! 😍'}
                    {blowProgress === 97 && '3% lagi! Siap-siap Make a Wish! 🎂'}
                    {blowProgress === 98 && '2% lagi! Tarik napas panjang cantik! 😤'}
                    {blowProgress === 99 && '1% LAGI! Bedoa biar cepet dikabulin nikahnya! 💥'}
                    {blowProgress === 100 && 'Udah Beres BB apa masih mau tap tap lagi? 🎉'}
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
                    Happy Birthday BB!🎉
                  </p>
                </motion.div>
              )}
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

                <h2 className="font-serif text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-rose-gold to-warm-pink mb-8">
                  Buat Yang Lagi Ulangtahun nih
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-left mb-8"
                >
                  <p className="text-warm-pink font-sans text-lg md:text-xl leading-relaxed mb-4">
                    Happy Birthday, babyyyy. Welcome to your 22 era! ✨ Di umur segini I hope the best for your career,
                    makin wise, and obviously... please stay with me terus ya....
                  </p>
                  <p className="text-warm-pink font-sans text-lg md:text-xl leading-relaxed mb-4">
                    Thank you for being the best partner ever. Manifesting semua dreams and goals kamu tahun ini bisa achieved.
                    I promise I'll always be your support system. Let's keep this going strong, okay?
                    And please, stop asking aku sayang apa enggak, because honestly... you are my everything. 💖
                  </p>
                  <p className="text-warm-pink font-sans text-lg md:text-xl leading-relaxed mb-4">
                    Aghnjayy, Romantis ga :P
                  </p>
                  <p className="text-rose-gold font-serif text-2xl italic text-center mt-6">
                    Wuvv UUUU! ❤️
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
