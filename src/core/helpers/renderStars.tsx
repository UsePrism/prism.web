import { starEmpty, starFull, starHalf } from "core/consts/images";
import car from "assets/img/car.png";
import bus from "assets/img/bus.png";
import laptop from "assets/img/laptop.png";
import books from "assets/img/books.png";
import player from "assets/img/player.png";
import noodles from "assets/img/noodles.png";
import medicine from "assets/img/medicine.png";
import leaf from "assets/img/leaf.png";
import law from "assets/img/law.png";
import inventory from "assets/img/inventory.png";
import shops from "assets/img/shops.png";
import underConstruction from "assets/img/construction.png";

export const renderStars = (ratings: number, styling?: string) => {
  var fullRating = Math.trunc(ratings);

  const stars = [];

  for (let i = 0; i < fullRating; i++) {
    stars.push(
      <img loading="lazy" src={starFull} alt="" className={styling} />,
    );
  }

  if (ratings % 1 !== 0) {
    stars.push(
      <img loading="lazy" src={starHalf} alt="" className={`${styling} h-[20px]`} />,
    );
  }

  if (stars?.length < 5) {
    var emptystars = 5 - stars?.length;

    for (let i = 0; i < emptystars; i++) {
      stars.push(
        <img loading="lazy" src={starEmpty} alt="" className={`${styling} mx-[2px] h-[17px]`} />,
      );
    }
  }

  return stars;
};

export const getCatgories = () => {
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
};
