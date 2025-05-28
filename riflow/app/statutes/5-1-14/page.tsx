"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Statutes() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Title 28 - Labor and Labor Relations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <h2>Chapter 5.1 - Equal Opportunity and Affirmative Action</h2>
              <h3>§ 28-5.1-14. State licensing and regulatory agencies.</h3>
              <p>Each state licensing and regulatory agency shall:</p>
              <ol>
                <li>
                  Review all licensing and regulatory requirements to ensure that they do not discriminate against individuals with criminal records;
                </li>
                <li>
                  Develop and implement policies and procedures that provide for individualized assessments of applicants with criminal records;
                </li>
                <li>
                  Consider the following factors when evaluating an applicant with a criminal record:
                  <ol type="a">
                    <li>The nature and gravity of the offense;</li>
                    <li>The time that has passed since the offense;</li>
                    <li>The nature of the job or license sought;</li>
                    <li>Evidence of rehabilitation;</li>
                    <li>The relationship between the offense and the duties and responsibilities of the job or license;</li>
                    <li>Any other relevant factors.</li>
                  </ol>
                </li>
                <li>
                  Provide written notice to applicants of any denial of a license or permit based on a criminal record, including:
                  <ol type="a">
                    <li>The specific reason for the denial;</li>
                    <li>A copy of the criminal record used in the decision;</li>
                    <li>Information about the right to appeal;</li>
                    <li>Information about the process for correcting errors in the criminal record.</li>
                  </ol>
                </li>
                <li>
                  Maintain records of all licensing and regulatory decisions based on criminal records for a period of three (3) years;
                </li>
                <li>
                  Submit an annual report to the state equal opportunity office detailing:
                  <ol type="a">
                    <li>The number of applications received from individuals with criminal records;</li>
                    <li>The number of applications denied based on criminal records;</li>
                    <li>The reasons for denials;</li>
                    <li>The number of appeals filed and their outcomes.</li>
                  </ol>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 