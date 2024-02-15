/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zybWbbcyrIS
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function CustomListItem({ children, ...rest }) {
  return (
    <li
      {...rest}
      children={children}
      className="flex items-center gap-2 py-2 px-4 rounded-md bg-gray-50 dark:bg-gray-950"
    >
      <span className="h-4 w-4">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l2.371 7.118h7.629l-6.171 4.482 2.371 7.118-6.171-4.482-6.171 4.482 2.371-7.118-6.171-4.482h7.629z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </span>
      <span className="text-sm font-medium">{children}</span>
    </li>
  );
}
