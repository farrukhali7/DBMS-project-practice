"use client";

import { useState } from "react";

type Pet = {
  id: number;
  name: string;
  species: string;
  age: number;
  owner: number;
  owner_details?: {
    full_name: string;
    phone: string;
    email: string;
  };
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function PetsPage() {
  const [token, setToken] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadPets() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/pets/`, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: Pet[] = await response.json();
      setPets(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load pets."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold">Pet Records</h1>

      <p className="mt-2 text-slate-600">
        Retrieve pet records from the Django API.
      </p>

      <div className="mt-6 max-w-xl rounded-xl bg-white p-5 shadow-sm">
        <label
          htmlFor="access-token"
          className="block text-sm font-medium"
        >
          Temporary access token
        </label>

        <input
          id="access-token"
          type="password"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Paste your access token"
          autoComplete="off"
          className="mt-2 w-full rounded-lg border p-3"
        />

        <button
          onClick={loadPets}
          disabled={loading || !token.trim()}
          className="mt-4 rounded-lg bg-blue-700 px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load pets"}
        </button>

        {error && (
          <p role="alert" className="mt-4 text-red-700">
            {error}
          </p>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Registered pets</h2>

        {pets.length === 0 && !loading && !error && (
          <p className="mt-3 text-slate-600">
            No pet records loaded yet.
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <article
              key={pet.id}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{pet.name}</h3>

              <p className="mt-2 text-slate-600">
                Species: {pet.species}
              </p>

              <p className="text-slate-600">Age: {pet.age}</p>

              <p className="text-slate-600">Owner ID: {pet.owner}</p>

              {pet.owner_details && (
                <p className="mt-2 text-sm text-slate-500">
                  Owner: {pet.owner_details.full_name}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}