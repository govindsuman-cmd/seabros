import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-12">
          {children}
        </main>
        <Footer/>
      </div>
    </div>
  );
}