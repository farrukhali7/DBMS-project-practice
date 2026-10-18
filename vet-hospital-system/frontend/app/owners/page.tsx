
// import PageHeader from "@/components/PageHeader";

// export default function OwnersPage() {
//   return (
//     <main className="min-h-screen bg-slate-100 p-6 md:p-8">
//       <PageHeader
//         title="Owner Management"
//         description="Manage pet owners and their contact information."
//       />

//       <div className="rounded-xl bg-white p-6 shadow-sm">
//         Owner registration and owner records will be built here.
//       </div>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

type Owner = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:8000";

export default function OwnersPage() {
  const [token, setToken] = useState("");
  const [owners, setOwners] = useState<Owner[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadOwners() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/owners/`,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ?? `Unable to load owners (${response.status}).`
        );
      }

      setOwners(data as Owner[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to retrieve owner records."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/owners/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.trim()}`,
          },
          body: JSON.stringify({
            full_name: fullName,
            phone,
            email,
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const details =
          data && typeof data === "object"
            ? Object.entries(data as Record<string, unknown>)
                .flatMap(([field, value]) =>
                  Array.isArray(value)
                    ? value.map((item) => `${field}: ${String(item)}`)
                    : typeof value === "string"
                      ? [`${field}: ${value}`]
                      : []
                )
                .join(" ")
            : "";

        throw new Error(
          details || `Registration failed (${response.status}).`
        );
      }

      setMessage("Owner registered successfully.");
      setFullName("");
      setPhone("");
      setEmail("");

      await loadOwners();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to register the owner."
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <PageHeader
        title="Owner Management"
        description="Register pet owners and manage their contact information."
      />

      <section className="mb-8 max-w-xl rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          API access
        </h2>

        <label
          htmlFor="owner-token"
          className="mt-4 block text-sm font-medium"
        >
          Temporary access token
        </label>

        <input
          id="owner-token"
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          autoComplete="off"
          className="mt-2 w-full rounded-lg border p-3"
          placeholder="Paste your access token"
        />

        <button
          type="button"
          onClick={loadOwners}
          disabled={loading || !token.trim()}
          className="mt-3 rounded-lg bg-blue-700 px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load owners"}
        </button>
      </section>

      <section className="mb-8 max-w-xl rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">
          Register an owner
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium">
              Full name
            </label>
            <input
              id="full-name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              maxLength={150}
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              maxLength={20}
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email (optional)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={!token.trim()}
            className="w-full rounded-lg bg-emerald-700 px-5 py-3 text-white disabled:opacity-50"
          >
            Register owner
          </button>
        </form>
      </section>

      {error && (
        <p role="alert" className="mb-4 text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="mb-4 text-emerald-700">
          {message}
        </p>
      )}

      <section>
        <h2 className="text-xl font-semibold">
          Registered owners
        </h2>

        {owners.length === 0 ? (
          <p className="mt-3 text-slate-600">
            No owner records loaded yet.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {owners.map((owner) => (
              <article
                key={owner.id}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold">
                  {owner.full_name}
                </h3>
                <p className="mt-2 text-slate-600">
                  Phone: {owner.phone}
                </p>
                <p className="text-slate-600">
                  Email: {owner.email || "Not provided"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Owner ID: {owner.id}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}