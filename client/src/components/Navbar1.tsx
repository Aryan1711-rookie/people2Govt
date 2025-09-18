import logo from "../assets/logo1.png"; 

const Navbar1 = () => {

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-green-600">
      <div className="max-w-7xl mx-auto flex justify-center items-center px-6 py-3">
        {/* Logo + Brand */}
        <a href="/" className="flex items-center justify-center gap-3">
          <img src={logo} alt="Jharkhand Logo" width={55} height={55} />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide font-serif">
              people<span className="text-green-600">2</span>Gov
            </h1>
            <p className="text-xs text-gray-500 font-sans">
              Govt. of Jharkhand
            </p>
          </div>
        </a>
        </div>
    </nav>
  );
};

export default Navbar1;