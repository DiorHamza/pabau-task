import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const data = await res.json();
  console.log('Fetched bookings:', data);

  return data;
}

const BookingPage: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const bookings = await getBookings();
  console.log('Params ID:', params.id);

  const booking = bookings.find((b: { id: number }) => b.id === parseInt(params.id));
  console.log('Found booking:', booking);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-700 mb-4">Booking not found.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Booking Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <p className="text-lg text-gray-700 mb-4">
          This booking is with <span className="font-semibold">{booking.doctor_name}</span> for <span className="font-semibold">{booking.service}</span>.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          It ends on <span className="font-semibold">{booking.end_time}</span>.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Back
        </Link>
      </div>
    </div>
  );
};

export default BookingPage;