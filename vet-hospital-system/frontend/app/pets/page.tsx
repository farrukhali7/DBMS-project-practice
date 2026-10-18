// // "use client";

// // import { useState } from "react";

// // type Pet = {
// //   id: number;
// //   name: string;
// //   species: string;
// //   age: number;
// //   owner: number;
// //   owner_details?: {
// //     full_name: string;
// //     phone: string;
// //     email: string;
// //   };
// // };

// // const API_BASE_URL =
// //   process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

// // export default function PetsPage() {
// //   const [token, setToken] = useState("");
// //   const [pets, setPets] = useState<Pet[]>([]);
// //   const [owners , setOwners] = useState<Owner[]>([])
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   async function loadPets() {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/api/pets/`, {
// //         headers: {
// //           Authorization: `Bearer ${token.trim()}`,
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Request failed with status ${response.status}`);
// //       }

// //       const data: Pet[] = await response.json();
// //       setPets(data);
// //     } catch (err) {
// //       setError(
// //         err instanceof Error ? err.message : "Unable to load pets."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <main className="min-h-screen bg-slate-100 p-8">
// //       <h1 className="text-3xl font-bold">Pet Records</h1>

// //       <p className="mt-2 text-slate-600">
// //         Retrieve pet records from the Django API.
// //       </p>

// //       <div className="mt-6 max-w-xl rounded-xl bg-white p-5 shadow-sm">
// //         <label
// //           htmlFor="access-token"
// //           className="block text-sm font-medium"
// //         >
// //           Temporary access token
// //         </label>

// //         <input
// //           id="access-token"
// //           type="password"
// //           value={token}
// //           onChange={(event) => setToken(event.target.value)}
// //           placeholder="Paste your access token"
// //           autoComplete="off"
// //           className="mt-2 w-full rounded-lg border p-3"
// //         />

// //         <button
// //           onClick={loadPets}
// //           disabled={loading || !token.trim()}
// //           className="mt-4 rounded-lg bg-blue-700 px-5 py-3 text-white disabled:opacity-50"
// //         >
// //           {loading ? "Loading..." : "Load pets"}
// //         </button>

// //         {error && (
// //           <p role="alert" className="mt-4 text-red-700">
// //             {error}
// //           </p>
// //         )}
// //       </div>

// //       <section className="mt-8">
// //         <h2 className="text-xl font-semibold">Registered pets</h2>

// //         {pets.length === 0 && !loading && !error && (
// //           <p className="mt-3 text-slate-600">
// //             No pet records loaded yet.
// //           </p>
// //         )}

// //         <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
// //           {pets.map((pet) => (
// //             <article
// //               key={pet.id}
// //               className="rounded-xl bg-white p-5 shadow-sm"
// //             >
// //               <h3 className="text-lg font-semibold">{pet.name}</h3>

// //               <p className="mt-2 text-slate-600">
// //                 Species: {pet.species}
// //               </p>

// //               <p className="text-slate-600">Age: {pet.age}</p>

// //               <p className="text-slate-600">Owner ID: {pet.owner}</p>

// //               {pet.owner_details && (
// //                 <p className="mt-2 text-sm text-slate-500">
// //                   Owner: {pet.owner_details.full_name}
// //                 </p>
// //               )}
// //             </article>
// //           ))}
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }



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

type Owner = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:8000";

export default function PetsPage() {
  const [token, setToken] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
 const [owners , setOwners] = useState<Owner[]>([])
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Dog");
  const [age, setAge] = useState("1");
  const [ownerId, setOwnerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadPets() {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/pets/`,
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ?? `Unable to load pets (${response.status}).`
        );
      }

      setPets(data as Pet[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load pet records."
      );
    } finally {
      setLoading(false);
    }
  }


async function loadOwners() {
  setError("");

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
  }
}

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/pets/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.trim()}`,
          },
          body: JSON.stringify({
            name,
            species,
            age: Number(age),
            owner: Number(ownerId),
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data && typeof data === "object") {
          const messages = Object.entries(
            data as Record<string, unknown>
          ).flatMap(([field, value]) => {
            if (Array.isArray(value)) {
              return value.map(
                (message) => `${field}: ${String(message)}`
              );
            }

            if (typeof value === "string") {
              return [`${field}: ${value}`];
            }

            return [];
          });

          throw new Error(
            messages.join(" ") ||
              `Registration failed (${response.status}).`
          );
        }

        throw new Error(
          `Registration failed (${response.status}).`
        );
      }

      setSuccess(`Successfully registered ${name.trim()}.`);
      setName("");
      setSpecies("Dog");
      setAge("1");
      setOwnerId("");

      await loadPets();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to register this pet."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">
        Pet Management
      </h1>

      <p className="mt-2 text-slate-600">
        Register pets and retrieve records from the Django API.
      </p>

      <section className="mt-6 max-w-xl rounded-xl bg-white p-5 shadow-sm">
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
          autoComplete="off"
          placeholder="Paste your access token"
          className="mt-2 w-full rounded-lg border p-3"
        />

        <button
          type="button"
          onClick={loadPets}
          disabled={loading || !token.trim()}
          className="mt-3 rounded-lg bg-blue-700 px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load pets"}
        </button>
        
        <button
          type="button"
          onClick={loadOwners}
          disabled={!token.trim()}
          className="mt-3 ml-3 rounded-lg bg-indigo-700 px-5 py-3 text-white disabled:opacity-50"
        >
          Load owners
        </button>

      </section>

       <section className="mt-8 max-w-xl rounded-xl bg-white p-6 shadow-sm">
         <h2 className="text-xl font-semibold">
           Register a new pet
         </h2>

         <form onSubmit={handleSubmit} className="mt-5 space-y-4">
           <div>
             <label htmlFor="pet-name" className="block text-sm font-medium">
               Pet name
             </label>
             <input
               id="pet-name"
               value={name}
               onChange={(event) => setName(event.target.value)}
               required
               maxLength={100}
              className="mt-1 w-full rounded-lg border p-3"
              placeholder="e.g. Bruno"
            />
          </div>

          <div>
            <label htmlFor="species" className="block text-sm font-medium">
              Species
            </label>
            <select
              id="species"
              value={species}
              onChange={(event) => setSpecies(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border p-3"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>

          <div>
            <label htmlFor="pet-age" className="block text-sm font-medium">
              Age in years
            </label>
            <input
              id="pet-age"
              type="number"
              min="0"
              max="50"
              step="1"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              required
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

{/* dropdown     */}
<div>
  <label
    htmlFor="owner-id"
    className="block text-sm font-medium"
  >
    Pet owner
  </label>

  <select
    id="owner-id"
    value={ownerId}
    onChange={(event) => setOwnerId(event.target.value)}
    required
    className="mt-1 w-full rounded-lg border p-3"
  >
    <option value="">Select an owner</option>

    {owners.map((owner) => (
      <option key={owner.id} value={owner.id}>
        {owner.full_name} — ID: {owner.id}
      </option>
    ))}
  </select>

  {owners.length === 0 && (
    <p className="mt-1 text-xs text-slate-500">
      Load owners first. If no owners exist, register one on the Owners page.
    </p>
  )}
</div>

          <button
            type="submit"
            disabled={saving || !token.trim()}
            className="w-full rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white disabled:opacity-50"
          >
            {saving ? "Registering..." : "Register pet"}
          </button>
        </form>
      </section>

      {error && (
        <p role="alert" className="mt-5 max-w-xl text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="mt-5 max-w-xl text-emerald-700">
          {success}
        </p>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Registered pets</h2>

        {pets.length === 0 ? (
          <p className="mt-3 text-slate-600">
            No pet records loaded yet.
          </p>
        ) : (
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
        )}
      </section>
    </main>
  );
}



// import PageHeader from "@/components/PageHeader";

// const dashboardCards = [
//   {
//     title: "Pets",
//     description: "Register and view pet records.",
//     href: "/pets",
//   },
//   {
//     title: "Owners",
//     description: "Manage pet owner information.",
//     href: "/owners",
//   },
//   {
//     title: "Appointments",
//     description: "Organize veterinary visits.",
//     href: "/appointments",
//   },
// ];

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-slate-100 p-6 md:p-8">
//       <PageHeader
//         title="Dashboard"
//         description="Welcome to your veterinary hospital management system."
//       />

//       <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//         {dashboardCards.map((card) => (
//           <a
//             key={card.href}
//             href={card.href}
//             className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
//           >
//             <h2 className="text-lg font-semibold text-slate-900">
//               {card.title}
//             </h2>

//             <p className="mt-2 text-sm text-slate-600">
//               {card.description}
//             </p>

//             <span className="mt-5 inline-block text-sm font-medium text-blue-700">
//               Open section →
//             </span>
//           </a>
//         ))}
//       </section>
//     </main>
//   );
// }