export default function Contact () {
  return (
    <section className="bg-green-100 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8">Send us a message and we'll get back to you as soon as possible.</p>

        <form className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500" type="text" id="name" name="name" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500" type="email" id="email" name="email" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
            <textarea className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500" id="message" name="message" required></textarea>
          </div>

          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};