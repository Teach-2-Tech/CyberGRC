import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Send,
  Briefcase,
  Workflow,
  Code,
  Shield,
  GraduationCap,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clipboard,
  ClipboardCheck,
  Search,
  ChevronDown,
  ChevronUp,
  DownloadCloud,
  Filter,
} from "lucide-react";

/*************************************************
 * FIX SUMMARY
 * - Resolved a TypeScript syntax error in ExperienceItem caused by
 *   a duplicated/misplaced type annotation.
 * - Ensured all functions have valid, single parameter typings.
 * - Kept all existing tests and added a few more light runtime checks.
 *************************************************/

// ------------------------------
// Types
// ------------------------------
interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags?: string[];
}
interface Project {
  name: string;
  desc: string;
  link?: string;
  tags?: string[];
}
interface CyberResource {
  title: string;
  url: string;
  tags?: string[];
  note?: string;
}
interface Certification {
  name: string;
  status: "In Progress" | "Completed";
  provider: string;
  desc: string;
  progress: number; // 0-100
  year?: number | null;
}

// ------------------------------
// Data (Cyber/GRC focused)
// ------------------------------
const data: {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  badges: string[];
  experience: Experience[];
  education: { degree: string; org: string; year: string }[];
  projects: Project[];
  certifications: Certification[];
} = {
  name: "Jacob Cooper, M.Ed.",
  headline: "Cybersecurity Specialist | GRC Program Builder | Security Awareness Leader",
  location: "Prosper, TX",
  email: "mrcoop2@gmail.com",
  phone: "708.243.6853",
  linkedin: "https://linkedin.com/in/jmcooper",
  summary:
    "I help organizations strengthen their cybersecurity posture and compliance readiness by implementing phishing awareness programs, managing access control policies, and guiding teams through frameworks like SOC 2 and NIST CSF.",
  badges: ["Remote-Ready", "US Citizen", "Security Clearance Eligible"],
  experience: [
    {
      role: "Cybersecurity Specialist (Contract)",
      company: "Diversified Technologies – Chicago, IL (Remote)",
      period: "Jan 2025 – Present",
      bullets: [
        "Administered ongoing phishing campaigns and awareness training for 150+ employees.",
        "Managed endpoint and email security using Xcitium zero-trust protection tools.",
        "Deployed Microsoft security patches tied to CVE updates to maintain SOC 2 alignment.",
        "Launching a SOC 2 audit through Drata; maintaining compliance documentation and gap analysis.",
      ],
      tags: ["GRC", "Awareness", "Zero Trust"],
    },
    {
      role: "Technology Manager",
      company: "Jones Software Corporation – Chicago, IL (Remote)",
      period: "Jun 2021 – Jan 2025",
      bullets: [
        "Centralized policy enforcement through Azure AD and Microsoft 365.",
        "Established SOC 2-based password rotation and MFA requirements across SaaS platforms.",
        "Integrated 116 SaaS products into Microsoft Marketplace with compliance documentation.",
        "Delivered secure product demos for clients within SOC 2 boundaries.",
      ],
      tags: ["Azure AD", "SOC 2", "Policy"],
    },
    {
      role: "IT Security and Operations Manager",
      company: "Posen-Robbins School District 143.5 – Posen, IL",
      period: "Mar 2017 – Jun 2021",
      bullets: [
        "Oversaw district security policies, device provisioning, and endpoint protection for 9,800 laptops.",
        "Managed $1.2M technology budget with a focus on cybersecurity initiatives.",
        "Led staff professional development workshops on security best practices and eLearning tools.",
        "Directed phishing simulations and data loss prevention policies for 1,550 end users.",
        "Migrated staff email to Office 365 with enhanced encryption and retention compliance.",
      ],
      tags: ["Leadership", "Education Security", "Policy"],
    },
    {
      role: "Director of Technology",
      company: "ECHO Co-op – South Holland, IL",
      period: "Jul 2012 – Mar 2017",
      bullets: [
        "Formed technology committees focused on compliance with federal education technology standards.",
        "Created district inventory and E-Rate documentation ensuring compliance and audit readiness.",
        "Implemented secure data handling procedures and Exchange 365 migration.",
      ],
      tags: ["Compliance", "Education", "IT Governance"],
    },
  ],
  education: [
    { degree: "M.S., Educational Leadership", org: "American College of Education", year: "2013" },
    { degree: "M.S., Instructional Technology", org: "Lewis University", year: "2007" },
    { degree: "B.S., Industrial Technology", org: "Illinois State University", year: "1999" },
  ],
  projects: [
    {
      name: "Security Awareness for Kids App",
      desc: "Interactive mobile app teaching age‑appropriate cyber safety (phishing, passwords, privacy) for grades 3–8. Designed to be WCAG, HIPAA, and ADA compliant.",
      link: "#",
      tags: ["Cyber Education", "Accessibility", "Compliance"],
    },
    {
      name: "Small Business GRC Toolkit",
      desc: "Templates for risk registers, vendor due diligence, and SOC 2 readiness using NIST CSF and CIS Controls.",
      link: "#",
      tags: ["GRC", "Templates", "SMB"],
    },
  ],
  certifications: [
    {
      name: "ISC2 Certified in Cybersecurity (CC)",
      status: "In Progress",
      provider: "ISC2",
      desc: "Security principles, network, access management, incident response basics.",
      progress: 65,
      year: null,
    },
    {
      name: "Microsoft SC-900",
      status: "In Progress",
      provider: "Microsoft",
      desc: "Security, Compliance, and Identity fundamentals across Microsoft cloud services.",
      progress: 50,
      year: null,
    },
    {
      name: "ISC2 CGRC (Certified in Governance, Risk and Compliance)",
      status: "In Progress",
      provider: "ISC2",
      desc: "Governance, risk, and compliance lifecycle: authorization, assessment, continuous monitoring.",
      progress: 30,
      year: null,
    },
    {
      name: "Qualys PCI Compliance – Certificate of Completion",
      status: "Completed",
      provider: "Qualys",
      desc: "PCI DSS scanning and compliance overview; certificate of completion earned.",
      progress: 100,
      year: 2023,
    },
  ],
};

const cyberDefense: CyberResource[] = [
  { title: "Have I Been Pwned – Breach Check", url: "https://haveibeenpwned.com/", tags: ["Email", "Breach"], note: "Scan your email for data breaches and enable MFA on compromised accounts." },
  { title: "Bitwarden Password Manager", url: "https://bitwarden.com/", tags: ["Passwords"], note: "Centralize and secure your credentials using AES‑256 encryption." },
  { title: "Authy Authenticator", url: "https://authy.com/", tags: ["MFA"], note: "Add two‑factor authentication to all sensitive accounts." },
  { title: "CISA Phishing Self‑Defense", url: "https://www.cisa.gov/secure-our-world/phishing", tags: ["Phishing"], note: "Learn to detect and report phishing attempts effectively." },
  { title: "NIST Cybersecurity Framework Quick Start", url: "https://www.nist.gov/cyberframework", tags: ["Framework"], note: "Adopt Identify–Protect–Detect–Respond–Recover model for business use." },
  { title: "SANS Security Policy Templates", url: "https://www.sans.org/information-security-policy/", tags: ["Policy", "Template"], note: "Download ready‑to‑use security policies for organizations." },
];

// GRC Toolkit data
const grcToolkit = [
  { title: "Mini Risk Register (CSV)", anchor: "risk-register", tags: ["Risk", "Register"], note: "5 columns: Asset, Threat, Impact, Control, Owner.", content: `Asset,Threat/Scenario,Impact (H/M/L),Existing Controls,Planned Controls,Owner,Due Date
Google Workspace,Credential phishing,H,Enforce MFA; DKIM/SPF/DMARC,Phishing simulation quarterly,IT,2025-12-01
Laptops,Ransomware,H,EDR + Auto Updates,Daily backups verified,Ops,2025-11-15
Parent PII,Unauthorized access,H,Role-based access; least privilege,Quarterly access review,Program Lead,2025-12-15`, filename: "risk-register.csv" },
  { title: "Vendor Questionnaire (Lightweight)", anchor: "vendor-dd", tags: ["Vendor", "Due Diligence"], note: "15 yes/no checks incl. MFA, backups, IR, data location.", content: `# Vendor Security Questionnaire (Lightweight)
1. Do you enforce MFA for all administrative access? (Y/N)
2. Do you perform regular backups with restore tests? (Y/N)
3. Do you have an incident response plan with contacts? (Y/N)
4. Where is customer data stored (region)?
5. Do you have endpoint protection (AV/EDR) on all devices? (Y/N)
6. Do you encrypt data at rest and in transit? (Y/N)
7. Do you conduct background checks for personnel? (Y/N)
8. Do you maintain audit logs for at least 90 days? (Y/N)
9. Do you perform quarterly access reviews? (Y/N)
10. Do you have a vulnerability management process (patch SLAs)? (Y/N)
11. Do you have documented change management? (Y/N)
12. Do you have a disaster recovery plan and RTO/RPO targets? (Y/N)
13. Do you use third-party sub-processors? List and provide agreements.
14. Do you have data retention & deletion policies? (Y/N)
15. Point of contact for security issues:`, filename: "vendor-questionnaire.md" },
  { title: "Security Baseline Checklist (IG1)", anchor: "baseline", tags: ["Baseline", "CIS"], note: "Top settings to flip first in M365/Workspace.", content: `- MFA everywhere (admins mandatory)
- Unique admin accounts; disable legacy protocols
- Patch OS/apps automatically; browser auto‑update
- EDR/AV deployed; alerting turned on
- DNS filtering (Quad9/Cloudflare) forced
- Backups tested; offline/offsite copy (3‑2‑1)
- Least privilege; quarterly access reviews
- Encrypt devices; enable screen lock
- Email security: SPF/DKIM/DMARC configured
- Security awareness quarterly incl. phishing
- IR one‑pager + contacts; tabletop twice yearly
- Vendor DD: data location, MFA, backups, IR
- Change management notes for major updates
- Asset inventory for users/devices/SaaS
- Logs retained (at least 30–90 days)`, filename: "baseline-ig1-checklist.md" },
  { title: "Incident Readiness One‑Pager", anchor: "ir-onepager", tags: ["IR", "Playbook"], note: "Who to call, what to capture, how to contain.", content: `# Incident Readiness One‑Pager
## First 5 Steps
1. Identify and stop the bleeding (isolate device/network segment).
2. Preserve evidence (no reboots; take photos/screenshots; collect logs).
3. Notify: internal security lead, IT, legal, execs. Escalate when PII is involved.
4. Triage severity and scope; begin timeline.
5. Engage external partners if needed (IR firm, law enforcement).

## Contacts
- Security Lead: 
- Legal: 
- Executive Sponsor: 
- MSP/IR Partner: 

## Evidence to Capture
- Affected systems, timestamps, user accounts
- Malicious domains/attachments, hashes, IPs
- Containment actions taken and when`, filename: "incident-readiness-onepager.md" },
  { title: "Privacy & Consent Notes (Youth/Edu)", anchor: "privacy", tags: ["Privacy", "Education"], note: "Plain‑English notices for guardians.", content: `# Privacy & Consent Notes (Youth/Edu)
- What data we collect: student name, guardian contact, app usage events.
- Why we collect it: to provide learning features and keep accounts secure.
- How we protect it: encryption in transit/at rest; limited access; audits.
- Sharing: only with vetted service providers for core functionality; no selling.
- Your choices: request access, corrections, or deletion via [contact].
- Consent: by signing, you acknowledge the above and agree to app use.`, filename: "privacy-consent-notes.md" },
];

// ------------------------------
// UI helpers
// ------------------------------
function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((t) => (
        <Badge key={t} variant="secondary" className="rounded-full">
          {t}
        </Badge>
      ))}
    </div>
  );
}

function Resource({ r }: { r: CyberResource }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <a href={r.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
            {r.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>{r.note}</p>
        <TagList tags={r.tags} />
      </CardContent>
    </Card>
  );
}

// copy-to-clipboard button
function CopyButton({ text, filename }: { text: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };
  const onDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "template.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={onCopy} className="gap-2">
        {copied ? <ClipboardCheck className="h-4 w-4"/> : <Clipboard className="h-4 w-4"/>}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button variant="outline" size="sm" onClick={onDownload} className="gap-2">
        <DownloadCloud className="h-4 w-4"/> Download
      </Button>
    </div>
  );
}

// Toolkit interactive item
function ToolkitItem({ title, note, tags, content, filename }: { title: string; note: string; tags?: string[]; content?: string; filename?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-4 w-4"/>
          {title}
          <span className="ml-auto opacity-70">{open ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-2">
        <p>{note}</p>
        <TagList tags={tags} />
        {open && content && (
          <div className="mt-2">
            <pre className="whitespace-pre-wrap text-xs p-3 bg-muted rounded-lg">{content}</pre>
            <CopyButton text={content} filename={filename} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ✅ FIXED: proper, single annotation for props
function ExperienceItem({ item }: { item: Experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <Card className="bg-white/60 dark:bg-zinc-900/40">
        <CardHeader className="pb-3">
          <CardTitle className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Briefcase className="h-4 w-4" />
            <span>{item.role}</span>
            <span className="text-muted-foreground">• {item.company}</span>
          </CardTitle>
          <div className="text-xs text-muted-foreground">{item.period}</div>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <TagList tags={item.tags} />
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  const safe = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="opacity-70">{label}</span>
        <span className="opacity-70">{safe}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safe}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
        />
      </div>
    </div>
  );
}

function EducationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><GraduationCap className="h-4 w-4"/>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        {data.education.map((e) => (
          <div key={e.degree} className="group p-2 rounded-lg hover:bg-slate-100/70 dark:hover:bg-zinc-900/50 transition-colors">
            <div className="font-medium text-foreground">{e.degree}</div>
            <div className="text-xs">{e.org} ({e.year})</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CertificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4"/>Certifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {data.certifications.map((c) => (
          <motion.div
            key={c.name}
            className="group rounded-xl border border-slate-200 dark:border-zinc-800 p-3 hover:shadow-md hover:border-sky-300/60 dark:hover:border-sky-500/40 transition-all bg-white/60 dark:bg-zinc-900/40"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-foreground">{c.name}</div>
                <div className="text-xs opacity-70">
                  {c.provider} • {c.status}
                  {c.year ? ` • ${c.year}` : ""}
                </div>
              </div>
              {c.status === "In Progress" ? (
                <Badge variant="secondary" className="rounded-full">In Progress</Badge>
              ) : (
                <Badge variant="outline" className="rounded-full">Completed</Badge>
              )}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <div className="line-clamp-2 group-hover:line-clamp-none transition-[max-height] duration-200">{c.desc}</div>
            </div>
            {c.status === "In Progress" && (
              <div className="mt-3">
                <ProgressBar value={c.progress} label="Learning progress" />
              </div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 md:p-10 bg-gradient-to-br from-cyan-700 via-blue-700 to-sky-600 text-white shadow-xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{data.name}</h1>
            <p className="mt-2 text-white/90 text-base md:text-lg">{data.headline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/90">
              <Badge variant="secondary" className="bg-white/10 border-white/20 text-white">
                {data.location}
              </Badge>
              {data.badges.map((b) => (
                <Badge key={b} variant="outline" className="bg-white/10 border-white/20 text-white">
                  {b}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => window.print()} className="gap-2">
              <Download className="h-4 w-4" /> Download / Print
            </Button>
            <Button asChild className="gap-2">
              <a href="#contact">
                <Send className="h-4 w-4" /> Contact
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ------------------------------
// Self-check tests (run in browser console)
// ------------------------------
function runTests() {
  console.assert(Array.isArray(data.experience) && data.experience.length > 0, "Experience should contain entries");
  console.assert(typeof data.name === "string" && data.name.length > 0, "Name should be non-empty");
  console.assert(cyberDefense.some((r) => /MFA/i.test(r.note || "") || /MFA/i.test(r.title)), "Cyber resources should include MFA guidance");
  // Existing tests kept
  console.assert(data.projects.length >= 2, "Two or more projects expected");
  console.assert(data.experience.every((e) => e.bullets.length > 0), "Each experience should have bullets");
  console.assert(cyberDefense.every((r) => /^https?:\/\//.test(r.url)), "Resource URLs should be http(s)");
  // Dashboard tests
  console.assert(data.education.length >= 1, "Education present");
  console.assert(data.certifications.length >= 3, "Certifications present");
  console.assert(data.certifications.every((c) => c.progress >= 0 && c.progress <= 100), "Cert progress within 0-100");
  // NEW tests for GRC Toolkit interactivity
  console.assert(Array.isArray(grcToolkit) && grcToolkit.length >= 5, "GRC toolkit items present");
  console.assert(grcToolkit.every((x) => typeof x.title === "string" && x.title.length > 0), "Each toolkit item has a title");
  console.assert(grcToolkit.every((x) => typeof x.note === "string" && x.note.length > 0), "Each toolkit item has a note");
  console.assert(grcToolkit.filter((x) => (x.tags || []).includes("Risk")).length >= 1, "Toolkit contains Risk items");
}
if (typeof window !== "undefined") {
  try {
    runTests();
  } catch (e) {
    console.error("Tests failed:", e);
  }
}

// ------------------------------
// Main component
// ------------------------------
export default function ResumeWebsite(): JSX.Element {
  const [query, setQuery] = useState("");
  const filteredCyber = useMemo(
    () => cyberDefense.filter((r) => (r.title + (r.note || "")).toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const [search, setSearch] = useState("");
  const filteredCerts = useMemo(
    () => data.certifications.filter((c) => (c.name + c.desc + c.provider).toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  // GRC toolkit interactivity
  const [grcQuery, setGrcQuery] = useState("");
  const [grcFilter, setGrcFilter] = useState<string>("all");
  const filteredGrc = useMemo(() => {
    return grcToolkit.filter((r) => {
      const matchesQuery = (r.title + r.note + (r.tags?.join(" ") || "")).toLowerCase().includes(grcQuery.toLowerCase());
      const matchesTag = grcFilter === "all" ? true : (r.tags || []).some((t) => t.toLowerCase().includes(grcFilter.toLowerCase()));
      return matchesQuery && matchesTag;
    });
  }, [grcQuery, grcFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <Hero />
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="cyber">Cyber Defense</TabsTrigger>
            <TabsTrigger value="grc">GRC Toolkit</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-4 w-4" /> How I Can Help
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  I design and implement cybersecurity programs that safeguard users, data, and systems. My expertise includes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Developing and auditing information security policies aligned with SOC 2 and NIST CSF.</li>
                  <li>Managing identity and access control systems (Azure AD, MFA, conditional access).</li>
                  <li>Conducting phishing awareness and endpoint hardening initiatives.</li>
                  <li>Guiding small and mid-sized organizations through compliance automation (Drata).</li>
                  <li>Creating accessible cybersecurity education tools and training for all ages.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Combined Dashboard (Education + Certifications) */}
            <div className="grid md:grid-cols-2 gap-4">
              <EducationCard />
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4"/>Certifications</CardTitle>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search certs" className="w-48" />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredCerts.length ? (
                    <div className="space-y-3 text-sm">
                      {filteredCerts.map((c) => (
                        <motion.div
                          key={c.name}
                          className="group rounded-xl border border-slate-200 dark:border-zinc-800 p-3 hover:shadow-md hover:border-sky-300/60 dark:hover:border-sky-500/40 transition-all bg-white/60 dark:bg-zinc-900/40"
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium text-foreground">{c.name}</div>
                              <div className="text-xs opacity-70">{c.provider} • {c.status}{c.year ? ` • ${c.year}` : ""}</div>
                            </div>
                            {c.status === "In Progress" ? (
                              <Badge variant="secondary" className="rounded-full">In Progress</Badge>
                            ) : (
                              <Badge variant="outline" className="rounded-full">Completed</Badge>
                            )}
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            <div className="line-clamp-2 group-hover:line-clamp-none transition-[max-height] duration-200">{c.desc}</div>
                          </div>
                          {c.status === "In Progress" && (
                            <div className="mt-3">
                              <ProgressBar value={c.progress} label="Learning progress" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">No certifications match your search.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* EXPERIENCE */}
          <TabsContent value="resume" className="space-y-4">
            {data.experience.map((item) => (
              <ExperienceItem key={item.role + item.company} item={item} />
            ))}
          </TabsContent>

          {/* PROJECTS */}
          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-4 w-4" /> Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                {data.projects.map((p) => (
                  <div key={p.name}>
                    <div className="font-medium text-foreground">
                      <a href={p.link || "#"} className="underline-offset-2 hover:underline">
                        {p.name}
                      </a>
                    </div>
                    <div className="text-xs">{p.desc}</div>
                    <TagList tags={p.tags} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* CYBER DEFENSE */}
          <TabsContent value="cyber" className="space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Cyber Defense Resources</h2>
              </div>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (e.g., phishing, password)"
                className="w-64"
              />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredCyber.map((r) => (
                <Resource key={r.url} r={r} />
              ))}
            </div>
          </TabsContent>

          {/* GRC TOOLKIT */}
          <TabsContent value="grc" className="space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5"/>
                <h2 className="text-xl font-semibold">GRC Toolkit (Interactive)</h2>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 opacity-60"/>
                <Input id="grc-search" placeholder="Search toolkit (e.g., vendor, IG1)" className="w-64" onChange={(e) => setGrcQuery(e.target.value)} />
                <Filter className="h-4 w-4 opacity-60"/>
                <select className="border rounded-md px-2 py-1 text-sm bg-background" value={grcFilter} onChange={(e) => setGrcFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="Risk">Risk</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Baseline">Baseline</option>
                  <option value="IR">IR</option>
                  <option value="Privacy">Privacy</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="md:col-span-2 space-y-3">
                {filteredGrc.map((r) => (
                  <ToolkitItem key={r.title} title={r.title} note={r.note} tags={r.tags} content={r.content} filename={r.filename} />
                ))}
              </div>
              <Card id="risk-register">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4"/>Quick Start: Sample Risk Register</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-xs p-3 bg-muted rounded-lg">{grcToolkit[0].content}</pre>
                  <CopyButton text={grcToolkit[0].content as string} filename="risk-register.csv" />
                </CardContent>
              </Card>
            </div>

            <Card id="baseline">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="h-4 w-4"/>Security Baseline (IG1) – Top 15</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <pre className="whitespace-pre-wrap text-xs p-3 bg-muted rounded-lg">{grcToolkit[2].content}</pre>
                <CopyButton text={grcToolkit[2].content as string} filename="baseline-ig1-checklist.md" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTACT */}
          <TabsContent value="contact">
            <Card id="contact">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Email: <a href={`mailto:${data.email}`} className="underline-offset-2 hover:underline">{data.email}</a>
                  </p>
                  <p>Phone: {data.phone}</p>
                  <p>
                    LinkedIn: <a href={data.linkedin} target="_blank" className="underline-offset-2 hover:underline">{data.linkedin}</a>
                  </p>
                  <Button variant="outline" className="mt-2 gap-2" onClick={() => window.print()}>
                    <Download className="h-4 w-4" /> Download / Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
