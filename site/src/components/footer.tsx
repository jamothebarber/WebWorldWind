import Link from "next/link";
import { Container } from "./ui/container";
import { footer, brand, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-bg-raised)">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex w-fit items-center gap-1.5 text-lg font-semibold tracking-tight text-(--color-fg)"
          >
            {brand.name}
            <span className="rounded-(--radius-sm) bg-(--color-accent-soft) px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wider text-(--color-accent-2)">
              {brand.nameSuffix}
            </span>
          </Link>
          <p className="max-w-xs text-sm text-(--color-fg-muted)">{brand.tagline}</p>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-wide text-(--color-fg-subtle) uppercase">
              {col.title}
            </span>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href={
                      col.title === "Company"
                        ? (nav.links.find((n) => n.label === link)?.href ?? "#")
                        : "#capabilities"
                    }
                    className="text-sm text-(--color-fg-muted) transition-colors hover:text-(--color-fg)"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col-reverse gap-4 border-t border-(--color-border) py-6 text-xs text-(--color-fg-subtle) md:flex-row md:items-center md:justify-between">
        <span>{footer.legal}</span>
        <span>Built on GoHighLevel · No API keys, embed-only integration</span>
      </Container>
    </footer>
  );
}
