"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Shield, FileText, ClipboardList, ScrollText, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [userType, setUserType] = useState<"employer" | null>(null);
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleStartAssessment = () => {
    setShowAuthDialog(true);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const evaluatorInfo = {
        userType,
        organization,
        email,
        timestamp: new Date().toISOString() // Add timestamp for validation
      };
      localStorage.setItem('evaluatorInfo', JSON.stringify(evaluatorInfo));
      setShowAuthDialog(false);
      setShowWelcomeDialog(true);
    } catch (error) {
      console.error('Error saving evaluator info:', error);
    }
  };

  const handleBeginAssessment = () => {
    setShowWelcomeDialog(false);
    router.push("/assessment");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Rhode Island Second Chance Assessment Platform
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Scale className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Fair Evaluation</CardTitle>
              <CardDescription>
                Structured assessment process ensuring unbiased consideration of candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our platform guides evaluators through a comprehensive review process that aligns with Rhode Island's Fair Chance legislation.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Legal Compliance</CardTitle>
              <CardDescription>
                Built-in compliance features help organizations meet their obligations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <Link 
                  href="/statutes"
                  className="text-primary hover:underline"
                >
                  Rhode Island General Laws §28-5-7
                </Link>
                , Rhode Island's "Ban-the-Box" Law,{' '}
                <Link 
                  href="/statutes/5-1-14"
                  className="text-primary hover:underline"
                >
                  Rhode Island General Laws § 28-5.1-14
                </Link>
                , and the U.S. Equal Employment Opportunity Commission.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
            <DialogTrigger asChild>
              <Button size="lg" onClick={handleStartAssessment}>Start Assessment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Authentication Required</DialogTitle>
                <DialogDescription>
                  Please provide your credentials to continue.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAuthSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Select your status:</Label>
                  <RadioGroup
                    value={userType || ""}
                    onValueChange={(value) => setUserType(value as "employer")}
                    className="grid gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="employer" id="employer" />
                      <Label htmlFor="employer">Employer</Label>
                    </div>
                  </RadioGroup>
                </div>

                {userType && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Business Name</Label>
                      <Input
                        id="organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Enter your business name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your company email"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={!organization || !email}>
                        Continue
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Welcome to Your Fair Chance Assessment</DialogTitle>
                <DialogDescription className="text-lg mt-4">
                  We'll guide you through a comprehensive, legally-compliant evaluation process
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-6 space-y-6">
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Background Report Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyze the candidate's background report in accordance with fair chance hiring laws directly from the platform
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ClipboardList className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Job Description Review</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll pull in the job requirements to help ensure a fair evaluation of relevance to past records
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ScrollText className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Legal Compliance Guidance</h3>
                    <p className="text-sm text-muted-foreground">
                      Relevant hiring laws and compliance requirements will be highlighted throughout the process
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <UserCheck className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Individualized Assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll help you request and process additional information from the Candidate through the Restorative Record
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleBeginAssessment} size="lg">
                  Begin Assessment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}