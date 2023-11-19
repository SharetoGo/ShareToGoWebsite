import WhiteLogo from './whiteLogo';

export default function Footer() {
  return (
    <footer>
      <div className='bg-teal-950'>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 ">

          {/* Top area: Blocks */}
          <div className="grid sm:grid-cols-8 gap-3 py-8 md:py-12 border-t border-gray-200">

            {/* Project */}
            <div className="sm:col-span-12 lg:col-span-3">
              <div className="mb-2 pl-14">
                <WhiteLogo />
              </div>
              <div className="text-sm text-gray-600">
                <a href="/" className="text-white hover:text-teal-700 hover:underline transition duration-150 ease-in-out">SharetoGo</a> · <a href="/privacy" className="text-white hover:text-teal-700 hover:underline transition duration-150 ease-in-out">Políticas de privacidad</a>
              </div>
            </div>

            {/* Page links */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h6 className="text-teal-700 font-medium mb-2">SharetoGo</h6>
              <ul className="text-sm">
                <li className="mb-2">
                  <a href="/" className="text-white hover:text-teal-700 transition duration-150 ease-in-out">Home</a>
                </li>
                <li className="mb-2">
                  <a href="/about" className="text-white hover:text-teal-700 transition duration-150 ease-in-out">Quiénes somos</a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="text-white hover:text-teal-700 transition duration-150 ease-in-out">Contacto</a>
                </li>
                <li className="mb-2">
                  <a href="/privacy" className="text-white hover:text-teal-700 transition duration-150 ease-in-out">Políticas de privacidad</a>
                </li>
              </ul>
            </div>

            {/* Subscription */}
            <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
              <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a href="#"
                  className="w-full sm:w-auto border-2 border-white bg-teal-950 hover:bg-teal-800 focus:ring-4 focus:ring-green-200 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                  <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                    </path>
                  </svg>
                  <div className="text-left text-white">
                    <div className="-mt-1 font-sans text-sm font-semibold">Descarga desde la App Store</div>
                  </div>
                </a>
                <a href="#"
                  className="w-full border-2 border-white sm:w-auto bg-teal-950 hover:bg-teal-800 focus:ring-4 focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5">
                  <svg className="mr-3 w-7 h-7" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-play"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z">
                    </path>
                  </svg>
                  <div className="text-left text-white">
                    <div className="-mt-1 font-sans text-sm font-semibold">Descarga desde la Play Store</div>
                  </div>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

            {/* Social as */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <a href="https://www.instagram.com/sharetogo_/?igshid=MjEwN2IyYWYwYw%3D%3D" className="flex justify-center items-center text-white hover:text-green-900 focus:text-green-800" aria-label="Instagram">
                  <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    {/* ... (SVG path) */}
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a href="https://www.tiktok.com/@share2go" className="flex justify-center items-center text-white hover:text-green-900 focus:text-green-800" aria-label="Tiktok">
                  <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    {/* ... (SVG path) */}
                  </svg>
                </a>
              </li>
              <li className="ml-4">
                <a href="https://twitter.com/Sharetogo_" className="flex justify-center items-center text-white hover:text-green-900 focus:text-green-800" aria-label="Twitter">
                  <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    {/* ... (SVG path) */}
                  </svg>
                </a>
              </li>
            </ul>
            <div className="text-sm text-white mr-4">&copy; sharetogo.org. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
