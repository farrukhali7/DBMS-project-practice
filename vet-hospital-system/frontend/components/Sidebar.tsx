
import Link from "next/link";

const navigationLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Pets", href: "/pets" },
  { label: "Owners", href: "/owners" },
  { label: "Appointments", href: "/appointments" },
];

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 bg-slate-900 p-5 text-white md:min-h-screen md:w-64">
      <div className="mb-8">
        <h1 className="text-xl font-bold">
          VetCare
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Hospital Management
        </p>
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap gap-2 md:flex-col">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-700 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}