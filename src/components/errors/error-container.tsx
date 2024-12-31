export function OfflineError() {
  return (
    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <p className="text-yellow-800 dark:text-yellow-200">
        You&apos;re offline. Please check your internet connection.
      </p>
    </div>
  );
}
