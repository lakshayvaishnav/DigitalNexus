export const PRODUCT_CATEGORIES = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor Picks",
        href: "#",
        imgeSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imgeSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "BestSeller",
        href: "#",
        imgeSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favourite Icon Picks",
        href: "#",
        imgeSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imgeSrc: "/nav/icons/new.jpg",
      },
      {
        name: "BestSelling Icons",
        href: "#",
        imgeSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
  { label: "Artwork", value: "artwork" as const },
  { label: "Skin", value: "skin" as const },
];
