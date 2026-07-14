import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckoutRequest = {
  cardId?: string;
  productTitle?: string;
  amount?: number;
  currency?: string;
  contactEmail?: string;
  recipientType?: string;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  giftMedia?: boolean;
  message?: boolean;
  mediaType?: string;
  personalMessage?: string;
  uploadedFile?: string;
  selectedGif?: string;
  newsOptIn?: boolean;
  discountCode?: string;
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

const cleanMetadata = (
  value: unknown,
  maximumLength = 450
): string => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).slice(0, maximumLength);
};

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        {
          error:
            "STRIPE_SECRET_KEY is missing from .env.local.",
        },
        {
          status: 500,
        }
      );
    }

    const body = (await request.json()) as CheckoutRequest;

    const amount = Number(body.amount);
    const contactEmail = body.contactEmail?.trim() ?? "";
    const cardId = body.cardId?.trim() ?? "";
    const productTitle =
      body.productTitle?.trim() || "Universal Gift Card";

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          error: "A valid gift card amount is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !contactEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
        contactEmail
      )
    ) {
      return NextResponse.json(
        {
          error: "A valid contact email is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      cardId !== "movie" &&
      cardId !== "merch" &&
      cardId !== "fuel"
    ) {
      return NextResponse.json(
        {
          error: "The selected gift card is invalid.",
        },
        {
          status: 400,
        }
      );
    }

    const origin = new URL(request.url).origin;
    const referer = request.headers.get("referer");

    const cancelUrl =
      referer && referer.startsWith(origin)
        ? referer
        : `${origin}/au/product/${cardId}/checkout`;

    const metadata: Stripe.MetadataParam = {
      website: "universal-gift-site",
      cardId: cleanMetadata(cardId),
      contactEmail: cleanMetadata(contactEmail),
      recipientType: cleanMetadata(body.recipientType),
      recipientName: cleanMetadata(body.recipientName),
      recipientEmail: cleanMetadata(body.recipientEmail),
      recipientPhone: cleanMetadata(body.recipientPhone),
      giftMedia: cleanMetadata(Boolean(body.giftMedia)),
      messageAdded: cleanMetadata(Boolean(body.message)),
      mediaType: cleanMetadata(body.mediaType),
      personalMessage: cleanMetadata(
        body.personalMessage
      ),
      uploadedFile: cleanMetadata(body.uploadedFile),
      selectedGif: cleanMetadata(body.selectedGif),
      newsOptIn: cleanMetadata(Boolean(body.newsOptIn)),
      discountCode: cleanMetadata(body.discountCode),
    };

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: contactEmail,

        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "aud",
              unit_amount: Math.round(amount * 100),

              product_data: {
                name: productTitle,
                description:
                  "Universal digital gift card",
              },
            },
          },
        ],

        metadata,

        payment_intent_data: {
          metadata,
        },

        success_url:
          `${origin}/au/thank-you` +
          "?session_id={CHECKOUT_SESSION_ID}",

        cancel_url: cancelUrl,
      });

    if (!session.url) {
      return NextResponse.json(
        {
          error:
            "Stripe did not return a checkout URL.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Stripe checkout session error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create the Stripe checkout session.";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}
