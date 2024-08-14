import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(' ')[0].split(':').map(Number);
  const period = timeString.split(' ')[1];

  let hour = hours;
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const date = new Date();
  date.setHours(hour, minutes);

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Home: React.FC = async () => {
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Booking List</h1>
      <ul className="w-full max-w-3xl space-y-4">
        <Link
          href="/create-booking"
          className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-6 hover:bg-blue-700 transition-colors duration-300"
        >
          Create a New Booking
        </Link>
        {bookings.map((booking: any) => {
          return (
            <li key={booking.id} className="bg-white shadow-md rounded-lg p-4 hover:bg-blue-50 transition-colors duration-300">
              <Link href={`/booking/${booking.id}`} className="text-lg text-blue-600 hover:underline">
                <div className="flex justify-between">
                  <span>Booking on {formatDate(booking.date)}</span>
                  <span>Starts at {formatTime(booking.start_time)}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;