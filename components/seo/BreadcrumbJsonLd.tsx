import { BreadcrumbStructuredData } from "@/components/SeoStructuredData";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  return <BreadcrumbStructuredData items={items} />;
}
