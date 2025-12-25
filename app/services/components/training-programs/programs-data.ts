// app/services/components/training-programs/program-data.ts
export const TRAINING_PROGRAMS = [
  {
    id: "personal",
    title: "Personal Training",
    subtitle: "One-on-One Coaching",
    image: "/personal-trainer-one-on-one-coaching.jpg",
    items: [
      {
        name: "Online Personal Training",
        desc: "Real-time feedback from your dedicated coach",
      },
      {
        name: "Indoor Personal Training",
        desc: "State-of-the-art facility in Kingston & Miami",
      },
      {
        name: "Outdoor Personal Training",
        desc: "Street and trail running with expert guidance",
      },
    ],
    color: "from-blue-600 to-blue-900",
  },
  {
    id: "batch",
    title: "Batch Training",
    subtitle: "Group Running Sessions",
    image: "/running-group-training-outdoor.jpg",
    items: [
      {
        name: "Outdoor Batch Training",
        desc: "Group sessions in scenic locations",
      },
      {
        name: "Indoor Batch Training",
        desc: "Structured workouts for all levels",
      },
      {
        name: "Online Batch Training",
        desc: "Live sessions with community interaction",
      },
    ],
    color: "from-purple-600 to-purple-900",
  },
  {
    id: "ladies",
    title: "Ladies Programs",
    subtitle: "Designed for Women Runners",
    image: "/community-runners-celebration-finish-line.jpg",
    items: [
      {
        name: "Ladies Personal Training",
        desc: "Female coaches with sports science expertise",
      },
      {
        name: "Ladies Online Training",
        desc: "Flexible coaching with cycle optimization",
      },
      {
        name: "Ladies Batch Training",
        desc: "Female-only supportive community",
      },
    ],
    color: "from-pink-600 to-pink-900",
  },
  {
    id: "partner",
    title: "Partner Training",
    subtitle: "Train With Your Friend",
    image: "/indoor-gym-training-fitness.jpg",
    items: [
      {
        name: "Online Partner Training",
        desc: "Train remotely with accountability",
      },
      {
        name: "Indoor Partner Training",
        desc: "Competitive-inspired workouts",
      },
      { name: "Outdoor Partner Training", desc: "Adventure running together" },
    ],
    color: "from-green-600 to-green-900",
  },
  {
    id: "kids",
    title: "Kids Programs",
    subtitle: "Coming Soon",
    image: "/runners-motion-blur.png",
    items: [
      {
        name: "Kids Training",
        desc: "Age-appropriate workouts for young runners",
      },
    ],
    color: "from-orange-600 to-orange-900",
  },
];
