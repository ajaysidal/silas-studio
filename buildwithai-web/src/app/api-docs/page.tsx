import Link from 'next/link';

export const metadata = {
  title: 'API Documentation — Build With AI',
  description: 'Developer documentation and API reference.',
};

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            API Documentation
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Full developer documentation is available at our docs portal.
          </p>
          <Link
            href="/docs"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Documentation
          </Link>
        </div>
      </section>
    </main>
  );
}
