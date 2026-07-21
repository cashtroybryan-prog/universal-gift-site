"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type GiftCardId = "movie" | "merch" | "fuel";
type RecipientType = "someone" | "myself";

const amounts = [
  5, 10, 15,
  20, 25, 30,
  40, 50, 75,
  100, 150, 200,
  250, 300, 350,
  400, 500,
];

const products: Record<
  GiftCardId,
  {
    title: string;
    image: string;
    description: string;
    expiry: string;
  }
> = {
  movie: {
    title: "Universal Movie Day Gift Card",
    image: "/images/universal-movie-day-card-normal.png",
    description:
      "The Universal Movie Day Gift Card is made for cinema trips, snacks, dining and everything that turns movie day into a bigger Universal moment.",
    expiry: "3 Year Expiry",
  },
  merch: {
    title: "Universal Merch Gift Card",
    image: "/images/universal-merch-card-normal.png",
    description:
      "The Universal Merch Gift Card is made for fans who want toys, collectibles, apparel and character favourites from participating Australian stores.",
    expiry: "3 Year Expiry",
  },
  fuel: {
    title: "Universal Fuel Gift Card",
    image: "/images/universal-fuel-card-normal.png",
    description:
      "The Universal Fuel Gift Card is made for road trips, family days out, petrol stops, snacks and drinks across participating Australian fuel partners.",
    expiry: "3 Year Expiry",
  },
};

const isGiftCardId = (value: string): value is GiftCardId => {
  return value === "movie" || value === "merch" || value === "fuel";
};

const formatAmount = (amount: number) => `AU$${amount}`;

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
};

const isValidAustralianPhone = (value: string) => {
  return value.replace(/\D/g, "").length === 10;
};

export default function UniversalRecipientPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCardId = typeof params.cardId === "string" ? params.cardId : "movie";
  const cardId: GiftCardId = isGiftCardId(rawCardId) ? rawCardId : "movie";
  const product = useMemo(() => products[cardId] ?? products.movie, [cardId]);

  const amountFromQuery = Number(searchParams.get("amount"));
  const startingAmount = amounts.includes(amountFromQuery) ? amountFromQuery : 50;

  const [selectedAmount, setSelectedAmount] = useState(startingAmount);
  const [amountOpen, setAmountOpen] = useState(false);
  const [recipientType, setRecipientType] = useState<RecipientType>("someone");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  const canContinue =
    recipientType === "myself" ||
    isValidEmail(recipientEmail) ||
    isValidAustralianPhone(recipientPhone);

  const recipientQuery = useMemo(() => {
    const query = new URLSearchParams();
    query.set("amount", String(selectedAmount));
    query.set("type", recipientType);

    if (recipientName.trim()) query.set("name", recipientName.trim());
    if (recipientEmail.trim()) query.set("email", recipientEmail.trim());
    if (recipientPhone.trim()) query.set("phone", recipientPhone.trim());

    return query.toString();
  }, [recipientEmail, recipientName, recipientPhone, recipientType, selectedAmount]);

  const goBack = () => {
    router.push(`/au/product/${cardId}`);
  };

  const closeToShop = () => {
    router.push("/au/shop");
  };

const handleContinue = () => {
  if (!canContinue) return;

  if (recipientType === "myself") {
    router.push(`/au/product/${cardId}/checkout?${recipientQuery}`);
    return;
  }

  router.push(`/au/product/${cardId}/personalize?${recipientQuery}`);
};

  return (
    <main className="universal-recipient-page">
      <section className="recipient-frame">
        <button type="button" className="recipient-back" onClick={goBack}>
          ← Back
        </button>

        <button
          type="button"
          className="recipient-close"
          onClick={closeToShop}
          aria-label="Close"
        >
          ×
        </button>

        <section className="product-info-column">
          <div className="product-info-image-wrap">
            <img src={product.image} alt={product.title} draggable={false} />
          </div>

          <h1 className="product-info-title">{product.title}</h1>

<p className="product-info-copy">{product.description}</p>

<a className="product-info-link" href="#participating-stores">
  View participating stores
</a>

<p className="product-info-expiry">{product.expiry}</p>

<a className="product-info-link" href="#terms">
  Terms &amp; Conditions
</a>
        </section>

        <section className="recipient-column">
<div className="gift-value-row">
  <h2>Gift value</h2>

  <div className="amount-control">
    <button
      type="button"
      className="amount-pill"
      onClick={() => setAmountOpen((current) => !current)}
    >
      {formatAmount(selectedAmount)}
    </button>

    <button
      type="button"
      className={`amount-chevron ${amountOpen ? "is-open" : ""}`}
      onClick={() => setAmountOpen((current) => !current)}
      aria-label="Change gift value"
      aria-expanded={amountOpen}
    >
      <span aria-hidden="true" />
    </button>
  </div>
</div>

{amountOpen && (
  <div className="amount-menu">
    {amounts.map((amount) => (
      <button
        key={amount}
        type="button"
        className={amount === selectedAmount ? "is-selected" : ""}
        onClick={() => {
          setSelectedAmount(amount);
          setAmountOpen(false);
        }}
      >
        {formatAmount(amount)}
      </button>
    ))}
  </div>
)}

<div className="recipient-divider" />

<h3 className="recipient-heading">Who is this gift for?</h3>

          <div className="recipient-toggle">
            <button
              type="button"
              className={recipientType === "someone" ? "is-active" : ""}
              onClick={() => setRecipientType("someone")}
            >
              Someone else
            </button>

            <button
              type="button"
              className={recipientType === "myself" ? "is-active" : ""}
              onClick={() => setRecipientType("myself")}
            >
              Myself
            </button>
          </div>

<div
  className={`recipient-form-card ${
    recipientType === "myself" ? "is-myself" : ""
  }`}
>
            {recipientType === "someone" ? (
              <>
                <input
                  value={recipientName}
                  onChange={(event) => setRecipientName(event.target.value)}
                  placeholder="Recipient name"
                  aria-label="Recipient name"
                />

                <input
                  value={recipientEmail}
                  onChange={(event) => setRecipientEmail(event.target.value)}
                  placeholder="Recipient email"
                  type="email"
                  aria-label="Recipient email"
                />

<input
  className="recipient-phone-desktop"
  value={recipientPhone}
  onChange={(event) => setRecipientPhone(event.target.value)}
  placeholder="Recipient Australian phone number"
  inputMode="tel"
  aria-label="Recipient Australian phone number"
/>

<input
  className="recipient-phone-mobile"
  value={recipientPhone}
  onChange={(event) => setRecipientPhone(event.target.value)}
  placeholder="Recipient Australian phone no."
  inputMode="tel"
  aria-label="Recipient Australian phone number"
/>

                <p>
                  Enter a valid recipient email or Australian phone number so we know
                  where to send the gift card.
                </p>
              </>
            ) : (
              <div className="myself-message">
                This gift card will be sent to you via email.
              </div>
            )}
          </div>

          <button
            type="button"
            className={`recipient-continue ${canContinue ? "is-ready" : ""}`}
            disabled={!canContinue}
            onClick={handleContinue}
          >
{recipientType === "myself" ? "Checkout" : "Personalise"} →
          </button>
        </section>
      </section>

      <style jsx>{`
        .universal-recipient-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background: #f3f3f1;
          color: #000;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        .universal-recipient-page * {
          box-sizing: border-box;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .recipient-frame {
          position: relative;
          width: 1440px;
          min-height: 1030px;
          margin: 0 auto;
          background: #f3f3f1;
          color: #000;
          transform-origin: top center;
        }

        .recipient-back {
          position: absolute;
          left: 94px;
          top: 46px;
          z-index: 5;
          border: 0;
          background: transparent;
          color: #8e8e8e;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.2px;
          padding: 0;
        }

        .recipient-back:hover,
        .recipient-back:focus-visible {
          color: #000;
          outline: none;
        }

        .recipient-close {
          position: absolute;
          right: 80px;
          top: 28px;
          z-index: 8;
          width: 58px;
          height: 58px;
          border: 0;
          border-radius: 999px;
          background: #e2e2df;
          color: #000;
          font-family: Arial, sans-serif;
          font-size: 42px;
          font-weight: 700;
          line-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0 4px;
          text-align: center;
        }

        .recipient-close:hover,
        .recipient-close:focus-visible {
          background: #d5d5d2;
          outline: none;
        }

        .product-info-column {
          position: absolute;
          left: 94px;
          top: 95px;
          width: 493px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .product-info-image-wrap {
          width: 493px;
          height: 314px;
          border-radius: 28px;
          overflow: hidden;
          background: #fff;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.04),
            0 10px 18px rgba(0, 0, 0, 0.05),
            0 18px 56px rgba(0, 0, 0, 0.1);
        }

        .product-info-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        .product-info-title {
          width: 493px;
          margin: 54px 0 0;
          color: #000;
          font-size: 42px;
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -1.5px;
        }

        .product-info-copy {
          width: 493px;
          margin: 25px 0 0;
          color: #000;
          font-size: 24px;
          font-weight: 500;
          line-height: 1.03;
          letter-spacing: -0.7px;
        }

        .product-info-link {
          margin: 34px 0 0;
          color: #115cd0;
          font-size: 23px;
          font-weight: 700;
          line-height: 1.05;
          text-decoration: none;
        }

        .product-info-link:hover,
        .product-info-link:focus-visible {
          text-decoration: underline;
          outline: none;
        }

        .product-info-expiry {
          margin: 34px 0 0;
          color: #000;
          font-size: 29px;
          font-weight: 700;
          line-height: 1;
        }

        .recipient-column {
          position: absolute;
          left: 682px;
          top: 95px;
          width: 679px;
        }

        .gift-value-row {
          width: 679px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .gift-value-row h2 {
          margin: 0;
          color: #000;
          font-size: 34px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1px;
        }

        .amount-control {
          position: relative;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .amount-pill {
          min-width: 172px;
          height: 62px;
          border: 0;
          border-radius: 999px;
          background: #115cd0;
          color: #fff;
          font-size: 35px;
          font-weight: 700;
          line-height: 62px;
          padding: 0 28px;
          display: block;
          text-align: center;
          appearance: none;
          -webkit-appearance: none;
        }

        .amount-chevron {
          width: 56px;
          height: 56px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: transform 160ms ease;
        }

        .amount-chevron span {
          width: 22px;
          height: 22px;
          border-right: 7px solid #115cd0;
          border-bottom: 7px solid #115cd0;
          border-radius: 2px;
          transform: rotate(45deg) translate(-2px, -2px);
          display: block;
        }

        .amount-chevron.is-open {
          transform: rotate(180deg);
        }

        .amount-menu {
          position: absolute;
          right: 0;
          top: 82px;
          z-index: 30;
          width: 679px;
          border-radius: 35px;
          background: #fff;
          padding: 34px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.04),
            0 10px 18px rgba(0, 0, 0, 0.05),
            0 18px 56px rgba(0, 0, 0, 0.1);
        }

        .amount-menu button {
          height: 62px;
          border: 0;
          border-radius: 999px;
          background: #000;
          color: #fff;
          font-size: 23px;
          font-weight: 700;
          line-height: 62px;
          padding: 0 14px;
          display: block;
          text-align: center;
          appearance: none;
          -webkit-appearance: none;
        }

        .amount-menu button.is-selected {
          background: #115cd0;
        }

        .recipient-divider {
          width: 679px;
          height: 1px;
          margin-top: 28px;
          background: #d7d7d4;
        }

        .recipient-heading {
          margin: 34px 0 30px;
          color: #000;
          font-size: 54px;
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -2px;
        }

        .recipient-toggle {
          width: 679px;
          height: 76px;
          border: 2px solid #111;
          border-radius: 999px;
          padding: 6px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }

        .recipient-toggle button {
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: #000;
          font-size: 23px;
          font-weight: 700;
        }

        .recipient-toggle button.is-active {
          background: #115cd0;
          color: #fff;
        }

        .recipient-form-card {
          width: 679px;
          min-height: 358px;
          margin-top: 34px;
          border-radius: 28px;
          background: #fff;
          padding: 34px 38px;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.04),
            0 10px 18px rgba(0, 0, 0, 0.05),
            0 18px 56px rgba(0, 0, 0, 0.1);
        }

        .recipient-form-card input {
          width: 100%;
          height: 76px;
          border: 0;
          border-bottom: 1.5px solid #d2d2cf;
          background: transparent;
          color: #000;
          font-size: 28px;
          font-weight: 700;
          outline: none;
        }

        .recipient-form-card input::placeholder {
          color: #8b8b8b;
          font-weight: 700;
        }

        .recipient-form-card p {
          margin: 16px 0 0;
          color: #8b8b8b;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.25;
        }

.recipient-form-card.is-myself {
  min-height: 132px;
  padding: 30px 38px;
}

.myself-message {
  width: 100%;
  min-height: 72px;
  display: flex;
  align-items: center;
  color: #000;
  font-size: 27px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.8px;
}

        .recipient-continue {
          width: 679px;
          height: 78px;
          margin-top: 42px;
          border: 0;
          border-radius: 999px;
          background: #a7a7a7;
          color: #fff;
          font-size: 34px;
          font-weight: 700;
          letter-spacing: -0.7px;
          cursor: not-allowed;
          box-shadow: none;
        }

        .recipient-continue.is-ready {
          background: #115cd0;
          cursor: pointer;
          box-shadow: 0 18px 44px rgba(17, 92, 208, 0.25);
        }

        .recipient-continue.is-ready:hover,
        .recipient-continue.is-ready:focus-visible {
          outline: none;
          transform: translateY(-2px);
        }

        @media (max-width: 1700px) {
          .recipient-frame {
            transform: scale(calc(100vw / 1440));
            transform-origin: top center;
          }
        }

        @media (max-width: 760px) {
          .recipient-frame {
            width: 100%;
            min-height: auto;
            padding: 26px 16px 70px;
            transform: none;
          }

          .recipient-back {
            position: relative;
            left: auto;
            top: auto;
            display: inline-flex;
            margin-bottom: 24px;
            font-size: 16px;
          }

          .recipient-close {
            right: 16px;
            top: 16px;
            width: 44px;
            height: 44px;
            font-size: 30px;
            line-height: 44px;
          }

          .product-info-column,
          .recipient-column {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
          }

          .product-info-image-wrap {
            width: 100%;
            height: auto;
            aspect-ratio: 5 / 3;
            border-radius: 26px;
          }

          .product-info-title,
          .product-info-copy,
          .product-info-link,
          .product-info-expiry,
          .gift-value-row,
          .recipient-divider,
          .recipient-toggle,
          .recipient-form-card,
          .recipient-continue {
            width: 100%;
          }

          .product-info-title {
            margin-top: 26px;
            font-size: 34px;
          }

          .product-info-copy {
            margin-top: 18px;
            font-size: 18px;
          }

          .recipient-column {
            margin-top: 44px;
          }

          .gift-value-row {
            height: auto;
          }

          .recipient-heading {
            font-size: 38px;
          }

          .recipient-toggle {
            height: auto;
            border-radius: 28px;
            grid-template-columns: 1fr;
          }

          .recipient-toggle button {
            height: 48px;
            font-size: 18px;
          }

          .recipient-form-card {
            padding: 24px;
          }

          .recipient-form-card input {
            height: 58px;
            font-size: 20px;
          }

.recipient-form-card.is-myself {
  min-height: 104px;
  padding: 24px;
}

.myself-message {
  min-height: 56px;
  font-size: 20px;
}

          .amount-menu {
            position: relative;
            right: auto;
            top: auto;
            width: 100%;
            margin-top: 16px;
            grid-template-columns: repeat(2, 1fr);
          }
        }
          /* =========================================================
   FINAL MOBILE UNIVERSAL RECIPIENT PAGE
   Desktop remains untouched.
   ========================================================= */

@media (max-width: 760px) {
  .universal-recipient-page {
    width: 100% !important;
    min-height: 100dvh !important;
    overflow-x: hidden !important;
    background: #f3f3f1 !important;
  }

  .recipient-frame {
    position: relative !important;
    width: 100% !important;
    min-height: 100dvh !important;
    margin: 0 !important;
    padding: 18px 14px 36px !important;
    background: #f3f3f1 !important;
    transform: none !important;
  }

  /* TOP BUTTONS */

  .recipient-back {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    display: inline-flex !important;
    min-height: 40px !important;
    align-items: center !important;
    margin: 0 0 14px !important;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
    color: #8e8e8e !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

  .recipient-close {
    position: absolute !important;
    right: 14px !important;
    top: 14px !important;
    display: flex !important;
    width: 38px !important;
    height: 38px !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 0 3px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #e2e2df !important;
    color: #000000 !important;
    font-family: Arial, sans-serif !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    z-index: 20 !important;
  }

  /* PRODUCT INFORMATION */

  .product-info-column {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    display: flex !important;
    width: 100% !important;
    align-items: flex-start !important;
  }

  .product-info-image-wrap {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1.62 / 1 !important;
    margin: 0 !important;
    overflow: hidden !important;
    border-radius: 22px !important;
    background: #ffffff !important;
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.13) !important;
  }

  .product-info-image-wrap img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    object-fit: cover !important;
    object-position: center !important;
  }

  .product-info-title {
    width: 100% !important;
    margin: 20px 0 0 !important;
    color: #000000 !important;
    font-size: 30px !important;
    font-weight: 700 !important;
    line-height: 0.96 !important;
    letter-spacing: -1px !important;
  }

  .product-info-copy {
    width: 100% !important;
    margin: 16px 0 0 !important;
    color: #000000 !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    line-height: 1.18 !important;
    letter-spacing: -0.2px !important;
  }

  .product-info-link {
    width: auto !important;
    max-width: 100% !important;
    margin: 22px 0 0 !important;
    color: #115cd0 !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
  }

  .product-info-expiry {
    width: 100% !important;
    margin: 24px 0 0 !important;
    color: #000000 !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

  /* RECIPIENT SECTION */

  .recipient-column {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    width: 100% !important;
    margin: 32px 0 0 !important;
  }

  .gift-value-row {
    position: relative !important;
    display: flex !important;
    width: 100% !important;
    height: 70px !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 !important;
    border-top: 1px solid #d8d8d5 !important;
    border-bottom: 1px solid #d8d8d5 !important;
  }

  .gift-value-row h2 {
    margin: 0 !important;
    color: #000000 !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    line-height: 0.95 !important;
    letter-spacing: -0.6px !important;
  }

.amount-control {
  position: static !important;
  display: flex !important;
  align-items: center !important;
  gap: 1px !important;
}

  .amount-pill {
    display: flex !important;
    min-width: 118px !important;
    width: auto !important;
    height: 48px !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 18px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #115cd0 !important;
    color: #ffffff !important;
    font-size: 25px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

.amount-chevron {
  display: flex !important;
  width: 30px !important;
  height: 42px !important;
      align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
  }

  .amount-chevron span {
    display: block !important;
    width: 14px !important;
    height: 14px !important;
    border-right: 5px solid #115cd0 !important;
    border-bottom: 5px solid #115cd0 !important;
    border-radius: 1px !important;
    transform: translateY(-3px) rotate(45deg) !important;
  }

  .amount-chevron.is-open span {
    transform: translateY(3px) rotate(225deg) !important;
  }

  .recipient-divider {
    display: none !important;
  }

/* INLINE MOBILE AMOUNT MENU */

.amount-menu {
  position: relative !important;
  left: auto !important;
  right: auto !important;
  top: auto !important;
  z-index: 30 !important;

  display: grid !important;
  width: 100% !important;
  max-width: none !important;
  max-height: none !important;

  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 10px 9px !important;

  margin: 12px 0 0 !important;
  padding: 13px 12px !important;

  overflow: visible !important;

  border: 0 !important;
  border-radius: 20px !important;

  background: #ffffff !important;

  box-shadow:
    0 4px 7px rgba(0, 0, 0, 0.05),
    0 12px 24px rgba(0, 0, 0, 0.08),
    0 22px 46px rgba(0, 0, 0, 0.1) !important;

  transform: none !important;
}

.amount-menu button {
  display: flex !important;
  width: 100% !important;
  min-width: 0 !important;
  height: 42px !important;

  align-items: center !important;
  justify-content: center !important;

  margin: 0 !important;
  padding: 0 5px !important;

  border: 0 !important;
  border-radius: 999px !important;

  background: #000000 !important;
  color: #ffffff !important;

  font-size: 13px !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  letter-spacing: -0.1px !important;

  text-align: center !important;
  white-space: nowrap !important;

  appearance: none !important;
  -webkit-appearance: none !important;
}

.amount-menu button.is-selected {
  background: #115cd0 !important;
  color: #ffffff !important;

  box-shadow:
    0 5px 12px rgba(17, 92, 208, 0.2),
    0 9px 22px rgba(17, 92, 208, 0.18) !important;
}

.amount-menu + .recipient-heading {
  margin-top: 24px !important;
}
}

/* =========================================================
   MOBILE PRODUCT INFO CENTRING
   Desktop remains untouched.
   ========================================================= */

@media (max-width: 760px) {
  .universal-recipient-page .product-info-column {
    display: flex !important;
    width: 100% !important;
    align-items: center !important;
    text-align: center !important;
  }

  .universal-recipient-page .product-info-image-wrap {
    width: 64vw !important;
    max-width: 280px !important;
    height: 38.4vw !important;
    max-height: 168px !important;
    aspect-ratio: auto !important;
    margin: 0 auto !important;
    border-radius: 18px !important;
  }

  .universal-recipient-page .product-info-title {
    width: 88vw !important;
    max-width: 340px !important;
    margin: 22px auto 0 !important;
    text-align: center !important;
    font-size: 27px !important;
    line-height: 0.98 !important;
  }

  .universal-recipient-page .product-info-copy {
    width: 86vw !important;
    max-width: 340px !important;
    margin: 15px auto 0 !important;
    text-align: center !important;
    font-size: 14px !important;
    line-height: 1.2 !important;
  }

  .universal-recipient-page .product-info-link {
    width: auto !important;
    max-width: 86vw !important;
    margin: 20px auto 0 !important;
    text-align: center !important;
    font-size: 17px !important;
  }

  .universal-recipient-page .product-info-expiry {
    width: auto !important;
    margin: 22px auto 0 !important;
    text-align: center !important;
    font-size: 23px !important;
  }

  .universal-recipient-page .recipient-column {
    margin-top: 30px !important;
  }
}
  @media (max-width: 760px) {
  .universal-recipient-page .recipient-continue {
    font-size: 28px !important;
  }
}
  .recipient-phone-mobile {
  display: none !important;
}

@media (max-width: 760px) {
  .recipient-phone-desktop {
    display: none !important;
  }

  .recipient-phone-mobile {
    display: block !important;
  }
}
  /* =========================================================
   FINAL MOBILE TOP ROW
   Exact same Back position as the Gift Product page.
   ========================================================= */

@media (max-width: 760px) {
  .universal-recipient-page .recipient-frame {
    position: relative !important;
    width: 100% !important;
    min-height: 100dvh !important;

    margin: 0 !important;
    padding: 7vw 6vw 16vw !important;

    background: #f3f3f1 !important;
    transform: none !important;
  }

  /* Exact copy of the Gift Product mobile Back button */

  .universal-recipient-page .recipient-back {
    position: relative !important;
    display: inline-flex !important;

    left: auto !important;
    top: auto !important;

    width: auto !important;
    min-height: 10vw !important;

    align-items: center !important;

    margin: 0 0 8vw !important;
    padding: 0 !important;

    border: 0 !important;
    background: transparent !important;
    color: #8e8e8e !important;

    font-size: 4.2vw !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
  }

  /* X aligned to the exact same 10vw-high top row */

  .universal-recipient-page .recipient-close {
    position: absolute !important;
    display: flex !important;

    top: 7vw !important;
    right: 6vw !important;

    width: 10vw !important;
    height: 10vw !important;
    min-width: 0 !important;
    min-height: 0 !important;

    align-items: center !important;
    justify-content: center !important;

    margin: 0 !important;
    padding: 0 0 0.7vw !important;

    border: 0 !important;
    border-radius: 999px !important;

    background: #e2e2df !important;
    color: #000000 !important;

    font-family: Arial, sans-serif !important;
    font-size: 7vw !important;
    font-weight: 700 !important;
    line-height: 1 !important;

    z-index: 20 !important;
  }
}
  /* EXACT PRODUCT PAGE MOBILE TEXT SIZING */

@media (max-width: 760px) {
  .universal-recipient-page .product-info-title {
    width: 88vw !important;
    max-width: 100% !important;

    margin: 7vw auto 0 !important;

    font-size: 6.2vw !important;
    font-weight: 700 !important;
    line-height: 1.02 !important;
    letter-spacing: -0.18vw !important;

    text-align: center !important;
  }

  .universal-recipient-page .product-info-copy {
    width: 87vw !important;
    max-width: 100% !important;

    margin: 4.5vw auto 0 !important;

    font-size: 3.85vw !important;
    font-weight: 500 !important;
    line-height: 1.22 !important;
    letter-spacing: -0.04vw !important;

    text-align: center !important;
  }

  .universal-recipient-page .product-info-link {
    width: auto !important;
    max-width: 88vw !important;

    margin: 5vw auto 0 !important;

    font-size: 3.65vw !important;
    font-weight: 700 !important;
    line-height: 1.15 !important;

    text-align: center !important;
  }

  .universal-recipient-page .product-info-expiry {
    width: auto !important;

    margin: 6vw auto 0 !important;

    font-size: 5.2vw !important;
    font-weight: 700 !important;
    line-height: 1 !important;

    text-align: center !important;
  }
}
  /* MOBILE FORM CARD HEIGHT */

@media (max-width: 760px) {
  .universal-recipient-page .recipient-form-card {
    min-height: 245px !important;
    height: auto !important;
    padding: 20px 22px 32px !important;
  }

  .universal-recipient-page .recipient-form-card p {
    margin: 13px 0 0 !important;
  }
}
  @media (max-width: 760px) {
  .universal-recipient-page .recipient-form-card.is-myself {
    min-height: 120px !important;
    height: auto !important;
    padding: 20px 22px !important;

    display: flex !important;
    align-items: center !important;
  }

  .universal-recipient-page .recipient-form-card.is-myself .myself-message {
    min-height: 0 !important;
    margin: 0 !important;
  }
}
  /* =========================================================
   MOBILE RECIPIENT PAGE
   Keep product title, hide supporting copy and links.
   Desktop remains untouched.
   ========================================================= */

@media (max-width: 760px) {
  .universal-recipient-page .product-info-copy,
  .universal-recipient-page .product-info-link,
  .universal-recipient-page .product-info-expiry {
    display: none !important;
  }

  .universal-recipient-page .product-info-title {
    display: block !important;
  }

  .universal-recipient-page .recipient-column {
    margin-top: 5vw !important;
  }
}
  /* =========================================================
   FINAL MOBILE RECIPIENT CONTROLS
   More compact gift-value pill and horizontal recipient tabs.
   Desktop remains untouched.
   ========================================================= */

@media (max-width: 760px) {
  /* Compact Gift value row */

  .universal-recipient-page .gift-value-row {
    height: clamp(52px, 14vw, 58px) !important;
  }

  .universal-recipient-page .gift-value-row h2 {
    font-size: clamp(16px, 4.4vw, 18px) !important;
    line-height: 1 !important;
    letter-spacing: -0.3px !important;
  }

  .universal-recipient-page .amount-control {
    display: flex !important;
    align-items: center !important;
    gap: 2px !important;
  }

  /* Smaller blue amount bubble */

  .universal-recipient-page .amount-pill {
    width: auto !important;
    min-width: clamp(78px, 23vw, 92px) !important;
    height: clamp(36px, 10vw, 42px) !important;

    padding: 0 13px !important;

    font-size: clamp(17px, 5vw, 21px) !important;
    line-height: 1 !important;

    border-radius: 999px !important;
  }

  .universal-recipient-page .amount-chevron {
    width: 25px !important;
    height: 38px !important;
  }

  .universal-recipient-page .amount-chevron span {
    width: 10px !important;
    height: 10px !important;

    border-right-width: 4px !important;
    border-bottom-width: 4px !important;

    transform: translateY(-2px) rotate(45deg) !important;
  }

  .universal-recipient-page
    .amount-chevron.is-open
    span {
    transform: translateY(2px) rotate(225deg) !important;
  }

  /* More compact heading */

  .universal-recipient-page .recipient-heading {
    margin: 6vw 0 4vw !important;

    font-size: clamp(25px, 7vw, 30px) !important;
    line-height: 1 !important;
    letter-spacing: -0.8px !important;
  }

  /* Someone else and Myself side by side */

  .universal-recipient-page .recipient-toggle {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;

    width: 100% !important;
    height: clamp(58px, 15vw, 64px) !important;

    gap: 4px !important;
    padding: 4px !important;

    border: 1.5px solid #111111 !important;
    border-radius: 999px !important;
  }

  .universal-recipient-page .recipient-toggle button {
    width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;

    padding: 0 8px !important;

    border-radius: 999px !important;

    font-size: clamp(13px, 3.8vw, 16px) !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }

  .universal-recipient-page
    .recipient-toggle
    button.is-active {
    background: #115cd0 !important;
    color: #ffffff !important;
  }

  .universal-recipient-page .recipient-form-card {
    margin-top: 4vw !important;
  }
}
      `}</style>
    </main>
  );
}