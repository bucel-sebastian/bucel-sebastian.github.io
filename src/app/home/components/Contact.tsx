"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { Card, PillButton, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* --------------------------------------------------------------- icons ---- */

function Glyph({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function MailIcon() {
  return (
    <Glyph>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </Glyph>
  );
}

function ChatIcon() {
  return (
    <Glyph>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
    </Glyph>
  );
}

function CalendarIcon() {
  return (
    <Glyph>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </Glyph>
  );
}

function SendIcon() {
  return (
    <Glyph size={16}>
      <path d="M22 2 11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </Glyph>
  );
}

function ArrowUpRightIcon() {
  return (
    <Glyph size={16}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Glyph>
  );
}

/* --------------------------------------------------------------- contact --- */

interface Channel {
  label: string;
  icon: ReactNode;
}

/** Placeholder contact routes — point them at the real destinations later. */
const CHANNELS: Channel[] = [
  { label: "Email", icon: <MailIcon /> },
  { label: "WhatsApp", icon: <ChatIcon /> },
  { label: "Book a call", icon: <CalendarIcon /> },
];

type StatusState = "idle" | "sending" | "sent" | "error";

interface FormStatus {
  state: StatusState;
  message: string;
}

interface FormValues {
  name: string;
  contact: string;
  message: string;
}

const EMPTY_VALUES: FormValues = { name: "", contact: "", message: "" };

/** Validation order: field key → the input id that should receive focus. */
const FIELD_ORDER: Array<[keyof FormValues, string]> = [
  ["name", "contact-name"],
  ["contact", "contact-email"],
  ["message", "contact-message"],
];

const INPUT_CLASS = "w-full px-4 py-3 text-[0.9375rem]";
const INPUT_STYLE: CSSProperties = {
  borderRadius: "var(--radius-sm)",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  color: "var(--foreground)",
  fontFamily: "inherit",
};

function statusColor(state: StatusState): string {
  if (state === "error") return "color-mix(in srgb, var(--danger) 72%, var(--foreground))";
  if (state === "sent") return "color-mix(in srgb, var(--success) 62%, var(--foreground))";
  return "var(--muted)";
}

/**
 * Two-column contact block: intro + direct channels on the left, a locally
 * handled form on the right. There is no backend — submitting only validates
 * and reports through a polite live region.
 */
export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [status, setStatus] = useState<FormStatus>({ state: "idle", message: "" });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Native bubbles are skipped (`noValidate`) so the polite status region
    // below is what reports the problem — and focus jumps to the first gap.
    const firstMissing = FIELD_ORDER.find(([key]) => values[key].trim() === "");

    if (firstMissing) {
      setStatus({ state: "error", message: "Please fill in every field before sending." });
      document.getElementById(firstMissing[1])?.focus();
      return;
    }

    setStatus({ state: "sending", message: "Sending your message…" });

    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setStatus({
        state: "sent",
        message: "Message sent — placeholder only, no backend is wired up yet.",
      });
      setValues(EMPTY_VALUES);
    }, 900);
  };

  const sending = status.state === "sending";

  return (
    <SectionShell id="contact" ariaLabelledBy="contact-title">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Chat With Me"
            heading="Let's build something useful"
            description="A short description of this section goes here — how quickly you reply and what you love to hear about."
            headingId="contact-title"
          />

          <div className="flex flex-col gap-4">
            <span className="eyebrow">Direct channels</span>

            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href="#"
                    className="group flex items-center justify-between gap-4 border bg-[var(--surface)] px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-glow)]"
                    style={{ borderRadius: "var(--radius)", borderColor: "var(--border)" }}
                  >
                    <span className="flex items-center gap-3 text-sm font-medium">
                      {channel.icon}
                      {channel.label}
                    </span>
                    <ArrowUpRightIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="eyebrow eyebrow--plain" htmlFor="contact-name">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                  className={INPUT_CLASS}
                  style={INPUT_STYLE}
                  value={values.name}
                  onChange={(event) => setValues((previous) => ({ ...previous, name: event.target.value }))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="eyebrow eyebrow--plain" htmlFor="contact-email">
                  Email or Discord Tag
                </label>
                <input
                  id="contact-email"
                  name="contact"
                  type="text"
                  autoComplete="email"
                  required
                  placeholder="john@example.com"
                  className={INPUT_CLASS}
                  style={INPUT_STYLE}
                  value={values.contact}
                  onChange={(event) => setValues((previous) => ({ ...previous, contact: event.target.value }))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="eyebrow eyebrow--plain" htmlFor="contact-message">
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder="Hey! I have a project idea..."
                className={INPUT_CLASS}
                style={{ ...INPUT_STYLE, minHeight: "10rem", resize: "vertical", lineHeight: 1.6 }}
                value={values.message}
                onChange={(event) => setValues((previous) => ({ ...previous, message: event.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-3 pt-1">
              <PillButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={sending}
                leadingIcon={<SendIcon />}
              >
                {sending ? "Sending…" : "Send Message"}
              </PillButton>

              <p
                role="status"
                aria-live="polite"
                className="m-0 min-h-[1.25rem] text-sm"
                style={{ color: statusColor(status.state) }}
              >
                {status.message}
              </p>
            </div>
          </form>
        </Card>
      </div>
    </SectionShell>
  );
}
