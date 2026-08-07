"use client";

import * as React from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { personal } from "@/data/personal";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

type ContactErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function Contact() {
  const [values, setValues] = React.useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<ContactErrors>({});
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactErrors;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const subject = encodeURIComponent(`Portfolio contact from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${personal.social.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s talk</h2>
          <p className="mt-4 text-muted-foreground">
            Open to internships, collaborations, and interesting problems. Reach out any way that works.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <ContactLink icon={Mail} label="Email" value={personal.social.email} href={`mailto:${personal.social.email}`} />
                <ContactLink icon={Github} label="GitHub" value="@nonoleekr" href={personal.social.github} />
                <ContactLink icon={Linkedin} label="LinkedIn" value="Ronald Lee" href={personal.social.linkedin} />
                {personal.social.discord && (
                  <ContactLink
                    icon={MessageCircle}
                    label="Discord"
                    value={personal.social.discord}
                    href="#"
                  />
                )}
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {submitted ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center">
                    <CheckCircle2 className="size-10 text-primary" />
                    <p className="font-semibold">Your email client should now be open</p>
                    <p className="text-sm text-muted-foreground">
                      If nothing happened, email me directly at {personal.social.email}.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={values.name}
                        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                        aria-invalid={!!errors.name}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                        aria-invalid={!!errors.email}
                        placeholder="you@example.com"
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={values.message}
                        onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                        aria-invalid={!!errors.message}
                        placeholder="What's on your mind?"
                      />
                      {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                    </div>

                    <Button type="submit" className="mt-2 self-start">
                      Send message <Send className="size-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block text-sm font-medium">{value}</span>
      </span>
    </a>
  );
}
