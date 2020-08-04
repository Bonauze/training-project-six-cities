const createAuthInfo = (data) => ({
  id: data.id,
  email: data.email,
  name: data.name,
  avatarUrl: data.avatar_url,
  isPro: data.is_pro,
});

const createReview = (data) => ({
  id: data.id,
  image: data.user.avatar_url,
  name: data.user.name,
  rating: data.rating,
  description: data.comment,
  date: data.date,
});

const createFavoriteOffers = (data) => {
  const favoritesOffers = [];

  Object.entries(data).forEach(([, value]) => {
    const cityName = value.city.name;

    const favoritesOffer = favoritesOffers.filter((item) => item.cityName === cityName);

    if (favoritesOffer.length === 1) {
      favoritesOffer[0].offers.push(value);
    } else {
      favoritesOffers.push({
        cityName,
        offers: [value],
      });
    }
  });

  return favoritesOffers;
};

const createOffer = (data) => ({
  city: {
    name: data.city.name,
    location: {
      latitude: data.city.location.latitude,
      longitude: data.city.location.longitude,
      zoom: data.city.location.zoom,
    },
  },
  previewImage: data.preview_image,
  images: data.images,
  title: data.title,
  isFavorite: data.is_favorite,
  isPremium: data.is_premium,
  rating: data.rating,
  type: data.type,
  bedrooms: data.bedrooms,
  maxAdults: data.max_adults,
  price: data.price,
  goods: data.goods,
  host: {
    id: data.host.id,
    name: data.host.name,
    isPro: data.host.is_pro,
    avatarUrl: data.host.avatar_url
  },
  description: data.description,
  location: {
    latitude: data.location.latitude,
    longitude: data.location.longitude,
    zoom: data.location.zoom
  },
  id: data.id,
});

export {createAuthInfo, createReview, createFavoriteOffers, createOffer};
