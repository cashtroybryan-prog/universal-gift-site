"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UniversalGiftTrackerPage() {
  const params = useParams();
  const router = useRouter();

  const rawCountry = params.country;
  const country = typeof rawCountry === "string" ? rawCountry : "au";

  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
const [hasSearched, setHasSearched] = useState(false);
const [navVisible, setNavVisible] = useState(true);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const previousScrollTop = lastScrollY.current;

      if (scrollTop < previousScrollTop) {
        setNavVisible(true);
      }

      if (scrollTop > previousScrollTop && scrollTop > 90) {
        setNavVisible(false);
      }

      if (scrollTop < 20) {
        setNavVisible(true);
      }

      lastScrollY.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateTo = (path: string) => {
  setMobileMenuOpen(false);
  router.push(path);
};

  const trackerReady =
    email.trim().length > 4 && orderNumber.trim().length > 3;

  const handleTrack = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trackerReady) return;

    setHasSearched(true);
  };

  return (
    <main className="tracker-page">
<nav
  className={`shop-nav-pill ${
    navVisible ? "" : "shop-nav-pill-hidden"
  }`}
  aria-label="Main navigation"
>
  <div className="shop-nav-left">
    <a
      className="shop-logo"
      href={`/${country}/home`}
      aria-label="Universal home"
      onClick={(event) => {
        event.preventDefault();
        navigateTo(`/${country}/home`);
      }}
    >
      <img
        src="/images/universal-logo.png"
        alt="Universal"
        draggable={false}
      />
    </a>

    <div className="shop-nav-links">
      <a
        className="shop-nav-shop-link"
        href={`/${country}/shop`}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(`/${country}/shop`);
        }}
      >
        Shop Gift Cards
      </a>

      <a
        className="shop-nav-desktop-link"
        href={`/${country}/how-it-works`}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(`/${country}/how-it-works`);
        }}
      >
        How it Works
      </a>

      <a
        className="shop-nav-desktop-link"
        href={`/${country}/gift-tracker`}
        onClick={(event) => {
          event.preventDefault();
          setMobileMenuOpen(false);
        }}
      >
        Gift Tracker
      </a>
    </div>
  </div>

  <div className="shop-nav-actions">
    <div
      className="shop-country-pill"
      aria-label="Shopping in Australia"
    >
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
      onClick={() =>
        setMobileMenuOpen((current) => !current)
      }
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
        onClick={() =>
          navigateTo(`/${country}/how-it-works`)
        }
      >
        How it Works
      </button>

      <button
        type="button"
        onClick={() => setMobileMenuOpen(false)}
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

      <section className="tracker-shell">
        <div className="tracker-intro">
          <p className="eyebrow">Gift Tracker</p>

          <h1>See where your Universal gift is up to.</h1>

          <p className="intro-copy">
            Enter the email used at checkout and the order number from your
            receipt.
          </p>
        </div>

        <div className="tracker-content">
          <form onSubmit={handleTrack}>
            <label>
              Email used at checkout

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setHasSearched(false);
                }}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Order number

              <input
                type="text"
                value={orderNumber}
                onChange={(event) => {
                  setOrderNumber(event.target.value);
                  setHasSearched(false);
                }}
                placeholder="e.g. UNI-123456"
              />
            </label>

            <button
              type="submit"
              className={trackerReady ? "is-ready" : ""}
              disabled={!trackerReady}
            >
              <span>Track gift</span>

              <svg
                className="button-arrow"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M4 10H16M11 5L16 10L11 15" />
              </svg>
            </button>
          </form>

          {hasSearched ? (
            <section className="status-card">
              <div className="status-header">
                <div>
                  <p>ORDER {orderNumber.toUpperCase()}</p>
                  <h2>Gift sent</h2>
                </div>

                <span>Delivered</span>
              </div>

              <div className="timeline">
                <div className="timeline-row">
                  <i>✓</i>

                  <div>
                    <strong>Order confirmed</strong>
                    <p>Your payment and gift details were received.</p>
                  </div>
                </div>

                <div className="timeline-row">
                  <i>✓</i>

                  <div>
                    <strong>Gift prepared</strong>
                    <p>Your Universal gift was created and personalised.</p>
                  </div>
                </div>

                <div className="timeline-row">
                  <i>✓</i>

                  <div>
                    <strong>Gift sent</strong>
                    <p>The digital gift was sent to the selected recipient.</p>
                  </div>
                </div>
              </div>

              <div className="matched-email">
                Tracking details were matched to <strong>{email}</strong>.
              </div>
            </section>
          ) : (
            <section className="empty-status">
              <span>✦</span>

              <h2>Your gift journey will appear here.</h2>

              <p>
                Enter your order details to check whether the gift is being
                prepared, sent or delivered.
              </p>
            </section>
          )}
        </div>

        <section className="support-card">
          <div>
            <h2>Can’t find your gift?</h2>

            <p>
              Check the email and order number from your receipt or contact
              support for help.
            </p>
          </div>

          <button type="button">Contact support</button>
        </section>
      </section>

      <style jsx>{`
        .tracker-page {
          width: 100%;
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 86% 8%,
              rgba(17, 92, 208, 0.18),
              transparent 25%
            ),
            #f4f4f2;
          color: #000000;
          font-family: "Futura", sans-serif;
          font-weight: 500;
          font-synthesis: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          padding-top: 186px;
        }

        .tracker-page * {
          box-sizing: border-box;
          font-family: inherit;
          font-synthesis: none;
        }

        button,
        input {
          font-family: inherit;
        }

        button {
          cursor: pointer;
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
          background: #ffffff;
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
          color: #000000;
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
          color: #000000;
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
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.08;
          cursor: pointer;
          user-select: none;
          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .shop-country-pill:hover {
          background: #000000;
          color: #ffffff;
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
          color: #000000;
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
          background: #000000;
          color: #ffffff;
          font-size: 17px;
        }

        .shop-signup-btn:hover,
        .shop-signup-btn:focus-visible {
          border-color: #d7d7d7;
          background: #115cd0;
          color: #ffffff;
          outline: none;
          transform: translateY(-1px);
        }

        .tracker-shell {
          width: min(1160px, calc(100% - 48px));
          margin: 0 auto;
          padding: 92px 0 110px;
        }

        .tracker-intro {
          width: 100%;
          max-width: 1160px;
        }

        .eyebrow {
          margin: 0;
          color: #115cd0;
          font-size: 26px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.4px;
        }

        .tracker-intro h1 {
          width: 100%;
          max-width: 1120px;
          margin: 18px 0 0;
          font-size: clamp(54px, 5.5vw, 82px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -3px;
        }

        .intro-copy {
          max-width: 650px;
          margin: 26px 0 0;
          color: #6d6d6d;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.3;
        }

        .tracker-content {
          margin-top: 56px;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 28px;
          align-items: stretch;
        }

        form,
        .status-card,
        .empty-status {
          border: 2px solid #000000;
          border-radius: 30px;
          background: #ffffff;
          padding: 34px;
        }

        form {
          display: grid;
          gap: 24px;
        }

        label {
          display: grid;
          gap: 10px;
          font-size: 17px;
          font-weight: 700;
        }

        input {
          width: 100%;
          height: 62px;
          border: 1.5px solid #cfcfcf;
          border-radius: 13px;
          background: #ffffff;
          color: #000000;
          font-size: 18px;
          font-weight: 500;
          padding: 0 18px;
          outline: none;
        }

        input:focus {
          border-color: #115cd0;
        }

        input::placeholder {
          color: #999999;
          font-weight: 500;
        }

        form button {
          height: 68px;
          margin-top: 4px;
          border: 0;
          border-radius: 999px;
          background: #d4d4d1;
          color: #777777;
          font-size: 21px;
          font-weight: 700;
          cursor: not-allowed;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        form button.is-ready {
          background: #115cd0;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 18px 42px rgba(17, 92, 208, 0.22);
        }

        .button-arrow {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .empty-status {
          min-height: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .empty-status > span {
          width: 62px;
          height: 62px;
          border-radius: 999px;
          background: #115cd0;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
        }

        .empty-status h2 {
          max-width: 390px;
          margin: 24px 0 0;
          font-size: 31px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -1px;
        }

        .empty-status p {
          max-width: 400px;
          margin: 15px 0 0;
          color: #777777;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.4;
        }

        .status-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 22px;
        }

        .status-header p {
          margin: 0;
          color: #777777;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .status-header h2 {
          margin: 8px 0 0;
          font-size: 39px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1px;
        }

        .status-header > span {
          border-radius: 999px;
          background: #e7f6df;
          color: #2c7a15;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 14px;
        }

        .timeline {
          margin-top: 34px;
          display: grid;
          gap: 24px;
        }

        .timeline-row {
          position: relative;
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 16px;
        }

        .timeline-row:not(:last-child)::after {
          content: "";
          position: absolute;
          left: 16px;
          top: 34px;
          width: 2px;
          height: calc(100% + 6px);
          background: #115cd0;
        }

        .timeline-row i {
          position: relative;
          z-index: 1;
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: #115cd0;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
        }

        .timeline-row strong {
          display: block;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.1;
        }

        .timeline-row p {
          margin: 7px 0 0;
          color: #777777;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.35;
        }

        .matched-email {
          margin-top: 30px;
          border-radius: 16px;
          background: #f1f4f9;
          color: #606060;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          padding: 16px 18px;
        }

        .matched-email strong {
          font-weight: 700;
        }

        .support-card {
          margin-top: 28px;
          border-radius: 30px;
          background: #030b1d;
          color: #ffffff;
          padding: 40px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .support-card h2 {
          margin: 0;
          font-size: 29px;
          font-weight: 700;
          line-height: 1;
        }

        .support-card p {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.68);
          font-size: 16px;
          font-weight: 500;
          line-height: 1.35;
        }

        .support-card button {
          flex: 0 0 auto;
          height: 52px;
          border: 0;
          border-radius: 999px;
          background: #ffffff;
          color: #000000;
          font-size: 16px;
          font-weight: 700;
          padding: 0 24px;
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
            padding: 0 14px;
            font-size: 16px;
          }

          .shop-country-pill {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .tracker-content {
            grid-template-columns: 1fr;
          }

          .support-card {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 760px) {
          .tracker-page {
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
            flex-basis: 96px;
            font-size: 14px;
          }
        }

        @media (max-width: 620px) {
          .tracker-shell {
            width: calc(100% - 32px);
            padding: 66px 0 80px;
          }

          .eyebrow {
            font-size: 22px;
          }

          .tracker-intro h1 {
            font-size: 52px;
            line-height: 0.98;
            letter-spacing: -2.5px;
          }

          .intro-copy {
            font-size: 18px;
          }

          form,
          .status-card,
          .empty-status {
            padding: 25px;
          }

          .status-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .support-card {
            padding: 30px;
          }
        }
/* =========================================================
   FINAL GIFT TRACKER MOBILE
   Matches the approved Universal homepage navigation.
   Desktop remains completely untouched.
   ========================================================= */

.shop-mobile-menu-button,
.shop-mobile-nav-menu {
  display: none;
}

@media (max-width: 760px) {
  /* PAGE POSITIONING */

  .tracker-page {
    width: 100% !important;
    min-height: 100dvh !important;

    padding-top:
      calc(
        max(
            14px,
            calc(env(safe-area-inset-top, 0px) + 8px)
          ) + 21vw
      ) !important;

    overflow-x: hidden !important;
  }

  /* MOBILE WHITE NAV */

  .tracker-page .shop-nav-pill {
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
    box-sizing: border-box !important;

    transform: none !important;
    z-index: 1000 !important;
  }

  .tracker-page .shop-nav-pill-hidden {
    transform: translateY(-150%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  /* Remove desktop flex positioning */

  .tracker-page .shop-nav-left,
  .tracker-page .shop-nav-actions,
  .tracker-page .shop-nav-links {
    display: contents !important;
  }

  /* UNIVERSAL LOGO */

  .tracker-page .shop-logo {
    position: absolute !important;
    display: flex !important;

    left: 3.8vw !important;
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

  .tracker-page .shop-logo img {
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

  /* NAVIGATION LINKS */

  .tracker-page .shop-nav-links .shop-nav-desktop-link {
    display: none !important;
  }

  .tracker-page .shop-nav-links .shop-nav-shop-link {
    position: absolute !important;
    display: flex !important;

    left: 19.2vw !important;
    top: calc(50% + 0.45vw) !important;

    width: 28.5vw !important;
    height: 6vw !important;

    align-items: center !important;
    justify-content: flex-start !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 0 !important;
    border-radius: 0 !important;

    background: transparent !important;
    color: #111111 !important;

    font-family: Futura, "Trebuchet MS", Arial, sans-serif !important;
    font-size: clamp(11.5px, 3.35vw, 14.5px) !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.05vw !important;

    text-align: left !important;
    white-space: nowrap !important;

    transform: translateY(-50%) !important;

    z-index: 5 !important;
  }

  .tracker-page .shop-nav-links .shop-nav-shop-link:hover,
  .tracker-page .shop-nav-links .shop-nav-shop-link:focus-visible {
    border: 0 !important;
    background: transparent !important;
    outline: none !important;
  }

  /* AUSTRALIA BUBBLE */

  .tracker-page .shop-country-pill,
  .tracker-page .shop-country-pill:hover {
    position: absolute !important;
    display: flex !important;

    left: 49vw !important;
    right: auto !important;
    top: 50% !important;

    width: 32vw !important;
    min-width: 0 !important;
    max-width: none !important;
    height: 8.3vw !important;
    min-height: 27px !important;
    max-height: 34px !important;

    flex: none !important;
    flex-basis: auto !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 1.4vw !important;

    border: 0 !important;
    border-radius: 999px !important;

    background: #115cd0 !important;
    color: #ffffff !important;

    font-family: Futura, "Trebuchet MS", Arial, sans-serif !important;
    font-size: clamp(7.4px, 2.15vw, 9.4px) !important;
    font-weight: 700 !important;
    line-height: 1.02 !important;
    letter-spacing: -0.02vw !important;

    text-align: center !important;
    white-space: nowrap !important;

    overflow: hidden !important;
    box-sizing: border-box !important;

    transform: translateY(-50%) !important;

    z-index: 8 !important;
  }

  .tracker-page .shop-login-btn,
  .tracker-page .shop-signup-btn {
    display: none !important;
  }

  /* HAMBURGER */

  .tracker-page .shop-mobile-menu-button {
    position: absolute !important;
    display: flex !important;

    right: 3.2vw !important;
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

  .tracker-page .shop-mobile-menu-button span {
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

  .tracker-page
    .shop-mobile-menu-button.is-open
    span:nth-child(1) {
    transform: translateY(1.3274vw) rotate(45deg) !important;
  }

  .tracker-page
    .shop-mobile-menu-button.is-open
    span:nth-child(2) {
    opacity: 0 !important;
  }

  .tracker-page
    .shop-mobile-menu-button.is-open
    span:nth-child(3) {
    transform: translateY(-1.3274vw) rotate(-45deg) !important;
  }

  /* OPEN MOBILE MENU */

  .tracker-page .shop-mobile-nav-menu {
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

  .tracker-page .shop-mobile-nav-menu button {
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

    font-family: Futura, "Trebuchet MS", Arial, sans-serif !important;
    font-size: 3.5398vw !important;
    font-weight: 700 !important;
    text-align: left !important;

    cursor: pointer !important;
  }

  .tracker-page
    .shop-mobile-nav-menu
    .shop-mobile-nav-signup {
    background: #000000 !important;
    color: #ffffff !important;
  }

  /* TRACKER CONTENT */

  .tracker-page .tracker-shell {
    width: calc(100% - 32px) !important;
    margin: 0 auto !important;
    padding: 7vw 0 18vw !important;
  }

  .tracker-page .tracker-intro {
    width: 100% !important;
    max-width: none !important;
    margin: 0 auto !important;
    text-align: center !important;
  }

  .tracker-page .tracker-intro .eyebrow {
    width: 100% !important;
    margin: 0 auto !important;

    color: #115cd0 !important;
    font-size: 5.2vw !important;
    font-weight: 700 !important;
    line-height: 1 !important;

    text-align: center !important;
  }

  .tracker-page .tracker-intro h1 {
    width: 100% !important;
    max-width: 100% !important;

    margin: 4vw auto 0 !important;

    color: #000000 !important;
    font-size: 10.5vw !important;
    font-weight: 700 !important;
    line-height: 1.01 !important;
    letter-spacing: -0.45vw !important;

    text-align: center !important;
  }

  .tracker-page .tracker-intro .intro-copy {
    width: 100% !important;
    max-width: 82vw !important;

    margin: 5vw auto 0 !important;

    color: #6d6d6d !important;
    font-size: 4.2vw !important;
    font-weight: 500 !important;
    line-height: 1.3 !important;

    text-align: center !important;
  }

  .tracker-page .tracker-content {
    display: flex !important;
    width: 100% !important;
    flex-direction: column !important;
    gap: 5vw !important;
    margin-top: 9vw !important;
  }

  .tracker-page form,
  .tracker-page .status-card,
  .tracker-page .empty-status {
    width: 100% !important;
    padding: 6vw !important;
    border-width: 0.45vw !important;
    border-radius: 6vw !important;
  }

  .tracker-page form {
    gap: 5vw !important;
  }

  .tracker-page label {
    gap: 2.5vw !important;
    font-size: 4vw !important;
  }

  .tracker-page input {
    height: 14vw !important;
    padding: 0 4vw !important;

    border-radius: 3vw !important;

    font-size: 16px !important;
  }

  .tracker-page form button {
    height: 14vw !important;
    margin-top: 1vw !important;

    font-size: 4.5vw !important;
  }

  .tracker-page .empty-status {
    min-height: 75vw !important;
  }

  .tracker-page .empty-status > span {
    width: 15vw !important;
    height: 15vw !important;

    font-size: 6vw !important;
  }

  .tracker-page .empty-status h2 {
    margin-top: 5vw !important;

    font-size: 7vw !important;
    line-height: 1.05 !important;
  }

  .tracker-page .empty-status p {
    margin-top: 3vw !important;

    font-size: 3.8vw !important;
    line-height: 1.35 !important;
  }

  .tracker-page .support-card {
    display: flex !important;
    width: 100% !important;

    flex-direction: column !important;
    align-items: flex-start !important;

    gap: 5vw !important;
    margin-top: 5vw !important;
    padding: 6vw !important;

    border-radius: 6vw !important;
  }

  .tracker-page .support-card h2 {
    font-size: 6.5vw !important;
    line-height: 1.05 !important;
  }

  .tracker-page .support-card p {
    margin-top: 3vw !important;

    font-size: 3.8vw !important;
    line-height: 1.35 !important;
  }

  .tracker-page .support-card button {
    width: 100% !important;
    height: 13vw !important;

    font-size: 4vw !important;
  }
}
      `}</style>
    </main>
  );
}