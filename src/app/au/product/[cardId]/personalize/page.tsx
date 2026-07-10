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
    background: "#0e513d",
    color: "#ffffff",
  },
  {
    id: "dream",
    title: "Dream Big",
    background: "#5b116f",
    color: "#ffffff",
  },
  {
    id: "root",
    title: "Root for each other",
    background: "#c7ed26",
    color: "#000000",
  },
  {
    id: "llama",
    title: "No prob-llama",
    background: "#ec91d5",
    color: "#ffffff",
  },
  {
    id: "magic",
    title: "Believe in magic",
    background: "#101b2b",
    color: "#ffffff",
  },
  {
    id: "delivery",
    title: "Special delivery",
    background: "#fff0f8",
    color: "#68229b",
  },
  {
    id: "taco",
    title: "Taco bout a gift",
    background: "#ffc400",
    color: "#000000",
  },
  {
    id: "shake",
    title: "Shake it off",
    background: "#8d4da6",
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
                    <span>⌕</span>
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
  width: 798px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid #d8d8d8;
  box-shadow: 0 22px 62px rgba(0, 0, 0, 0.11);
  padding: 52px 50px 48px;
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
  height: 118px;
  border: 0;
  border-radius: 16px;
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.5px;
  box-shadow: inset 0 0 0 0 transparent;
}

        .greeting-grid button.is-selected {
          box-shadow: inset 0 0 0 5px #000;
        }

        .gif-panel {
          width: 100%;
        }

        .gif-search {
          width: 100%;
          height: 90px;
          border: 3px solid #111;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 0 44px;
          margin-bottom: 38px;
        }

        .gif-search span {
          color: #000;
          font-size: 42px;
          font-weight: 700;
          line-height: 1;
        }

        .gif-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #4d4d4d;
          font-size: 39px;
          font-weight: 700;
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
          height: 150px;
          border: 0;
          border-radius: 12px;
          background: #f2f2f1;
          font-size: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

.gif-grid button.is-selected {
  box-shadow: inset 0 0 0 5px #115cd0;
  background: #fff;
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
  height: 240px;
          resize: none;
          border: 2px solid #c8c8c8;
          border-radius: 10px;
          background: #fff;
          color: #000;
          font-size: 39px;
          font-weight: 500;
          line-height: 1.2;
          padding: 52px;
          outline: none;
        }

        .message-panel textarea::placeholder {
          color: #8b8b8b;
          font-weight: 700;
        }

        .message-panel p {
          margin: -62px 48px 0 0;
          color: #111;
          font-size: 29px;
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
            width: 100%;
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
            height: 112px;
          }

          .gif-search {
            height: 66px;
            padding: 0 24px;
          }

          .gif-search input {
            font-size: 24px;
          }

          .video-panel p {
            font-size: 26px;
          }

          .upload-button {
            height: 76px;
            font-size: 24px;
          }

          .message-panel textarea {
            height: 260px;
            padding: 28px;
            font-size: 24px;
          }

          .message-panel p {
            margin: -44px 24px 0 0;
            font-size: 20px;
          }

          .checkout-button {
            height: 64px;
            font-size: 23px;
          }
        }
      `}</style>
    </main>
  );
}