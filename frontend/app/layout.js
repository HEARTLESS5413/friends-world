export const metadata = {
  title: "FriendsWorld",
  description: "Watch together with your loved ones"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
