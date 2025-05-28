"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Send, Share2, FileText, Download, BookOpen, BarChart, Clock, AlertTriangle, Upload, Lightbulb, Handshake, Building2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { format, addBusinessDays } from "date-fns";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const questions = [
  {
    id: 1,
    title: "Sustained Recovery",
    question: "The applicant has demonstrated sustained recovery and stability for at least two years.",
    description: "Verify a minimum two-year period of stability without subsequent legal issues, showing commitment to positive change."
  },
  {
    id: 2,
    title: "Job Relevance",
    question: "The nature of past challenges has minimal relation to the current career opportunity.",
    description: "Evaluate how past experiences relate to the ability to perform essential job functions, focusing on present capabilities."
  },
  {
    id: 3,
    title: "Path to Change",
    question: "The applicant's circumstances demonstrate a clear path toward positive change.",
    description: "Consider the context and circumstances that show the individual's journey toward stability and growth."
  },
  {
    id: 4,
    title: "Growth Potential",
    question: "The applicant's age and circumstances at the time suggest potential for growth.",
    description: "Consider how youth or circumstances influenced past decisions and subsequent personal development."
  },
  {
    id: 5,
    title: "Background Review",
    question: "All background information has been thoroughly reviewed for accuracy.",
    description: "Confirm that all information has been properly verified and is legally admissible for consideration."
  },
  {
    id: 6,
    title: "Time & Commitment",
    question: "The time elapsed demonstrates consistent commitment to personal growth.",
    description: "Evaluate the individual's dedication to maintaining stability and pursuing positive life changes."
  },
  {
    id: 7,
    title: "Work History",
    question: "The applicant shows a strong employment history or workforce engagement.",
    description: "Review work history and professional growth, including volunteer work and skill development."
  },
  {
    id: 8,
    title: "Education & Training",
    question: "The applicant has invested in educational and professional development.",
    description: "Consider formal education, certifications, and ongoing learning that demonstrate commitment to growth."
  },
  {
    id: 9,
    title: "Professional References",
    question: "Professional references affirm the applicant's reliability and growth.",
    description: "Evaluate feedback from employers and professional contacts about work ethic and dependability."
  },
  {
    id: 10,
    title: "Community Service",
    question: "Community involvement demonstrates commitment to giving back.",
    description: "Consider engagement in community service, mentoring, or support programs that benefit others."
  },
  {
    id: 11,
    title: "Recovery Programs",
    question: "The applicant has actively participated in recovery and wellness programs.",
    description: "Consider engagement in recovery support services, wellness programs, or other personal development initiatives."
  },
  {
    id: 12,
    title: "Workforce Readiness",
    question: "The applicant demonstrates readiness for workforce reintegration.",
    description: "Evaluate participation in job readiness programs, career counseling, and professional skill development."
  },
  {
    id: 13,
    title: "Professional Goals",
    question: "The applicant shows ongoing dedication to professional growth.",
    description: "Consider current goals, professional development plans, and commitment to continuous improvement."
  }
];

const likertOptions = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Moderately Disagree" },
  { value: "3", label: "Slightly Disagree" },
  { value: "4", label: "Neutral" },
  { value: "5", label: "Slightly Agree" },
  { value: "6", label: "Moderately Agree" },
  { value: "7", label: "Strongly Agree" }
];

const determinationOptions = [
  { value: "extend-offer", label: "Extend Employment Offer" },
  { value: "deny-offer", label: "Deny Employment Offer" },
  { value: "revoke-offer", label: "Revoke Employment Offer" }
];

const getLegalIntelligence = (questionId: number) => {
  switch (questionId) {
    case 1:
      return {
        title: "Rhode Island Labor and Labor Relations",
        content: `
• All state-licensed/chartered businesses must operate without discrimination.

• Equal employment treatment is required.

• Equal access to services must be provided to all persons.

• Non-compliant businesses face disciplinary action.

• Disciplinary actions must be consistent with the licensing agency's authority and regulations.
        `.trim()
      };
    case 2:
      return {
        title: "Job Responsibilities & Duties",
        content: `
• Manage and lead client engagements from beginning to end.

• Prospect, qualify, close and/or manage clients.

• Participate in sales calls & perform client assessments.

• Follow up with clients and measure results.
        `.trim()
     };
    case 3:
      return {
        title: "Evidence of Rehabilitation & Present Fitness",
        content: `
Consider all other competent evidence of rehabilitation and present fitness presented, including, but not limited to:

• Letters of reference by persons who have been in contact with the applicant since the applicant's release from any state or federal correctional institution.
        `.trim()    
      };
    case 4:
      return {
        title: "Developmental Context of Offenses",
        content: `
Consider the time elapsed since the conviction when determining sufficient rehabilitation, as well as any evidence presented by the applicant regarding:

• The age of the person at the time the crime or crimes were committed.
        `.trim()    
      };  
    case 5:
      return {
        title: "Prohibited Records Under RI Gen L § 28-5.1-14",
        content: `
The following criminal records may not be used in connection with any application for a license, permit, certificate, or registration:

(1) Juvenile adjudications;

(2) Records of arrest not followed by a valid conviction;

(3) Convictions that have been, pursuant to law, annulled or expunged;

(4) Misdemeanor convictions for which no jail sentence can be imposed;

(5) A conviction that is not related to the occupation for which a license is being sought, as determined by subsection (f) of this section.
        `.trim()
      };
    case 6:
      return {
        title: "Based on the federal employment discrimination laws enforced by the EEOC:",
        content: `
Consider the following:

In determining how the applicant's criminal history relates to the risks and responsibilities of the job, consider the nature of the crime; the time that has passed since the criminal conduct occurred; and the nature of the job.
        `.trim()
      };
    case 11:
      return {
        title: "Rhode Island's Recovery Friendly Workplace Initiative:",
        content: `
Led by Governor Dan McKee, Rhode Island's Recovery Friendly Workplace Initiative promotes individual wellness for Ocean Staters by empowering workplaces to provide support for people recovering from substance use disorder.
        `.trim()
      };
    default:
      return {
        title: "Legal & Policy Intelligence",
        content: "All relevant legal and policy guidance will appear here..."
      };
  }
};

export default function Assessment() {
  const router = useRouter();
  const [responses, setResponses] = useState<Record<number, { rating: string; comment: string }>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showDeterminationDialog, setShowDeterminationDialog] = useState(false);
  const [showNoticeDialog, setShowNoticeDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFinalDialog, setShowFinalDialog] = useState(false);
  const [determinationType, setDeterminationType] = useState("");
  const [evaluatorInfo, setEvaluatorInfo] = useState<any>(null);
  const [superiorEmail, setSuperiorEmail] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [colleagueEmail, setColleagueEmail] = useState("");
  const [specificConvictions, setSpecificConvictions] = useState("");
  const [convictionRationale, setConvictionRationale] = useState("");
  const [responseDeadlineDays, setResponseDeadlineDays] = useState(10);
  const [pdfUrl, setPdfUrl] = useState<string>("/sample-background-check.pdf");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem('evaluatorInfo');
    if (!storedInfo) {
      router.push('/');
      return;
    }
    try {
      const parsedInfo = JSON.parse(storedInfo);
      setEvaluatorInfo(parsedInfo);
    } catch (error) {
      console.error('Error parsing evaluator info:', error);
      router.push('/');
    }
  }, [router]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setUploadedFile(file);
    }
  };

  const handleResponse = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [questions[currentQuestion].id]: {
        ...prev[questions[currentQuestion].id],
        rating: value
      }
    }));
  };

  const handleComment = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [questions[currentQuestion].id]: {
        ...prev[questions[currentQuestion].id],
        comment: value
      }
    }));
  };

  const progress = (Object.keys(responses).length / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitDialog(false);
    setShowDeterminationDialog(true);
  };

  const handleFinalSubmit = () => {
    if (determinationType === 'extend-offer') {
      setShowDeterminationDialog(false);
      setShowSuccessDialog(true);
    } else if (['deny-offer', 'revoke-offer'].includes(determinationType)) {
      setShowDeterminationDialog(false);
      setShowNoticeDialog(true);
    } else {
      router.push("/");
    }
  };

  const handleSendNotice = () => {
    setShowNoticeDialog(false);
    setShowFinalDialog(true);
  };

  const handleShareResults = () => {
    setShowSuccessDialog(false);
    setShowFinalDialog(true);
  };

  const handleReview = () => {
    setIsReviewing(true);
  };

  const handleEditQuestion = (questionId: number) => {
    setCurrentQuestion(questionId - 1);
    setIsReviewing(false);
  };

  const handleWorkdaySolutions = () => {
    window.open('https://marketplace.workday.com/en-US/pages/partner-profile?vendor=6f0bc3ee-3c5e-4241-8861-104cabc8278f#about', '_blank');
  };

  const handlePartnerConnect = () => {
    window.open('https://www.morethanourworst.com/', '_blank');
  };

  const currentResponse = responses[questions[currentQuestion].id] || { rating: '', comment: '' };
  const legalIntelligence = getLegalIntelligence(questions[currentQuestion].id);

  const QuestionNav = () => (
    <div className="w-64 h-screen fixed left-0 top-0 bg-card border-r border-border p-4">
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Assessment Progress</h3>
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-muted-foreground">
          {Object.keys(responses).length} of {questions.length} questions completed
        </p>
      </div>
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="space-y-2">
          {questions.map((q, index) => {
            const isAnswered = !!responses[q.id]?.rating;
            const isCurrent = currentQuestion === index;
            
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors",
                  isCurrent && "bg-primary/10 text-primary",
                  !isCurrent && "hover:bg-primary/5"
                )}
              >
                <span className="flex-shrink-0">
                  {isAnswered ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                </span>
                <div className="truncate">
                  <span className="font-medium">{q.title}</span>
                  <span className="text-xs text-muted-foreground ml-1">({index + 1}/{questions.length})</span>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );

  if (!evaluatorInfo) {
    return null;
  }

  const mainContent = (
    <Card className="h-full border-0 rounded-none">
      <CardHeader>
        <CardTitle>Fair Chance Employment Assessment</CardTitle>
        <CardDescription>
          Evaluate potential based on growth, recovery, and professional development under RIGL § 28-5.1-14(g)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div key={questions[currentQuestion].id} className="space-y-4">
            <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
            <p className="text-sm text-muted-foreground">{questions[currentQuestion].description}</p>
            
            <RadioGroup
              value={currentResponse.rating}
              onValueChange={handleResponse}
              className="grid gap-4"
            >
              {likertOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`q${questions[currentQuestion].id}-${option.value}`} />
                  <Label htmlFor={`q${questions[currentQuestion].id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="comments">Supporting Evidence & Notes</Label>
              <Textarea
                id="comments"
                placeholder="Document specific examples, evidence, or observations that support your evaluation..."
                value={currentResponse.comment}
                onChange={(e) => handleComment(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleReview}>
                Review Responses
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next Question
              </Button>
            )}
          </div>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h4 className="font-medium">{legalIntelligence.title}</h4>
            </div>
            <div className="text-sm text-muted-foreground whitespace-pre-line">
              {legalIntelligence.content}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <QuestionNav />
      <div className="pl-64">
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full p-4">
              <Card className="h-full overflow-hidden">
                <div className="p-4 border-b">
                  <Label htmlFor="pdf-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Upload Candidate Response</span>
                    </div>
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </Label>
                </div>
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1`}
                  className="w-full h-[calc(100%-60px)] border-0"
                  title="Background Check PDF"
                />
              </Card>
            </div>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full">
              {isReviewing ? (
                <div className="p-4">
                  <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                      <CardTitle>Review Assessment</CardTitle>
                      <CardDescription>
                        Please review your responses before proceeding.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-8">
                          {questions.map((q, index) => {
                            const response = responses[q.id];
                            return (
                              <div key={q.id} className="border-b border-border pb-6 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="text-lg font-medium">{q.title}</h3>
                                    <p className="text-sm text-muted-foreground">Question {index + 1}</p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditQuestion(q.id)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <p className="mb-4">{q.question}</p>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm text-muted-foreground">Rating</Label>
                                    <p className="font-medium">
                                      {likertOptions.find(opt => opt.value === response?.rating)?.label || 'Not answered'}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm text-muted-foreground">Comments</Label>
                                    <p className="font-medium">{response?.comment || 'No comments provided'}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                      
                      <div className="flex justify-between mt-6 pt-6 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setIsReviewing(false)}
                        >
                          Back to Assessment
                        </Button>
                        <Button onClick={() => setShowSubmitDialog(true)}>
                          Submit Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                mainContent
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Assessment Review</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to proceed with making your determination?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showDeterminationDialog} onOpenChange={setShowDeterminationDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Make Your Determination</DialogTitle>
            <DialogDescription>
              Rhode Island’s Fair Employment Practices Act was passed in order to address concerns of justice-involved and formerly incarcerated individuals being prevented from accessing employment due to their prior criminal record - RI Gen L § 28-5-7
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div>
              <Label htmlFor="determinationType">Determination Type</Label>
              <Select
                value={determinationType}
                onValueChange={setDeterminationType}
                required
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select determination type" />
                </SelectTrigger>
                <SelectContent>
                  {determinationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeterminationDialog(false)}
            >
              Back
            </Button>
            <Button
              onClick={handleFinalSubmit}
              disabled={!determinationType}
            >
              Submit Final Determination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNoticeDialog} onOpenChange={setShowNoticeDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Notice of Potential Adverse Action</DialogTitle>
            <DialogDescription>
              Before finalizing this decision, you must notify the candidate and provide an opportunity to respond.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="specificConvictions">Specific Conviction(s)</Label>
                <Textarea
                  id="specificConvictions"
                  value={specificConvictions}
                  onChange={(e) => setSpecificConvictions(e.target.value)}
                  placeholder="List the specific conviction(s) that form the basis for potential denial..."
                  className="mt-1.5"
                />
              </div>
              
              <div>
                <Label htmlFor="convictionRationale">Detailed Rationale</Label>
                <Textarea
                  id="convictionRationale"
                  value={convictionRationale}
                  onChange={(e) => setConvictionRationale(e.target.value)}
                  placeholder="Explain why these convictions are substantially related to the position..."
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="responseDeadline">Response Deadline (Business Days)</Label>
                <Input
                  id="responseDeadline"
                  type="number"
                  min={5}
                  max={30}
                  value={responseDeadlineDays}
                  onChange={(e) => setResponseDeadlineDays(parseInt(e.target.value))}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="colleagueEmail">Colleague's Email for Committee Review</Label>
                <Input
                  id="colleagueEmail"
                  type="email"
                  value={colleagueEmail}
                  onChange={(e) => setColleagueEmail(e.target.value)}
                  placeholder="Enter colleague's email for an additional review"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="candidateEmail">Candidate's Email</Label>
                <Input
                  id="candidateEmail"
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="Enter candidate's email"
                  className="mt-1.5"
                />
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm font-medium">The following will be included in the notice:</p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Copy of the background check report</li>
                  <li>Results of this individualized assessment</li>
                  <li>Instructions for providing evidence of mitigation/rehabilitation</li>
                  <li>Secure portal link for submitting response</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNoticeDialog(false)}
            >
              Back
            </Button>
            <Button
              onClick={handleSendNotice}
              disabled={!specificConvictions || !convictionRationale || !candidateEmail || !colleagueEmail}
            >
              Send for Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Share Assessment Results</DialogTitle>
            <DialogDescription>
              Share the assessment results with relevant stakeholders and teammates to collaborate.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="superiorEmail">Superior's Email</Label>
              <Input
                id="superiorEmail"
                type="email"
                value={superiorEmail}
                onChange={(e) => setSuperiorEmail(e.target.value)}
                placeholder="Enter your superior's email"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="colleagueEmail">Colleague's Email</Label>
              <Input
                id="colleagueEmail"
                type="email"
                value={colleagueEmail}
                onChange={(e) => setColleagueEmail(e.target.value)}
                placeholder="Enter colleague's email"
                className="mt-1.5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuccessDialog(false)}
            >
              Back
            </Button>
            <Button
              onClick={handleShareResults}
              disabled={!superiorEmail || !colleagueEmail}
            >
              Share Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFinalDialog} onOpenChange={setShowFinalDialog}>
        <DialogContent className="sm:max-w-[800px] min-h-[600px] flex flex-col">
          <DialogHeader className="pb-8">
            <DialogTitle className="text-2xl mb-2">Assessment Complete</DialogTitle>
            <DialogDescription className="text-lg">
              Your assessment has been submitted successfully. Choose your next steps:
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 py-8">
            <div className="grid gap-6">
              <Button
                variant="outline"
                className="w-full justify-start gap-4 p-8 text-lg hover:bg-secondary/10"
                onClick={handlePartnerConnect}
              >
                <Handshake className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Connect with a Rhode Island Fair Chance Hiring Partner</div>
                  <div className="text-sm text-muted-foreground">Get expert guidance and support for fair chance hiring</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-4 p-8 text-lg hover:bg-secondary/10"
                onClick={handleWorkdaySolutions}
              >
                <Building2 className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">See more Solutions on Workday</div>
                  <div className="text-sm text-muted-foreground">Explore additional hiring and compliance tools</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-4 p-8 text-lg hover:bg-secondary/10"
                onClick={() => {/* Join ALPHA */}}
              >
                <Users className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <div className="font-semibold">Join our ALPHA program</div>
                  <div className="text-sm text-muted-foreground">Be part of shaping the future of fair chance hiring</div>
                </div>
              </Button>
            </div>
          </div>
          <DialogFooter className="pt-8 border-t">
            <Button
              className="w-full p-6 text-lg"
              onClick={() => router.push("/")}
            >
              Return to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}