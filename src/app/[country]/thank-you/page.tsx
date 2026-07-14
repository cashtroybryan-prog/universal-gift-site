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
      `}</style>
    </main>
  );
}