"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const faqs = [
  {
    question: "What is a Universal Gift Card?",
    answer:
      "A Universal Gift Card is a digital gift designed around Universal moments. Choose from Movie Day, Merch or Fuel, then select the value and send it digitally.",
  },
  {
    question: "Which Universal Gift Card should I choose?",
    answer:
      "Choose Movie Day for cinema, dining and snacks, Merch for toys, collectibles and fan favourites, or Fuel for road trips, petrol stops, snacks and drinks.",
  },
  {
    question: "Can I choose the gift card amount?",
    answer:
      "Yes. Select one of the available values on the product page before continuing to the recipient and personalisation steps.",
  },
  {
    question: "Can I send a Universal Gift Card to someone else?",
    answer:
      "Yes. Choose Someone else, enter the recipient’s details and continue through the gifting flow. You can also purchase the gift card for yourself.",
  },
  {
    question: "Can I add a message, GIF or video?",
    answer:
      "Yes. The personalisation step lets you add a greeting card, GIF, uploaded video or personal message before checkout.",
  },
  {
    question: "How is the gift card delivered?",
    answer:
      "The Universal Gift Card is delivered digitally using the recipient details entered during checkout. A receipt is sent to the purchaser’s email address.",
  },
  {
    question: "Where can the gift card be used?",
    answer:
      "Each card is designed for its relevant Universal experience and can be used at participating Australian locations or retailers, subject to the applicable card terms and restrictions.",
  },
  {
    question: "How do I track a gift?",
    answer:
      "Open Gift Tracker from the navigation bar and enter the email used at checkout together with the order number shown on the receipt.",
  },
  {
    question: "What if the recipient cannot find the gift?",
    answer:
      "First check that the recipient details were entered correctly and review the Gift Tracker. If the gift still cannot be found, contact support with the order number and purchaser email.",
  },
  {
    question: "Do Universal Gift Cards expire?",
    answer:
      "Expiry and usage conditions depend on the selected card. Review the Terms & Conditions shown on the product page before completing the purchase.",
  },
];

export default function UniversalHowItWorksPage() {
  const params = useParams();
  const router = useRouter();

  const rawCountry = params.country;
  const country = typeof rawCountry === "string" ? rawCountry : "au";

const [openFaq, setOpenFaq] = useState<number | null>(0);
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

  return (
    <main className="universal-how-page">
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
          setMobileMenuOpen(false);
        }}
      >
        How it Works
      </a>

      <a
        className="shop-nav-desktop-link"
        href={`/${country}/gift-tracker`}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(`/${country}/gift-tracker`);
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
        onClick={() => {
          setMobileMenuOpen(false);
        }}
      >
        How it Works
      </button>

      <button
        type="button"
        onClick={() =>
          navigateTo(`/${country}/gift-tracker`)
        }
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
      <section className="faq-hero">
        <p>Universal Gift Cards</p>

        <h1>Questions? Answered.</h1>

        <span>
          Everything you need to know about choosing, personalising, sending
          and using a Universal Gift Card.
        </span>
      </section>

      <section
        className="faq-section"
        aria-label="Frequently asked questions"
      >
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <article
                className={`faq-item ${
                  isOpen ? "faq-item-open" : ""
                }`}
                key={faq.question}
              >
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span>{faq.question}</span>

                  <svg
                    className={`faq-chevron ${
                      isOpen ? "faq-chevron-open" : ""
                    }`}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M4 7.5L10 13.5L16 7.5" />
                  </svg>
                </button>

                {isOpen && (
                  <p className="faq-answer">{faq.answer}</p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="faq-support">
        <div>
          <p>Still need help?</p>
          <h2>Track your gift or contact support.</h2>
        </div>

        <div className="faq-support-actions">
          <button
            type="button"
            onClick={() => navigateTo(`/${country}/gift-tracker`)}
          >
            <span>Track a gift</span>

            <svg
              className="button-arrow"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M4 10H16M11 5L16 10L11 15" />
            </svg>
          </button>

          <button
            className="faq-support-secondary"
            type="button"
          >
            Contact support
          </button>
        </div>
      </section>

      <style jsx>{`
        .universal-how-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(17, 92, 208, 0.34) 0%,
              rgba(17, 92, 208, 0) 38%
            ),
            #030b1d;
          color: #ffffff;
          font-family: "Futura", sans-serif;
          font-weight: 500;
          font-synthesis: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          padding: 186px 0 0;
          box-sizing: border-box;
        }

        .universal-how-page * {
          box-sizing: border-box;
          font-family: inherit;
          font-synthesis: none;
        }

        button,
        a {
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
          border: 1px solid #ebebeb;
          border-radius: 999px;
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
          min-width: 0;
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .shop-logo {
          width: 104px;
          height: 58px;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
        }

        .shop-logo img {
          width: 104px;
          height: auto;
          display: block;
        }

        .shop-nav-links {
          min-width: 0;
          flex: 0 1 auto;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .shop-nav-links a {
          height: 46px;
          border: 1px solid transparent;
          border-radius: 999px;
          padding: 0 17px;
          color: #000000;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
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
          margin-left: auto;
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 10px;
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
          border: 1px solid transparent;
          box-sizing: border-box;
          font-weight: 700;
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

        .faq-hero {
          width: min(1180px, calc(100vw - 96px));
          margin: 0 auto;
          padding: 56px 0 48px;
          text-align: center;
        }

        .faq-hero > p {
          margin: 0;
          color: #79aefb;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
        }

        .faq-hero h1 {
          margin: 20px 0 0;
          color: #ffffff;
          font-size: clamp(58px, 6vw, 94px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: -3px;
        }

        .faq-hero > span {
          display: block;
          width: min(720px, 100%);
          margin: 24px auto 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 20px;
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: 0;
        }

        .faq-section {
          width: min(980px, calc(100vw - 96px));
          margin: 0 auto;
          padding: 20px 0 112px;
        }

        .faq-list {
          display: grid;
          gap: 14px;
        }

        .faq-item {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          background: #071b42;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            transform 180ms ease;
        }

        .faq-item:hover {
          border-color: rgba(121, 174, 251, 0.42);
          transform: translateY(-1px);
        }

        .faq-item-open {
          border-color: rgba(121, 174, 251, 0.58);
          background: #0a2860;
        }

        .faq-question {
          width: 100%;
          min-height: 86px;
          border: 0;
          background: transparent;
          color: #ffffff;
          padding: 0 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          text-align: left;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.18;
        }

        .faq-chevron {
          width: 20px;
          height: 20px;
          flex: 0 0 auto;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform: rotate(0deg);
          transition: transform 180ms ease;
        }

        .faq-chevron-open {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-width: 820px;
          margin: -4px 0 0;
          padding: 0 68px 32px 34px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 18px;
          font-weight: 500;
          line-height: 1.45;
          letter-spacing: 0;
        }

        .faq-support {
          width: min(1180px, calc(100vw - 96px));
          margin: 0 auto;
          border-radius: 44px 44px 0 0;
          background: #115cd0;
          color: #ffffff;
          padding: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 44px;
        }

        .faq-support p {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 17px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0;
        }

        .faq-support h2 {
          max-width: 670px;
          margin: 12px 0 0;
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.5px;
        }

        .faq-support-actions {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .faq-support-actions button {
          height: 58px;
          border: 1px solid #ffffff;
          border-radius: 999px;
          background: #ffffff;
          color: #000000;
          padding: 0 26px;
          font-size: 17px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .faq-support-actions .faq-support-secondary {
          background: transparent;
          color: #ffffff;
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

          .faq-support {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 760px) {
          .universal-how-page {
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

          .faq-hero {
            width: calc(100vw - 36px);
            padding: 48px 0 36px;
          }

          .faq-hero h1 {
            font-size: 56px;
            letter-spacing: -2px;
          }

          .faq-hero > span {
            font-size: 17px;
          }

          .faq-section {
            width: calc(100vw - 32px);
            padding-bottom: 76px;
          }

          .faq-question {
            min-height: 76px;
            padding: 0 24px;
            font-size: 18px;
          }

          .faq-answer {
            padding: 0 48px 26px 24px;
            font-size: 16px;
          }

          .faq-support {
            width: calc(100vw - 32px);
            padding: 38px 28px;
            border-radius: 32px 32px 0 0;
          }

          .faq-support h2 {
            font-size: 38px;
          }

          .faq-support-actions {
            width: 100%;
            align-items: stretch;
            flex-direction: column;
          }

          .faq-support-actions button {
            width: 100%;
          }
        }
          /* =========================================================
   FINAL HOW IT WORKS MOBILE NAV
   Matches the Universal shop mobile navigation.
   Desktop remains unchanged.
   ========================================================= */

.shop-mobile-menu-button,
.shop-mobile-nav-menu {
  display: none;
}

@media (max-width: 760px) {
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
    pointer-events: none !important;
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

  /* Shop Gift Cards label */

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

  /* Australia pill */

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

  /* Mobile menu */

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
}
      `}</style>
    </main>
  );
}