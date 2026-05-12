export type HeaderNavLink = {
  label: string;
  targetId: string;
};

export type HeaderExternalLink = {
  label: string;
  href: string;
};

export type MenuState = "closed" | "open" | "closing";

export const pageLinks: HeaderNavLink[] = [
  { label: "Portfolio", targetId: "hero" },
  { label: "About", targetId: "about" },
  { label: "Skills", targetId: "skills" },
  { label: "Projects", targetId: "projects-panel" },
  { label: "Contact", targetId: "contact" },
];

export const desktopNavLinks = pageLinks;

export const externalLinks: HeaderExternalLink[] = [
  { label: "GitHub", href: "https://github.com/springlogger" },
  { label: "LeetCode", href: "https://leetcode.com/u/Linwis/" },
  { label: "HeadHunter", href: "https://hh.ru/resume/46f4eecdff0bd33c290039ed1f616835516c47" },
  { label: "Portfolio Repo", href: "https://github.com/springlogger/LinwisPortfolio" },
];
