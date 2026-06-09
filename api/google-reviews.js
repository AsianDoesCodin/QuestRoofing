const GOOGLE_PLACE_DETAILS_URL = "https://places.googleapis.com/v1/places";
const GOOGLE_PLACE_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const DEFAULT_PLACE_SEARCH_QUERY = "Quest Roofing 602-399-6455 Queen Creek AZ";
const DEFAULT_GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Quest+Roofing/@33.2719434,-113.5069449,8z/data=!3m1!4b1!4m12!1m5!8m4!1e1!2s103221365060186619607!3m1!1e1!3m5!1s0x418bc3655982ca63:0xa793786c586b3432!8m2!3d33.2766146!4d-112.18749!16s%2Fg%2F11y8h7q14v?entry=ttu";

const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "googleMapsUri",
  "rating",
  "userRatingCount",
  "reviews",
  "attributions"
].join(",");

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.end(JSON.stringify(payload));
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getReviewText(review) {
  if (review.text && typeof review.text === "object") return cleanText(review.text.text);
  if (review.originalText && typeof review.originalText === "object") return cleanText(review.originalText.text);
  return cleanText(review.text || review.originalText);
}

function normalizeReview(review, placeMapsUrl) {
  const author = review.authorAttribution || {};
  const text = getReviewText(review);
  if (!text) return null;

  return {
    authorName: cleanText(author.displayName) || "Google reviewer",
    authorUrl: cleanText(author.uri),
    profilePhotoUrl: cleanText(author.photoUri),
    rating: Number.isFinite(review.rating) ? review.rating : null,
    relativeTime: cleanText(review.relativePublishTimeDescription),
    publishTime: cleanText(review.publishTime),
    text,
    googleMapsUri: cleanText(review.googleMapsUri) || placeMapsUrl
  };
}

async function fetchGoogleJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = body.error && body.error.message ? body.error.message : "Google Places request failed.";
    throw new Error(message);
  }
  return body;
}

async function resolvePlaceId(apiKey) {
  const configuredPlaceId = cleanText(process.env.GOOGLE_PLACE_ID || process.env.GOOGLE_PLACES_PLACE_ID);
  if (configuredPlaceId) return configuredPlaceId;

  const textQuery = cleanText(process.env.GOOGLE_PLACE_SEARCH_QUERY || process.env.GOOGLE_PLACES_SEARCH_QUERY || DEFAULT_PLACE_SEARCH_QUERY);
  const search = await fetchGoogleJson(GOOGLE_PLACE_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress"
    },
    body: JSON.stringify({ textQuery, maxResultCount: 1 })
  });

  const match = Array.isArray(search.places) ? search.places[0] : null;
  if (!match || !match.id) throw new Error("Quest Roofing Google place was not found.");
  return match.id;
}

module.exports = async function googleReviews(request, response) {
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Method not allowed." });
    return;
  }

  const apiKey = cleanText(process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY);
  if (!apiKey) {
    sendJson(response, 200, {
      source: "fallback",
      reason: "Google Places API key is not configured."
    });
    return;
  }

  try {
    const placeId = await resolvePlaceId(apiKey);
    const detailsUrl = new URL(`${GOOGLE_PLACE_DETAILS_URL}/${encodeURIComponent(placeId)}`);
    detailsUrl.searchParams.set("languageCode", "en");
    detailsUrl.searchParams.set("regionCode", "US");

    const place = await fetchGoogleJson(detailsUrl, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": DETAILS_FIELD_MASK
      }
    });

    const googleMapsUri = cleanText(place.googleMapsUri) || DEFAULT_GOOGLE_MAPS_URL;
    const reviews = Array.isArray(place.reviews)
      ? place.reviews.map((review) => normalizeReview(review, googleMapsUri)).filter(Boolean).slice(0, 5)
      : [];

    sendJson(response, 200, {
      source: "google",
      place: {
        id: place.id || placeId,
        name: place.displayName && place.displayName.text ? place.displayName.text : "Quest Roofing",
        googleMapsUri,
        rating: Number.isFinite(place.rating) ? place.rating : null,
        userRatingCount: Number.isFinite(place.userRatingCount) ? place.userRatingCount : null
      },
      attribution: "Google Maps",
      attributions: Array.isArray(place.attributions) ? place.attributions : [],
      reviews
    });
  } catch (error) {
    sendJson(response, 200, {
      source: "fallback",
      reason: error instanceof Error ? error.message : "Unable to load Google reviews."
    });
  }
};
