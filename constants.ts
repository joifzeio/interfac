import { SlideData, EventData, ReleaseData, NavLink } from './types';

export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/6937d5cb03a4088be37497b4_Drumcode_London_070326_DC_WEBSITE_COVER_1600x965px.jpg",
    title: "DRUMCODE LONDON",
    tag: "Event",
    link: "#"
  },
  {
    id: 3,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/6916125a9bee509c2e3f9970_Drumcode_Mallorca_08-100526_DC_WEBSITE_COVER_1600x965px.jpg",
    title: "DRUMCODE MALLORCA 30 YEARS",
    tag: "Event",
    link: "#"
  }
];

export const EVENTS: EventData[] = [
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/6960ece0b02ebba614af0f40_Drumcode_Malaga_270226_1_1.jpeg",
    title: "DRUMCODE MALAGA",
    date: "FRI 27TH FEB",
    link: "#"
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/6937d2c1e59ca7fe369ebd02_Drumcode_London_070326_1_1-1%20(1).jpeg",
    title: "DRUMCODE LONDON",
    date: "SAT 7TH MAR 2026",
    link: "#"
  },
  {
    id: 3,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/691cb47740891e705bb7a615_Drumcode_Mallorca_08-100526_1_1%20(1).jpeg",
    title: "DRUMCODE MALLORCA",
    date: "8th-10th MAY 2026",
    link: "#"
  }
];

export const RELEASES: ReleaseData[] = [
  {
    id: 1,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/671bae9107aeea92c13f2ac6_DC315_PORTRAIT.jpeg",
    title: "Lost in Space",
    artist: "Konstantin Sibold",
    link: "#"
  },
  {
    id: 2,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/6707e723c6d0be229f4c306a_DC314_PORTRAIT.jpeg",
    title: "Don't Go",
    artist: "Adam Beyer",
    link: "#"
  },
  {
    id: 3,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66f18a88dfb1a520711078cf_ARMAS2930_PORTRAIT.jpeg",
    title: "Let's Go Dancing",
    artist: "Layton Giordani x Tiga",
    link: "#"
  },
  {
    id: 4,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66f18918ea4f57ef16957a1a_DC313_PORTRAIT-2.jpeg",
    title: "DIZZY",
    artist: "HI-LO x LUSU",
    link: "#"
  },
  {
    id: 5,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66f1880a4e9cab4eeecd8afa_DC312_PORTRAIT.jpeg",
    title: "Sakura",
    artist: "Bart Skils",
    link: "#"
  },
  {
    id: 6,
    image: "https://cdn.prod.website-files.com/6447d732046773b01a9cbb88/66cdd7e87a671208ef9d6e10_DC311_PORTRAIT.jpeg",
    title: "Lift Me Up",
    artist: "Various Artists",
    link: "#"
  }
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", number: "01", image: "https://cdn.prod.website-files.com/6447bca571fb2820e0a009be/6448f619bc8d5c4e3495d298_640f965a4dcb37c9608b4fe8_clip.jpg" },
  { label: "Events", href: "#events", number: "02", image: "https://cdn.prod.website-files.com/6447bca571fb2820e0a009be/6448f619bc8d5c4e3495d298_640f965a4dcb37c9608b4fe8_clip.jpg" },
];