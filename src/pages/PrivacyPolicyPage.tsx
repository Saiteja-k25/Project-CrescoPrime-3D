import { useEffect } from "react";

export function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 lg:pt-40 pb-20 container-wide max-w-4xl mx-auto text-text-primary">
      <h1 className="font-display text-4xl font-semibold mb-2">Privacy Policy</h1>
      <p className="text-text-muted mb-12">Last updated: April 2026</p>

      <div className="space-y-10 text-[1.05rem] leading-relaxed text-text-secondary">
        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Information We Collect</h2>
          <p>We collect information you provide directly when you create an account, including your name, email address, and usage data. We also collect technical information such as IP address, browser type, and pages visited to improve our services.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">How We Use Your Information</h2>
          <p>Your information is used to provide and improve our trading platform, process transactions, send important account notifications, and ensure platform security. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest. Access to personal data is restricted to authorized personnel only.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Cookies</h2>
          <p>We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how the platform is used. You can manage cookie preferences through your browser settings.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Your Rights</h2>
          <p>You have the right to access, update, or delete your personal data at any time. To exercise these rights, contact us at hr@crescoprime.com. We will respond to all requests within 30 days.</p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-text-primary mb-4">Contact</h2>
          <p>For privacy-related questions, contact Cresco Prime at <a href="mailto:hr@crescoprime.com" className="text-gold hover:underline">hr@crescoprime.com</a> or write to us at NK Avenue, Safari Nagar, Kondapur, Hyderabad 500084.</p>
        </section>
      </div>
    </main>
  );
}
