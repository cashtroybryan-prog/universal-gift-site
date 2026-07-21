"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type MouseEvent } from "react";

type UniversalShopCardId = "movie" | "merch" | "fuel";
type SortMode = "featured" | "az" | "za";

type UniversalShopProps = {
  shopPath: string;
  howPath: string;
  trackerPath: string;
  navHidden?: boolean;
  onShop: () => void;
  onHow: () => void;
  onTracker: () => void;
  onBuyMovieNight: () => void;
  onCardSelect?: (cardId: UniversalShopCardId) => void;
};

const assets = {
  logo: "/images/universal-logo.png",
heroVideo: "/videos/mbappe-minions-video.mp4",
};

const shopCards: {
  id: UniversalShopCardId;
  title: string;
  subtitle: string;
  image: string;
}[] = [
  {
    id: "movie",
    title: "Universal Movie Day\nGift Card",
    subtitle: "AU$5 - AU$500",
    image: "/images/universal-movie-day-card-normal.png",
  },
  {
    id: "merch",
    title: "Universal Merch\nGift Card",
    subtitle: "AU$5 - AU$500",
    image: "/images/universal-merch-card-normal.png",
  },
  {
    id: "fuel",
    title: "Universal Fuel\nGift Card",
    subtitle: "AU$5 - AU$500",
    image: "/images/universal-fuel-card-normal.png",
  },
];

export default function UniversalShop({
  shopPath,
  howPath,
  trackerPath,
  navHidden = false,
  onShop,
  onHow,
  onTracker,
  onCardSelect,
}: UniversalShopProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    UniversalShopCardId[]
  >([]);
  const [sortMode, setSortMode] = useState<SortMode>("featured");
const [categoryOpen, setCategoryOpen] = useState(false);
const [sortOpen, setSortOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryLabel =
    selectedCategories.length === 0
      ? "Browse by category"
      : selectedCategories.length === 1
      ? selectedCategories[0] === "movie"
        ? "Movie"
        : selectedCategories[0] === "fuel"
        ? "Fuel"
        : "Merch"
      : `${selectedCategories.length} categories`;

  const sortLabel =
    sortMode === "featured" ? "Featured" : sortMode === "az" ? "A-Z" : "Z-A";

  const filteredShopCards = useMemo(() => {
    const searchValue = searchTerm.trim().toLowerCase();

    const cards = shopCards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchValue) ||
        card.id.toLowerCase().includes(searchValue);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(card.id);

      return matchesSearch && matchesCategory;
    });

    if (sortMode === "az") {
      return [...cards].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortMode === "za") {
      return [...cards].sort((a, b) => b.title.localeCompare(a.title));
    }

    return cards;
  }, [searchTerm, selectedCategories, sortMode]);

  const toggleCategory = (categoryId: UniversalShopCardId) => {
    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId]
    );
  };

const handleNavClick = (
  event: MouseEvent<HTMLAnchorElement>,
  action: () => void
) => {
  event.preventDefault();
  setMobileMenuOpen(false);
  action();
};

const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  setMobileMenuOpen(false);
  router.push("/au/home");
};

  const handleCardClick = (cardId: UniversalShopCardId) => {
    if (onCardSelect) {
      onCardSelect(cardId);
      return;
    }

    router.push(`/au/product/${cardId}`);
  };

  return (
<main
  className="universal-shop-page"
  onClick={() => {
    setCategoryOpen(false);
    setSortOpen(false);
  }}
>      <nav className={`shop-nav-pill ${navHidden ? "shop-nav-pill-hidden" : ""}`}>
  <div className="shop-nav-left">
    <a
      className="shop-logo"
      href="/au/home"
      aria-label="Universal home"
      onClick={handleHomeClick}
    >
      <img src={assets.logo} alt="Universal" draggable={false} />
    </a>

    <div className="shop-nav-links">
      <a
        className="shop-nav-shop-link"
        href={shopPath}
        onClick={(event) => handleNavClick(event, onShop)}
      >
        Shop Gift Cards
      </a>

      <a
        className="shop-nav-desktop-link"
        href={howPath}
        onClick={(event) => handleNavClick(event, onHow)}
      >
        How it Works
      </a>

      <a
        className="shop-nav-desktop-link"
        href={trackerPath}
        onClick={(event) => handleNavClick(event, onTracker)}
      >
        Gift Tracker
      </a>
    </div>
  </div>

  <div className="shop-nav-actions">
    <div className="shop-country-pill" aria-label="Shopping in Australia">
      You are currently
      <br />
      shopping in Australia 🇦🇺
    </div>

    <button className="shop-login-btn" type="button">
      Log in
    </button>

    <button className="shop-signup-btn" type="button">
      Sign up
    </button>

    <button
      className={`shop-mobile-menu-button ${
        mobileMenuOpen ? "is-open" : ""
      }`}
      type="button"
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      aria-expanded={mobileMenuOpen}
      onClick={() => setMobileMenuOpen((current) => !current)}
    >
      <span />
      <span />
      <span />
    </button>
  </div>

  {mobileMenuOpen && (
    <div className="shop-mobile-nav-menu">
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
        className="shop-mobile-nav-signup"
        type="button"
        onClick={() => setMobileMenuOpen(false)}
      >
        Sign up free
      </button>
    </div>
  )}
</nav>

      <section className="shop-hero">
        <video
          className="shop-hero-video"
          src={assets.heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="shop-hero-overlay" />

        <div className="shop-hero-content">
          <p>Universal gift cards</p>
          <h1>Choose the gift card for their next Universal moment.</h1>
        </div>
      </section>

      <section className="shop-tools" aria-label="Shop filters">
<label className="shop-search" aria-label="Search gift cards">
  <svg
    className="shop-search-icon"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      cx="13"
      cy="13"
      r="8.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.7"
    />

    {/* Original desktop handle */}
    <line
      className="shop-search-handle-desktop"
      x1="19.2"
      y1="19.2"
      x2="27"
      y2="27"
      stroke="currentColor"
      strokeWidth="2.7"
      strokeLinecap="round"
    />

    {/* Mobile handle overlaps the circle so there is never a gap */}
<line
  className="shop-search-handle-mobile"
  x1="18.9"
  y1="19.6"
  x2="27"
  y2="27.7"
  stroke="currentColor"
  strokeWidth="2.7"
  strokeLinecap="round"
/>
  </svg>

  <input
    type="search"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Search for a gift card"
  />
</label>

<div
  className="shop-dropdown"
  onClick={(event) => event.stopPropagation()}
>          <button
            className="shop-dropdown-trigger"
            type="button"
            onClick={() => {
              setCategoryOpen((current) => !current);
              setSortOpen(false);
            }}
          >
            <span>{categoryLabel}</span>
            <span
              className={`shop-chevron ${
                categoryOpen ? "shop-chevron-open" : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {categoryOpen && (
            <div className="shop-dropdown-menu shop-category-menu">
              {[
                { label: "Movie", value: "movie" },
                { label: "Fuel", value: "fuel" },
                { label: "Merch", value: "merch" },
              ].map((option) => {
                const isSelected = selectedCategories.includes(
                  option.value as UniversalShopCardId
                );

                return (
                  <button
                    className={`shop-category-option ${
                      isSelected ? "shop-category-option-selected" : ""
                    }`}
                    type="button"
                    key={option.value}
                    onClick={() =>
                      toggleCategory(option.value as UniversalShopCardId)
                    }
                  >
                    <span
                      className={`shop-checkbox ${
                        isSelected ? "shop-checkbox-selected" : ""
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected ? "✓" : ""}
                    </span>

                    <span>{option.label}</span>
                  </button>
                );
              })}

              <button
                className="shop-clear-btn"
                type="button"
                onClick={() => setSelectedCategories([])}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

<div
  className="shop-dropdown shop-dropdown-small"
  onClick={(event) => event.stopPropagation()}
>          <button
            className="shop-dropdown-trigger"
            type="button"
            onClick={() => {
              setSortOpen((current) => !current);
              setCategoryOpen(false);
            }}
          >
            <span>{sortLabel}</span>
            <span
              className={`shop-chevron ${sortOpen ? "shop-chevron-open" : ""}`}
              aria-hidden="true"
            />
          </button>

          {sortOpen && (
            <div className="shop-dropdown-menu shop-sort-menu">
              {[
                { label: "Featured", value: "featured" },
                { label: "A-Z", value: "az" },
                { label: "Z-A", value: "za" },
              ].map((option) => (
                <button
                  className={sortMode === option.value ? "shop-option-active" : ""}
                  type="button"
                  key={option.value}
                  onClick={() => {
                    setSortMode(option.value as SortMode);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="shop-content">
        <div className="shop-heading">
          <h2>Choose a Universal Gift Card</h2>
          <p>
            For movie days, merch finds or the next family road trip, choose a
            Universal Gift Card made for Australia.
          </p>
        </div>

        <div className="shop-card-grid">
          {filteredShopCards.map((card) => (
            <button
              className={`shop-gift-card shop-gift-card-${card.id}`}
              type="button"
              key={card.id}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="shop-card-image-wrap">
                <img src={card.image} alt={card.title} draggable={false} />
              </div>

              <div className="shop-card-body">
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <style jsx>{`
        .universal-shop-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(13, 83, 177, 0.16) 0%,
              rgba(13, 83, 177, 0) 36%
            ),
            #f2f2ef;
          color: #050505;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
          padding: 186px 0 100px;
          box-sizing: border-box;
        }

        .shop-nav-pill {
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

        .shop-nav-pill-hidden {
          transform: translateX(-50%) translateY(-170%);
          opacity: 0;
          pointer-events: none;
        }

        .shop-nav-left {
          display: flex;
          align-items: center;
          gap: 18px;
          min-width: 0;
          flex: 1 1 auto;
        }

        .shop-logo {
          width: 104px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          cursor: pointer;
          user-select: none;
        }

        .shop-logo img {
          width: 104px;
          height: auto;
          display: block;
        }

        .shop-nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 0 1 auto;
          min-width: 0;
        }

        .shop-nav-links a {
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
            background 160ms ease,
            color 160ms ease;
        }

        .shop-nav-links a:hover,
        .shop-nav-links a:focus-visible {
          border-color: #d7d7d7;
          background: rgba(0, 0, 0, 0.02);
          color: #000;
          outline: none;
        }

        .shop-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
          flex: 0 0 auto;
        }

.shop-country-pill {
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
  cursor: pointer;
  user-select: none;
  transition: background 180ms ease, color 180ms ease;
}

.shop-country-pill:hover {
  background: #000;
  color: #fff;
}

.shop-login-btn,
.shop-signup-btn {
  font-family: inherit;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.shop-login-btn {
  width: 88px;
  height: 50px;
  flex: 0 0 88px;
  border-radius: 8px;
  background: #edeee9;
  color: #000;
  font-size: 17px;
}

.shop-login-btn:hover,
.shop-login-btn:focus-visible {
  border-color: #d7d7d7;
  background: rgba(0, 0, 0, 0.02);
  outline: none;
  transform: translateY(-1px);
}

.shop-signup-btn {
  width: 116px;
  height: 52px;
  flex: 0 0 116px;
  border-radius: 999px;
  background: #000;
  color: #fff;
  font-size: 17px;
}

.shop-signup-btn:hover,
.shop-signup-btn:focus-visible {
  border-color: #d7d7d7;
  background: #115cd0;
  color: #fff;
  outline: none;
  transform: translateY(-1px);
}

        .shop-hero {
          position: relative;
          width: min(1320px, calc(100vw - 112px));
          height: 360px;
          margin: 0 auto;
          border-radius: 72px;
          overflow: hidden;
          background: #06183d;
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.18);
        }

        .shop-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        .shop-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 72% 38%,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(0, 0, 0, 0) 32%
            ),
            linear-gradient(
              90deg,
              rgba(0, 14, 46, 0.78) 0%,
              rgba(0, 42, 110, 0.42) 46%,
              rgba(0, 14, 46, 0.66) 100%
            );
        }

        .shop-hero-content {
          position: absolute;
          left: 64px;
          bottom: 54px;
          width: min(730px, calc(100% - 96px));
          color: #fff;
        }

        .shop-hero-content p {
          margin: 0 0 14px;
          font-size: 21px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.01em;
        }

        .shop-hero-content h1 {
          margin: 0;
          font-size: 48px;
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -1.2px;
        }

        .shop-tools {
          width: min(1320px, calc(100vw - 112px));
          margin: 70px auto 0;
          display: grid;
          grid-template-columns:
            minmax(360px, 1.45fr)
            minmax(260px, 0.9fr)
            minmax(180px, 0.55fr);
          gap: 26px;
        }

        .shop-search,
        .shop-dropdown-trigger {
          position: relative;
          height: 76px;
          border: 0;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 16px 38px rgba(0, 0, 0, 0.13);
          display: flex;
          align-items: center;
          box-sizing: border-box;
          color: #8f8f8f;
          font-family: inherit;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }

        .shop-search {
          gap: 24px;
          padding: 0 34px;
        }

        .shop-search input {
          width: 100%;
          height: 42px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #000;
          caret-color: #000;
          font-family: inherit;
          font-size: 24px;
          font-weight: 700;
          line-height: 42px;
          padding: 0;
          transform: translateY(1px);
        }

        .shop-search input::placeholder {
          color: #8f8f8f;
          opacity: 1;
        }

        .shop-search input::-webkit-search-cancel-button {
          display: none;
        }

        .shop-search-icon {
          position: relative;
          width: 34px;
          height: 34px;
          border: 5px solid #050505;
          border-radius: 999px;
          flex: 0 0 auto;
          box-sizing: border-box;
        }

        .shop-search-icon::after {
          content: "";
          position: absolute;
          width: 17px;
          height: 5px;
          border-radius: 999px;
          background: #050505;
          right: -13px;
          bottom: -8px;
          transform: rotate(45deg);
        }

        .shop-dropdown {
          position: relative;
          min-width: 0;
        }

        .shop-dropdown-trigger {
          width: 100%;
          justify-content: space-between;
          padding: 0 34px;
          cursor: pointer;
          text-align: left;
        }

        .shop-dropdown-trigger span:first-child {
          display: block;
          transform: translateY(1px);
        }

        .shop-chevron {
          width: 18px;
          height: 18px;
          border-right: 6px solid #115cd0;
          border-bottom: 6px solid #115cd0;
          transform: translateY(-4px) rotate(45deg);
          border-radius: 2px;
          flex: 0 0 auto;
        }

        .shop-chevron-open {
          transform: translateY(4px) rotate(225deg);
        }

        .shop-dropdown-menu {
          position: absolute;
          top: calc(100% + 18px);
          left: 0;
          z-index: 40;
          width: min(430px, calc(100vw - 80px));
          padding: 22px 24px;
          border-radius: 32px;
          background: #fff;
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.18),
            0 2px 8px rgba(0, 0, 0, 0.08);
          box-sizing: border-box;
        }

        .shop-category-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .shop-category-option {
          width: 100%;
          height: 54px;
          padding: 0 14px;
          border: 0;
          border-radius: 18px;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 18px;
          color: #000;
          font-family: inherit;
          font-size: 23px;
          font-weight: 700;
          line-height: 1;
          text-align: left;
          cursor: pointer;
          transition:
            background 160ms ease,
            color 160ms ease;
        }

        .shop-category-option:hover,
        .shop-category-option:focus-visible,
        .shop-category-option-selected {
          background: rgba(17, 92, 208, 0.08);
          color: #115cd0;
          outline: none;
        }

        .shop-checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid #8f8f8f;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #115cd0;
          font-size: 17px;
          font-weight: 700;
          line-height: 1;
          flex: 0 0 auto;
          box-sizing: border-box;
          background: #fff;
        }

        .shop-checkbox-selected {
          border-color: #115cd0;
          background: rgba(17, 92, 208, 0.08);
          color: #115cd0;
        }

        .shop-clear-btn {
          width: 100%;
          height: 60px;
          margin-top: 10px;
          border: 0;
          border-radius: 999px;
          background: #eeeeec;
          color: #000;
          font-family: inherit;
          font-size: 25px;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          text-align: center;
          transition: background 160ms ease;
        }

        .shop-clear-btn:hover,
        .shop-clear-btn:focus-visible {
          background: #e1e1df;
          outline: none;
        }

        .shop-sort-menu {
          width: min(320px, calc(100vw - 80px));
        }

        .shop-sort-menu button {
          width: 100%;
          height: 56px;
          border: 0;
          border-radius: 18px;
          background: transparent;
          color: #000;
          font-family: inherit;
          font-size: 23px;
          font-weight: 700;
          line-height: 1;
          text-align: left;
          padding: 0 20px;
          cursor: pointer;
        }

        .shop-sort-menu button:hover,
        .shop-sort-menu button:focus-visible,
        .shop-sort-menu .shop-option-active {
          background: rgba(17, 92, 208, 0.08);
          color: #115cd0;
          outline: none;
        }

        .shop-content {
          width: min(1320px, calc(100vw - 112px));
          margin: 58px auto 0;
        }

        .shop-heading h2 {
          margin: 0;
          font-size: 44px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1px;
          color: #000;
        }

        .shop-heading p {
          margin: 20px 0 0;
          width: 100%;
          max-width: none;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.14;
          color: #080808;
          letter-spacing: -0.7px;
          white-space: nowrap;
        }

        .shop-card-grid {
          margin-top: 42px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
        }

        .shop-gift-card {
          width: 100%;
          padding: 0;
          border: 0;
          border-radius: 22px;
          background: #fff;
          overflow: hidden;
          text-align: left;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .shop-gift-card:hover,
        .shop-gift-card:focus-visible {
          transform: translateY(-8px);
          box-shadow: 0 28px 66px rgba(0, 0, 0, 0.2);
          outline: none;
        }

.shop-card-image-wrap {
  width: 100%;
  aspect-ratio: 1.62 / 1;
  background: #05143a;
  overflow: hidden;
}

.shop-card-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

        .shop-card-body {
          padding: 26px 28px 30px;
          min-height: 132px;
          box-sizing: border-box;
        }

        .shop-card-body h3 {
          margin: 0;
          color: #000;
          font-size: 27px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.3px;
          white-space: pre-line;
        }

        .shop-card-body p {
          margin: 14px 0 0;
          color: #777;
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
        }

        @media (min-width: 1500px) {
          .shop-nav-pill {
            width: min(1500px, calc(100vw - 110px));
            height: 98px;
            padding: 0 48px;
            gap: 28px;
          }

          .shop-nav-left {
            gap: 24px;
          }

          .shop-logo {
            width: 122px;
            height: 68px;
          }

          .shop-logo img {
            width: 122px;
          }

          .shop-nav-links {
            gap: 8px;
          }

          .shop-nav-links a {
            height: 54px;
            padding: 0 19px;
            font-size: 21px;
          }

          .shop-country-pill {
            width: 280px;
            height: 66px;
            flex-basis: 280px;
            font-size: 17px;
          }

          .shop-login-btn {
            width: 105px;
            height: 60px;
            flex-basis: 105px;
            font-size: 19px;
          }

          .shop-signup-btn {
            width: 135px;
            height: 62px;
            flex-basis: 135px;
            font-size: 19px;
          }
        }

        @media (max-width: 1200px) {
          .shop-nav-pill {
            width: calc(100vw - 40px);
            height: 80px;
            padding: 0 26px;
            gap: 18px;
          }

          .shop-nav-links a {
            font-size: 16px;
            padding: 0 14px;
          }

          .shop-country-pill {
            display: none;
          }

          .shop-hero,
          .shop-tools,
          .shop-content {
            width: calc(100vw - 56px);
          }

          .shop-tools {
            grid-template-columns: 1fr 0.72fr;
          }

          .shop-dropdown-small {
            display: none;
          }

          .shop-heading p {
            white-space: normal;
          }

          .shop-card-grid {
            gap: 24px;
          }

          .shop-card-body h3 {
            font-size: 23px;
          }
        }

        @media (max-width: 760px) {
          .universal-shop-page {
            padding-top: 128px;
          }

          .shop-nav-pill {
            top: 28px;
            width: calc(100vw - 28px);
            height: 72px;
            padding: 0 18px;
          }

          .shop-logo,
          .shop-logo img {
            width: 78px;
          }

          .shop-nav-links {
            display: none;
          }

          .shop-login-btn {
            display: none;
          }

          .shop-signup-btn {
            width: 96px;
            height: 44px;
            font-size: 14px;
          }

          .shop-hero {
            width: calc(100vw - 32px);
            height: 420px;
            border-radius: 36px;
          }

          .shop-hero-content {
            left: 28px;
            bottom: 36px;
            width: calc(100% - 56px);
          }

          .shop-hero-content h1 {
            font-size: 34px;
          }

          .shop-tools {
            width: calc(100vw - 32px);
            margin-top: 34px;
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .shop-search,
          .shop-dropdown-trigger {
            height: 66px;
            font-size: 19px;
            padding: 0 24px;
          }

          .shop-search input {
            height: 36px;
            font-size: 19px;
            line-height: 36px;
          }

          .shop-dropdown-menu {
            width: 100%;
            padding: 20px;
            border-radius: 28px;
          }

          .shop-category-option {
            height: 50px;
            font-size: 21px;
          }

          .shop-clear-btn {
            height: 56px;
            font-size: 22px;
          }

          .shop-sort-menu button {
            font-size: 19px;
          }

          .shop-chevron {
            width: 14px;
            height: 14px;
            border-right-width: 5px;
            border-bottom-width: 5px;
          }

          .shop-content {
            width: calc(100vw - 32px);
            margin-top: 42px;
          }

          .shop-heading h2 {
            font-size: 34px;
          }

          .shop-heading p {
            font-size: 20px;
            white-space: normal;
          }

          .shop-card-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .shop-card-body h3 {
            font-size: 25px;
          }
        }
          /* =========================================================
   FINAL UNIVERSAL SHOP MOBILE
   Two cards per row and homepage-style mobile navigation.
   Desktop remains untouched.
   ========================================================= */

.shop-mobile-menu-button,
.shop-mobile-nav-menu {
  display: none;
}

@media (max-width: 760px) {
  .universal-shop-page {
    width: 100% !important;
    min-height: 100dvh !important;
    padding:
      calc(
        max(
            52px,
            calc(env(safe-area-inset-top, 0px) + 12px)
          ) + 23vw
      )
      0
      16vw !important;
    overflow-x: hidden !important;
  }

  /* MOBILE WHITE NAV */

  .shop-nav-pill {
    position: fixed !important;
    left: 3.5398vw !important;
    right: auto !important;
    top: max(
      52px,
      calc(env(safe-area-inset-top, 0px) + 12px)
    ) !important;

    width: 92.9204vw !important;
    max-width: none !important;
    height: 16.8142vw !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 1px solid #ebebeb !important;
    border-radius: 11.0619vw !important;
    background: #ffffff !important;

    transform: none !important;
    box-shadow: none !important;
    overflow: visible !important;
    z-index: 1000 !important;
  }

  .shop-nav-pill-hidden {
    transform: translateY(-150%) !important;
    opacity: 1 !important;
  }

  .shop-nav-left,
  .shop-nav-actions {
    position: static !important;
    display: block !important;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Universal logo */

  .shop-logo {
    position: absolute !important;
    display: flex !important;
    left: 3.8vw !important;
    top: 50% !important;

    width: 13vw !important;
    height: 10vw !important;
    flex: none !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;

    transform: translateY(-50%) !important;
    z-index: 5 !important;
  }

  .shop-logo img {
    display: block !important;
    width: 13vw !important;
    max-width: none !important;
    height: auto !important;
    object-fit: contain !important;
  }

  /* Shop Gift Cards */

  .shop-nav-links {
    position: static !important;
    display: block !important;
    width: auto !important;
    height: auto !important;
  }

  .shop-nav-links .shop-nav-desktop-link {
    display: none !important;
  }

  .shop-nav-links .shop-nav-shop-link {
    position: absolute !important;
    display: flex !important;

    left: 17.8vw !important;
    top: 50% !important;

    width: 26vw !important;
    height: 6vw !important;

    align-items: center !important;
    justify-content: flex-start !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;

    color: #111111 !important;
    font-size: 3.35vw !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.05vw !important;
    white-space: nowrap !important;

    transform: translateY(-50%) !important;
    z-index: 5 !important;
  }

  /* Blue country pill */

  .shop-country-pill {
    position: absolute !important;
    display: flex !important;

    left: 46.8vw !important;
    top: 50% !important;

    width: 31.2vw !important;
    height: 7.35vw !important;
    flex: none !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 1.4vw !important;

    border: 0 !important;
    border-radius: 999px !important;

    background: #115cd0 !important;
    color: #ffffff !important;

    font-size: 1.82vw !important;
    font-weight: 700 !important;
    line-height: 0.98 !important;
    letter-spacing: -0.015vw !important;
    text-align: center !important;
    white-space: normal !important;

    transform: translateY(-50%) !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    z-index: 8 !important;
  }

  .shop-country-pill:hover {
    background: #115cd0 !important;
  }

  .shop-login-btn,
  .shop-signup-btn {
    display: none !important;
  }

  /* Hamburger */

  .shop-mobile-menu-button {
    position: absolute !important;
    display: flex !important;

    right: 4.8vw !important;
    top: 50% !important;

    width: 7.9646vw !important;
    height: 7.9646vw !important;

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

  .shop-mobile-menu-button span {
    display: block !important;
    width: 5.7522vw !important;
    height: 0.4425vw !important;
    min-height: 1.5px !important;

    border-radius: 999px !important;
    background: #111111 !important;

    transition:
      transform 180ms ease,
      opacity 180ms ease !important;
  }

  .shop-mobile-menu-button.is-open span:nth-child(1) {
    transform: translateY(1.3274vw) rotate(45deg) !important;
  }

  .shop-mobile-menu-button.is-open span:nth-child(2) {
    opacity: 0 !important;
  }

  .shop-mobile-menu-button.is-open span:nth-child(3) {
    transform: translateY(-1.3274vw) rotate(-45deg) !important;
  }

  /* Mobile dropdown menu */

  .shop-mobile-nav-menu {
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

  .shop-mobile-nav-menu button {
    display: flex !important;
    width: 100% !important;
    height: 10.6195vw !important;

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
  }

  .shop-mobile-nav-menu .shop-mobile-nav-signup {
    background: #000000 !important;
    color: #ffffff !important;
  }

  /* HERO */

  .shop-hero {
    width: 92vw !important;
    height: 70vw !important;
    margin: 0 auto !important;

    border-radius: 7vw !important;
    box-shadow: 0 5vw 14vw rgba(0, 0, 0, 0.17) !important;
  }

  .shop-hero-video {
    object-fit: cover !important;
    object-position: center center !important;
  }

  .shop-hero-content {
    left: 6vw !important;
    bottom: 6vw !important;

    width: 78vw !important;
  }

  .shop-hero-content p {
    margin: 0 0 2.5vw !important;

    font-size: 3.8vw !important;
    font-weight: 700 !important;
  }

  .shop-hero-content h1 {
    font-size: 7.5vw !important;
    line-height: 0.98 !important;
    letter-spacing: -0.22vw !important;
  }

  /* SEARCH AND FILTERS */

  .shop-tools {
    display: flex !important;
    width: 92vw !important;

    flex-direction: column !important;
    gap: 3vw !important;

    margin: 7vw auto 0 !important;
  }

  .shop-dropdown-small {
    display: block !important;
  }

  .shop-search,
  .shop-dropdown-trigger {
    width: 100% !important;
    height: 13.5vw !important;

    padding: 0 5vw !important;

    border-radius: 999px !important;

    font-size: 4vw !important;
    box-shadow: 0 3vw 8vw rgba(0, 0, 0, 0.1) !important;
  }

  .shop-search {
    gap: 4vw !important;
  }

  .shop-search input {
    min-width: 0 !important;
    height: 10vw !important;

    font-size: 16px !important;
    line-height: 10vw !important;
    transform: none !important;
  }

  .shop-search input::placeholder {
    font-size: 16px !important;
  }

  .shop-search-icon {
    width: 6vw !important;
    height: 6vw !important;

    border-width: 0.8vw !important;
  }

  .shop-search-icon::after {
    width: 3vw !important;
    height: 0.8vw !important;

    right: -2.2vw !important;
    bottom: -1.5vw !important;
  }

  .shop-dropdown-menu {
    position: relative !important;

    left: auto !important;
    right: auto !important;
    top: auto !important;

    width: 100% !important;

    margin: 3vw 0 0 !important;
    padding: 4vw !important;

    border-radius: 5vw !important;
  }

  .shop-category-option {
    height: 11vw !important;
    padding: 0 3vw !important;
    gap: 3vw !important;

    border-radius: 3vw !important;

    font-size: 4vw !important;
  }

  .shop-checkbox {
    width: 5vw !important;
    height: 5vw !important;

    border-width: 0.4vw !important;
    border-radius: 1vw !important;

    font-size: 3.2vw !important;
  }

  .shop-clear-btn {
    height: 12vw !important;
    margin-top: 3vw !important;

    font-size: 4vw !important;
  }

  .shop-sort-menu {
    width: 100% !important;
  }

  .shop-sort-menu button {
    height: 11vw !important;
    padding: 0 4vw !important;

    border-radius: 3vw !important;

    font-size: 4vw !important;
  }

  .shop-chevron {
    width: 3vw !important;
    height: 3vw !important;

    border-right-width: 1vw !important;
    border-bottom-width: 1vw !important;

    transform: translateY(-0.8vw) rotate(45deg) !important;
  }

  .shop-chevron-open {
    transform: translateY(0.8vw) rotate(225deg) !important;
  }

  /* CONTENT */

  .shop-content {
    width: 92vw !important;
    margin: 9vw auto 0 !important;
  }

  .shop-heading h2 {
    font-size: 7.6vw !important;
    line-height: 0.98 !important;
    letter-spacing: -0.25vw !important;
  }

  .shop-heading p {
    width: 100% !important;
    margin: 3.5vw 0 0 !important;

    font-size: 4vw !important;
    line-height: 1.22 !important;
    letter-spacing: -0.06vw !important;
    white-space: normal !important;
  }

  /* TWO GIFT CARDS PER ROW */

  .shop-card-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;

    width: 100% !important;

    column-gap: 3.5vw !important;
    row-gap: 5vw !important;

    margin-top: 7vw !important;
  }

  .shop-gift-card {
    width: 100% !important;
    min-width: 0 !important;

    border-radius: 4.2vw !important;

    box-shadow: 0 3vw 8vw rgba(0, 0, 0, 0.12) !important;
  }

  .shop-gift-card:hover,
  .shop-gift-card:focus-visible {
    transform: none !important;
    box-shadow: 0 3vw 8vw rgba(0, 0, 0, 0.12) !important;
  }

  .shop-card-image-wrap {
    width: 100% !important;
    aspect-ratio: 1.62 / 1 !important;

    border-radius: 4.2vw 4.2vw 0 0 !important;
  }

  .shop-card-image-wrap img {
    width: 100% !important;
    height: 100% !important;

    object-fit: cover !important;
    object-position: center !important;
  }

  .shop-card-body {
    min-height: 22vw !important;

    padding: 3.4vw 3.2vw 3.8vw !important;
  }

  .shop-card-body h3 {
    margin: 0 !important;

    font-size: 3.65vw !important;
    font-weight: 700 !important;
    line-height: 1.08 !important;
    letter-spacing: -0.08vw !important;

    white-space: pre-line !important;
  }

  .shop-card-body p {
    margin: 2.5vw 0 0 !important;

    font-size: 3vw !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }
}
/* =========================================================
   FINAL SEARCH ALIGNMENT
   Uses a real SVG so the handle always stays attached.
   ========================================================= */

.shop-search {
  position: relative !important;
  display: grid !important;
  grid-template-columns: 38px minmax(0, 1fr) !important;
  align-items: center !important;
  column-gap: 18px !important;

  width: 100% !important;
  padding: 0 30px !important;

  overflow: hidden !important;
  box-sizing: border-box !important;
}

.shop-search-icon {
  position: static !important;
  display: block !important;

  width: 38px !important;
  height: 38px !important;

  color: #050505 !important;

  border: 0 !important;
  background: transparent !important;

  transform: none !important;
  pointer-events: none !important;
  overflow: visible !important;
}

/* Disable all previous CSS-drawn icon parts */

.shop-search-icon::before,
.shop-search-icon::after {
  content: none !important;
  display: none !important;
}

.shop-search input {
  position: static !important;
  display: block !important;

  width: 100% !important;
  min-width: 0 !important;
  height: 100% !important;

  margin: 0 !important;
  padding: 0 !important;

  border: 0 !important;
  outline: 0 !important;
  background: transparent !important;

  color: #000000 !important;
  font-family: inherit !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: normal !important;

  transform: none !important;
  box-sizing: border-box !important;
  appearance: none !important;
  -webkit-appearance: none !important;
}

.shop-search input::placeholder {
  color: #8f8f8f !important;
  opacity: 1 !important;
}

@media (max-width: 760px) {
  .shop-search {
    grid-template-columns: 31px minmax(0, 1fr) !important;
    column-gap: 12px !important;
    padding: 0 18px !important;
  }

  .shop-search-icon {
    width: 31px !important;
    height: 31px !important;
  }

  .shop-search input {
    height: 100% !important;
    font-size: 16px !important;
    line-height: normal !important;
  }

  .shop-search input::placeholder {
    font-size: 16px !important;
  }
}
    /* =========================================================
   FINAL MOBILE UNIVERSAL CARD CLEANUP
   Desktop remains unchanged.
   ========================================================= */

@media (max-width: 760px) {
  /* Remove the forced title newline on mobile only */

  .shop-card-body h3 {
    min-height: 2.15em !important;
    margin: 0 !important;

    font-size: 3.4vw !important;
    font-weight: 700 !important;
    line-height: 1.075 !important;
    letter-spacing: -0.06vw !important;

    white-space: normal !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
  }

  .shop-card-body {
    min-height: 20vw !important;
    padding: 3.2vw 3.2vw 3.6vw !important;
  }

  .shop-card-body p {
    margin-top: 2.2vw !important;
  }

  /* Remove the white space inside the merch image on mobile only */

  .shop-gift-card-merch .shop-card-image-wrap {
    background: #ffffff !important;
  }

  .shop-gift-card-merch .shop-card-image-wrap img {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;

    object-fit: cover !important;
    object-position: center center !important;

    transform: scale(1.16) translateY(-1.5%) !important;
    transform-origin: center center !important;
  }
}
/* =========================================================
   FINAL MOBILE SEARCH ICON
   Desktop remains completely unchanged.
   ========================================================= */

.shop-search-handle-mobile {
  display: none;
}

@media (max-width: 760px) {
  .shop-search {
    display: grid !important;
    grid-template-columns: 31px minmax(0, 1fr) !important;
    align-items: center !important;
    column-gap: 10px !important;

    padding: 0 18px !important;
  }

  .shop-search-icon {
    position: static !important;
    display: block !important;

    width: 31px !important;
    height: 31px !important;
    min-width: 31px !important;

    margin: 0 !important;
    padding: 0 !important;

    color: #050505 !important;
    border: 0 !important;
    background: transparent !important;

    transform: none !important;
    overflow: visible !important;
    pointer-events: none !important;
  }

  .shop-search-icon::before,
  .shop-search-icon::after {
    content: none !important;
    display: none !important;
  }

  .shop-search-handle-desktop {
    display: none;
  }

  .shop-search-handle-mobile {
    display: block;
  }

  .shop-search input {
    width: 100% !important;
    min-width: 0 !important;
    height: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    font-size: 16px !important;
    line-height: normal !important;

    transform: none !important;
  }
}
  /* FINAL MOBILE SEARCH TEXT CENTRING */

@media (max-width: 760px) {
  .shop-search {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 0 18px !important;
  }

  .shop-search-icon {
    flex: 0 0 31px !important;
  }

  .shop-search input {
    display: block !important;
    flex: 1 1 auto !important;

    width: auto !important;
    min-width: 0 !important;
    height: 31px !important;

    margin: 0 !important;
    padding: 2px 0 0 !important;

    border: 0 !important;
    background: transparent !important;

    font-size: 16px !important;
    line-height: 29px !important;

    transform: none !important;
    appearance: none !important;
    -webkit-appearance: none !important;
  }

  .shop-search input::placeholder {
    font-size: 16px !important;
    line-height: 29px !important;
  }
}
  @media (max-width: 760px) {
  .shop-search {
    align-items: center !important;
  }

  .shop-search-icon {
    align-self: center !important;
    transform: translateY(0) !important;
  }

  .shop-search input {
    height: auto !important;
    padding: 0 !important;
    line-height: 1 !important;
    transform: translateY(2px) !important;
  }
}
      `}</style>
    </main>
  );
}