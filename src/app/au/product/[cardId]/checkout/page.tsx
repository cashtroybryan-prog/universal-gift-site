"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type GiftCardId = "movie" | "merch" | "fuel";

const isGiftCardId = (value: string): value is GiftCardId => {
  return value === "movie" || value === "merch" || value === "fuel";
};

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

const formatMoney = (amount: number) => `AU$${amount.toFixed(2)}`;

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
};

export default function UniversalCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawCardId = typeof params.cardId === "string" ? params.cardId : "movie";
  const cardId: GiftCardId = isGiftCardId(rawCardId) ? rawCardId : "movie";
  const product = useMemo(() => products[cardId] ?? products.movie, [cardId]);

  const amount = Number(searchParams.get("amount")) || 50;
  const recipientType = searchParams.get("type") || "someone";
  const recipientName = searchParams.get("name") || "";
  const recipientEmail = searchParams.get("email") || "";
  const recipientPhone = searchParams.get("phone") || "";
const giftMedia = searchParams.get("giftMedia") === "true";
const message = searchParams.get("message") === "true";
const mediaType = searchParams.get("mediaType") || "";
const personalMessage = searchParams.get("personalMessage") || "";
const uploadedFile = searchParams.get("uploadedFile") || "";
const selectedGif = searchParams.get("gif") || "";

  const [contactEmail, setContactEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [newsOptIn, setNewsOptIn] = useState(true);

  const contactReady = isValidEmail(contactEmail);

const contactEmailLabel = contactEmail.trim() || "Your email";

const giftDeliveryLabel =
  recipientType === "myself"
    ? contactEmailLabel
    : recipientEmail || recipientPhone || "the recipient";

const deliveryLabel =
  recipientType === "myself"
    ? contactEmailLabel
    : recipientEmail || recipientPhone || recipientName || "Recipient";

const receiptLabel = contactEmailLabel;

const deliveryCardMessage =
  recipientType === "myself"
    ? `Your ${product.title} and receipt will be sent to ${contactEmailLabel} after checkout.`
    : `Your ${product.title} will be sent to ${giftDeliveryLabel}, and your receipt will be sent to ${receiptLabel} after checkout.`;

  const goBack = () => {
    if (recipientType === "myself") {
      router.push(`/au/product/${cardId}/recipient?${searchParams.toString()}`);
      return;
    }

    router.push(`/au/product/${cardId}/personalize?${searchParams.toString()}`);
  };

  const closeToShop = () => {
    router.push("/au/shop");
  };

const goToPayment = () => {
  if (!contactReady) return;
};

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <button type="button" className="checkout-back" onClick={goBack}>
          ← Back
        </button>

<div className="checkout-brand">
  <img src="/images/universal-logo.png" alt="Universal" draggable={false} />
</div>
        <button
          type="button"
          className="checkout-close"
          onClick={closeToShop}
          aria-label="Close"
        >
          ×
        </button>
      </header>

      <section className="checkout-layout">
        <section className="checkout-left">
          <div className="checkout-left-inner">
            <section className="contact-section">
              <h1>Contact</h1>

              <input
                value={contactEmail}
                onChange={(event) => setContactEmail(event.target.value)}
                placeholder="Email for gift card and receipt"
                type="email"
              />

              <p>Email is required for the gift card to be sent and for the receipt.</p>

              <label className="news-check">
                <input
                  type="checkbox"
                  checked={newsOptIn}
                  onChange={(event) => setNewsOptIn(event.target.checked)}
                />
                <span />
                Email me with news and offers
              </label>
            </section>

            <section className="order-section">
              <h2>Order summary</h2>
              <p>Review your gift details before continuing to payment.</p>

              <div className="order-table">
                <div className="order-row">
                  <span>Gift card</span>
                  <strong>{product.title}</strong>
                </div>

                <div className="order-row">
                  <span>Gift value</span>
                  <strong>{formatMoney(amount)}</strong>
                </div>

                <div className="order-row">
                  <span>Delivery</span>
                  <strong>{deliveryLabel}</strong>
                </div>

                <div className="order-row">
                  <span>Receipt</span>
                  <strong>{receiptLabel}</strong>
                </div>
              </div>

              <div className="secure-note">
                <span>✓</span>
                Your payment is secure and encrypted on the next screen.
              </div>

              <button
                type="button"
                className={`pay-button ${contactReady ? "is-ready" : ""}`}
                disabled={!contactReady}
                onClick={goToPayment}
              >
                Pay {formatMoney(amount)}
              </button>
            </section>
          </div>
        </section>

        <aside className="checkout-right">
          <div className="checkout-right-inner">
            <div className="mini-product">
              <img src={product.image} alt={product.title} draggable={false} />

              <div className="mini-copy">
                <h3>{product.title}</h3>
                <p>{formatMoney(amount)}-digital</p>
              </div>

              <strong>{formatMoney(amount)}</strong>
            </div>

            <div className="discount-row">
              <input
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
                placeholder="Discount code"
              />

              <button type="button">Apply</button>
            </div>

            <div className="right-divider" />

            <div className="total-row">
              <span>Total</span>
              <strong>{formatMoney(amount)}</strong>
            </div>

            <div className="delivery-card">
              <span>✓</span>
              <p>{deliveryCardMessage}</p>
            </div>

{(giftMedia || message) && (
  <div className="personalisation-card">
    <h3>Personalisation added</h3>

    {giftMedia && (
      <div className="personalisation-row">
        <span>Media</span>
<strong>
  {mediaType === "video"
    ? uploadedFile || "Video added"
    : mediaType === "gif"
      ? selectedGif || "GIF added"
      : mediaType === "greeting"
        ? "Greeting card added"
        : "Added"}
</strong>
      </div>
    )}

    {message && (
      <div className="personalisation-row">
        <span>Message</span>
        <strong>{personalMessage || "Added"}</strong>
      </div>
    )}
  </div>
)}

          </div>
        </aside>
      </section>

      <style jsx>{`
        .checkout-page {
          width: 100%;
          min-height: 100vh;
          background: #fff;
          color: #000;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
          overflow-x: hidden;
        }

        .checkout-page * {
          box-sizing: border-box;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        button,
        input {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        .checkout-header {
          position: relative;
          width: 100%;
          height: 94px;
          border-bottom: 1px solid #dddddd;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkout-back {
          position: absolute;
          left: 54px;
          top: 34px;
          border: 0;
          background: transparent;
          color: #8e8e8e;
          font-size: 19px;
          font-weight: 700;
          padding: 0;
        }

        .checkout-back:hover,
        .checkout-back:focus-visible {
          color: #000;
          outline: none;
        }

.checkout-brand {
  width: 176px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.checkout-brand img {
  width: 150px;
  height: auto;
  max-height: 62px;
  object-fit: contain;
  display: block;
}

        .checkout-close {
          position: absolute;
          right: 54px;
          top: 21px;
          width: 58px;
          height: 58px;
          border: 0;
          border-radius: 999px;
          background: #eeeeec;
          color: #000;
          font-family: Arial, sans-serif;
          font-size: 42px;
          font-weight: 700;
          line-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0 4px;
        }

        .checkout-close:hover,
        .checkout-close:focus-visible {
          background: #e2e2df;
          outline: none;
        }

.checkout-layout {
  min-height: calc(100vh - 94px);
  display: grid;
  grid-template-columns: 1fr 1fr;
}

        .checkout-left {
          background: #fff;
        }

        .checkout-right {
          background: #f4f4f2;
          border-left: 1px solid #dddddd;
        }

.checkout-left-inner {
  width: min(595px, calc(100% - 96px));
  margin: 0 auto;
  padding: 72px 0 56px;
}

.checkout-right-inner {
  width: min(515px, calc(100% - 96px));
  margin: 0 auto;
  padding: 72px 0 56px;
}

@media (min-width: 1700px) {
  .checkout-left-inner {
    width: min(610px, calc(100% - 96px));
    margin: 0 72px 0 auto;
  }

  .checkout-right-inner {
    width: min(540px, calc(100% - 96px));
    margin: 0 auto 0 72px;
  }
}

        .contact-section h1,
        .order-section h2 {
          margin: 0;
          color: #000;
          font-size: 31px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1px;
        }

        .contact-section input {
          width: 100%;
          height: 58px;
          margin-top: 22px;
          border: 1.5px solid #cfcfcf;
          border-radius: 12px;
          background: #fff;
          color: #000;
          font-size: 19px;
          font-weight: 700;
          padding: 0 18px;
          outline: none;
        }

        .contact-section input::placeholder,
        .discount-row input::placeholder {
          color: #8b8b8b;
          font-weight: 700;
        }

        .contact-section input:focus,
        .discount-row input:focus {
          border-color: #115cd0;
        }

        .contact-section p {
          margin: 14px 0 0;
          color: #777777;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.25;
        }

        .news-check {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #000;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          user-select: none;
        }

        .news-check input {
          display: none;
        }

        .news-check span {
          width: 23px;
          height: 23px;
          border-radius: 3px;
          border: 2px solid #000;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .news-check input:checked + span {
          background: #000;
        }

.news-check input:checked + span::after {
  content: "✓";
  position: absolute;
  left: 50%;
  top: 56%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
}

.order-section {
  margin-top: 42px;
}

        .order-section > p {
          margin: 8px 0 24px;
          color: #777777;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.2;
        }

        .order-table {
          width: 100%;
          overflow: hidden;
          border: 2px solid #000;
          border-radius: 22px;
          background: #fff;
        }

.order-row {
  min-height: 58px;
  display: grid;
  grid-template-columns: 170px 1fr;
  align-items: center;
  gap: 18px;
  padding: 15px 24px;
  border-bottom: 1px solid #e1e1de;
}

        .order-row:last-child {
          border-bottom: 0;
        }

        .order-row span {
          color: #777777;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.1;
        }

        .order-row strong {
          color: #000;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.1;
        }

        .secure-note {
          margin-top: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #777777;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.15;
        }

.secure-note span,
.delivery-card span {
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  border-radius: 999px;
  background: #115cd0;
  color: transparent;
  position: relative;
  display: block;
  font-size: 0;
  line-height: 0;
  padding: 0;
}

.secure-note span::after,
.delivery-card span::after {
  content: "✓";
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
}


        .pay-button {
          width: 100%;
          height: 76px;
          margin-top: 34px;
          border: 0;
          border-radius: 999px;
          background: #d5d5d2;
          color: #777777;
          font-size: 27px;
          font-weight: 700;
          letter-spacing: -0.7px;
          cursor: not-allowed;
        }

        .pay-button.is-ready {
          background: #115cd0;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 18px 44px rgba(17, 92, 208, 0.25);
        }

        .mini-product {
          display: grid;
          grid-template-columns: 122px 1fr auto;
          gap: 28px;
          align-items: center;
        }

        .mini-product img {
          width: 122px;
          height: 76px;
          border-radius: 12px;
          object-fit: cover;
          display: block;
        }

        .mini-copy h3 {
          margin: 0;
          color: #000;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.4px;
        }

        .mini-copy p {
          margin: 10px 0 0;
          color: #777777;
          font-size: 17px;
          font-weight: 700;
        }

        .mini-product > strong {
          color: #000;
          font-size: 20px;
          font-weight: 700;
          white-space: nowrap;
        }

        .discount-row {
          margin-top: 30px;
          display: grid;
          grid-template-columns: 1fr 84px;
          gap: 12px;
        }

        .discount-row input {
          height: 58px;
          border: 1.5px solid #cfcfcf;
          border-radius: 12px;
          background: #fff;
          color: #000;
          font-size: 19px;
          font-weight: 700;
          padding: 0 18px;
          outline: none;
        }

        .discount-row button {
          height: 58px;
          border: 1.5px solid #cfcfcf;
          border-radius: 12px;
          background: #f4f4f2;
          color: #777777;
          font-size: 18px;
          font-weight: 700;
        }

.right-divider {
  width: 100%;
  height: 1px;
  background: #ddddda;
  margin: 46px 0 32px;
}

        .total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .total-row span {
          color: #000;
          font-size: 27px;
          font-weight: 700;
          letter-spacing: -0.7px;
        }

        .total-row strong {
          color: #000;
          font-size: 31px;
          font-weight: 700;
          letter-spacing: -0.9px;
        }

        .delivery-card {
          margin-top: 34px;
          width: 100%;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08);
          padding: 22px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .delivery-card p {
          margin: 0;
          color: #5f5f5f;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.18;
        }

.personalisation-card {
  margin-top: 18px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08);
  padding: 28px 34px;
}

.personalisation-card h3 {
  height: 30px;
  margin: 0 0 18px;
  color: #000;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  padding-top: 3px;
}

.personalisation-row {
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 26px;
  align-items: start;
  min-height: 56px;
  padding: 15px 0;
  border-top: 1px solid #ededeb;
}

.personalisation-row span,
.personalisation-row strong {
  display: block;
  padding: 0;
  margin: 0;
  line-height: 1.25;
}

.personalisation-row span {
  color: #777;
  font-size: 19px;
  font-weight: 700;
}

.personalisation-row strong {
  color: #000;
  font-size: 19px;
  font-weight: 700;
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: normal;
}
  
        @media (max-width: 980px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }

          .checkout-right {
            border-left: 0;
            border-top: 1px solid #dddddd;
          }

.checkout-left-inner,
.checkout-right-inner {
  width: min(620px, calc(100% - 36px));
  margin: 0 auto;
  padding: 44px 0 32px;
}

.checkout-brand {
  width: 110px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.checkout-brand img {
  width: 100px;
  height: auto;
  max-height: 38px;
  object-fit: contain;
  display: block;
}

          .checkout-back {
            left: 18px;
          }

          .checkout-close {
            right: 18px;
          }
        }

        @media (max-width: 620px) {
          .checkout-header {
            height: 82px;
          }

          .checkout-back {
            top: 31px;
            font-size: 16px;
          }

          .checkout-close {
            top: 18px;
            width: 46px;
            height: 46px;
            font-size: 32px;
            line-height: 46px;
          }

          .checkout-left-inner,
          .checkout-right-inner {
            width: calc(100% - 32px);
          }

          .order-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .mini-product {
            grid-template-columns: 94px 1fr;
          }

          .mini-product > strong {
            grid-column: 2;
          }

          .mini-product img {
            width: 94px;
            height: 60px;
          }

          .discount-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}