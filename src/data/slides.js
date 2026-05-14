export const slides = [
  {
    id: 'intro',
    label: 'Intro',
    sidebar: {
      type: 'intro',
      name: 'Paul Davis',
      nameSubtitle: 'Product Designer',
      body: "Howdy, I'm a product designer with 6+ years of experience in B2B SaaS companies, and over a decade in design broadly. I currently build really cool stuff at Mighty Networks, and am hoping to continue building really cool stuff for the dedicated clients of RealWork.",
      cardLabel: 'Things I love:',
      cardStyle: 'tag',
      cards: [
        'Cooking & eating delicious foods',
        'Climbing mountains (or just big hills)',
        'Horror movies',
        'Hot, black coffee',
        'The smell of fresh sawdust',
        'Finding a cool bug (outside of my home)',
        'Swimming in cold water',
        'Waking up early',
        'Miniature golf',
        'My precious cat Bernie',
        'My wonderful dog Dave',
        'And plenty more...',
      ],
    },
    content: 'bento',
    contentProps: {
      images: [
        { src: '/images/profile/photo-1.jpg' },
        { src: '/images/profile/photo-2.jpg' },
        { src: '/images/profile/photo-3.jpg' },
        { src: '/images/profile/photo-4.jpg' },
        { src: '/images/profile/photo-5.jpg' },
        { src: '/images/profile/photo-6.jpg' },
        { src: '/images/profile/photo-7.jpg' },
        { src: '/images/profile/photo-8.jpg' },
        { src: '/images/profile/photo-9.jpg' },
        { src: '/images/profile/photo-10.jpg' },
        { src: '/images/profile/photo-11.jpg' },
        { src: '/images/profile/photo-12.jpg' },
        { src: '/images/profile/photo-13.jpg' },
        { src: '/images/profile/photo-14.jpg' },
        { src: '/images/profile/photo-15.jpg' },
        { src: '/images/profile/photo-16.jpg' },
        { src: '/images/profile/photo-17.jpg' },
        { src: '/images/profile/photo-18.jpg' },
        { src: '/images/profile/photo-19.jpg' },
        { src: '/images/profile/photo-20.jpg' },
        { src: '/images/profile/photo-21.jpg' },
        { src: '/images/profile/photo-22.jpg' },
        { src: '/images/profile/photo-23.jpg' },
        { src: '/images/profile/photo-24.jpg' },
        { src: '/images/profile/photo-25.jpg' },
        { src: '/images/profile/photo-26.jpg' },
        { src: '/images/profile/photo-27.jpg' },
        { src: '/images/profile/photo-28.jpg' },
        { src: '/images/profile/photo-29.jpg' },
        { src: '/images/profile/photo-30.jpg' },
        { src: '/images/profile/photo-31.jpg' },
        { src: '/images/profile/photo-32.jpg' },
        { src: '/images/profile/photo-33.jpg' },
      ],
    },
  },
  {
    id: 'overview',
    label: 'My Work',
    sidebar: {
      type: 'simple',
      label: 'My Work',
      title: 'A selection of recent projects.',
      body: 'This is a selection of work from the last three years. Each one is an example of how I flex different design muscles, but they\’re all connected via a common theme: Taking complex problems and making them feel simple for the people using them.',
      cardLabel: 'Common threads:',
      cardStyle: 'tag',
      cards: [
        'Advocating for the right solution, even when it\'s more difficult',
        'Research that drives measurable outcomes',
        'Designing for complexity without adding complexity',
        'Shipping across platforms and paradigms',
      ],
    },
    content: 'overview',
    contentProps: {
      projects: [
        {
          id: 'boi',
          title: 'BOI Filing Tool',
          meta: '01 · ZenBusiness · 2023',
          highlights: [
            {
              label: 'Design leadership',
              body: 'Advocated for a wizard flow over product leadership\'s preferred approach',
            },
            {
              label: 'Cross-team execution',
              body: 'Partnered across squads to accelerate a new backend system for user journeys',
            },
            {
              label: 'Monumental results',
              body: 'Multi-step filing with progressive disclosure and edge case handling',
            },
          ],
        },
        {
          id: 'nav',
          title: 'Navigation Redesign',
          meta: '02 · ZenBusiness · 2022',
          highlights: [
            {
              label: 'Optimization foundation',
              body: 'A/B testing work that surfaced a deeper navigation problem',
            },
            {
              label: 'Research-driven process',
              body: 'Card sorts, tree tests, and prototype testing with 20+ users',
            },
            {
              label: 'Adaptable delivery',
              body: 'Final implementation diverged from spec — and that was OK',
            },
          ],
        },
        {
          id: 'cohost',
          title: 'Cohost AI',
          meta: '03 · Mighty Networks · 2025–2026',
          highlights: [
            {
              label: 'Concept to code',
              body: 'Prototyping and implementing with Claude Code (with help from the team!)',
            },
            {
              label: 'Agent UX research',
              body: 'Defining what "agentic" means for the product: interaction patterns, trust design',
            },
            {
              label: 'Active and shipping',
              body: 'In development right now at Mighty Networks — the most current example of how I work.',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'boi',
    label: 'BOI Filing Tool',
    sidebar: {
      type: 'project',
      thumbnail: '/images/boi/thumb.jpg',
      label: '01 · ZenBusiness · 2023',
      title: 'BOI Filing Tool',
      role: 'Sole Designer · Formations & Compliance',
      body: 'Turned a painful federal filing requirement into a 20-minute guided experience using progressive disclosure and contextual help.',
      cardLabel: 'Outcomes:',
      cardStyle: 'outcome',
      cards: [
        { metric: '1hr → 20min', label: 'Filing time' },
        { metric: '$500K', label: 'Revenue in first 3 months' },
      ],
    },
    content: 'carousel',
    contentProps: {
      images: [
        {
          title: 'Wizard Entry',
          images: [{ src: '/images/boi/screen-1.jpg', caption: 'Contextual intro with autofill from existing account data' }],
        },
        {
          title: 'The Government Portal',
          images: [{ src: '/images/boi/screen-2.webm', type: 'video', caption: 'The FinCEN .gov experience that users were bouncing between, and why it wasn\'t ideal.' }],
        },
        {
          title: 'Leadership\'s First Idea',
          images: [{ src: '/images/boi/screen-3.jpg', caption: 'The original long-form approach. Fast to build, but a wall of empty fields for non-ZB users.' }],
        },
        {
          title: 'Cross-Team Partnership',
          images: [{ src: '/images/boi/screen-4.jpg', caption: 'Partnering with the Funnel team to pull their User Journey backend forward.' }],
        },
        {
          title: 'Validating + Refining the Wizard',
          images: [
            { src: '/images/boi/screen-5.jpg', caption: 'Mid-fi prototypes tested with users, and the refined flow.' },
            { src: '/images/boi/screen-6.jpg', caption: 'Mid-fi prototypes tested with users, and the refined flow.' },
            { src: '/images/boi/screen-7.jpg', caption: 'Mid-fi prototypes tested with users, and the refined flow.' },
            { src: '/images/boi/screen-8.jpg', caption: 'Mid-fi prototypes tested with users, and the refined flow.' },
            { src: '/images/boi/screen-9.jpg', caption: 'Mid-fi prototypes tested with users, and the refined flow.' },
          ],
        },
        {
          title: 'The Edge Cases',
          images: [
            { src: '/images/boi/screen-10.jpg', caption: 'Where engineering was invaluable. Tax IDs, out-of-state formations, and the combinations I didn\'t foresee.' },
            { src: '/images/boi/screen-11.jpg', caption: 'Where engineering was invaluable. Tax IDs, out-of-state formations, and the combinations I didn\'t foresee.' },  
            
          ],
        },
        {
          title: 'Dashboard & Purchase Flow',
          images: [
            { src: '/images/boi/screen-12.jpg', caption: 'The full product surface beyond the wizard. Compliance status, WFC upsell, and standalone purchase paths.' },
            { src: '/images/boi/screen-13.jpg', caption: 'The full product surface beyond the wizard. Compliance status, WFC upsell, and standalone purchase paths.' },
            { src: '/images/boi/screen-14.jpg', caption: 'The full product surface beyond the wizard. Compliance status, WFC upsell, and standalone purchase paths.' },
            { src: '/images/boi/screen-15.jpg', caption: 'The full product surface beyond the wizard. Compliance status, WFC upsell, and standalone purchase paths.' },
          ],
        },
        {
          title: 'Complete Success!',
          images: [{ src: '/images/boi/screen-16.jpg', caption: 'Increased WFC take rate, massive EOY revenue spike, reduced filing time.' }],
        },
      ],
    },
  },
  {
    id: 'nav',
    label: 'Navigation Redesign',
    sidebar: {
      type: 'project',
      thumbnail: '/images/nav/thumb.jpg',
      label: '02 · ZenBusiness · 2022–2023',
      title: 'Navigation Redesign',
      role: 'Lead Designer · Marketing Site',
      body: 'Research-driven IA overhaul using card sorting, tree testing, and prototype testing with 20+ users.',
      cardLabel: 'Outcomes:',
      cardStyle: 'outcome',
      cards: [
        { metric: '24.5%', label: 'CVR increase from product pages' },
        { metric: '44%', label: 'Reduction in nav-related support calls' },
        { metric: '85%', label: 'CTR increase' },
      ],
    },
    content: 'carousel',
    contentProps: {
      images: [
        {
          title: 'Optimization Work',
          images: [{ src: '/images/nav/screen-2.jpg', caption: 'A/B testing variants on the marketing site — the work that surfaced the deeper navigation problem.' }],
        },
        {
          title: 'Competitive Inspiration',
          images: [
            { src: '/images/nav/screen-3.jpg', caption: 'Megamenu patterns from across the web — the spark that made me look hard at our own nav.' },
            { src: '/images/nav/screen-4.jpg', caption: 'Megamenu patterns from across the web — the spark that made me look hard at our own nav.' },
            { src: '/images/nav/screen-5.jpg', caption: 'Megamenu patterns from across the web — the spark that made me look hard at our own nav.' },
            { src: '/images/nav/screen-6.jpg', caption: 'Megamenu patterns from across the web — the spark that made me look hard at our own nav.' },
          ],
        },
        {
          title: 'Room for Improvement',
          images: [{ src: '/images/nav/CS1_OldNav.webm', type: 'video', caption: 'The existing navigation in action — hover-hidden links and a taxonomy built for 2020 SEO, not users.' }],
        },
        {
          title: 'Data!',
          images: [
            { src: '/images/nav/screen-7.jpg', caption: 'Heatmaps and analytics that proved it — highest-converting pages buried, users clicking "Contact Us" instead.' },
            { src: '/images/nav/screen-8.jpg', caption: 'Heatmaps and analytics that proved it — highest-converting pages buried, users clicking "Contact Us" instead.' },
            { src: '/images/nav/screen-9.jpg', caption: 'Heatmaps and analytics that proved it — highest-converting pages buried, users clicking "Contact Us" instead.' },
            { src: '/images/nav/screen-10.jpg', caption: 'Heatmaps and analytics that proved it — highest-converting pages buried, users clicking "Contact Us" instead.' },

          ],
        },
        {
          title: 'The Business Case',
          images: [
            { src: '/images/nav/screen-11.jpg', caption: 'The pitch to leadership — engagement, bounce rates, accessibility, and visual credibility.' },
            { src: '/images/nav/screen-12.jpg', caption: 'The pitch to leadership — engagement, bounce rates, accessibility, and visual credibility.' },
            { src: '/images/nav/screen-13.jpg', caption: 'The pitch to leadership — engagement, bounce rates, accessibility, and visual credibility.' },

          ],
        },
        {
          title: 'Restructuring the IA',
          images: [
            { src: '/images/nav/screen-14.jpg', caption: 'New taxonomic structures based on page type and hierarchy — organizing around user intent, not SEO.' },
            { src: '/images/nav/screen-15.jpg', caption: 'New taxonomic structures based on page type and hierarchy — organizing around user intent, not SEO.' },
            { src: '/images/nav/screen-16.jpg', caption: 'New taxonomic structures based on page type and hierarchy — organizing around user intent, not SEO.' },

          ],
        },
        {
          title: 'Three Directions',
          images: [
            { src: '/images/nav/screen-17.jpg', caption: 'Cards, megamenu, and megamenu with featured links — all three tested against the original with 20 users.' },
            { src: '/images/nav/screen-18.jpg', caption: 'Cards, megamenu, and megamenu with featured links — all three tested against the original with 20 users.' },
            { src: '/images/nav/screen-19.jpg', caption: 'Cards, megamenu, and megamenu with featured links — all three tested against the original with 20 users.' },

          ],
        },
        {
          title: 'Validating the Taxonomy',
          images: [
            { src: '/images/nav/screen-20.jpg', caption: 'Open and closed card sorting plus tree testing — task time from 40 seconds down to 20.' },
            { src: '/images/nav/screen-21.jpg', caption: 'Open and closed card sorting plus tree testing — task time from 40 seconds down to 20.' },
            { src: '/images/nav/screen-22.jpg', caption: 'Open and closed card sorting plus tree testing — task time from 40 seconds down to 20.' },
            { src: '/images/nav/screen-23.jpg', caption: 'Open and closed card sorting plus tree testing — task time from 40 seconds down to 20.' },
          ],
        },
        {
          title: 'Expectations VS Reality',
          images: [
            { src: '/images/nav/screen-24.webm', type: 'video', caption: 'The shipped megamenu — 24.5% CVR increase, 85% CTR increase, and what changed after I left.' },
            { src: '/images/nav/screen-xx.webm', type: 'video', caption: 'The shipped megamenu — 24.5% CVR increase, 85% CTR increase, and what changed after I left.' },
          ],
        },
      ],
    },
  },
  {
    id: 'cohost',
    label: 'Cohost AI',
    sidebar: {
      type: 'project',
      thumbnail: '/images/cohost/thumb.jpg',
      label: '03 · Mighty Networks · 2026',
      title: 'Cohost AI',
      role: 'Sole Designer · Core Squad',
      body: 'Evolving an AI chatbot into a trusted agentic system with a defined component vocabulary for AI communication patterns.',
      cardLabel: 'Outcomes:',
      cardStyle: 'outcome',
      cards: [
        { metric: 'Agentic', label: 'Evolved from chatbot to agent model' },
        { metric: 'Provider-agnostic', label: 'Context architecture' },
      ],
    },
    content: 'carousel',
    contentProps: {
      images: [
        {
          title: 'What is Cohost?',
          images: [
            { src: '/images/cohost/screen-1.webm', type: 'video', caption: 'The chatbot as it existed — Help Center links, upsells, and Intercom handoffs inside Space Chat.' },
            { src: '/images/cohost/screen-2.jpg', caption: 'The chatbot as it existed — Help Center links, upsells, and Intercom handoffs inside Space Chat.' },
            { src: '/images/cohost/screen-3.jpg', caption: 'The chatbot as it existed — Help Center links, upsells, and Intercom handoffs inside Space Chat.' },
          ],
        },
        {
          title: 'The Panel',
          images: [
            { src: '/images/cohost/screen-4.jpg', caption: 'Competitive research (Claude, Notion, Amazon, Jira) and the dedicated side panel with proper threading.' },
            { src: '/images/cohost/screen-5.jpg', caption: 'Competitive research (Claude, Notion, Amazon, Jira) and the dedicated side panel with proper threading.' },
            { src: '/images/cohost/screen-6.jpg', caption: 'Competitive research (Claude, Notion, Amazon, Jira) and the dedicated side panel with proper threading.' },
          ],
        },
        {
          title: 'The Threading Problem',
          images: [
            { src: '/images/cohost/screen-7.webm', type: 'video', caption: 'One long thread with Slack-style reply chains — why the Space Chat model broke for an agent.' },
            { src: '/images/cohost/screen-8.jpg', caption: 'One long thread with Slack-style reply chains — why the Space Chat model broke for an agent.' },
            { src: '/images/cohost/screen-9.jpg', caption: 'One long thread with Slack-style reply chains — why the Space Chat model broke for an agent.' },
            { src: '/images/cohost/screen-10.jpg', caption: 'One long thread with Slack-style reply chains — why the Space Chat model broke for an agent.' },
            { src: '/images/cohost/screen-11.jpg', caption: 'One long thread with Slack-style reply chains — why the Space Chat model broke for an agent.' },
            { src: '/images/cohost/screen-12.webm', type: 'video', caption: 'One long thread with Slack-style reply chains — why the Space Chat model broke for an agent.' },
          ],
        },
        {
          title: 'What Makes Cohost Agentic?',
          images: [
            { src: '/images/cohost/screen-13.jpg', caption: 'Goal oriented, able to take action, make plans, and has persistent context/memory.' },
            { src: '/images/cohost/screen-14.jpg', caption: 'Goal oriented, able to take action, make plans, and has persistent context/memory.' },
            { src: '/images/cohost/screen-15.jpg', caption: 'Goal oriented, able to take action, make plans, and has persistent context/memory.' },
          ],
        },
        {
          title: 'The Feature System + How It Works',
          images: [
            { src: '/images/cohost/screen-16.jpg', caption: '5 categories, 28 features — how components interact in a real host task from prompt to output.' },
            { src: '/images/cohost/screen-17.jpg', caption: '5 categories, 28 features — how components interact in a real host task from prompt to output.' },
            { src: '/images/cohost/screen-18.jpg', caption: '5 categories, 28 features — how components interact in a real host task from prompt to output.' },
            { src: '/images/cohost/screen-19.jpg', caption: '5 categories, 28 features — how components interact in a real host task from prompt to output.' },
            { src: '/images/cohost/screen-20.jpg', caption: '5 categories, 28 features — how components interact in a real host task from prompt to output.' },
            { src: '/images/cohost/screen-21.webm', type: 'video', caption: '5 categories, 28 features — how components interact in a real host task from prompt to output.' },

          ],
        },
        {
          title: 'Where We Are Now',
          images: [{ src: '/images/cohost/screen-22.webm', type: 'video', caption: 'Live capabilities — plans, spaces, courses, network suggestions, and the guiderail onboarding focus.' }],
        },
      ],
    },
  },
  {
    id: 'questions',
    label: 'Thank You',
    sidebar: {
      type: 'end',
      title: 'Thank you!',
      body: "I'd be happy to go deeper on any of these projects, or talk through how I'd approach what's on RealWork's plate.",
      cardLabel: 'Find me at:',
      cardStyle: 'tag',
      cards: [
        '@shutuppaul on IG (but I don\'t post often)',
        '361-649-2877',
        'pauldavisdesigns@gmail.com',
        'pauldavisdesigns.com',
        'Relocating to Austin, TX — end of May',
      ],
    },
    content: 'questions',
    contentProps: {
      questions: [
        {
          q: 'How do field technicians actually interact with the product on the job?',
          d: 'Gloves, phone mounts, sunlight — the physical context of mobile-first service software is really different from a desk tool.',
        },
        {
          q: 'Where does the current design system have the most gaps?',
          d: 'I want to understand what\'s been established and where there\'s debt — so I know where to build versus where to fill.',
        },
        {
          q: 'How does AI factor into the product roadmap?',
          d: 'Scheduling, dispatch, customer communication — these feel like places where AI could create real leverage. What\'s the current thinking?',
        },
        {
          q: 'What\'s the biggest workflow friction point customers report today?',
          d: 'I\'d love to understand what\'s coming in through support before I start forming any opinions about where to focus.',
        },
        {
          q: 'How does design collaborate with customer success and field operations?',
          d: 'The people closest to customers have the best signal. I want to know how that flow of insight works here.',
        },
        {
          q: 'What does a great first 90 days look like for this role?',
          d: 'I like knowing how success is measured early — so I can orient fast and make sure I\'m solving the right problems.',
        },
      ],
    },
  },
];
