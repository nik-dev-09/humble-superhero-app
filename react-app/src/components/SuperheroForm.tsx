import React, { useState } from "react";
import { SuperheroFormData } from "../types";

interface Props {
  onSubmit: (data: SuperheroFormData) => void;
}

export function SuperheroForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<SuperheroFormData>({
    name: "",
    superpower: "",
    humilityScore: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: "", superpower: "", humilityScore: 5 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Superhero Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 outline outline-2 outline-gray-400"
          placeholder="Enter superhero name"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="superpower"
          className="block text-sm font-medium text-gray-700"
        >
          Superpower
        </label>
        <input
          type="text"
          id="superpower"
          required
          value={formData.superpower}
          onChange={(e) =>
            setFormData({ ...formData, superpower: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 outline outline-2 outline-gray-400"
          placeholder="Enter superpower"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="humilityScore"
          className="block text-sm font-medium text-gray-700"
        >
          Humility Score (1-10)
        </label>
        <input
          type="number"
          id="humilityScore"
          required
          min="1"
          max="10"
          value={formData.humilityScore}
          onChange={(e) =>
            setFormData({ ...formData, humilityScore: Number(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 outline outline-2 outline-gray-400"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Adding..." : "Add Superhero"}
      </button>
    </form>
  );
}
