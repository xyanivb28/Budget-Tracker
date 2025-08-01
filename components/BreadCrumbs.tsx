// components/BreadCrumbs.tsx
"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link"; // ✅ Correct import
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadCrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    const formattedSegment =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

    return (
      <React.Fragment key={href}>
        {index > 0 && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href={href}>{formattedSegment}</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  });

  return <BreadcrumbList>{breadcrumbs}</BreadcrumbList>; // ✅ Return this
}
