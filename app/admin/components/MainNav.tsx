import Link from "next/link";

import { cn } from "@/lib/utils";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="hover:text-primary text-sm font-medium transition-colors"
      >
        Storefront
      </Link>
      <Link
        href="https://vercel.com/capstones-projects/maczela-online"
        target="_blank"
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
      >
        Manage deployment
      </Link>
      <Link
        href="https://dashboard.clerk.com/apps/app_2YxPo2d6glgTYGgrBUFeKjhQ9wz/instances/ins_2YxPoFDr8tsV1kDsYp8NjBoWz9r/users"
        target="_blank"
        className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
      >
        Manage Users
      </Link>
    </nav>
  );
}
