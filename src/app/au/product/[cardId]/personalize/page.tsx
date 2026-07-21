"use client";

import { useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

type GiftCardId = "movie" | "merch" | "fuel";
type MediaType = "greeting" | "gif" | "video";

const isGiftCardId = (value: string): value is GiftCardId => {
  return value === "movie" || value === "merch" || value === "fuel";
};

const greetingCards = [
  {
    id: "seasons",
    title: "Season’s Greetings",
    background: "#061a3d",
    color: "#ffffff",
  },
  {
    id: "dream",
    title: "Dream Big",
    background: "#115cd0",
    color: "#ffffff",
  },
  {
    id: "root",
    title: "Root for each other",
    background: "#d8e5ff",
    color: "#061a3d",
  },
  {
    id: "llama",
    title: "No prob-llama",
    background: "#0b2b66",
    color: "#ffffff",
  },
  {
    id: "magic",
    title: "Believe in magic",
    background: "#020814",
    color: "#ffffff",
  },
  {
    id: "delivery",
    title: "Special delivery",
    background: "#f4f7fb",
    color: "#115cd0",
  },
  {
    id: "taco",
    title: "Taco bout a gift",
    background: "#b7c7e8",
    color: "#061a3d",
  },
  {
    id: "shake",
    title: "Shake it off",
    background: "#284f9f",
    color: "#ffffff",
  },
];

const gifItems = ["🎁", "🐧", "💝", "✨", "🎉", "💌", "🌈", "🪄", "🥳"];

export default function UniversalPersonalizePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const rawCardId = typeof params.cardId === "string" ? params.cardId : "movie";
  const cardId: GiftCardId = isGiftCardId(rawCardId) ? rawCardId : "movie";

  const [giftMediaEnabled, setGiftMediaEnabled] = useState(false);
  const [messageEnabled, setMessageEnabled] = useState(false);
  const [mediaType, setMediaType] = useState<MediaType>("greeting");

  const [selectedGreeting, setSelectedGreeting] = useState("seasons");
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [message, setMessage] = useState("");

  const baseQuery = searchParams.toString();

  const mediaReady =
    !giftMediaEnabled ||
    mediaType === "greeting" ||
    (mediaType === "gif" && !!selectedGif) ||
    (mediaType === "video" && !!uploadedFileName);

  const messageReady = !messageEnabled || message.trim().length > 0;

  const canCheckout = mediaReady && messageReady;

  const hasPersonalization = giftMediaEnabled || messageEnabled;

  const checkoutQuery = useMemo(() => {
    const query = new URLSearchParams(baseQuery);

    query.set("giftMedia", giftMediaEnabled ? "true" : "false");
    query.set("message", messageEnabled ? "true" : "false");

    if (giftMediaEnabled) {
      query.set("mediaType", mediaType);

      if (mediaType === "greeting") {
        query.set("greetingCard", selectedGreeting);
        query.delete("gif");
        query.delete("uploadedFile");
      }

      if (mediaType === "gif" && selectedGif) {
        query.set("gif", selectedGif);
        query.delete("greetingCard");
        query.delete("uploadedFile");
      }

      if (mediaType === "video" && uploadedFileName) {
        query.set("uploadedFile", uploadedFileName);
        query.delete("greetingCard");
        query.delete("gif");
      }
    } else {
      query.delete("mediaType");
      query.delete("greetingCard");
      query.delete("gif");
      query.delete("uploadedFile");
    }

    if (messageEnabled && message.trim()) {
      query.set("personalMessage", message.trim());
    } else {
      query.delete("personalMessage");
    }

    return query.toString();
  }, [
    baseQuery,
    giftMediaEnabled,
    mediaType,
    messageEnabled,
    message,
    selectedGif,
    selectedGreeting,
    uploadedFileName,
  ]);

  const goBack = () => {
    router.push(`/au/product/${cardId}/recipient?${baseQuery}`);
  };

  const closeToShop = () => {
    router.push("/au/shop");
  };

  const goToCheckout = () => {
    if (!canCheckout) return;
    router.push(`/au/product/${cardId}/checkout?${checkoutQuery}`);
  };

  return (
    <main className="personalize-page">
      <button type="button" className="personalize-back" onClick={goBack}>
        ← Back
      </button>

      <button
        type="button"
        className="personalize-close"
        onClick={closeToShop}
        aria-label="Close"
      >
        ×
      </button>

      <section className="personalize-card">
        <h1>Personalise</h1>

        <p className="personalize-subtitle">
          Add a personal touch to your gift.
        </p>

        <section className="section-block">
          <div className="section-header">
            <div>
              <h2>Add gift media</h2>
              <p>
                Add a greeting card, GIF, or video to make it feel more
                personal.
              </p>
            </div>

            <button
              type="button"
              className={`toggle-switch ${giftMediaEnabled ? "is-on" : ""}`}
              onClick={() => setGiftMediaEnabled((current) => !current)}
              aria-label="Toggle gift media"
            >
              <span />
            </button>
          </div>

          {giftMediaEnabled && (
            <div className="gift-media-panel">
              <div className="media-tabs">
                <button
                  type="button"
                  className={mediaType === "greeting" ? "is-active" : ""}
                  onClick={() => setMediaType("greeting")}
                >
                  Greeting card
                </button>

                <button
                  type="button"
                  className={mediaType === "gif" ? "is-active" : ""}
                  onClick={() => setMediaType("gif")}
                >
                  GIF
                </button>

                <button
                  type="button"
                  className={mediaType === "video" ? "is-active" : ""}
                  onClick={() => setMediaType("video")}
                >
                  Video
                </button>
              </div>

              {mediaType === "greeting" && (
                <div className="greeting-grid">
                  {greetingCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      className={
                        selectedGreeting === card.id ? "is-selected" : ""
                      }
                      style={{
                        background: card.background,
                        color: card.color,
                      }}
                      onClick={() => setSelectedGreeting(card.id)}
                    >
                      {card.title}
                    </button>
                  ))}
                </div>
              )}

              {mediaType === "gif" && (
                <div className="gif-panel">
                  <div className="gif-search">
                    <svg
                      className="gif-search-icon"
                      viewBox="0 0 28 28"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                      />
                      <path
                        d="M18 18L25 25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input placeholder="Search GIPHY" />
                  </div>

                  <div className="gif-grid">
                    {gifItems.map((gif) => (
                      <button
                        key={gif}
                        type="button"
                        className={selectedGif === gif ? "is-selected" : ""}
                        onClick={() => setSelectedGif(gif)}
                      >
                        {gif}
                      </button>
                    ))}
                  </div>

                  <div className="giphy-powered">
                    <span>POWERED BY</span>
                    <strong>GIPHY</strong>
                  </div>
                </div>
              )}

              {mediaType === "video" && (
                <div className="video-panel">
                  <p>
                    Add an MP3 or MP4. Keep your video or audio file under 30
                    seconds and up to 300MB.
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/mp3,audio/mpeg,video/mp4"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setUploadedFileName(file?.name ?? "");
                    }}
                  />

                  <button
                    type="button"
                    className="upload-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedFileName || "Upload MP3 or MP4"}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <div className="divider" />

        <section className="section-block">
          <div className="section-header">
            <div>
              <h2>Write a personal message</h2>
              <p>Add a note for the recipient before checkout.</p>
            </div>

            <button
              type="button"
              className={`toggle-switch ${messageEnabled ? "is-on" : ""}`}
              onClick={() => setMessageEnabled((current) => !current)}
              aria-label="Toggle personal message"
            >
              <span />
            </button>
          </div>

          {messageEnabled && (
            <div className="message-panel">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value.slice(0, 1000))}
                placeholder="Write your message..."
              />

              <p>{message.length}/1000</p>
            </div>
          )}
        </section>

        <button
          type="button"
          className={`checkout-button ${canCheckout ? "is-ready" : ""}`}
          disabled={!canCheckout}
          onClick={goToCheckout}
        >
          {hasPersonalization ? "Continue to checkout" : "Skip to checkout"}
        </button>
      </section>

      <style jsx>{`
        .personalize-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          background: #f3f3f1;
          color: #000;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 94px 24px 90px;
        }

        .personalize-page * {
          box-sizing: border-box;
          font-family: Futura, "Trebuchet MS", Arial, sans-serif;
        }

        button,
        textarea,
        input {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        .personalize-back {
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

        .personalize-back:hover,
        .personalize-back:focus-visible {
          color: #000;
          outline: none;
        }

        .personalize-close {
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

        .personalize-close:hover,
        .personalize-close:focus-visible {
          background: #d5d5d2;
          outline: none;
        }

.personalize-card {
  width: 1110px;
  border-radius: 24px;
  background: #fff;
  padding: 52px 72px 56px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 18px 56px rgba(0, 0, 0, 0.1);
}

        .personalize-card h1 {
          margin: 0;
          color: #000;
          font-size: 50px;
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -1.9px;
        }

        .personalize-subtitle {
          margin: 32px 0 58px;
          color: #2d2d2d;
          font-size: 35px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -1px;
        }

        .section-block {
          width: 100%;
        }

        .section-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
        }

        .section-header h2 {
          margin: 0;
          color: #222;
          font-size: 39px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -1.2px;
        }

        .section-header p {
          margin: 14px 0 0;
          color: #777;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.4px;
        }

        .toggle-switch {
          width: 94px;
          height: 54px;
          flex: 0 0 94px;
          border: 0;
          border-radius: 999px;
          background: #9e9e9e;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          transition: background 160ms ease;
        }

        .toggle-switch span {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          background: #fff;
          display: block;
          transition: transform 160ms ease;
        }

        .toggle-switch.is-on {
          background: #115cd0;
        }

        .toggle-switch.is-on span {
          transform: translateX(40px);
        }

        .gift-media-panel {
          width: 100%;
          margin-top: 50px;
        }

        .media-tabs {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 44px;
        }

.media-tabs button {
  height: 64px;
  border: 0;
  border-radius: 999px;
  background: #f1f1f1;
  color: #4d4d4d;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.6px;
  padding: 0 30px;
}

        .media-tabs button.is-active {
          background: #115cd0;
          color: #fff;
        }

        .greeting-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

.greeting-grid button {
  height: 128px;
  border: 0;
  border-radius: 16px;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.7px;
  box-shadow: inset 0 0 0 0 transparent;
}

        .greeting-grid button.is-selected {
          box-shadow: inset 0 0 0 5px #115cd0, inset 0 0 0 9px #ffffff;
        }

        .gif-panel {
          width: 100%;
        }

        .gif-search {
          width: 100%;
          height: 96px;
          border: 3px solid #111;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 28px;
          padding: 0 48px;
          margin-bottom: 42px;
        }

        .gif-search-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          color: #000;
          display: block;
          transform: translateY(3px);
        }

.gif-search input {
  width: 100%;
  height: 96px;
  border: 0;
  outline: 0;
  background: transparent;
  color: #4d4d4d;
  font-size: 34px;
  font-weight: 700;
  line-height: 96px;
  padding: 0;
  display: block;
  transform: translateY(5px);
}

        .gif-search input::placeholder {
          color: #4d4d4d;
        }

        .gif-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .gif-grid button {
          height: 164px;
          border: 0;
          border-radius: 12px;
          background: #f2f2f1;
          font-size: 68px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gif-grid button.is-selected {
  box-shadow: inset 0 0 0 5px #115cd0;
  background: #fff;
}

        .giphy-powered {
          margin-top: 58px;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 16px;
          color: #b3b3b3;
          font-size: 34px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.8px;
        }

        .giphy-powered strong {
          color: #777;
          font-size: 50px;
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -1.6px;
        }

        .video-panel p {
          margin: 0 0 58px;
          color: #000;
          font-size: 43px;
          font-style: italic;
          font-weight: 500;
          line-height: 1.28;
          letter-spacing: -1.3px;
        }

        .upload-button {
          width: 100%;
          height: 118px;
          border: 3px solid #111;
          border-radius: 8px;
          background: #fff;
          color: #111;
          font-size: 39px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: #d6d6d2;
          margin: 58px 0;
        }

        .message-panel {
          width: 100%;
          margin-top: 48px;
        }

.message-panel textarea {
  width: 100%;
  height: 360px;
          resize: none;
          border: 2px solid #c8c8c8;
          border-radius: 10px;
          background: #fff;
          color: #000;
          font-size: 43px;
          font-weight: 500;
          line-height: 1.2;
          padding: 56px 52px;
          outline: none;
        }

        .message-panel textarea::placeholder {
          color: #8b8b8b;
          font-weight: 700;
        }

        .message-panel p {
          margin: -72px 48px 0 0;
          color: #111;
          font-size: 32px;
          font-weight: 700;
          text-align: right;
          pointer-events: none;
        }

        .checkout-button {
          width: 100%;
          height: 86px;
          margin-top: 58px;
          border: 0;
          border-radius: 999px;
          background: #a7a7a7;
          color: #fff;
          font-size: 35px;
          font-weight: 700;
          letter-spacing: -1px;
          cursor: not-allowed;
          box-shadow: none;
        }

        .checkout-button.is-ready {
          background: #115cd0;
          cursor: pointer;
          box-shadow: 0 18px 44px rgba(17, 92, 208, 0.25);
        }

        .checkout-button.is-ready:hover,
        .checkout-button.is-ready:focus-visible {
          outline: none;
          transform: translateY(-2px);
        }

        @media (max-width: 1180px) {
          .personalize-card {
            width: calc(100vw - 48px);
          }
        }

        @media (max-width: 900px) {
          .personalize-page {
            padding: 92px 18px 60px;
          }

          .personalize-back {
            left: 18px;
            top: 34px;
            font-size: 16px;
          }

          .personalize-close {
            right: 18px;
            top: 22px;
            width: 46px;
            height: 46px;
            font-size: 32px;
            line-height: 46px;
          }

          .personalize-card {
            padding: 34px 26px 30px;
            border-radius: 24px;
          }

          .personalize-card h1 {
            font-size: 38px;
          }

          .personalize-subtitle {
            margin: 24px 0 38px;
            font-size: 24px;
          }

          .section-header {
            gap: 18px;
          }

          .section-header h2 {
            font-size: 27px;
          }

          .section-header p {
            font-size: 17px;
          }

          .toggle-switch {
            width: 72px;
            height: 42px;
            flex-basis: 72px;
          }

          .toggle-switch span {
            width: 32px;
            height: 32px;
          }

          .toggle-switch.is-on span {
            transform: translateX(30px);
          }

          .media-tabs {
            flex-wrap: wrap;
            gap: 12px;
          }

          .media-tabs button {
            height: 58px;
            font-size: 20px;
            padding: 0 24px;
          }

          .greeting-grid,
          .gif-grid {
            grid-template-columns: 1fr;
          }

          .greeting-grid button,
          .gif-grid button {
            height: 128px;
          }

          .greeting-grid button {
            font-size: 22px;
          }

          .gif-grid button {
            font-size: 58px;
          }

          .gif-search {
            height: 66px;
            padding: 0 24px;
            gap: 16px;
          }

          .gif-search-icon {
            width: 24px;
            height: 24px;
            flex-basis: 24px;
            transform: translateY(2px);
          }

          .gif-search input {
            height: 66px;
            font-size: 24px;
            line-height: 66px;
            padding: 0;
            transform: translateY(3px);
          }

          .giphy-powered {
            margin-top: 34px;
            gap: 10px;
            font-size: 22px;
          }

          .giphy-powered strong {
            font-size: 32px;
          }

          .video-panel p {
            font-size: 26px;
          }

          .upload-button {
            height: 76px;
            font-size: 24px;
          }

          .message-panel textarea {
            height: 340px;
            padding: 32px 28px;
            font-size: 26px;
          }

          .message-panel p {
            margin: -52px 24px 0 0;
            font-size: 22px;
          }

          .checkout-button {
            height: 64px;
            font-size: 23px;
          }
        }
          /* =========================================================
   FINAL MOBILE UNIVERSAL PERSONALISE PAGE
   Desktop remains completely untouched.
   ========================================================= */

@media (max-width: 760px) {
  .personalize-page {
    position: relative !important;
    display: block !important;
    width: 100% !important;
    min-height: 100dvh !important;
    margin: 0 !important;
    padding: 76px 14px 48px !important;
    overflow-x: hidden !important;
    overflow-y: visible !important;
    background: #f3f3f1 !important;
    font-family: Futura, "Trebuchet MS", Arial, sans-serif !important;
  }

  /* TOP CONTROLS */

  .personalize-back {
    position: absolute !important;
    left: 16px !important;
    top: 20px !important;
    display: inline-flex !important;
    min-height: 38px !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
    color: #8e8e8e !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.1px !important;
    z-index: 10 !important;
  }

  .personalize-close {
    position: absolute !important;
    right: 16px !important;
    top: 14px !important;
    display: flex !important;
    width: 38px !important;
    height: 38px !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    padding: 0 0 3px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #e2e2df !important;
    color: #000000 !important;
    font-family: Arial, sans-serif !important;
    font-size: 27px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    z-index: 20 !important;
  }

  /* MAIN WHITE CARD */

  .personalize-card {
    display: block !important;
    width: min(88vw, 360px) !important;
    margin: 0 auto !important;
    padding: 24px 20px 22px !important;
    border: 0 !important;
    border-radius: 22px !important;
    background: #ffffff !important;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.04),
      0 18px 42px rgba(0, 0, 0, 0.1) !important;
  }

  .personalize-card h1 {
    margin: 0 !important;
    color: #000000 !important;
    font-size: 30px !important;
    font-weight: 700 !important;
    line-height: 0.96 !important;
    letter-spacing: -1px !important;
  }

  .personalize-subtitle {
    margin: 18px 0 24px !important;
    color: #333333 !important;
    font-size: 19px !important;
    font-weight: 700 !important;
    line-height: 1.02 !important;
    letter-spacing: -0.5px !important;
  }

  /* OPTION ROWS */

  .section-block {
    width: 100% !important;
  }

  .section-header {
    display: grid !important;
    width: 100% !important;
    grid-template-columns: minmax(0, 1fr) 54px !important;
    align-items: center !important;
    gap: 16px !important;
  }

  .section-header > div {
    min-width: 0 !important;
  }

  .section-header h2 {
    width: 100% !important;
    margin: 0 !important;
    color: #222222 !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    line-height: 0.96 !important;
    letter-spacing: -0.6px !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
  }

  .section-header p {
    width: 100% !important;
    max-width: 205px !important;
    margin: 9px 0 0 !important;
    color: #777777 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    line-height: 1.12 !important;
    letter-spacing: -0.1px !important;
  }

  /* TOGGLES */

  .toggle-switch {
    display: flex !important;
    width: 54px !important;
    height: 32px !important;
    flex: 0 0 54px !important;
    align-items: center !important;
    justify-content: flex-start !important;
    margin: 0 !important;
    padding: 3px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #a4a4a4 !important;
  }

  .toggle-switch span {
    display: block !important;
    width: 26px !important;
    height: 26px !important;
    flex: 0 0 26px !important;
    border-radius: 999px !important;
    background: #ffffff !important;
    transform: none !important;
  }

  .toggle-switch.is-on {
    background: #115cd0 !important;
  }

  .toggle-switch.is-on span {
    transform: translateX(22px) !important;
  }

  .divider {
    width: 100% !important;
    height: 1px !important;
    margin: 36px 0 !important;
    background: #dededb !important;
  }

  /* OPENED MEDIA PANEL */

  .gift-media-panel {
    width: 100% !important;
    margin: 24px 0 0 !important;
  }

  .media-tabs {
    display: grid !important;
    width: 100% !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    align-items: center !important;
    gap: 7px !important;
    margin: 0 0 18px !important;
  }

  .media-tabs button {
    width: 100% !important;
    min-width: 0 !important;
    height: 42px !important;
    margin: 0 !important;
    padding: 0 7px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #f1f1f1 !important;
    color: #4d4d4d !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.2px !important;
    white-space: nowrap !important;
  }

  .media-tabs button.is-active {
    background: #115cd0 !important;
    color: #ffffff !important;
  }

  /* GREETING CARDS */

  .greeting-grid {
    display: grid !important;
    width: 100% !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }

  .greeting-grid button {
    width: 100% !important;
    min-width: 0 !important;
    height: 86px !important;
    padding: 10px !important;
    border: 0 !important;
    border-radius: 12px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    line-height: 1.05 !important;
    letter-spacing: -0.2px !important;
  }

  .greeting-grid button.is-selected {
    box-shadow:
      inset 0 0 0 3px #115cd0,
      inset 0 0 0 6px #ffffff !important;
  }

  /* GIF PANEL */

  .gif-panel {
    width: 100% !important;
  }

  .gif-search {
    display: grid !important;
    width: 100% !important;
    height: 52px !important;
    grid-template-columns: 22px minmax(0, 1fr) !important;
    align-items: center !important;
    gap: 11px !important;
    margin: 0 0 18px !important;
    padding: 0 17px !important;
    border: 2px solid #111111 !important;
    border-radius: 999px !important;
  }

  .gif-search-icon {
    display: block !important;
    width: 22px !important;
    height: 22px !important;
    flex: none !important;
    color: #000000 !important;
    transform: translateY(1px) !important;
  }

  .gif-search input {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    height: 48px !important;
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    background: transparent !important;
    color: #4d4d4d !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: normal !important;
    transform: none !important;
  }

  .gif-search input::placeholder {
    color: #777777 !important;
    opacity: 1 !important;
  }

  .gif-grid {
    display: grid !important;
    width: 100% !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 9px !important;
  }

  .gif-grid button {
    width: 100% !important;
    min-width: 0 !important;
    height: 72px !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: 11px !important;
    background: #f2f2f1 !important;
    font-size: 33px !important;
  }

  .gif-grid button.is-selected {
    background: #ffffff !important;
    box-shadow: inset 0 0 0 3px #115cd0 !important;
  }

  .giphy-powered {
    display: flex !important;
    align-items: baseline !important;
    justify-content: center !important;
    gap: 7px !important;
    margin: 22px 0 0 !important;
    color: #b3b3b3 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.2px !important;
  }

  .giphy-powered strong {
    color: #777777 !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.4px !important;
  }

  /* VIDEO */

  .video-panel p {
    margin: 0 0 20px !important;
    color: #000000 !important;
    font-size: 15px !important;
    font-style: italic !important;
    font-weight: 500 !important;
    line-height: 1.3 !important;
    letter-spacing: -0.1px !important;
  }

  .upload-button {
    width: 100% !important;
    min-height: 54px !important;
    height: auto !important;
    padding: 13px 16px !important;
    border: 2px solid #111111 !important;
    border-radius: 9px !important;
    background: #ffffff !important;
    color: #111111 !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    line-height: 1.2 !important;
    overflow-wrap: anywhere !important;
  }

  /* MESSAGE */

  .message-panel {
    position: relative !important;
    width: 100% !important;
    margin: 24px 0 0 !important;
  }

  .message-panel textarea {
    display: block !important;
    width: 100% !important;
    height: 175px !important;
    margin: 0 !important;
    padding: 18px 17px 42px !important;
    resize: none !important;
    border: 1.5px solid #c8c8c8 !important;
    border-radius: 10px !important;
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    line-height: 1.25 !important;
    outline: none !important;
  }

  .message-panel textarea:focus {
    border-color: #115cd0 !important;
    box-shadow: 0 0 0 3px rgba(17, 92, 208, 0.14) !important;
  }

  .message-panel textarea::placeholder {
    color: #8b8b8b !important;
    font-weight: 700 !important;
  }

  .message-panel p {
    position: absolute !important;
    right: 14px !important;
    bottom: 12px !important;
    margin: 0 !important;
    color: #555555 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

  /* CHECKOUT BUTTON */

  .checkout-button {
    display: flex !important;
    width: 100% !important;
    height: 52px !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 42px 0 0 !important;
    padding: 0 16px !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #a7a7a7 !important;
    color: #ffffff !important;
    font-size: 17px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: -0.3px !important;
    box-shadow: none !important;
    transform: none !important;
  }

  .checkout-button.is-ready {
    background: #115cd0 !important;
    color: #ffffff !important;
    cursor: pointer !important;
    box-shadow: 0 12px 28px rgba(17, 92, 208, 0.24) !important;
  }

  .checkout-button.is-ready:hover,
  .checkout-button.is-ready:focus-visible {
    transform: none !important;
  }
}
      `}</style>
    </main>
  );
}