"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type GiftCardId = "movie" | "merch" | "fuel";

type UniversalGiftCardProductProps = {
  cardId: GiftCardId;
  shopPath: string;
  howPath?: string;
  trackerPath?: string;
  navHidden?: boolean;
  onShop?: () => void;
  onHow?: () => void;
  onTracker?: () => void;
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

const amounts = [
  5, 10, 15,
  20, 25, 30,
  40, 50, 75,
  100, 150, 200,
  250, 300, 350,
  400, 500,
];

const formatAmount = (amount: number) => `AU$${amount.toFixed(2)}`;

export default function UniversalGiftCardProduct({
  cardId,
  shopPath,
}: UniversalGiftCardProductProps) {
  const router = useRouter();
  const continueRef = useRef<HTMLButtonElement | null>(null);
  const product = useMemo(() => products[cardId] ?? products.movie, [cardId]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const closeToShop = () => {
    router.push(shopPath || "/au/shop");
  };

  const scrollToContinueButton = () => {
    window.setTimeout(() => {
      const continueButton = continueRef.current;
      if (!continueButton) return;

      let scrollParent: HTMLElement | null = continueButton.parentElement;

      while (scrollParent) {
        const styles = window.getComputedStyle(scrollParent);
        const overflowY = styles.overflowY;
        const canScroll =
          (overflowY === "auto" || overflowY === "scroll") &&
          scrollParent.scrollHeight > scrollParent.clientHeight;

        if (canScroll) break;
        scrollParent = scrollParent.parentElement;
      }

      const buttonRect = continueButton.getBoundingClientRect();
      const bottomPadding = 44;

      if (scrollParent) {
        const parentRect = scrollParent.getBoundingClientRect();
        const hiddenBelow = buttonRect.bottom - parentRect.bottom + bottomPadding;

        if (hiddenBelow > 0) {
          scrollParent.scrollTo({
            top: scrollParent.scrollTop + hiddenBelow,
            behavior: "smooth",
          });
        }

        return;
      }

      const hiddenBelow = buttonRect.bottom - window.innerHeight + bottomPadding;

      if (hiddenBelow > 0) {
        window.scrollTo({
          top: window.scrollY + hiddenBelow,
          behavior: "smooth",
        });
      }
    }, 80);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    scrollToContinueButton();
  };

  return (
    <main className="universal-product-page">
      <section className="product-value-page">
        <div className="product-value-frame">
          <button
            type="button"
            className="product-back-button"
            onClick={closeToShop}
          >
            ← Back
          </button>

          <section className="product-info-column">
            <div className="product-info-image-wrap">
              <img src={product.image} alt={product.title} draggable={false} />
            </div>

            <h1 className="product-info-title">{product.title}</h1>

            <p className="product-info-copy">{product.description}</p>

            <a className="product-info-link" href="#">
              View participating stores
            </a>

            <p className="product-info-expiry">{product.expiry}</p>

            <a className="product-info-link" href="#">
              Terms &amp; Conditions
            </a>
          </section>

          <section className="purchase-column">
            <h2 className="purchase-heading">
              How much would you like to purchase?
            </h2>

            <div className="amount-panel">
              <div className="amount-grid">
                {amounts.map((amount) => {
                  const isSelected = selectedAmount === amount;

                  return (
                    <button
                      key={amount}
                      type="button"
                      className={isSelected ? "is-selected" : ""}
                      aria-pressed={isSelected}
                      onClick={() => handleAmountSelect(amount)}
                    >
                      {formatAmount(amount)}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              ref={continueRef}
              type="button"
              className={`continue-button ${selectedAmount ? "is-visible" : ""}`}
              disabled={!selectedAmount}
              onClick={() => {
                if (!selectedAmount) return;
                router.push(`/au/product/${cardId}/recipient?amount=${selectedAmount}`);
              }}
            >
              Continue →
            </button>
          </section>
        </div>
      </section>

      <style jsx>{`
        .universal-product-page {
          width: 100%;
          min-height: 100%;
          overflow: visible;
          background: #f3f3f1;
          color: #000;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        .universal-product-page * {
          box-sizing: border-box;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .product-value-page {
          width: 100%;
          min-height: 100vh;
          overflow: visible;
          background: #f3f3f1;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .product-value-frame {
          position: relative;
          width: 1440px;
          min-height: 1030px;
          flex-shrink: 0;
          background: #f3f3f1;
          color: #000;
          transform-origin: top center;
        }

        .product-back-button {
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

        .product-back-button:hover,
        .product-back-button:focus-visible {
          color: #000;
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

        .purchase-column {
          position: absolute;
          left: 682px;
          top: 87px;
          width: 679px;
          padding-bottom: 0;
        }

        .purchase-heading {
          width: 545px;
          margin: 0;
          color: #000;
          font-size: 42px;
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: -1.7px;
        }

        .amount-panel {
          width: 679px;
          height: 649px;
          margin-top: 58px;
          background: #fff;
          border-radius: 35px;
          padding: 45px 35px;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.04),
            0 10px 18px rgba(0, 0, 0, 0.05),
            0 18px 56px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .amount-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px 20px;
        }

        .amount-grid button {
          height: 72px;
          border: 0;
          border-radius: 999px;
          background: #000;
          color: #fff;
          font-size: 23px;
          font-weight: 700;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0;
          white-space: nowrap;
          transition:
            background 160ms ease,
            color 160ms ease,
            transform 160ms ease,
            box-shadow 160ms ease;
        }

        .amount-grid button:hover,
        .amount-grid button:focus-visible {
          transform: translateY(-2px);
          background: #222;
          outline: none;
        }

        .amount-grid button.is-selected {
          background: #115cd0;
          color: #fff;
          box-shadow: 0 10px 28px rgba(17, 92, 208, 0.26);
        }

        .continue-button {
          width: 609px;
          height: 78px;
          margin: 42px 0 0 35px;
          border: 0;
          border-radius: 999px;
          background: #115cd0;
          color: #fff;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.7px;
          box-shadow: 0 18px 44px rgba(17, 92, 208, 0.25);
          opacity: 0;
          pointer-events: none;
          transform: translateY(14px);
          transition:
            opacity 220ms ease,
            transform 220ms ease,
            background 160ms ease;
        }

        .continue-button.is-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .continue-button:hover,
        .continue-button:focus-visible {
          outline: none;
          background: #115cd0;
        }

        @media (max-width: 1700px) {
          .product-value-frame {
            transform: scale(calc(100vw / 1440));
            transform-origin: top center;
          }
        }

        @media (max-width: 760px) {
          .product-value-page {
            display: block;
            padding: 26px 16px 70px;
          }

          .product-value-frame {
            width: 100%;
            min-height: auto;
            transform: none;
          }

          .product-back-button {
            position: relative;
            left: auto;
            top: auto;
            display: inline-flex;
            margin-bottom: 24px;
            font-size: 16px;
          }

          .product-info-column,
          .purchase-column {
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
          .purchase-heading,
          .amount-panel {
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

          .purchase-column {
            margin-top: 44px;
          }

          .purchase-heading {
            font-size: 34px;
          }

          .amount-panel {
            height: auto;
            margin-top: 24px;
            padding: 24px;
            overflow: visible;
          }

          .amount-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .amount-grid button {
            height: 56px;
            font-size: 20px;
          }

          .continue-button {
            width: 100%;
            height: 62px;
            margin: 24px 0 0;
            font-size: 24px;
          }
        }
      `}</style>
    </main>
  );
}