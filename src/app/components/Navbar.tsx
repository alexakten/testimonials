import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between px-4 py-4 xs:px-6">
      {/* <Link href="/">
          <Logo></Logo>
        </Link> */}
      <div className="flex flex-row items-end gap-2">
        {/* <div className="box-shadow w-8 h-8 rounded-full border-2 border-black bg-orange-600"></div> */}
        <Link href={"/"}>
          <h1 className="gray-shadow text-2xl font-bold tracking-tighter text-black xs:text-3xl">
            mendly
          </h1>
        </Link>
      </div>
      <div className="flex flex-row gap-4 font-medium text-black ">
        {/* <Link
            href="/login"
            className="flex items-center justify-center z-10 bg-black text-white rounded-full px-4 h-10"
          >
            {lang === "en" ? "Login" : "Logga in"}
          </Link> */}
      </div>
    </nav>
  );
}
