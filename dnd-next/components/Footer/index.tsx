import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="container mx-auto">
      <div className="text-center border-t py-8">
        <h3 className="text-xl">REPUBLIC OF THE PHILIPPINES</h3> <br></br>
        <h6>All content is in the public domain unless otherwise stated.</h6>
        <div className="flex items-center justify-center my-4 underline">
          <Link href="https://dev.to/jeffsalive" className="px-4">
            Dev.to (Jeffrey)
          </Link>
          <Link href="https://twitter.com/JeffreySunny1" className="px-4">
            Twitter
          </Link>
          <Link href="https://linkedin.com/in/jeffsalive" className="px-4">
            LinkedIn
          </Link>
          <Link href="https://jeffreynwankwo.com" className="px-4">
            Website
          </Link>
        </div>
        <small>GOVPH &copy; {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
};
