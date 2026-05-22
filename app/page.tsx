"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const loginRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Efek ngerem mulus
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );

    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 75%", 
          }
        }
      );
    }

    if (galleryRef.current) {
      const images = (galleryRef.current as HTMLElement).children;
      gsap.fromTo(
        images,
        { opacity: 0, y: 200, scale: 0.7, rotate: 5 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotate: 0,
          duration: 1.2, 
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
          }
        }
      );
    }

    if (loginRef.current) {
      gsap.fromTo(
        loginRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: loginRef.current,
            start: "top 90%",
          }
        }
      );
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(` Berhasil Hit API! Token: ${data.token.substring(0, 20)}...`);
      } else {
        setMessage(" Gagal: " + (data.message || "Username atau Password salah"));
      }
    } catch (error: any) {
      setMessage(` Error Asli: ${error.name} | ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-zinc-950 text-white overflow-hidden font-space antialiased">
      
      {/* --- LAYER 0: VISUAL NOISE OVERLAY (FITUR RAHASIA AGENCY) --- */}
      {/* Efek bintik-bintik halus biar web gak keliatan datar */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.015]">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0.2"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </div>

      {/* --- HEADER MINIMALIS DENGAN LOGO --- */}
      <header className="fixed top-0 left-0 w-full p-6 md:px-12 z-50 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          {/* Logo Cretivox yang warnanya di-invert otomatis jadi putih */}
          <Image 
            src="/Logo Cretivox - Black.png" 
            alt="Cretivox Logo" 
            width={140} 
            height={40} 
            className="invert brightness-0 object-contain" 
          />
        </div>
        <div className="text-xs md:text-sm tracking-widest uppercase text-zinc-500 font-mono">
          Endurance Test
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/60 via-zinc-950 to-zinc-950 -z-10"></div>
        
        <h1 className="text-[15vw] md:text-[12vw] font-bebas tracking-tighter text-center text-white leading-none drop-shadow-2xl">
          Fariz Hakim
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-zinc-300 text-center max-w-2xl font-light">
          "Membangun logika sistem di balik layar, merancang antarmuka yang hidup di depan layar."
        </p>
        <div className="absolute bottom-12 animate-bounce text-zinc-600 text-sm tracking-widest uppercase font-medium">
          Smooth Scroll ↓
        </div>
      </section>

    {/* --- ABOUT ME SECTION --- */}
      <section className="min-h-screen flex items-center justify-center p-8 bg-[#101014] relative overflow-hidden border-t border-white/[0.03]">
        <div ref={aboutRef} className="max-w-5xl w-full flex flex-col md:flex-row gap-16 items-center z-10 relative">
          
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <h2 className="text-6xl md:text-8xl font-bebas tracking-tight leading-none text-white mb-2">
              BEYOND <br /> THE CODE
            </h2>
            <div className="w-24 h-1.5 bg-rose-900 rounded-full mt-6 shadow-[0_0_20px_rgba(153,27,27,0.4)]"></div>
          </div>

          {/* Teks Deskripsi Kanan (Versi Personal Identity + Modern Workflow) */}
          <div className="w-full md:w-2/3 text-zinc-400 text-xl leading-relaxed flex flex-col gap-8 font-light">
            <p>
              Sebagai mahasiswa Teknik Informatika di STT Wastukancana, gue terbiasa melihat teknologi sebagai sebuah ekosistem. Buat gue, <i>development</i> itu bukan sekadar nulis baris kode sampai jalan, tapi tentang merancang logika sistem yang efisien dari dasar.
            </p>
            <p>
              Gue juga realistis. Di era modern, nulis kode 100% mandiri dari nol udah bukan lagi tolok ukur satu-satunya. Gue melihat AI sebagai <i>co-pilot</i> yang mengakselerasi proses kerja. Pendekatan ini ngasih gue ruang lebih buat fokus ke pemecahan masalah dan arsitektur utama, ketimbang cuma habis waktu menghafal <i>syntax</i>.
            </p>
            <p className="text-white font-normal border-l-4 border-zinc-700 pl-6 text-2xl italic">
              "Mau pakai <i>tools</i> secanggih apa pun, fondasi teknis dan <i>taste</i> dari pembuatnya yang jadi penentu akhir. Di sini, gue mau ngebuktiin kalau gue bisa ngeracik itu semua jadi produk yang hidup dan punya karakter."
            </p>
          </div>
          
        </div>
      </section>

      {/* --- PHOTO GALLERY SECTION --- */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-900 border-t border-zinc-800">
        <h2 className="text-6xl md:text-8xl font-bebas mb-20 tracking-tight text-center text-zinc-700 cursor-default">
          The Fierce Side
        </h2>
        
        <div ref={galleryRef} className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center perspective-1000 z-10 relative">
          
          {/* Foto Kiri */}
          <div className="group relative w-72 h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out hover:scale-105 hover:-rotate-2 hover:-translate-y-6 hover:z-30 cursor-pointer hover:shadow-[0_20px_80px_rgba(255,255,255,0.1)]">
            <Image src="/kiri.jpeg" alt="Sisi Kiri" fill className="object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
          
          {/* Foto Depan (Utama) */}
          <div className="group relative w-72 h-[500px] md:w-96 md:h-[600px] rounded-2xl overflow-hidden shadow-3xl z-20 border-4 border-zinc-800 hover:border-white transition-all duration-700 ease-out hover:scale-105 cursor-pointer hover:shadow-[0_20px_100px_rgba(255,255,255,0.2)]">
            <Image src="/depan.jpeg" alt="Sisi Depan" fill className="object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
          
          {/* Foto Kanan */}
          <div className="group relative w-72 h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out hover:scale-105 hover:rotate-2 hover:-translate-y-6 hover:z-30 cursor-pointer hover:shadow-[0_20px_80px_rgba(255,255,255,0.1)]">
            <Image src="/kanan.jpeg" alt="Sisi Kanan" fill className="object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent group-hover:opacity-0 transition-opacity duration-700"></div>
          </div>
          
        </div>
      </section>

      {/* --- LOGIN API SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-8 border-t border-zinc-800 overflow-hidden bg-zinc-950">
        
        {/* Background Grid Tekstur */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:35px_35px] -z-10 mask-image-[radial-gradient(ellipse_at_center,black_40%,transparent_110%)]"></div>

        <div ref={loginRef} className="relative z-10 w-full max-w-lg bg-zinc-900 p-10 md:p-14 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white/10 group">
          <h2 className="text-5xl font-bebas mb-3 text-center tracking-tight text-white">API Challenge</h2>
          <p className="text-zinc-500 text-base text-center mb-12 max-w-sm mx-auto font-light leading-relaxed">
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-6 text-lg">
            <div className="relative group/input">
              <label className="block text-sm font-medium text-zinc-500 mb-2 transition-colors group-focus-within/input:text-white">Email / Username</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-zinc-600 shadow-inner"
                placeholder=""
              />
            </div>
            
            <div className="relative group/input">
              <label className="block text-sm font-medium text-zinc-500 mb-2 transition-colors group-focus-within/input:text-white">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-800/50 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-zinc-600 shadow-inner"
                placeholder=""
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="mt-8 w-full bg-white text-black font-bold text-xl py-4 rounded-xl hover:bg-zinc-100 transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-[0.97]"
            >
              {loading ? "Menghubungkan..." : "Login"}
            </button>
          </form>

          {message && (
            <div className="mt-8 p-5 rounded-xl bg-black/60 text-center text-base border border-zinc-800 break-all backdrop-blur-lg">
              {message}
            </div>
          )}
        </div>
      </section>

     {/* FOOTER DENGAN COPYRIGHT & AI ACKNOWLEDGEMENT */}
      <footer className="w-full py-10 px-8 bg-zinc-900 flex flex-col items-center justify-center gap-3 border-t border-zinc-800 text-zinc-700 font-mono tracking-widest">
        <div className="text-sm">
          FH | CRETIVOX INTERNSHIP TEST 2026
        </div>
        <div className="text-xs text-zinc-600 flex flex-col items-center gap-1.5 md:flex-row md:gap-2">
          <span>&copy; {new Date().getFullYear()} Fariz Hakim.</span>
          <span className="hidden md:inline">|</span>
          <span>Co-piloted with Gemini AI.</span>
        </div>
      </footer>
    </main>
  );
}