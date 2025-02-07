import { Superhero } from "../types";

interface Props {
  superheroes: Superhero[];
}

export function SuperheroList({ superheroes }: Props) {
  // Sort by humility score in descending order
  const sortedSuperheroes = [...superheroes].sort(
    (a, b) => b.humilityScore - a.humilityScore
  );

  return (
    <div className="space-y-4">
      {sortedSuperheroes.map((hero) => (
        <div
          key={hero.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {hero.name}
                </h3>
                <p className="text-gray-600">{hero.superpower}</p>
              </div>
            </div>
            <div className="flex items-center bg-indigo-100 px-3 py-1 rounded-full">
              <span className="text-indigo-600 font-medium">
                {hero.humilityScore}/10
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
