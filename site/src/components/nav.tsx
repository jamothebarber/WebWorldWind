"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/container";
import { Button } from "./ui/button";
import { nav, brand } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-(--duration-base) ease-(--ease-out-expo)",
        scrolled || open ? "glass-panel border-b" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-(--color-fg)"
          onClick={() => setOpen(false)}
        >
          {brand.name}
          <span className="rounded-(--radius-sm) bg-(--color-accent-soft) px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wider text-(--color-accent-2)">
            {brand.nameSuffix}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-(--color-fg-muted) transition-colors duration-(--duration-fast) hover:text-(--color-fg)"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={nav.cta.href} size="md">
            {nav.cta.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-(--radius-sm) text-(--color-fg) md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel border-t md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-(--radius-sm) px-2 py-3 text-base font-medium text-(--color-fg-muted) transition-colors hover:bg-(--color-surface) hover:text-(--color-fg)"
                >
                  {link.label}
                </a>
              ))}
              <Button href={nav.cta.href} className="mt-2 w-full" onClick={() => setOpen(false)}>
                {nav.cta.label}
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
