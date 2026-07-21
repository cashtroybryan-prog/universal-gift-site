"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

type UniversalHomeProps = {
  shopPath: string;
  howPath: string;
  trackerPath: string;
  navHidden?: boolean;
  onShop: () => void;
  onHow: () => void;
  onTracker: () => void;
  onBuyMovieNight: () => void;
};

type HeroSlideId = "movie" | "merch" | "fuel";

type ParticipatingBrand = {
  name: string;
  location: string;
  logo?: string;
  image?: string;
};

type ParticipatingBrandGroup = {
  slideId: HeroSlideId;
  title: string;
  intro: string;
  brands: ParticipatingBrand[];
};

const assets = {
  movieVideo: "/videos/mbappe-minions-lower-quality.mp4",
  merchVideo: "/videos/how-to-train-your-dragon-toys-lower-quality.mp4",
  fuelVideo: "/videos/minions-shell-lower-quality.mp4",
  movieCard: "/images/universal-movie-day-gift-card.png",
  merchCard: "/images/universal-merch-gift-card.png",
  fuelCard: "/images/universal-fuel-gift-card.png",
  chevron: "/images/chevron-arrow.png",
  logo: "/images/universal-logo.png",
};

const heroSlides: {
  id: HeroSlideId;
  video: string;
  card: string;
  cardAlt: string;
  title: string;
  subtitle: string;
  buttonTop: string;
  buttonBottom: string;
}[] = [
  {
    id: "movie",
    video: assets.movieVideo,
    card: assets.movieCard,
    cardAlt: "Universal Movie Day Gift Card",
    title: "Minions & Monsters is now showing!",
    subtitle: "Use one card for cinema, dining, snacks and more.",
    buttonTop: "Buy the Universal Movie",
    buttonBottom: "Day Gift Card Now!",
  },
  {
    id: "merch",
    video: assets.merchVideo,
    card: assets.merchCard,
    cardAlt: "Universal Merch Gift Card",
    title: "New Universal merch has arrived.",
    subtitle:
      "Use one card across many stores for toys, collectibles, apparel & more.",
    buttonTop: "Buy the Universal Merch",
    buttonBottom: "Gift Card Now!",
  },
  {
    id: "fuel",
    video: assets.fuelVideo,
    card: assets.fuelCard,
    cardAlt: "Universal Fuel Gift Card",
    title: "Fuel the next family adventure.",
    subtitle:
      "Use one card for petrol, snacks, drinks & more across participating stores.",
    buttonTop: "Buy the Universal Fuel",
    buttonBottom: "Gift Card Now!",
  },
];

const participatingBrandGroups: ParticipatingBrandGroup[] = [
  {
    slideId: "movie",
    title: "Movie Day Gift Card",
    intro:
      "From movie tickets to treats, make every cinema trip feel bigger, easier and more memorable.",
brands: [
  {
    name: "Event Cinemas",
    location: "Australia",
    logo: "/images/eventcinemas-logo.png",
    image: "/images/eventcinemas-store.png",
  },
  {
    name: "HOYTS",
    location: "Australia",
    logo: "/images/hoyts-logo.png",
    image: "/images/hoyts-store.png",
  },
  {
    name: "Village Cinemas",
    location: "Australia",
    logo: "/images/villagecinemas-logo.png",
    image: "/images/villagecinemas-store.png",
  },
  {
    name: "Reading Cinemas",
    location: "Australia",
    logo: "/images/readingcinemas-logo.png",
    image: "/images/readingcinemas-store.png",
  },
  {
    name: "Palace Cinemas",
    location: "Australia",
    logo: "/images/palacecinemas-logo.png",
    image: "/images/palacecinemas-store.png",
  },
],
  },
  {
    slideId: "merch",
    title: "Merch Gift Card",
    intro:
      "Bring home the characters, stories and worlds fans love with toys, collectibles, apparel and more.",
brands: [
  {
    name: "Target",
    location: "Australia",
    logo: "/images/target-logo.png",
    image: "/images/target-store.png",
  },
  {
    name: "Kmart",
    location: "Australia",
    logo: "/images/kmart-logo.png",
    image: "/images/kmart-store.png",
  },
  {
    name: "Myer",
    location: "Australia",
    logo: "/images/myer-logo.png",
    image: "/images/myer-store.png",
  },
  {
    name: "Toyworld",
    location: "Australia",
    logo: "/images/toyworld-logo.png",
    image: "/images/toyworld-store.png",
  },
  {
    name: "BIG W",
    location: "Australia",
    logo: "/images/bigw-logo.png",
    image: "/images/bigw-store.png",
  },
],
  },
{
  slideId: "fuel",
  title: "Fuel Gift Card",
  intro:
    "Keep the journey moving with fuel, drinks, snacks and road-trip essentials along the way.",
  brands: [
    {
      name: "Shell",
      location: "Australia",
      logo: "/images/shell-logo.png",
      image: "/images/shell-store.png",
    },
    {
      name: "Ampol",
      location: "Australia",
      logo: "/images/ampol-logo.png",
      image: "/images/ampol-store.png",
    },
    {
      name: "BP",
      location: "Australia",
      logo: "/images/bp-logo.png",
      image: "/images/bp-store.png",
    },
    {
      name: "7-Eleven",
      location: "Australia",
      logo: "/images/7eleven-logo.png",
      image: "/images/7eleven-store.png",
    },
    {
      name: "Caltex",
      location: "Australia",
      logo: "/images/caltex-logo.png",
      image: "/images/caltex-store.png",
    },
  ],
},
];

export default function UniversalHome({
  shopPath,
  howPath,
  trackerPath,
  navHidden = false,
  onShop,
  onHow,
  onTracker,
  onBuyMovieNight,
}: UniversalHomeProps) {
  const router = useRouter();
  const [isIntroLoading, setIsIntroLoading] = useState(true);
  const [isReloadingHome, setIsReloadingHome] = useState(false);
const [activeSlideIndex, setActiveSlideIndex] = useState(0);
const [isHeroSwitching, setIsHeroSwitching] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSlide = heroSlides[activeSlideIndex];

  const activeBrandGroup =
    participatingBrandGroups.find((group) => group.slideId === activeSlide.id) ??
    participatingBrandGroups[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsIntroLoading(false);
    }, 260);

    return () => window.clearTimeout(timer);
  }, []);

const handleNavClick = (
  event: MouseEvent<HTMLAnchorElement>,
  action: () => void
) => {
  event.preventDefault();
  setMobileMenuOpen(false);
  action();
};

const handleHomeReload = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  setMobileMenuOpen(false);
  setIsReloadingHome(true);

    window.setTimeout(() => {
      if (window.location.pathname !== "/au/home") {
        router.push("/au/home");

        window.setTimeout(() => {
          setIsReloadingHome(false);
        }, 500);

        return;
      }

      const scrollShell = document.querySelector(".site-scroll-shell");

      if (scrollShell) {
        scrollShell.scrollTo({ top: 0, behavior: "smooth" });
      }

      setIsReloadingHome(false);
    }, 420);
  };

  const goToSlide = (nextIndex: number) => {
    if (isHeroSwitching || nextIndex === activeSlideIndex) return;

    setIsHeroSwitching(true);

    window.setTimeout(() => {
      setActiveSlideIndex(nextIndex);

      window.setTimeout(() => {
        setIsHeroSwitching(false);
      }, 40);
    }, 260);
  };

  const handleNextSlide = () => {
    const nextIndex =
      activeSlideIndex === heroSlides.length - 1 ? 0 : activeSlideIndex + 1;

    goToSlide(nextIndex);
  };

  const handlePreviousSlide = () => {
    const previousIndex =
      activeSlideIndex === 0 ? heroSlides.length - 1 : activeSlideIndex - 1;

    goToSlide(previousIndex);
  };

  const handleHeroButtonClick = () => {
    if (activeSlide.id === "movie") {
      onBuyMovieNight();
      return;
    }

    if (activeSlide.id === "merch") {
      router.push("/au/product/merch");
      return;
    }

    if (activeSlide.id === "fuel") {
      router.push("/au/product/fuel");
      return;
    }

    onShop();
  };

  return (
    <main className="universal-page">
      <div
        className={`page-loader ${
          isIntroLoading || isReloadingHome ? "" : "page-loader-hidden"
        }`}
      >
        <div className="loader-logo-card">
          <img src={assets.logo} alt="Universal" draggable={false} />
        </div>
        <div className="loader-progress" />
      </div>

      <section className="top-area">
        <nav className={`nav-pill ${navHidden ? "nav-pill-hidden" : ""}`}>
          <div className="nav-left">
            <a
              className="logo"
              href="/au/home"
              aria-label="Universal home"
              onClick={handleHomeReload}
            >
              <img src={assets.logo} alt="Universal" draggable={false} />
            </a>

<div className="nav-links">
  <a
    className="nav-shop-link"
    href={shopPath}
    onClick={(event) => handleNavClick(event, onShop)}
  >
    Shop Gift Cards
  </a>

  <a
    className="nav-desktop-link"
    href={howPath}
    onClick={(event) => handleNavClick(event, onHow)}
  >
    How it Works
  </a>

  <a
    className="nav-desktop-link"
    href={trackerPath}
    onClick={(event) => handleNavClick(event, onTracker)}
  >
    Gift Tracker
  </a>
</div>
          </div>

<div className="nav-actions">
  <button
    className="country-pill"
    type="button"
    aria-label="Shopping in Australia"
    onClick={() =>
      alert("Australia is the only available country for this prototype.")
    }
  >
    You are currently
    <br />
    shopping in Australia 🇦🇺
  </button>

  <button className="login-btn" type="button">
    Log in
  </button>

  <button className="signup-btn" type="button">
    Sign up
  </button>

  <button
    className={`mobile-menu-button ${
      mobileMenuOpen ? "mobile-menu-button-open" : ""
    }`}
    type="button"
    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
    aria-expanded={mobileMenuOpen}
    onClick={() => setMobileMenuOpen((previous) => !previous)}
  >
    <span />
    <span />
    <span />
  </button>
</div>

{mobileMenuOpen && (
  <div className="mobile-nav-menu">
    <button
      type="button"
      onClick={() => {
        setMobileMenuOpen(false);
        onHow();
      }}
    >
      How it Works
    </button>

    <button
      type="button"
      onClick={() => {
        setMobileMenuOpen(false);
        onTracker();
      }}
    >
      Gift Tracker
    </button>

    <button
      type="button"
      onClick={() => setMobileMenuOpen(false)}
    >
      Log in
    </button>

    <button
      className="mobile-nav-signup"
      type="button"
      onClick={() => setMobileMenuOpen(false)}
    >
      Sign up free
    </button>
  </div>
)}
        </nav>
      </section>

      <section className={`hero ${isHeroSwitching ? "hero-switching" : ""}`}>
        <video
          key={`${activeSlide.id}-bg`}
          className="hero-video hero-video-bg"
          src={activeSlide.video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        <video
          key={`${activeSlide.id}-main`}
          className="hero-video hero-video-main"
          src={activeSlide.video}
          autoPlay
          muted
          playsInline
          onEnded={handleNextSlide}
        />

        <div className="hero-video-softener" />
        <div className="hero-overlay" />

        <div className={`hero-content hero-content-${activeSlide.id}`}>
          <h1>{activeSlide.title}</h1>

          <p>{activeSlide.subtitle}</p>

          <img
            className={`movie-card ${
              activeSlide.id === "merch"
                ? "merch-card"
                : activeSlide.id === "fuel"
                ? "fuel-card"
                : ""
            }`}
            src={activeSlide.card}
            alt={activeSlide.cardAlt}
            draggable={false}
          />

          <button className="hero-btn" type="button" onClick={handleHeroButtonClick}>
            <span className="hero-btn-text">
              {activeSlide.buttonTop}
              <br />
              {activeSlide.buttonBottom}
            </span>
          </button>
        </div>

        <button
          className="carousel-arrow carousel-prev"
          type="button"
          onClick={handlePreviousSlide}
          aria-label="Previous gift card"
        >
          <img src={assets.chevron} alt="" draggable={false} />
        </button>

        <button
          className="carousel-arrow carousel-next"
          type="button"
          onClick={handleNextSlide}
          aria-label="Next gift card"
        >
          <img src={assets.chevron} alt="" draggable={false} />
        </button>
      </section>

      <section className="blue-bottom">
        <div className="brands-section">
<div className="brands-header">
  <h2>{activeBrandGroup.title}</h2>
  <p>{activeBrandGroup.intro}</p>
  <h3 className="participating-stores-title">Participating Stores</h3>
</div>

<div className="brand-showcase-grid">
  {activeBrandGroup.brands.map((brand, index) => (
    <a
className={`brand-showcase-card ${
  index < 2
    ? "brand-showcase-card-large"
    : "brand-showcase-card-small"
} ${brand.name === "Kmart" ? "brand-showcase-card-kmart" : ""} ${
  brand.name === "BIG W" ? "brand-showcase-card-bigw" : ""
} ${brand.name === "Myer" ? "brand-showcase-card-myer" : ""} ${
  brand.name === "Shell" ? "brand-showcase-card-shell" : ""
} ${brand.name === "Ampol" ? "brand-showcase-card-ampol" : ""} ${
  brand.name === "BP" ? "brand-showcase-card-bp" : ""
} ${brand.name === "7-Eleven" ? "brand-showcase-card-7eleven" : ""} ${
  brand.name === "Caltex" ? "brand-showcase-card-caltex" : ""
} ${brand.name === "Event Cinemas" ? "brand-showcase-card-event" : ""} ${
  brand.name === "HOYTS" ? "brand-showcase-card-hoyts" : ""
} ${brand.name === "Village Cinemas" ? "brand-showcase-card-village" : ""} ${
  brand.name === "Palace Cinemas" ? "brand-showcase-card-palace" : ""
}`}
      href={shopPath}
      onClick={(event) => handleNavClick(event, onShop)}
      key={brand.name}
      aria-label={`Shop ${brand.name}`}
    >
      <div
        className="brand-showcase-image"
        style={
          brand.image
            ? { backgroundImage: `url(${brand.image})` }
            : undefined
        }
      >
        {!brand.image && (
          <span className="brand-image-note">Image placeholder</span>
        )}
      </div>

      <div className="brand-showcase-overlay">
        {brand.logo ? (
          <img
            className="brand-logo-img"
            src={brand.logo}
            alt={brand.name}
          />
        ) : (
          <h3>{brand.name}</h3>
        )}

        <p>
          {brand.name}, {brand.location}
        </p>
      </div>
    </a>
  ))}
</div>
        </div>
      </section>

      <style jsx>{`
        .universal-page {
          width: 100%;
          min-height: 1783px;
          overflow-x: hidden;
          background: #000;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 5000;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          opacity: 1;
          pointer-events: auto;
          transition: opacity 180ms ease;
        }

        .page-loader-hidden {
          opacity: 0;
          pointer-events: none;
        }

        .loader-logo-card {
          width: 184px;
          height: 88px;
          border-radius: 999px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 24px 80px rgba(255, 255, 255, 0.24);
          animation: none;
        }

        .loader-logo-card img {
          width: 122px;
          height: auto;
          display: block;
        }

        .loader-progress {
          width: 156px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          overflow: hidden;
          position: relative;
        }

        .loader-progress::after {
          content: "";
          position: absolute;
          top: 0;
          left: -48%;
          width: 48%;
          height: 100%;
          border-radius: inherit;
          background: #115cd0;
          animation: loaderProgress 760ms ease-in-out infinite;
        }

        @keyframes loaderProgress {
          0% {
            left: -48%;
          }

          100% {
            left: 100%;
          }
        }

        .top-area {
          position: relative;
          height: 186px;
          background: #000;
        }

        .nav-pill {
          position: fixed;
          top: 53px;
          left: 50%;
          transform: translateX(-50%);
          transform-origin: top center;
          width: min(1288px, calc(100vw - 88px));
          height: 86px;
          border-radius: 999px;
          border: 1px solid #ebebeb;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 0 38px;
          box-sizing: border-box;
          z-index: 1000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.14);
          transition:
            transform 620ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 620ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .nav-pill-hidden {
          transform: translateX(-50%) translateY(-170%);
          opacity: 0;
          pointer-events: none;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 18px;
          min-width: 0;
          flex: 1 1 auto;
        }

        .logo {
          width: 104px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          cursor: pointer;
          user-select: none;
        }

        .logo img {
          width: 104px;
          height: auto;
          display: block;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 0 1 auto;
          min-width: 0;
        }

        .nav-links a {
          height: 46px;
          padding: 0 17px;
          border: 1px solid transparent;
          border-radius: 999px;
          color: #000;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            border-color 160ms ease,
            background 160ms ease;
        }

        .nav-links a:hover,
        .nav-links a:focus-visible {
          border-color: #d7d7d7;
          background: rgba(0, 0, 0, 0.02);
          outline: none;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
          flex: 0 0 auto;
        }

        .country-pill {
          width: 238px;
          height: 56px;
          flex: 0 0 238px;
          border-radius: 999px;
          background: #115cd0;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.08;
          border: 0;
          font-family: inherit;
          cursor: pointer;
          user-select: none;
          transition: background 180ms ease, color 180ms ease;
        }

        .country-pill:hover,
        .country-pill:focus,
        .country-pill:active {
          background: #000;
          color: #fff;
        }

        .login-btn,
        .signup-btn,
        .hero-btn {
          font-family: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .login-btn,
        .signup-btn {
          border: 1px solid transparent;
          box-sizing: border-box;
          transition:
            border-color 160ms ease,
            background 160ms ease;
        }

        .login-btn {
          width: 88px;
          height: 50px;
          flex: 0 0 88px;
          border-radius: 8px;
          background: #edeee9;
          color: #000;
          font-size: 17px;
        }

        .signup-btn {
          width: 116px;
          height: 52px;
          flex: 0 0 116px;
          border-radius: 999px;
          background: #000;
          color: #fff;
          font-size: 17px;
        }

        .signup-btn:hover,
.shop-signup-btn:focus-visible {
  border-color: #d7d7d7;
  background: #115cd0;
  color: #fff;
  outline: none;
  transform: translateY(-1px);
}

        .login-btn:hover,
        .login-btn:focus-visible,
        .signup-btn:hover,
        .signup-btn:focus-visible {
          border-color: #d7d7d7;
          outline: none;
        }

        .login-btn:hover,
        .login-btn:focus-visible {
          background: rgba(0, 0, 0, 0.02);
        }

        .hero {
          position: relative;
          height: 808px;
          overflow: hidden;
          background: #000;
          isolation: isolate;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .hero-video-bg {
          object-fit: cover;
          object-position: center center;
          filter: blur(32px);
          transform: scale(1.12);
          opacity: 0;
          z-index: 0;
          transition: opacity 260ms ease;
        }

        .hero-video-main {
          object-fit: cover;
          object-position: center center;
          z-index: 1;
          opacity: 1;
          transition: opacity 260ms ease;
        }

        .hero-switching .hero-video-main,
        .hero-switching .hero-video-bg,
        .hero-switching .hero-content {
          opacity: 0;
        }

        .hero-video-softener {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            radial-gradient(
              circle at center,
              rgba(0, 0, 0, 0.04) 0%,
              rgba(0, 0, 0, 0.12) 44%,
              rgba(0, 0, 0, 0.42) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.02) 0%,
              rgba(0, 0, 0, 0.08) 44%,
              rgba(0, 0, 0, 0.52) 100%
            );
          pointer-events: none;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.34);
          z-index: 3;
          pointer-events: none;
        }

        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 4;
          width: 100%;
          height: 808px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          opacity: 1;
          transition: opacity 260ms ease;
        }

        .hero-content h1 {
          width: min(760px, calc(100% - 40px));
          margin: 45px 0 0;
          color: #fff;
          font-size: 59.12px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1px;
        }

        .hero-content p {
          width: min(1280px, calc(100% - 40px));
          margin: 35px 0 0;
          color: #fff;
          font-size: 40.42px;
          font-weight: 500;
          line-height: 1;
        }

        .hero-content-merch p,
        .hero-content-fuel p {
          width: min(1320px, calc(100% - 40px));
          margin: 35px 0 0;
          white-space: nowrap;
          font-size: 40.42px;
          font-weight: 500;
          line-height: 1;
        }

        .movie-card {
          width: 560px;
          height: 325px;
          object-fit: contain;
          margin-top: 56px;
          display: block;
          transform: scale(1.32);
          transform-origin: center center;
          filter: drop-shadow(0 5px 8px rgba(255, 255, 255, 0.05))
            drop-shadow(0 12px 40px rgba(255, 255, 255, 0.07))
            drop-shadow(0 26px 80px rgba(255, 255, 255, 0.16));
        }

        .merch-card,
        .fuel-card {
          transform: scale(1.32);
        }

        .hero-btn {
          width: 467px;
          height: 93px;
          margin-top: 28px;
          padding: 0 42px;
          border: 0;
          border-radius: 999px;
          background: #fff;
          color: #000;
          font-size: 27.16px;
          letter-spacing: -0.5px;
          box-shadow: 0 0 52px rgba(255, 255, 255, 0.26);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .hero-btn-text {
          display: block;
          line-height: 0.98;
          transform: translateY(4px);
        }

        .hero-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 64px rgba(255, 255, 255, 0.34);
        }

.carousel-arrow {
  position: absolute;
  top: 50%;
  z-index: 5;
  width: 64px;
  height: 64px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translateY(-50%);
  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.28),
    0 4px 14px rgba(0, 0, 0, 0.16);
  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.carousel-next {
  right: 44px;
}

.carousel-prev {
  left: 44px;
}

.carousel-arrow img {
  display: none;
}

.carousel-arrow::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  margin-left: -9px;
  margin-top: -8px;
  border-top: 3px solid #000;
  border-right: 3px solid #000;
  transform: rotate(45deg);
}

.carousel-prev::before {
  margin-left: -6px;
  transform: rotate(225deg);
}

.carousel-arrow:hover,
.carousel-arrow:focus-visible {
  background: #fff;
  transform: translateY(-50%) scale(1.05);
  box-shadow:
    0 22px 56px rgba(0, 0, 0, 0.34),
    0 6px 18px rgba(0, 0, 0, 0.18);
  outline: none;
}

        .blue-bottom {
          position: relative;
          min-height: 1120px;
          background:
            radial-gradient(
              circle at 50% 28%,
              rgba(34, 121, 255, 0.42) 0%,
              rgba(7, 36, 104, 0.94) 38%,
              #020819 100%
            );
          padding: 92px 0 130px;
          box-sizing: border-box;
          overflow: hidden;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        .blue-bottom::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.08) 0%,
              rgba(0, 0, 0, 0) 24%,
              rgba(0, 0, 0, 0.18) 100%
            ),
            radial-gradient(
              circle at 36% 48%,
              rgba(0, 181, 255, 0.18) 0%,
              rgba(0, 0, 0, 0) 46%
            );
          pointer-events: none;
        }

        .brands-section {
          position: relative;
          z-index: 2;
          width: min(1120px, calc(100vw - 88px));
          margin: 0 auto;
          color: #fff;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        .brands-header {
          width: min(720px, 100%);
          margin: 0 auto 54px;
          text-align: center;
        }

        .brands-header h2 {
          margin: 0;
          color: #fff;
          font-size: 42px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.9px;
        }

.brands-header p {
  margin: 22px auto 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  font-weight: 500;
  line-height: 1.12;
}

.participating-stores-title {
  margin: 60px 0 0;
  color: #fff;
  font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  font-size: 38px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.5px;
  text-align: center;
}

        .brand-showcase-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 16px;
        }

.brand-showcase-card {
  position: relative;
  min-width: 0;
  border-radius: 16px;
  overflow: hidden;
  background: #061f54;
  box-shadow: 0 26px 80px rgba(0, 0, 0, 0.32);
  display: block;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.brand-showcase-card:hover,
.brand-showcase-card:focus-visible {
  transform: translateY(-6px);
  box-shadow: 0 34px 96px rgba(0, 0, 0, 0.42);
  outline: none;
}

        .brand-showcase-card-large {
          grid-column: span 3;
          height: 340px;
        }

        .brand-showcase-card-small {
          grid-column: span 2;
          height: 305px;
        }

        .brand-showcase-image {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(10, 43, 115, 0.58) 58%,
              rgba(8, 29, 92, 0.98) 100%
            ),
            radial-gradient(
              circle at 50% 20%,
              rgba(83, 171, 255, 0.62) 0%,
              rgba(20, 103, 220, 0.36) 36%,
              rgba(3, 12, 38, 0.98) 100%
            );
          background-size: cover;
          background-position: center center;
        }

        .brand-showcase-image::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.02) 0%,
              rgba(5, 20, 80, 0.12) 44%,
              rgba(8, 20, 82, 0.98) 100%
            );
          pointer-events: none;
        }

        .brand-image-note {
          position: absolute;
          top: 18px;
          left: 18px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.76);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

.brand-showcase-overlay {
  position: absolute;
  inset: auto 0 0;
  min-height: 155px;
  padding: 0 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(
    to bottom,
    rgba(6, 18, 62, 0) 0%,
    rgba(6, 25, 96, 0.74) 42%,
    rgba(5, 20, 84, 0.98) 100%
  );
  box-sizing: border-box;
}

.brand-logo-img {
  width: min(270px, 86%);
  height: auto;
  display: block;
  margin: 0 auto 2px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  transform: translateY(20px);
}
.brand-showcase-card-small .brand-logo-img {
  width: auto;
  max-width: min(220px, 70%);
  max-height: 58px;
  margin: 0 auto 12px;
  object-fit: contain;
  transform: translateY(0);
}

.brand-showcase-card-myer .brand-logo-img {
  transform: translateY(-4px);
}

.brand-showcase-card-bigw .brand-logo-img {
  max-width: min(160px, 56%);
  max-height: 44px;
  margin-bottom: 14px;
}
.brand-showcase-card-kmart .brand-logo-img {
  transform: translateY(80px);
}
  .brand-showcase-card-shell .brand-logo-img,
.brand-showcase-card-ampol .brand-logo-img,
.brand-showcase-card-bp .brand-logo-img,
.brand-showcase-card-7eleven .brand-logo-img,
.brand-showcase-card-caltex .brand-logo-img {
  filter: none;
}

.brand-showcase-card-shell .brand-logo-img {
  width: auto;
  max-width: min(180px, 58%);
  max-height: 86px;
  margin-bottom: 30px;
  transform: translateY(-12px);
}

.brand-showcase-card-ampol .brand-logo-img {
  width: auto;
  max-width: min(210px, 64%);
  max-height: 92px;
  margin-bottom: 28px;
  transform: translateY(-12px);
}

.brand-showcase-card-bp .brand-logo-img,
.brand-showcase-card-7eleven .brand-logo-img,
.brand-showcase-card-caltex .brand-logo-img {
  width: auto;
  max-width: min(130px, 52%);
  max-height: 62px;
  margin-bottom: 12px;
  transform: translateY(0);
}

.brand-showcase-card-event .brand-logo-img,
.brand-showcase-card-event .brand-logo-img {
  width: auto;
  max-width: min(340px, 78%);
  max-height: 112px;
  margin-bottom: 18px;
  transform: translateY(-4px);
}

.brand-showcase-card-event .brand-showcase-overlay p {
  transform: translateY(0);
}

.brand-showcase-card-hoyts .brand-logo-img {
  width: auto;
  max-width: min(220px, 58%);
  max-height: 70px;
  margin-bottom: 8px;
  transform: translateY(-4px);
}

.brand-showcase-card-hoyts .brand-showcase-overlay p {
  transform: translateY(-2px);
}

.brand-showcase-card-village .brand-logo-img {
  width: auto;
  max-width: min(350px, 90%);
  max-height: 135px;
  margin-bottom: 8px;
  transform: translateY(-6px);
}

.brand-showcase-card-village .brand-showcase-overlay p {
  font-size: 21px;
  transform: translateY(0);
}

.brand-showcase-card-palace .brand-logo-img {
  width: auto;
  max-width: min(190px, 62%);
  max-height: 68px;
  margin-bottom: 14px;
  transform: translateY(0);
}

.brand-showcase-card-palace .brand-showcase-overlay p {
  font-size: 21px;
  transform: translateY(0);
}

.brand-showcase-card-event .brand-showcase-overlay p,
.brand-showcase-card-hoyts .brand-showcase-overlay p {
  transform: translateY(0);
}

.brand-showcase-card-village .brand-logo-img,
.brand-showcase-card-palace .brand-logo-img {
  width: auto;
  max-width: min(190px, 62%);
  max-height: 68px;
  margin-bottom: 14px;
  transform: translateY(0);
}

.brand-showcase-card-village .brand-showcase-overlay p,
.brand-showcase-card-palace .brand-showcase-overlay p {
  font-size: 21px;
  transform: translateY(0);
}

        .brand-showcase-overlay h3 {
          margin: 0 0 16px;
          color: #fff;
          font-size: 30px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.5px;
          text-align: center;
        }

        .brand-showcase-card-small .brand-showcase-overlay h3 {
          font-size: 26px;
        }

      .brand-showcase-overlay p {
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
  text-align: center;
  transform: translateY(-14px);
}
.brand-showcase-card-small .brand-showcase-overlay p {
  font-size: 21px;
  line-height: 1;
  transform: translateY(0);
}

        @media (min-width: 1500px) {
          .nav-pill {
            width: min(1500px, calc(100vw - 110px));
            height: 98px;
            padding: 0 48px;
            gap: 28px;
          }

          .nav-left {
            gap: 24px;
          }

          .logo {
            width: 122px;
            height: 68px;
          }

          .logo img {
            width: 122px;
          }

          .nav-links {
            gap: 8px;
          }

          .nav-links a {
            height: 54px;
            padding: 0 19px;
            font-size: 21px;
          }

          .country-pill {
            width: 280px;
            height: 66px;
            flex-basis: 280px;
            font-size: 17px;
          }

          .login-btn {
            width: 105px;
            height: 60px;
            flex-basis: 105px;
            font-size: 19px;
          }

          .signup-btn {
            width: 135px;
            height: 62px;
            flex-basis: 135px;
            font-size: 19px;
          }

          .hero-video-bg {
            opacity: 1;
          }

          .hero-video-main {
            inset: auto;
            top: 0;
            left: 50%;
            width: auto;
            height: 100%;
            transform: translateX(-50%);
            object-fit: contain;
          }
        }

        @media (min-width: 1900px) {
          .nav-pill {
            width: min(1720px, calc(100vw - 140px));
            height: 112px;
            padding: 0 58px;
            gap: 36px;
          }

          .nav-left {
            gap: 30px;
          }

          .logo {
            width: 142px;
            height: 78px;
          }

          .logo img {
            width: 142px;
          }

          .nav-links {
            gap: 12px;
          }

          .nav-links a {
            height: 62px;
            padding: 0 22px;
            font-size: 24px;
          }

          .country-pill {
            width: 330px;
            height: 76px;
            flex-basis: 330px;
            font-size: 19px;
          }

          .login-btn {
            width: 124px;
            height: 70px;
            flex-basis: 124px;
            font-size: 22px;
          }

          .signup-btn {
            width: 160px;
            height: 72px;
            flex-basis: 160px;
            font-size: 22px;
          }
        }

        @media (max-width: 1200px) {
          .nav-pill {
            width: calc(100vw - 40px);
            height: 80px;
            padding: 0 26px;
            gap: 18px;
          }

          .nav-left {
            gap: 16px;
          }

          .nav-links {
            gap: 4px;
          }

          .nav-links a {
            font-size: 16px;
            height: 42px;
            padding: 0 16px;
          }

          .country-pill,
          .country-pill:hover,
          .country-pill:focus,
          .country-pill:active {
            display: none;
          }

          .login-btn {
            font-size: 15px;
            width: 87px;
            height: 47px;
            flex-basis: 87px;
          }

          .signup-btn {
            font-size: 15px;
            width: 112px;
            height: 49px;
            flex-basis: 112px;
          }

          .hero-content h1 {
            font-size: 50px;
          }

          .hero-content p {
            font-size: 32px;
            margin-top: 35px;
          }

          .hero-content-merch p,
          .hero-content-fuel p {
            font-size: 32px;
            white-space: nowrap;
          }

          .brands-section {
            width: calc(100vw - 40px);
          }

          .brands-header h2 {
            font-size: 38px;
          }

          .brand-showcase-card-large,
          .brand-showcase-card-small {
            grid-column: span 3;
            height: 300px;
          }
        }

        @media (max-width: 760px) {
          .universal-page {
            min-height: 100vh;
          }

          .top-area {
            height: 128px;
          }

          .nav-pill {
            top: 28px;
            width: calc(100vw - 28px);
            height: 72px;
            padding: 0 18px;
          }

          .logo,
          .logo img {
            width: 78px;
          }

          .nav-links {
            display: none;
          }

          .nav-actions {
            margin-left: auto;
          }

          .login-btn {
            display: none;
          }

          .signup-btn {
            width: 96px;
            height: 44px;
            flex-basis: 96px;
            font-size: 14px;
          }

          .hero,
          .hero-content {
            height: 680px;
          }

          .hero-video-bg {
            opacity: 0;
          }

          .hero-video-main {
            inset: 0;
            width: 100%;
            height: 100%;
            transform: none;
            object-fit: cover;
            object-position: center top;
          }

          .hero-content h1 {
            width: calc(100% - 42px);
            margin-top: 44px;
            font-size: 38px;
          }

          .hero-content p {
            width: calc(100% - 42px);
            margin-top: 24px;
            font-size: 22px;
            line-height: 1.15;
          }

          .hero-content-merch p,
          .hero-content-fuel p {
            white-space: normal;
            font-size: 20px;
          }

          .movie-card {
            width: min(390px, calc(100% - 40px));
            height: auto;
            margin-top: 38px;
            transform: scale(1.14);
          }

          .merch-card,
          .fuel-card {
            transform: scale(1.14);
          }

          .hero-btn {
            width: min(350px, calc(100% - 52px));
            height: 76px;
            margin-top: 28px;
            padding: 0 28px;
            font-size: 20px;
          }

          .hero-btn-text {
            line-height: 0.98;
            transform: translateY(3px);
          }

          .carousel-arrow {
            width: 50px;
            height: 50px;
          }

          .carousel-next {
            right: 18px;
          }

          .carousel-prev {
            left: 18px;
          }

          .carousel-arrow img {
            width: 17px;
          }

          .blue-bottom {
            min-height: 720px;
            padding-top: 70px;
          }

          .brands-section {
            width: calc(100vw - 32px);
          }

          .brands-header {
            margin-bottom: 38px;
          }

          .brands-header h2 {
            font-size: 32px;
          }

          .brands-header p {
            font-size: 16px;
          }

          .brand-showcase-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .brand-showcase-card-large,
          .brand-showcase-card-small {
            grid-column: span 1;
            height: 260px;
          }

          .brand-showcase-overlay h3,
          .brand-showcase-card-small .brand-showcase-overlay h3 {
            font-size: 25px;
          }
        }
          .mobile-menu-button,
.mobile-nav-menu {
  display: none;
}

/* =========================================================
   FINAL UNIVERSAL MOBILE NAV
   Uses the same spacing proportions as the Linktree nav.
   Desktop remains untouched.
   ========================================================= */

@media (max-width: 760px) {
  .nav-pill {
    position: fixed !important;
    display: block !important;

    left: 3.5398vw !important;
    right: auto !important;

    top: max(
      14px,
      calc(env(safe-area-inset-top, 0px) + 8px)
    ) !important;

    width: 92.9204vw !important;
    max-width: none !important;
    height: clamp(52px, 16.8142vw, 66px) !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 1px solid #ebebeb !important;
    border-radius: 11.0619vw !important;

    background: #ffffff !important;
    box-shadow: none !important;

    overflow: visible !important;
    transform: none !important;
    box-sizing: border-box !important;

    z-index: 1000 !important;
  }

  .nav-pill.nav-pill-hidden {
    transform: translateY(-150%) !important;
  }

  /*
    Remove the desktop flex layout so each mobile item
    can use the same exact positioning as Linktree.
  */

  .nav-left,
  .nav-actions,
  .nav-links {
    display: contents !important;
  }

  /* Universal logo */

  .logo {
    position: absolute !important;
    display: flex !important;

    left: 2.4vw !important;
    top: 50% !important;

    width: 13.8vw !important;
    height: 9vw !important;
    min-width: 0 !important;
    max-width: none !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 !important;

    overflow: visible !important;
    transform: translateY(-50%) !important;

    z-index: 5 !important;
  }

  .logo img {
    position: static !important;
    display: block !important;

    width: 100% !important;
    height: 100% !important;
    max-width: none !important;

    margin: 0 !important;

    object-fit: contain !important;
    object-position: center !important;

    transform: none !important;
  }

  /* Hide desktop links */

  .nav-links .nav-desktop-link {
    display: none !important;
  }

  /* Shop Gift Cards */

  .nav-links .nav-shop-link {
    position: absolute !important;
    display: flex !important;

    left: 17.8vw !important;
    top: 50% !important;

    width: 27.2vw !important;
    height: 4.4248vw !important;

    align-items: center !important;
    justify-content: flex-start !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 0 !important;
    border-radius: 0 !important;

    background: transparent !important;
    color: #111111 !important;

    font-size: clamp(10.5px, 3.15vw, 13px) !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.04vw !important;

    text-align: left !important;
    white-space: nowrap !important;

    transform: translateY(-50%) !important;

    z-index: 5 !important;
  }

  .nav-links .nav-shop-link:hover,
  .nav-links .nav-shop-link:focus-visible {
    border: 0 !important;
    background: transparent !important;
    outline: none !important;
  }

  /* Country pill, matching Linktree proportions */

  .country-pill,
  .country-pill:hover,
  .country-pill:focus,
  .country-pill:active {
    position: absolute !important;
    display: flex !important;

    left: 45vw !important;
    right: auto !important;
    top: 50% !important;

    width: 34.5133vw !important;
    min-width: 0 !important;
    max-width: none !important;

    height: 7.7168vw !important;
    min-height: 24px !important;
    max-height: 32px !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 2.6549vw !important;

    border: 0 !important;
    border-radius: 4.7938vw !important;

    background: #115cd0 !important;
    color: #ffffff !important;

    font-size: clamp(6.2px, 2.0066vw, 8px) !important;
    font-weight: 700 !important;
    line-height: 1.02 !important;
    letter-spacing: 0 !important;

    text-align: center !important;
    white-space: normal !important;

    overflow: hidden !important;
    box-sizing: border-box !important;

    transform: translateY(-50%) !important;

    z-index: 8 !important;
  }

  .login-btn,
  .signup-btn {
    display: none !important;
  }

  /* Three-line menu, matching Linktree position */

  .mobile-menu-button {
    position: absolute !important;
    display: flex !important;

    right: 4.8673vw !important;
    top: 50% !important;

    width: 7.9646vw !important;
    height: 7.9646vw !important;
    min-width: 24px !important;
    min-height: 24px !important;

    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;

    gap: 0.8849vw !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 0 !important;
    background: transparent !important;

    transform: translateY(-50%) !important;

    cursor: pointer !important;
    z-index: 20 !important;
  }

  .mobile-menu-button span {
    display: block !important;

    width: 5.7522vw !important;
    max-width: 21px !important;

    height: 0.4425vw !important;
    min-height: 1.5px !important;

    border-radius: 999px !important;
    background: #111111 !important;

    transition:
      transform 180ms ease,
      opacity 180ms ease !important;
  }

  .mobile-menu-button-open span:nth-child(1) {
    transform: translateY(1.3274vw) rotate(45deg) !important;
  }

  .mobile-menu-button-open span:nth-child(2) {
    opacity: 0 !important;
  }

  .mobile-menu-button-open span:nth-child(3) {
    transform: translateY(-1.3274vw) rotate(-45deg) !important;
  }

  /* Open hamburger menu */

  .mobile-nav-menu {
    position: absolute !important;
    display: grid !important;

    right: 0 !important;
    top: calc(100% + 2.6549vw) !important;

    width: 56vw !important;

    padding: 2.6549vw !important;
    gap: 1.3274vw !important;

    border: 1px solid #ebebeb !important;
    border-radius: 4.4248vw !important;

    background: #ffffff !important;
    box-shadow: 0 4vw 10vw rgba(0, 0, 0, 0.14) !important;

    z-index: 30 !important;
  }

  .mobile-nav-menu button {
    display: flex !important;

    width: 100% !important;
    height: 10.6195vw !important;
    min-height: 38px !important;

    align-items: center !important;

    padding: 0 3.5398vw !important;

    border: 0 !important;
    border-radius: 3.0973vw !important;

    background: #f3f3f1 !important;
    color: #111111 !important;

    font-family: inherit !important;
    font-size: 3.5398vw !important;
    font-weight: 700 !important;
    text-align: left !important;

    cursor: pointer !important;
  }

  .mobile-nav-menu .mobile-nav-signup {
    background: #000000 !important;
    color: #ffffff !important;
  }
}
      `}</style>
    </main>
  );
}