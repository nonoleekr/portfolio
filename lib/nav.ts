export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];
