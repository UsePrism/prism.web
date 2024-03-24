import starFull from "assets/img/starfull.svg";
import starHalf from "assets/img/starhalf.svg";
import starEmpty from "assets/img/starempty.svg";

export const renderStars = (ratings: number, styling?: string) => {
  var fullRating = Math.trunc(ratings);

  const stars = [];

  for (let i = 0; i < fullRating; i++) {
    stars.push(
      <img
        loading="lazy"
        src={starFull}
        alt=""
        className={styling}
      />,
    );
  }

  if (ratings % 1 !== 0) {
    stars.push(
      <img
        loading="lazy"
        src={starHalf}
        alt=""
        className={`${styling}`}
      />,
    );
  }

  if (stars?.length < 5) {
    var emptystars = 5 - stars?.length;

    for (let i = 0; i < emptystars; i++) {
      stars.push(
        <img
          loading="lazy"
          src={starEmpty}
          alt=""
          className={`${styling}`}
        />,
      );
    }
  }

  return stars;
};

/*
export const getCategories = () => {
  const categories = [
    {
      name: "Automative",
      icon: car,
    },
    {
      name: "Businesses & Supplies",
      icon: bus,
    },
    {
      name: "Computers & Electronics",
      icon: laptop,
    },
    {
      name: "Construction/Contractors",
      icon: underConstruction,
    },
    {
      name: "Education",
      icon: books,
    },
    {
      name: "Entertainment",
      icon: player,
    },
    {
      name: "Food & Dining",
      icon: noodles,
    },
    {
      name: "Health & Medicine",
      icon: medicine,
    },
    {
      name: "Home & Garden",
      icon: leaf,
    },
    {
      name: "Legal & Financial",
      icon: law,
    },
    {
      name: "Manufacturing/Wholesale",
      icon: inventory,
    },
    {
      name: "Merchants (Retail)",
      icon: shops,
    },
  ];
  return categories;
};*/
