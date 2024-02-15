import Link from "next/link";

export default function CustomLink({ as, href, ...otherProps }) {
  return (
    <Link
      as={as}
      href={href}
      className="text-primary underline decoration-primary underline-offset-4"
      {...otherProps}
    ></Link>
  );
}
