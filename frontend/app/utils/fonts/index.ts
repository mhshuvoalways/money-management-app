import { Montserrat, Open_Sans, Roboto } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});
