import { starFull, starHalf } from "core/consts/images";
import car from "assets/img/car.svg";
import bus from "assets/img/bus.svg";
import laptop from "assets/img/laptop.svg";
import books from "assets/img/books.svg";
import player from "assets/img/player.svg";
import noodles from "assets/img/noodles.svg";
import medicine from "assets/img/medicine.svg";
import leaf from "assets/img/leaf.svg";
import law from "assets/img/law.svg";
import inventory from "assets/img/inventory.svg";
import shops from "assets/img/shops.svg";
import underConstruction from "assets/img/under-construction.svg";

export const renderStars = (ratings: number) => {
  var fullRating = Math.trunc(ratings);

  const stars = [];

  for (let i = 0; i < fullRating; i++) {
    stars.push(<img src={starFull} alt="" />);
  }

  if (ratings % 1 !== 0) {
    stars.push(<img src={starHalf} alt="" />);
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
