import FAQItem from "@/components/FaqItem";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
// Replace your FAQ section with this:
const faqData = [
  {
    question: "How does it work?",
    answer:
      "Just click create, add your twist of humor, and watch your resolution transform into something worth sharing!",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes! Creating and sharing funny resolutions is completely free. We believe laughter should be accessible to everyone.",
  },
  {
    question: "Can I modify my resolution later?",
    answer:
      "Absolutely! You can edit your resolutions anytime. Life changes, and so can your hilarious goals.",
  },
  {
    question: "What makes a good funny resolution?",
    answer:
      "The best funny resolutions are those that combine real goals with unexpected twists. Think 'Get fit by only exercising while binge-watching Netflix.'",
  },
];
export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center max-w-4xl mx-auto px-4">
          <p className="md:text-lg text-white w-fit mx-auto px-6 py-2 rounded-full mb-6 bg-gradient-to-r from-rose-400 to-orange-300 animate-pulse">
            Making New Year's Resolutions Fun Again
          </p>
          <h1 className="text-3xl md:text-7xl font-bold text-secondary mb-8 leading-tight">
            Turn Your Goals Into <br />
            Epic Adventures
          </h1>
          <p className="text-gray-600 mb-8 text-lg md:text-xl max-w-2xl mx-auto">
            Tired of the same old resolutions? Let AI help you craft witty,
            memorable goals that you'll actually enjoy pursuing.
          </p>
          <Link
            href="/create"
            className="bg-white text-white font-medium py-3 px-8 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-transform"
          >
            Transform Your Goals
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Why Choose Funny Resolutions?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">😂</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Fun Over Perfectionism</h3>
              <p className="text-gray-600">
                Why stress when you can laugh? Make resolutions that bring joy
                instead of pressure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Creativity</h3>
              <p className="text-gray-600">
                Let our AI transform your goals into clever, memorable
                resolutions that spark motivation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Track With Joy</h3>
              <p className="text-gray-600">
                Watch your progress in style. Celebrate small wins and keep the
                momentum going.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make 2024 Hilariously Different?
          </h2>
          <p className="text-white text-lg mb-8">
            Join thousands of others who've turned their resolutions into
            adventures
          </p>
          <Link
            href="/create"
            className="bg-white text-secondary font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition-colors inline-block"
          >
            Start Creating Now
          </Link>
        </div>
      </section>
    </main>
  );
}
