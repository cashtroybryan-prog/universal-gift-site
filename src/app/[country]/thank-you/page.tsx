"use client";

import { useParams, useRouter } from "next/navigation";

export default function UniversalThankYouPage() {
  const params = useParams();
  const router = useRouter();

  const rawCountry = params.country;
  const country = typeof rawCountry === "string" ? rawCountry : "au";

  return (
    <main className="thank-you-page">
      <section className="thank-you-card">
        <img
          className="universal-logo"
          src="/images/universal-logo.png"
          alt="Universal"
          draggable={false}
        />

        <div className="success-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5L9.3 17L19 7" />
          </svg>
        </div>

        <p className="eyebrow">Payment successful</p>

        <h1>Thank you for your purchase</h1>

        <p className="description">
          Your Universal Gift Card is being prepared and will be delivered
          using the recipient details provided at checkout.
        </p>

        <div className="confirmation-box">
          <span className="confirmation-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 6.5H20V17.5H4V6.5Z" />
              <path d="M4.5 7L12 13L19.5 7" />
            </svg>
          </span>

          <div>
            <strong>Check your email</strong>
            <p>
              A payment confirmation and gift delivery update will be sent
              shortly.
            </p>
          </div>
        </div>

        <div className="thank-you-actions">
          <button
            className="primary-button"
            type="button"
            onClick={() => router.push(`/${country}/gift-tracker`)}
          >
            <span>Track your gift</span>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M4 10H16M11 5L16 10L11 15" />
            </svg>
          </button>

          <button
            className="secondary-button"
            type="button"
            onClick={() => router.push(`/${country}/home`)}
          >
            Return home
          </button>
        </div>
      </section>

      <style jsx>{`
        .thank-you-page {
          width: 100%;
          min-height: 100vh;
          padding: 48px 24px;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(17, 92, 208, 0.55) 0%,
              rgba(17, 92, 208, 0) 42%
            ),
            #030b1d;
          color: #ffffff;
          font-family: "Futura", sans-serif;
          font-synthesis: none;
          -webkit-font-smoothing: antialiased;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .thank-you-page * {
          box-sizing: border-box;
          font-family: inherit;
          font-synthesis: none;
        }

        .thank-you-card {
          width: min(580px, 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 42px;
          background: #ffffff;
          color: #000000;
          padding: 54px 58px 58px;
          text-align: center;
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.3);
        }

        .universal-logo {
          width: 132px;
          height: auto;
          display: block;
          margin: 0 auto;
          user-select: none;
        }

        .success-icon {
          width: 66px;
          height: 66px;
          margin: 34px auto 0;
          border-radius: 999px;
          background: #115cd0;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 16px 34px rgba(17, 92, 208, 0.26);
        }

        .success-icon svg {
          width: 31px;
          height: 31px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .eyebrow {
          margin: 26px 0 0;
          color: #115cd0;
          font-size: 17px;
          font-weight: 700;
          line-height: 1;
        }

        h1 {
          max-width: 430px;
          margin: 15px auto 0;
          font-size: 46px;
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -1.7px;
        }

        .description {
          max-width: 450px;
          margin: 22px auto 0;
          color: #626262;
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
        }

        .confirmation-box {
          width: 100%;
          margin-top: 30px;
          border-radius: 22px;
          background: #f1f5fc;
          padding: 20px 22px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
        }

        .confirmation-icon {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          border-radius: 999px;
          background: #115cd0;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .confirmation-icon svg {
          width: 21px;
          height: 21px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .confirmation-box strong {
          display: block;
          margin-top: 1px;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.2;
        }

        .confirmation-box p {
          margin: 6px 0 0;
          color: #666666;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.4;
        }

        .thank-you-actions {
          margin-top: 32px;
          display: grid;
          gap: 12px;
        }

        button {
          width: 100%;
          height: 60px;
          border-radius: 999px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background 180ms ease,
            color 180ms ease,
            border-color 180ms ease;
        }

        button:hover {
          transform: translateY(-1px);
        }

        .primary-button {
          border: 1px solid #115cd0;
          background: #115cd0;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .primary-button:hover {
          border-color: #000000;
          background: #000000;
        }

        .primary-button svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .secondary-button {
          border: 1px solid #d7d7d7;
          background: #ffffff;
          color: #000000;
        }

        .secondary-button:hover {
          border-color: #000000;
        }

        @media (max-width: 620px) {
          .thank-you-page {
            padding: 24px 16px;
          }

          .thank-you-card {
            padding: 42px 24px 34px;
            border-radius: 30px;
          }

          .universal-logo {
            width: 112px;
          }

          .success-icon {
            width: 58px;
            height: 58px;
            margin-top: 28px;
          }

          h1 {
            font-size: 38px;
            letter-spacing: -1.3px;
          }

          .description {
            font-size: 16px;
          }

          .confirmation-box {
            padding: 18px;
          }
        }
          /* =========================================================
   FINAL MOBILE UNIVERSAL THANK YOU PAGE
   Desktop remains untouched.
   ========================================================= */

@media (max-width: 620px) {
.thank-you-page {
  width: 100% !important;
  min-height: 100dvh !important;
  padding:
    max(54px, calc(env(safe-area-inset-top, 0px) + 24px))
    14px
    max(30px, env(safe-area-inset-bottom, 0px)) !important;

  background:
    radial-gradient(
      circle at 50% 15%,
      rgba(17, 92, 208, 0.55) 0%,
      rgba(17, 92, 208, 0) 48%
    ),
    #030b1d !important;

  display: flex !important;
  align-items: flex-start !important;
  justify-content: center !important;
  overflow-x: hidden !important;
}
  
  .thank-you-card {
    width: 100% !important;
    max-width: 360px !important;
    margin: 0 auto !important;
    padding: 28px 20px 22px !important;

    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 28px !important;

    background: #ffffff !important;
    color: #000000 !important;

    text-align: center !important;

    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.2),
      0 28px 70px rgba(0, 0, 0, 0.28) !important;
  }

  .universal-logo {
    display: block !important;
    width: 92px !important;
    height: auto !important;
    margin: 0 auto !important;
    object-fit: contain !important;
  }

  .success-icon {
    display: flex !important;
    width: 52px !important;
    height: 52px !important;
    align-items: center !important;
    justify-content: center !important;

    margin: 22px auto 0 !important;

    border-radius: 999px !important;
    background: #115cd0 !important;
    color: #ffffff !important;

    box-shadow: 0 10px 24px rgba(17, 92, 208, 0.25) !important;
  }

  .success-icon svg {
    width: 25px !important;
    height: 25px !important;
  }

  .eyebrow {
    margin: 16px 0 0 !important;
    color: #115cd0 !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

  .thank-you-card h1 {
    width: 100% !important;
    max-width: 300px !important;

    margin: 10px auto 0 !important;

    color: #000000 !important;
    font-size: 34px !important;
    font-weight: 700 !important;
    line-height: 0.96 !important;
    letter-spacing: -1.2px !important;
  }

  .description {
    width: 100% !important;
    max-width: 305px !important;

    margin: 17px auto 0 !important;

    color: #626262 !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 1.38 !important;
  }

  .confirmation-box {
    display: grid !important;
    width: 100% !important;
    grid-template-columns: 38px minmax(0, 1fr) !important;
    align-items: center !important;
    gap: 13px !important;

    margin: 22px 0 0 !important;
    padding: 16px !important;

    border-radius: 18px !important;
    background: #f1f5fc !important;

    text-align: left !important;
  }

  .confirmation-icon {
    display: flex !important;
    width: 38px !important;
    height: 38px !important;
    flex: 0 0 38px !important;

    align-items: center !important;
    justify-content: center !important;

    border-radius: 999px !important;
    background: #115cd0 !important;
    color: #ffffff !important;
  }

  .confirmation-icon svg {
    width: 19px !important;
    height: 19px !important;
  }

  .confirmation-box > div {
    min-width: 0 !important;
  }

  .confirmation-box strong {
    display: block !important;
    margin: 0 !important;

    color: #000000 !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    line-height: 1.15 !important;
  }

  .confirmation-box p {
    margin: 5px 0 0 !important;

    color: #666666 !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 1.35 !important;
  }

  .thank-you-actions {
    display: grid !important;
    width: 100% !important;
    gap: 10px !important;
    margin: 22px 0 0 !important;
  }

  .thank-you-actions button {
    display: flex !important;
    width: 100% !important;
    height: 52px !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 18px !important;

    border-radius: 999px !important;

    font-size: 15px !important;
    font-weight: 700 !important;
    line-height: 1 !important;

    transform: none !important;
  }

  .primary-button {
    gap: 9px !important;
    border: 1px solid #115cd0 !important;
    background: #115cd0 !important;
    color: #ffffff !important;
  }

  .primary-button svg {
    width: 17px !important;
    height: 17px !important;
  }

  .secondary-button {
    border: 1px solid #d7d7d7 !important;
    background: #ffffff !important;
    color: #000000 !important;
  }

  .thank-you-actions button:hover,
  .thank-you-actions button:focus-visible {
    transform: none !important;
  }
}
      `}</style>
    </main>
  );
}