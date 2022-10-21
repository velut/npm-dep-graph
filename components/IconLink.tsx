import { Icon, IconifyIcon } from "@iconify/react";
import clsx from "clsx";
import Link from "next/link";

const IconLink = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: string | IconifyIcon;
}) => {
  return (
    <Link href={href}>
      <a
        className={clsx(
          "p-3 rounded",
          "text-stone-500",
          "hover:bg-stone-200 hover:text-black",
          "dark:hover:bg-stone-400"
        )}
        title={title}
      >
        <Icon className="h-6 w-6" icon={icon} />
      </a>
    </Link>
  );
};

export default IconLink;
