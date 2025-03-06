export default function NotFoundPage() {
  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      bg-white/80 dark:bg-gray-900/80
      backdrop-blur-sm
    ">
      <h1 className="text-4xl font-bold text-center dark:text-yellow-300">
        404
      </h1>
      <h1 className="text-2xl font-semibold text-center dark:text-yellow-300">
        Page Not Found
      </h1>
      <p className="text-center dark:text-yellow-300">
        The requested page could not be found!
      </p>
    </div>
  );
}
