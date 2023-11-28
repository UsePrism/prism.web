import { starFull, starHalf } from "core/consts/images";

export const renderStars = (ratings: number) => {
  var fullRating = Math.trunc(ratings);

  const stars = [];

  for (let i = 0; i < fullRating; i++) {
    stars.push(<img src={starFull} alt="" />);
  }

  if ((ratings % 1 !== 0)) {
    stars.push(<img src={starHalf} alt="" />);
  }

  return stars;
};
