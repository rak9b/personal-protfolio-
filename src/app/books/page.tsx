"use client";
import Reveal from "@/components/ui/Reveal";
import { books, stats } from "@/lib/siteConfig";

export default function BooksPage() {
  return (
    <main>
      <header className="page-hero">
        <Reveal><p className="page-hero-eyebrow">{stats.books} books \u00b7 counting</p></Reveal>
        <Reveal delay={0.1}><h1 className="page-hero-title">Archives</h1></Reveal>
        <Reveal delay={0.2}><p className="page-hero-sub">I read to argue, not to agree. These are the books that left a mark.</p></Reveal>
      </header>
      <section className="container section-pad">
        {books.map((b, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="book-card">
              <img src={b.cover} alt={b.title} className="book-cover" loading="lazy" />
              <div className="book-body">
                <h3 className="book-title">{b.title}</h3>
                <p className="book-author">{b.author}</p>
                <p className="book-note">{b.note}</p>
                <p className="book-stars">{b.stars}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  );
}
