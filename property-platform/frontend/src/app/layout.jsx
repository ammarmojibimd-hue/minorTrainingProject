import './globals.css';

export const metadata = {
  title: 'UrbanHaven - Property & Tenant Platform',
  description: 'Manage rentals, lease agreements, and maintenance easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">{children}</body>
    </html>
  );
}