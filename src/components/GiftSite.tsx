"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import UniversalGiftCardProduct from "./UniversalGiftCardProduct";
import UniversalHome from "./UniversalHome";
import UniversalShop from "./UniversalShop";

type ProductCardId = "movie" | "merch" | "fuel";

const getProductCardId = (pathname: string | null): ProductCardId | null => {
  if (pathname === "/au/product/movie") return "movie";
  if (pathname === "/au/product/merch") return "merch";
  if (pathname === "/au/product/fuel") return "fuel";

  return null;
};

export default function GiftSite() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollRef = useRef<HTMLElement | null>(null);
  const lastScrollTopRef = useRef(0);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    if (pathname === "/" || pathname === "/us" || pathname === "/us/home") {
      router.replace("/au/home");
      return;
    }

    if (pathname?.startsWith("/us/")) {
      router.replace(pathname.replace(/^\/us\//, "/au/"));
    }
  }, [pathname, router]);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollTop = scrollElement.scrollTop;
    const previousScrollTop = lastScrollTopRef.current;

    if (scrollTop < previousScrollTop) {
      setNavHidden(false);
    }

    if (scrollTop > previousScrollTop && scrollTop > 90) {
      setNavHidden(true);
    }

    if (scrollTop < 20) {
      setNavHidden(false);
    }

    lastScrollTopRef.current = scrollTop;
  };

  const productCardId = getProductCardId(pathname);

  return (
    <main
      ref={scrollRef}
      onScroll={handleScroll}
      className="site-scroll-shell"
    >
      {pathname === "/au/shop" ? (
        <UniversalShop
          shopPath="/au/shop"
          howPath="/au/how-it-works"
          trackerPath="/au/gift-tracker"
          navHidden={navHidden}
          onShop={() => router.push("/au/shop")}
          onHow={() => router.push("/au/how-it-works")}
          onTracker={() => router.push("/au/gift-tracker")}
          onBuyMovieNight={() => router.push("/au/product/movie")}
        />
      ) : productCardId ? (
        <UniversalGiftCardProduct
          cardId={productCardId}
          shopPath="/au/shop"
          howPath="/au/how-it-works"
          trackerPath="/au/gift-tracker"
          navHidden={navHidden}
          onShop={() => router.push("/au/shop")}
          onHow={() => router.push("/au/how-it-works")}
          onTracker={() => router.push("/au/gift-tracker")}
        />
      ) : (
        <UniversalHome
          shopPath="/au/shop"
          howPath="/au/how-it-works"
          trackerPath="/au/gift-tracker"
          navHidden={navHidden}
          onShop={() => router.push("/au/shop")}
          onHow={() => router.push("/au/how-it-works")}
          onTracker={() => router.push("/au/gift-tracker")}
          onBuyMovieNight={() => router.push("/au/product/movie")}
        />
      )}

      <style jsx>{`
        .site-scroll-shell {
          width: 100%;
          height: 100vh;
          overflow-x: hidden;
          overflow-y: auto;
          background: #115cd0;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </main>
  );
}