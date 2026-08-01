export function Blog() {
  const posts = [
    {
      title: "Building an Offline-First POS System with IndexedDB",
      date: "July 2026",
      excerpt: "A deep dive into architecting a robust synchronization queue for a local-first web application.",
      link: "#"
    },
    {
      title: "Implementing Row-Level Security in Supabase",
      date: "June 2026",
      excerpt: "Best practices for securing multi-tenant applications and managing user access effectively.",
      link: "#"
    },
    {
      title: "Modernizing Legacy React Applications",
      date: "May 2026",
      excerpt: "Strategies for incrementally migrating to Next.js App Router and Tailwind CSS without downtime.",
      link: "#"
    }
  ];

  return (
    <section id="blog" className="scroll-mt-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#18181B] dark:text-[#F4F4F5] mb-2">
              Latest Thinking
            </h2>
            <div className="h-1 w-12 bg-blue-600 dark:bg-blue-500 rounded-full" />
          </div>
          <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
            View All &rarr;
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post, idx) => (
            <article 
              key={idx} 
              className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-6 bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#E4E4E7] dark:border-[#27272A] hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors shadow-sm"
            >
              <div className="sm:w-32 shrink-0 text-sm font-medium text-[#71717A] dark:text-[#A1A1AA] pt-1">
                {post.date}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-[#18181B] dark:text-[#F4F4F5] group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                  <a href={post.link} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </a>
                </h3>
                <p className="text-[#52525B] dark:text-[#A1A1AA] text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
