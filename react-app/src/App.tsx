import { useState, useEffect } from "react";
import { Superhero, SuperheroFormData } from "./types";
import { SuperheroForm } from "./components/SuperheroForm";
import { SuperheroList } from "./components/SuperheroList";

function App() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await fetch("http://localhost:3000/superheroes");
      if (!response.ok) throw new Error("Failed to fetch superheroes");
      const data = await response.json();
      setSuperheroes(data);
    } catch (err) {
      setError("Failed to load superheroes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuperhero = async (data: SuperheroFormData) => {
    try {
      const response = await fetch("http://localhost:3000/superheroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add superhero");

      // Fetch the updated list after adding a new superhero
      await fetchSuperheroes();
    } catch (err) {
      setError("Failed to add superhero. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-indigo-600 text-xl">Loading superheroes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Humble Superhero Registry
          </h1>
          <p className="mt-2 text-gray-600">
            Celebrating our everyday heroes and their humble superpowers
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <SuperheroForm onSubmit={handleAddSuperhero} />

        {superheroes.length > 0 ? (
          <SuperheroList superheroes={superheroes} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">
              No superheroes registered yet. Be the first one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
