import { useEffect } from "react";

export function TermsOfUsePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 lg:pt-40 pb-20 container-wide max-w-4xl mx-auto text-text-primary">
      <h1 className="font-display text-4xl font-semibold mb-2">Terms of Use</h1>
      <p className="text-text-muted mb-12">Last updated: April 2026</p>

      <div className="space-y-10 text-[1.05rem] leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Acceptance of Terms</h2>
          <p>By accessing or using the Cresco Prime platform, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Eligibility</h2>
          <p>You must be at least 18 years of age to use our platform. By using Cresco Prime, you represent that you are of legal age and have the legal capacity to enter into a binding agreement.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Trading Risk Disclaimer</h2>
          <p>Trading in financial markets involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Cresco Prime provides trading infrastructure and education — all trading decisions are made by the trader and at the trader's own risk.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Platform Usage</h2>
          <p>You agree to use the platform only for lawful purposes and in accordance with applicable financial regulations. Unauthorized access, misuse, or fraudulent activity will result in immediate account termination and may be reported to relevant authorities.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Intellectual Property</h2>
          <p>All content, branding, and technology on the Cresco Prime platform is the property of Cresco Prime and protected by applicable intellectual property laws. You may not reproduce or distribute any content without written permission.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Limitation of Liability</h2>
          <p>Cresco Prime shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our liability is limited to the maximum extent permitted by applicable law.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:hr@crescoprime.com" className="text-gold hover:underline">hr@crescoprime.com</a>.</p>
        </section>
      </div>
    </main>
  );
}
