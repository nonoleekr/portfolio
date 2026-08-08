import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Certification } from "@/types";
import { withBasePath } from "@/lib/utils";

export function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary">
            <Image src={withBasePath(cert.logo)} alt={cert.organization} width={44} height={44} />
          </div>
          <span className="text-xs text-muted-foreground">{cert.date}</span>
        </div>

        <div>
          <h3 className="text-sm font-semibold leading-snug">{cert.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{cert.organization}</p>
        </div>

        {cert.skills && (
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((s) => (
              <Badge key={s} variant="secondary" className="font-normal">
                {s}
              </Badge>
            ))}
          </div>
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-auto flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View credential <ExternalLink className="size-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}
