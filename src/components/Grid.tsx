interface GridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
}

export function Grid({ guesses, currentGuess, targetWord }: GridProps) {
  const emptyRowsCount = Math.max(0, 6 - guesses.length - 1);
  const empties = Array(emptyRowsCount).fill('');
  const rows = [...guesses, currentGuess, ...empties].slice(0, 6);

  return (
    <div className="grid grid-rows-6 gap-2 w-full max-w-sm mx-auto p-2">
      {rows.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, j) => {
            const letter = guess[j] || '';
            let status = 'empty';

            if (guess === rows[i] && i < guesses.length) {
              const lowerGuess = guess.toLowerCase();
              const lowerTarget = targetWord.toLowerCase();

              if (lowerGuess[j] === lowerTarget[j]) {
                status = 'correct';
              } else if (lowerTarget.includes(lowerGuess[j])) {
                const letterCount = lowerTarget.split(lowerGuess[j]).length - 1;
                const correctPositions = lowerGuess.split('').filter((l: string, idx: number) =>
                  l === lowerGuess[j] && lowerTarget[idx] === l
                ).length;
                const presentCount = lowerGuess.slice(0, j + 1).split('').filter((l: string, idx: number) =>
                  l === lowerGuess[j] &&
                  lowerTarget.includes(l) &&
                  lowerTarget[idx] !== l
                ).length;

                if (presentCount + correctPositions <= letterCount) {
                  status = 'present';
                } else {
                  status = 'absent';
                }
              } else {
                status = 'absent';
              }
            }

            // Define style classes for light and dark themes
            const baseClass = `
              w-full aspect-square flex items-center justify-center
              text-2xl font-bold border-2 rounded
              transform transition-all duration-300
              ${letter ? 'scale-100' : 'scale-95'}
            `;

            const statusClass = {
              empty: 'bg-gray-200 border-gray-300 text-black dark:bg-gray-700 dark:border-gray-700 dark:text-white',
              correct: 'bg-green-500 border-green-600 text-white shadow-lg scale-105 dark:bg-green-600 dark:border-green-700',
              present: 'bg-yellow-500 border-yellow-600 text-white shadow-md scale-105 dark:bg-yellow-600 dark:border-yellow-700',
              absent: 'bg-gray-400 border-gray-500 text-white dark:bg-gray-900 dark:border-gray-700',
            }[status];

            return (
              <div key={j} className={`${baseClass} ${statusClass}`}>
                {letter.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}