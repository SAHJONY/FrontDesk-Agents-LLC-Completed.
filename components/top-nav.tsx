// components/TopNavFixed.tsx
export default function TopNavFixed() {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">FrontDesk Agents</div>
          <div className="space-x-4">
            <a href="/" className="hover:text-gray-300">Dashboard</a>
            <a href="/bookings" className="hover:text-gray-300">Bookings</a>
            <a href="/guests" className="hover:text-gray-300">Guests</a>
            <a href="/rooms" className="hover:text-gray-300">Rooms</a>
          </div>
        </div>
      </div>
    </div>
  );
}
