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
              <h2>Chapter 5 - Fair Employment Practices</h2>
              <h3>§ 28-5-7. Unlawful employment practices.</h3>
              <p>It shall be an unlawful employment practice:</p>
              <ol>
                <li>
                  For any employer:
                  <ol type="i">
                    <li>To refuse to hire any applicant for employment because of his or her race or color, religion, sex, sexual orientation, gender identity or expression, disability, age, or country of ancestral origin;</li>
                    <li>Because of those reasons, to discharge an employee or discriminate against him or her with respect to hire, tenure, compensation, terms, conditions or privileges of employment, or any other matter directly or indirectly related to employment;</li>
                    <li>In the recruiting of individuals for employment or in hiring them, to utilize any employment agency, placement service, training school or center, labor organization, or any other employee referring source that the employer knows, or has reasonable cause to know, discriminates against individuals because of their race or color, religion, sex, sexual orientation, gender identity or expression, disability, age, or country of ancestral origin;</li>
                    <li>To refuse to reasonably accommodate an employee's or prospective employee's disability unless the employer can demonstrate that the accommodation would pose a hardship on the employer's program, enterprise, or business;</li>
                  </ol>
                </li>
                <li>
                  For any employment agency to fail or refuse to properly classify or refer for employment or otherwise discriminate against any individual because of his or her race or color, religion, sex, sexual orientation, gender identity or expression, disability, age, or country of ancestral origin;
                </li>
                <li>
                  For any labor organization to deny full and equal membership rights to any applicant for membership because of his or her race or color, religion, sex, sexual orientation, gender identity or expression, disability, age, or country of ancestral origin;
                </li>
                <li>
                  For any employer to include on any application for employment, except applications for law enforcement agency positions or positions related to law enforcement agencies, a question inquiring or to otherwise inquire either orally or in writing whether the applicant has ever been arrested, charged with or convicted of any crime;
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 