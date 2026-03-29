/**
 * elbanby.com — lang.js
 * Flat key-value bilingual translation system (EN / AR).
 * Usage in HTML: <span data-i18n="key"></span>
 *               <input data-i18n-placeholder="key">
 *               <button data-i18n-aria-label="key">
 *               <img data-i18n-title="key">
 * JS usage: __(key) returns translated string.
 */

(function () {
  'use strict';

  /* ── Translation Dictionaries ──────────────────────────── */
  const translations = {
    en: {
      /* ── Navigation ──────────────────────────────────── */
      'nav.home':          'Home',
      'nav.about':         'About',
      'nav.services':      'Services',
      'nav.portfolio':     'Portfolio',
      'nav.team':          'Team',
      'nav.testimonials':  'Testimonials',
      'nav.faq':           'FAQ',
      'nav.contact':       'Contact',
      'nav.start_project': 'Start a Project',

      /* ── Hero ─────────────────────────────────────────── */
      'hero.eyebrow':      'Software Company',
      'hero.title_1':      'We Build Software',
      'hero.title_2':      'That Works.',
      'hero.desc':         'elbanby.com is a software company that turns your ideas into powerful web apps, mobile applications, and digital solutions — built to last.',
      'hero.cta_primary':  'Start Your Project',
      'hero.cta_outline':  'See Our Work',

      /* ── Why Elbanby ──────────────────────────────────── */
      'why.label':         'Why choose us',
      'why.title':         'Why <span>Elbanby</span>?',
      'why.desc':          'We combine technical excellence with reliable delivery to help businesses grow through great software.',
      'why.card1.title':   'Fast Delivery',
      'why.card1.desc':    'We work in focused sprints with clear milestones. No endless delays — you get results on time.',
      'why.card2.title':   'Quality Code',
      'why.card2.desc':    'Clean architecture, best practices, and thorough testing ensure your software is built to scale.',
      'why.card3.title':   'Long-term Support',
      'why.card3.desc':    "We don't disappear after launch. We maintain, update, and improve your product as you grow.",
      'why.card4.title':   'Transparent Process',
      'why.card4.desc':    'You always know what we\'re building and why. Clear communication every step of the way.',

      /* ── Stats ────────────────────────────────────────── */
      'stats.projects':    'Projects Delivered',
      'stats.clients':     'Happy Clients',
      'stats.technologies':'Technologies',
      'stats.years':       'Years of Experience',

      /* ── Services ─────────────────────────────────────── */
      'services.label':           'What we do',
      'services.title':           'Our <span>Services</span>',
      'services.desc':            'From concept to deployment — we cover the full software development lifecycle.',
      'services.web.title':       'Web Development',
      'services.web.desc':        'Modern, responsive web applications built with proven technologies and best practices.',
      'services.mobile.title':    'Mobile App Development',
      'services.mobile.desc':     'Native and cross-platform mobile apps for iOS and Android that users love.',
      'services.uiux.title':      'UI/UX Design',
      'services.uiux.desc':       'User-centered design that is intuitive, beautiful, and conversion-optimized.',
      'services.api.title':       'API & Backend Development',
      'services.api.desc':        'Scalable RESTful APIs, microservices, and robust server-side architecture.',
      'services.ecommerce.title': 'E-Commerce Solutions',
      'services.ecommerce.desc':  'Full-featured online stores with secure payments, inventory, and admin dashboards.',
      'services.desktop.title':   'Desktop Applications',
      'services.desktop.desc':    'Cross-platform desktop software for Windows, macOS, and Linux.',
      'services.cta':             'Explore All Services',

      /* ── Portfolio ────────────────────────────────────── */
      'portfolio.label':      'Our work',
      'portfolio.title':      'Featured <span>Projects</span>',
      'portfolio.desc':       'A selection of projects we\'ve delivered for clients across industries.',
      'portfolio.featured':   'Featured Project',
      'portfolio.view_study': 'View Case Study',
      'portfolio.live':       'Live Demo',
      'portfolio.github':     'GitHub',
      'portfolio.cta':        'See All Projects',
      'portfolio.filter.all':     'All',
      'portfolio.filter.web':     'Web',
      'portfolio.filter.mobile':  'Mobile',
      'portfolio.filter.uiux':    'UI/UX',
      'portfolio.filter.desktop': 'Desktop',
      'portfolio.cta_banner':           'Have a Similar Project in Mind?',
      'portfolio.cta_banner.desc':      "Tell us about your idea and let's build something great together.",
      'portfolio.cta_banner.btn':       'Get in Touch',

      /* ── Modal ────────────────────────────────────────── */
      'modal.close':      'Close modal',
      'modal.problem':    'The Challenge',
      'modal.solution':   'Our Solution',
      'modal.results':    'Results',
      'modal.tech':       'Technologies Used',

      /* ── Logos ────────────────────────────────────────── */
      'logos.label':      'Trusted by companies we\'ve worked with',

      /* ── Testimonials ─────────────────────────────────── */
      'testimonials.label': 'Client reviews',
      'testimonials.title': 'What Our <span>Clients</span> Say',
      'testimonials.desc':  'Real feedback from businesses we\'ve helped grow with great software.',

      /* ── CTA Banner ───────────────────────────────────── */
      'cta.title':    'Ready to Start Your Project?',
      'cta.desc':     "Let's talk about your idea and turn it into a product people love. No commitment — just a friendly conversation.",
      'cta.btn':      'Get in Touch',
      'cta.btn_alt':  'View Our Work',

      /* ── About ────────────────────────────────────────── */
      'about.page_title':     'About Us',
      'about.page_desc':      'Learn about elbanby.com — our story, mission, and the team behind the software.',
      'about.story.label':    'Our story',
      'about.story.title':    'Who We <span>Are</span>',
      'about.story.p1':       'elbanby.com is a software company founded with a single goal: to build software that genuinely works — reliable, scalable, and user-friendly.',
      'about.story.p2':       'We specialize in web and mobile development, working with startups, SMEs, and enterprises to bring their digital products to life.',
      'about.story.p3':       'What sets us apart is our commitment to quality and our long-term approach — we treat every project as if it were our own product.',
      'about.mission.label':  'What drives us',
      'about.mission.title':  'Mission &amp; Vision',
      'about.mission_card':   'To deliver high-quality, reliable software that empowers businesses to grow and compete in the digital world.',
      'about.vision_card':    'To be the go-to software partner for companies across the region — known for quality, transparency, and results.',
      'about.values.label':   'Core values',
      'about.values.title':   'What We <span>Stand For</span>',
      'about.val1.title':     'Innovation',
      'about.val1.desc':      'We embrace new technologies and approaches to solve problems better.',
      'about.val2.title':     'Quality',
      'about.val2.desc':      'Every line of code, every design decision is made with quality in mind.',
      'about.val3.title':     'Reliability',
      'about.val3.desc':      'Deadlines matter. Commitments are kept. You can count on us.',
      'about.val4.title':     'Collaboration',
      'about.val4.desc':      'We work with you, not just for you. Your input shapes the outcome.',
      'about.timeline.label': 'Our journey',
      'about.timeline.title': 'Company <span>Timeline</span>',
      'about.tech.label':     'Our toolkit',
      'about.tech.title':     'Technologies <span>We Use</span>',
      'about.tech.desc':      'We work with modern, battle-tested technologies to deliver software that performs and scales.',
      'about.tech.frontend':  'Frontend',
      'about.tech.backend':   'Backend',
      'about.tech.mobile':    'Mobile',
      'about.tech.tools':     'Tools & DevOps',
      'about.cta':            'Work With Us',

      /* ── Services Page ────────────────────────────────── */
      'services.page_title': 'Our Services',
      'services.page_desc':  'Everything you need to build, launch, and grow your digital product — under one roof.',
      'services.process.label': 'How we work',
      'services.process.title': 'Our <span>Process</span>',
      'services.step1.title': 'Discover',
      'services.step1.desc':  'We learn about your goals, audience, and constraints to define the right scope.',
      'services.step2.title': 'Design',
      'services.step2.desc':  'We design the architecture, user experience, and technical approach before writing code.',
      'services.step3.title': 'Build',
      'services.step3.desc':  'We develop iteratively with regular check-ins so you always know where things stand.',
      'services.step4.title': 'Deliver',
      'services.step4.desc':  'We deploy, test in production, and make sure everything works perfectly before handoff.',
      'services.page_cta':   'Start Your Project',

      /* ── Portfolio Page ───────────────────────────────── */
      'portfolio.page_title': 'Our Portfolio',
      'portfolio.page_desc':  'Browse our work across web, mobile, design, and desktop projects.',

      /* ── Team ─────────────────────────────────────────── */
      'team.label':      'The people',
      'team.title':      'Meet the <span>Team</span>',
      'team.desc':       'A small, focused team of developers and designers who care deeply about craft.',
      'team.page_title': 'Our Team',
      'team.page_desc':  'The people who build your software.',
      'team.join.title': 'Join Our Team',
      'team.join.desc':  "We're always looking for talented people who love building great software.",
      'team.join.btn':   'Get in Touch',

      /* ── Testimonials Page ────────────────────────────── */
      'testimonials.page_title': 'Client Testimonials',
      'testimonials.page_desc':  'Hear directly from the businesses we\'ve worked with.',

      /* ── FAQ ──────────────────────────────────────────── */
      'faq.page_title': 'Frequently Asked Questions',
      'faq.page_desc':  'Answers to questions we get most often from clients.',
      'faq.group.general':  'General',
      'faq.group.services': 'Services',
      'faq.group.process':  'Process',
      'faq.group.pricing':  'Pricing',
      'faq.q1':  'What kind of projects does elbanby.com take on?',
      'faq.a1':  'We work on web applications, mobile apps (iOS & Android), UI/UX design projects, APIs, e-commerce platforms, and desktop software. We work with startups, SMEs, and larger organizations.',
      'faq.q2':  'How do I get started?',
      'faq.a2':  'Simply fill out the contact form or send us a message on WhatsApp. We\'ll schedule a free discovery call to understand your project and give you a tailored proposal.',
      'faq.q3':  'Do you work with clients outside your country?',
      'faq.a3':  'Yes. We work with clients remotely across the region and internationally. All project communication can be done via video calls, email, and project management tools.',
      'faq.q4':  'What technologies do you use?',
      'faq.a4':  'We choose the right technology for each project. Commonly we use React, Next.js, Vue, Node.js, Laravel, Flutter, React Native, and more — always picking what fits your needs best.',
      'faq.q5':  'Do you offer UI/UX design separately from development?',
      'faq.a5':  'Yes. We offer standalone UI/UX design services including wireframes, prototypes, and full design systems — whether or not we handle the development for that project.',
      'faq.q6':  'Can you work with our existing codebase?',
      'faq.a6':  'Absolutely. We regularly take on legacy projects, add features, fix bugs, and refactor existing code — even if we didn\'t build the original version.',
      'faq.q7':  'How long does a typical project take?',
      'faq.a7':  'It depends on scope. A simple landing site can take 1–2 weeks. A full web application typically takes 6–16 weeks. We\'ll give you a timeline estimate after the discovery call.',
      'faq.q8':  'How do you handle project pricing?',
      'faq.a8':  'We offer both fixed-price contracts (for well-defined scopes) and time-and-materials billing (for ongoing or evolving projects). Pricing details are shared after understanding your requirements.',
      'faq.q9':  'Do you provide support after the project is delivered?',
      'faq.a9':  'Yes. We offer maintenance packages that include bug fixes, updates, and new feature development after launch.',
      'faq.q10': 'Is my project data kept confidential?',
      'faq.a10': 'Yes. We sign NDAs upon request and treat all client information with strict confidentiality. We never share project details, code, or data with third parties.',

      /* ── Contact ──────────────────────────────────────── */
      'contact.page_title': 'Contact Us',
      'contact.page_desc':  "Have a project in mind? Let's talk.",
      'contact.form.title': 'Send Us a Message',
      'contact.field.name':    'Your Name',
      'contact.field.email':   'Email Address',
      'contact.field.phone':   'Phone (optional)',
      'contact.field.service': 'Service You Need',
      'contact.field.message': 'Tell us about your project',
      'contact.field.submit':  'Send Message',
      'contact.service.web':       'Web Development',
      'contact.service.mobile':    'Mobile App Development',
      'contact.service.uiux':      'UI/UX Design',
      'contact.service.api':       'API / Backend',
      'contact.service.ecommerce': 'E-Commerce',
      'contact.service.desktop':   'Desktop Application',
      'contact.service.other':     'Other',
      'contact.info.email':     'Email',
      'contact.info.phone':     'Phone',
      'contact.info.whatsapp':  'WhatsApp',
      'contact.social.github':  'GitHub',
      'contact.social.linkedin': 'LinkedIn',
      'contact.social.whatsapp': 'WhatsApp',
      'contact.success': "Thanks! Your message has been received. We'll get back to you within 1 business day.",
      'contact.error':   'Something went wrong. Please check your details and try again.',
      'contact.error.required': 'Please fill in all required fields.',
      'contact.error.email':    'Please enter a valid email address.',
      'contact.error.rate':     'Too many submissions. Please wait before trying again.',

      /* ── Privacy ──────────────────────────────────────── */
      'privacy.page_title': 'Privacy Policy',
      'privacy.page_desc':  'How elbanby.com collects, uses, and protects your information.',

      /* ── Terms ────────────────────────────────────────── */
      'terms.page_title': 'Terms of Service',
      'terms.page_desc':  'Please read these terms carefully before using our services.',

      /* ── 404 ──────────────────────────────────────────── */
      '404.code':     '404',
      '404.title':    'Page Not Found',
      '404.desc':     "Oops — the page you're looking for doesn't exist or has been moved.",
      '404.go_home':  'Back to Home',
      '404.contact':  'Contact Us',

      /* ── Footer ───────────────────────────────────────── */
      'footer.tagline':   'Program your Dreams',
      'footer.desc':      'We build web apps, mobile applications, and digital solutions that work.',
      'footer.col.company':   'Company',
      'footer.col.services':  'Services',
      'footer.col.legal':     'Legal',
      'footer.copyright': '© 2024 elbanby.com. All rights reserved.',

      /* ── WhatsApp Float ───────────────────────────────── */
      'whatsapp.label':   'Chat on WhatsApp',
      'whatsapp.aria':    'Contact us on WhatsApp',

      /* ── Generic ──────────────────────────────────────── */
      'common.learn_more':    'Learn More',
      'common.view_all':      'View All',
      'common.get_in_touch':  'Get in Touch',
      'common.back':          'Back',
      'common.loading':       'Loading…',
      'common.get_quote':     'Get a Quote',

      /* ── About — values & timeline (about.html) ──────── */
      'about.value1': 'Honest & transparent always',
      'about.value2': 'Quality over quantity',
      'about.value3': 'Long-term partnerships',
      'about.value4': 'Continuous improvement',
      'about.tl1.title': 'Company Founded',
      'about.tl1.desc':  'elbanby.com launched with a clear focus on web development and a commitment to delivering quality software. First 3 projects go live.',
      'about.tl2.title': 'First 10 Clients',
      'about.tl2.desc':  'Word of mouth brought our first 10 satisfied clients. We expanded into mobile app development with Flutter and React Native.',
      'about.tl3.title': 'Team & Services Grow',
      'about.tl3.desc':  'Added dedicated UI/UX and backend engineering roles. Expanded service offerings to include desktop applications and API-first development.',
      'about.tl4.title': '50+ Projects Milestone',
      'about.tl4.desc':  'Crossed 50 delivered projects and 30 satisfied clients. Serving businesses across the region with a growing team and expanded capabilities.',
      'about.tech.devops': 'Tools & DevOps',

      /* ── Services — detail paragraphs & process ──────── */
      'services.detail.intro':     'Every service we offer is built around one goal: software that solves real problems and delivers real value.',
      'services.web.detail':       'We build modern, fast, and responsive web applications using the latest frameworks and tools. Whether it\'s a marketing website, a SaaS platform, or a complex web portal — we deliver code that works.',
      'services.mobile.detail':    'We build cross-platform and native mobile apps for iOS and Android. From consumer apps to enterprise tools — with Flutter and React Native we deliver a single codebase that feels native on every device.',
      'services.uiux.detail':      'User experience is not a feature — it\'s the foundation. We research, prototype, and design digital experiences that are intuitive, accessible, and conversion-optimized. We deliver Figma files ready for handoff or implement the UI ourselves.',
      'services.api.detail':       'Robust server-side architecture, RESTful APIs, and microservices that scale with your business. We design for performance, security, and maintainability — so your backend never becomes a bottleneck.',
      'services.ecommerce.detail': 'We build full-featured online stores from scratch or on established platforms — with secure payment integration, inventory management, order tracking, and admin dashboards. Custom or WooCommerce-based, we\'ve got you covered.',
      'services.desktop.detail':   'Cross-platform desktop software for Windows, macOS, and Linux. We use Electron to build desktop apps with web technology stacks, giving you one codebase that runs everywhere — from POS systems to enterprise tools.',
      'services.process.desc':     'We follow a clear, collaborative process so you always know where your project stands.',
      'services.process.s1.title': 'Discovery',
      'services.process.s1.desc':  'We start with a conversation. We learn about your business, goals, users, and constraints before writing a single line of code.',
      'services.process.s2.title': 'Design & Plan',
      'services.process.s2.desc':  'We design the UI/UX, define the architecture, and agree on a detailed scope and timeline before development begins.',
      'services.process.s3.title': 'Build',
      'services.process.s3.desc':  'Development in focused sprints with regular demos. You see real progress every week and can provide feedback as we go.',
      'services.process.s4.title': 'Launch & Support',
      'services.process.s4.desc':  'We deploy, monitor, and support your product after launch. We stay in the picture to fix issues and add improvements.',

      /* ── Team — members & join CTA ───────────────────── */
      'team.m1.name': 'Ahmed El-Banby',
      'team.m1.role': 'Founder & Full-Stack Developer',
      'team.m1.bio':  'Building software that lasts is what gets me out of bed every morning. Passionate about clean architecture, scalable systems, and turning complex problems into elegant solutions.',
      'team.m2.name': 'Sarah Mohamed',
      'team.m2.role': 'Lead UI/UX Designer',
      'team.m2.bio':  "Good design isn't just how it looks — it's how it works. I create experiences that feel natural, solve real problems, and make people want to come back.",
      'team.m3.name': 'Omar Hassan',
      'team.m3.role': 'Backend Engineer',
      'team.m3.bio':  "Performance and security aren't afterthoughts — they're the foundation. I architect backends that scale quietly and handle anything you throw at them.",
      'team.join.cta': 'Get in Touch',

      /* ── Contact — info column & form labels ─────────── */
      'contact.info.title':      "Let's Build Something Together",
      'contact.info.desc':       "Whether you have a detailed brief or just a rough idea — we're here to help you figure it out. Tell us what you're thinking and we'll take it from there.",
      'contact.email.label':     'Email us',
      'contact.whatsapp.label':  'WhatsApp',
      'contact.response.label':  'Response Time',
      'contact.response.value':  'Within 24 hours',
      'contact.social.label':    'Find us on',
      'contact.form.name':       'Full Name',
      'contact.form.name_ph':    'Your full name',
      'contact.form.email':      'Email Address',
      'contact.form.email_ph':   'you@example.com',
      'contact.form.phone':      'Phone (optional)',
      'contact.form.phone_ph':   '+1 (555) 000-0000',
      'contact.form.service':    'Service Needed',
      'contact.form.service_ph': 'Select a service…',
      'contact.form.other':      'Other / Not sure',
      'contact.form.message':    'Your Message',
      'contact.form.message_ph': 'Tell us about your project — what you\'re building, your timeline, and any specific requirements.',
      'contact.form.submit':     'Send Message',
      'contact.form.privacy':    'Your information is kept private. We never share or sell your data. See our',
      'contact.faq.nudge':       'Have a quick question? Check our FAQ first.',

      /* ── FAQ — category titles & CTA ─────────────────── */
      'faq.cat.general':  'General',
      'faq.cat.services': 'Services',
      'faq.cat.process':  'Process',
      'faq.cat.pricing':  'Pricing',
      'faq.cta.title':    'Still Have Questions?',
      'faq.cta.desc':     "Can't find the answer here? Send us a message — we respond within 24 hours.",

      /* ── 404 — action buttons ─────────────────────────── */
      '404.btn_home':    'Go to Homepage',
      '404.btn_contact': 'Contact Us',
    },

    ar: {
      /* ── Navigation ──────────────────────────────────── */
      'nav.home':          'الرئيسية',
      'nav.about':         'من نحن',
      'nav.services':      'خدماتنا',
      'nav.portfolio':     'أعمالنا',
      'nav.team':          'فريقنا',
      'nav.testimonials':  'آراء العملاء',
      'nav.faq':           'الأسئلة الشائعة',
      'nav.contact':       'تواصل معنا',
      'nav.start_project': 'ابدأ مشروعك',

      /* ── Hero ─────────────────────────────────────────── */
      'hero.eyebrow':      'شركة برمجيات',
      'hero.title_1':      'نبرمج أحلامك',
      'hero.title_2':      'ونحوّلها إلى واقع.',
      'hero.desc':         'elbanby.com شركة برمجيات تحوّل أفكارك إلى تطبيقات ويب وتطبيقات جوال وحلول رقمية مبنية لتدوم.',
      'hero.cta_primary':  'ابدأ مشروعك',
      'hero.cta_outline':  'شاهد أعمالنا',

      /* ── Why Elbanby ──────────────────────────────────── */
      'why.label':         'لماذا تختارنا',
      'why.title':         'لماذا <span>البنبي</span>؟',
      'why.desc':          'نجمع بين التميّز التقني والتسليم الموثوق لمساعدة الشركات على النمو عبر برمجيات متقنة.',
      'why.card1.title':   'تسليم سريع',
      'why.card1.desc':    'نعمل في سبرنتات مركّزة بمراحل واضحة. لا تأخيرات — نتائج في أوقاتها.',
      'why.card2.title':   'جودة الكود',
      'why.card2.desc':    'بنية نظيفة وممارسات معتمدة واختبار شامل تضمن برمجيات قابلة للنمو.',
      'why.card3.title':   'دعم طويل الأمد',
      'why.card3.desc':    'لا نختفي بعد الإطلاق. نحافظ على منتجك ونطوّره مع نموّك.',
      'why.card4.title':   'شفافية تامة',
      'why.card4.desc':    'تعرف دائمًا ما نبنيه ولماذا. تواصل واضح في كل خطوة.',

      /* ── Stats ────────────────────────────────────────── */
      'stats.projects':    'مشروع مُسلَّم',
      'stats.clients':     'عميل سعيد',
      'stats.technologies':'تقنية',
      'stats.years':       'سنوات خبرة',

      /* ── Services ─────────────────────────────────────── */
      'services.label':           'ماذا نفعل',
      'services.title':           '<span>خدماتنا</span>',
      'services.desc':            'من الفكرة حتى الإطلاق — نغطي دورة تطوير البرمجيات كاملة.',
      'services.web.title':       'تطوير المواقع',
      'services.web.desc':        'تطبيقات ويب حديثة ومتجاوبة بتقنيات موثوقة وأفضل الممارسات.',
      'services.mobile.title':    'تطوير تطبيقات الجوال',
      'services.mobile.desc':     'تطبيقات جوال أصلية ومتعددة المنصات لـ iOS و Android يحبها المستخدمون.',
      'services.uiux.title':      'تصميم واجهة المستخدم',
      'services.uiux.desc':       'تصميم يتمحور حول المستخدم؛ سهل الاستخدام، جميل، ومحسَّن للتحويل.',
      'services.api.title':       'تطوير الـ API والباك إند',
      'services.api.desc':        'واجهات برمجية RESTful قابلة للتوسع وبنية خوادم متينة.',
      'services.ecommerce.title': 'حلول التجارة الإلكترونية',
      'services.ecommerce.desc':  'متاجر إلكترونية متكاملة مع دفع آمن وإدارة مخزون ولوحات تحكم.',
      'services.desktop.title':   'تطبيقات سطح المكتب',
      'services.desktop.desc':    'برامج سطح مكتب متعددة المنصات لـ Windows و macOS و Linux.',
      'services.cta':             'استعرض جميع الخدمات',

      /* ── Portfolio ────────────────────────────────────── */
      'portfolio.label':      'أعمالنا',
      'portfolio.title':      'مشاريع <span>مميزة</span>',
      'portfolio.desc':       'مختارات من المشاريع التي سلّمناها لعملاء في مختلف القطاعات.',
      'portfolio.featured':   'مشروع مميز',
      'portfolio.view_study': 'عرض دراسة الحالة',
      'portfolio.live':       'العرض المباشر',
      'portfolio.github':     'جيت هاب',
      'portfolio.cta':        'عرض جميع المشاريع',
      'portfolio.filter.all':     'الكل',
      'portfolio.filter.web':     'ويب',
      'portfolio.filter.mobile':  'جوال',
      'portfolio.filter.uiux':    'تصميم',
      'portfolio.filter.desktop': 'سطح مكتب',
      'portfolio.cta_banner':      'هل لديك مشروع مماثل؟',
      'portfolio.cta_banner.desc': 'أخبرنا عن فكرتك ولنبني شيئًا رائعًا معًا.',
      'portfolio.cta_banner.btn':  'تواصل معنا',

      /* ── Modal ────────────────────────────────────────── */
      'modal.close':    'إغلاق النافذة',
      'modal.problem':  'التحدي',
      'modal.solution': 'حلّنا',
      'modal.results':  'النتائج',
      'modal.tech':     'التقنيات المستخدمة',

      /* ── Logos ────────────────────────────────────────── */
      'logos.label': 'موثوق من قِبل الشركات التي عملنا معها',

      /* ── Testimonials ─────────────────────────────────── */
      'testimonials.label': 'آراء العملاء',
      'testimonials.title': 'ماذا يقول <span>عملاؤنا</span>',
      'testimonials.desc':  'تقييمات حقيقية من شركات ساعدناها على النمو ببرمجيات متميزة.',

      /* ── CTA Banner ───────────────────────────────────── */
      'cta.title':   'هل أنت جاهز لبدء مشروعك؟',
      'cta.desc':    'دعنا نتحدث عن فكرتك ونحوّلها إلى منتج يحبه المستخدمون. بدون التزام — مجرد محادثة ودّية.',
      'cta.btn':     'تواصل معنا',
      'cta.btn_alt': 'شاهد أعمالنا',

      /* ── About ────────────────────────────────────────── */
      'about.page_title':     'من نحن',
      'about.page_desc':      'تعرّف على elbanby.com — قصتنا ورسالتنا والفريق خلف البرمجيات.',
      'about.story.label':    'قصتنا',
      'about.story.title':    'من <span>نحن</span>',
      'about.story.p1':       'elbanby.com شركة برمجيات تأسست بهدف واحد: بناء برمجيات تعمل فعلاً — موثوقة وقابلة للتوسع وسهلة الاستخدام.',
      'about.story.p2':       'نتخصص في تطوير الويب والجوال، ونعمل مع الشركات الناشئة والصغيرة والمتوسطة والكبيرة لإطلاق منتجاتهم الرقمية.',
      'about.story.p3':       'ما يميزنا هو التزامنا بالجودة ومنهجية عملنا طويلة الأمد — نتعامل مع كل مشروع كأنه منتجنا الخاص.',
      'about.mission.label':  'ما يحرّكنا',
      'about.mission.title':  'الرسالة والرؤية',
      'about.mission_card':   'تقديم برمجيات عالية الجودة وموثوقة تمكّن الشركات من النمو والمنافسة في العالم الرقمي.',
      'about.vision_card':    'أن نكون الشريك البرمجي المفضّل للشركات في المنطقة — معروفين بالجودة والشفافية والنتائج.',
      'about.values.label':   'قيمنا الجوهرية',
      'about.values.title':   'ما <span>نؤمن به</span>',
      'about.val1.title':     'الابتكار',
      'about.val1.desc':      'نتبنى التقنيات والأساليب الجديدة لحل المشكلات بشكل أفضل.',
      'about.val2.title':     'الجودة',
      'about.val2.desc':      'كل سطر كود وكل قرار تصميمي يُتخذ بوعي بالجودة.',
      'about.val3.title':     'الموثوقية',
      'about.val3.desc':      'المواعيد مهمة. الالتزامات تُحترم. يمكنك الاعتماد علينا.',
      'about.val4.title':     'التعاون',
      'about.val4.desc':      'نعمل معك وليس فقط من أجلك. رأيك يشكّل النتيجة.',
      'about.timeline.label': 'مسيرتنا',
      'about.timeline.title': '<span>خط زمني</span> للشركة',
      'about.tech.label':     'أدواتنا',
      'about.tech.title':     'التقنيات التي <span>نستخدمها</span>',
      'about.tech.desc':      'نعمل بأحدث التقنيات المجرَّبة لتسليم برمجيات تؤدي دورها وتتوسع بكفاءة.',
      'about.tech.frontend':  'واجهة المستخدم',
      'about.tech.backend':   'الباك إند',
      'about.tech.mobile':    'الجوال',
      'about.tech.tools':     'الأدوات والـ DevOps',
      'about.cta':            'اعمل معنا',

      /* ── Services Page ────────────────────────────────── */
      'services.page_title':     'خدماتنا',
      'services.page_desc':      'كل ما تحتاجه لبناء منتجك الرقمي وإطلاقه وتنميته — تحت سقف واحد.',
      'services.process.label':  'كيف نعمل',
      'services.process.title':  '<span>منهجيتنا</span>',
      'services.step1.title':    'الاستكشاف',
      'services.step1.desc':     'نتعرّف على أهدافك وجمهورك ومتطلباتك لتحديد النطاق الصحيح.',
      'services.step2.title':    'التصميم',
      'services.step2.desc':     'نصمم البنية وتجربة المستخدم والمنهجية التقنية قبل كتابة الكود.',
      'services.step3.title':    'البناء',
      'services.step3.desc':     'نطوّر بشكل تكراري مع متابعات منتظمة حتى تبقى على علم بكل شيء.',
      'services.step4.title':    'التسليم',
      'services.step4.desc':     'نرفع المشروع ونختبره في الإنتاج ونضمن عمله بشكل مثالي قبل التسليم.',
      'services.page_cta':       'ابدأ مشروعك',

      /* ── Portfolio Page ───────────────────────────────── */
      'portfolio.page_title': 'أعمالنا',
      'portfolio.page_desc':  'تصفّح مشاريعنا في الويب والجوال والتصميم وسطح المكتب.',

      /* ── Team ─────────────────────────────────────────── */
      'team.label':      'الفريق',
      'team.title':      'تعرّف على <span>الفريق</span>',
      'team.desc':       'فريق صغير ومركّز من المطوّرين والمصممين الذين يهتمون عميقًا بجودة عملهم.',
      'team.page_title': 'فريقنا',
      'team.page_desc':  'الأشخاص الذين يبنون برمجياتك.',
      'team.join.title': 'انضم إلى فريقنا',
      'team.join.desc':  'نبحث دائمًا عن أشخاص موهوبين يحبون بناء برمجيات رائعة.',
      'team.join.btn':   'تواصل معنا',

      /* ── Testimonials Page ────────────────────────────── */
      'testimonials.page_title': 'آراء العملاء',
      'testimonials.page_desc':  'اسمع مباشرة من الشركات التي عملنا معها.',

      /* ── FAQ ──────────────────────────────────────────── */
      'faq.page_title':     'الأسئلة الشائعة',
      'faq.page_desc':      'إجابات على الأسئلة الأكثر شيوعًا من عملائنا.',
      'faq.group.general':  'عام',
      'faq.group.services': 'الخدمات',
      'faq.group.process':  'المنهجية',
      'faq.group.pricing':  'التسعير',
      'faq.q1':  'ما نوع المشاريع التي تنفّذها elbanby.com؟',
      'faq.a1':  'نعمل على تطبيقات الويب وتطبيقات الجوال (iOS وAndroid) وتصميم واجهات المستخدم وواجهات API ومنصات التجارة الإلكترونية وبرامج سطح المكتب. نتعامل مع الشركات الناشئة والصغيرة والمتوسطة والكبيرة.',
      'faq.q2':  'كيف أبدأ؟',
      'faq.a2':  'فقط املأ نموذج التواصل أو أرسل لنا رسالة على واتساب. سنحدد موعدًا لمكالمة استكشافية مجانية لفهم مشروعك وتقديم عرض مخصص.',
      'faq.q3':  'هل تعملون مع عملاء خارج بلدكم؟',
      'faq.a3':  'نعم. نعمل مع عملاء عن بُعد في المنطقة وحول العالم. يمكن إجراء كل التواصل عبر مكالمات فيديو والبريد الإلكتروني وأدوات إدارة المشاريع.',
      'faq.q4':  'ما التقنيات التي تستخدمونها؟',
      'faq.a4':  'نختار التقنية المناسبة لكل مشروع. نستخدم عادةً React وNext.js وVue وNode.js وLaravel وFlutter وReact Native وغيرها — دائمًا ما يناسب احتياجاتك.',
      'faq.q5':  'هل تقدمون تصميم واجهة المستخدم بشكل مستقل عن التطوير؟',
      'faq.a5':  'نعم. نقدم خدمات تصميم مستقلة تشمل الواير فريم والنماذج الأولية وأنظمة التصميم الكاملة — سواء تولّينا التطوير أم لا.',
      'faq.q6':  'هل يمكنكم العمل على كودبيس موجود؟',
      'faq.a6':  'بالتأكيد. نتعامل بانتظام مع المشاريع الموروثة لإضافة ميزات وإصلاح أخطاء وإعادة هيكلة الكود — حتى لو لم نبنِ النسخة الأصلية.',
      'faq.q7':  'كم يستغرق المشروع عادةً؟',
      'faq.a7':  'يعتمد على النطاق. موقع بسيط يستغرق 1–2 أسبوع. تطبيق ويب كامل يستغرق عادةً 6–16 أسبوعًا. سنعطيك تقديرًا بعد مكالمة الاستكشاف.',
      'faq.q8':  'كيف تتعاملون مع تسعير المشاريع؟',
      'faq.a8':  'نقدم عقود سعر ثابت (للنطاقات المحددة جيدًا) وفاتورة حسب الوقت والمواد (للمشاريع المتطورة). تفاصيل الأسعار تُشارك بعد فهم متطلباتك.',
      'faq.q9':  'هل تقدمون دعمًا بعد تسليم المشروع؟',
      'faq.a9':  'نعم. نقدم باقات صيانة تشمل إصلاح الأخطاء والتحديثات وتطوير ميزات جديدة بعد الإطلاق.',
      'faq.q10': 'هل بيانات مشروعي محفوظة بشكل سري؟',
      'faq.a10': 'نعم. نوقّع على اتفاقيات سرية عند الطلب ونتعامل مع جميع معلومات العملاء بسرية تامة. لا نشارك تفاصيل المشروع أو الكود أو البيانات مع أي طرف ثالث.',

      /* ── Contact ──────────────────────────────────────── */
      'contact.page_title': 'تواصل معنا',
      'contact.page_desc':  'هل لديك مشروع في ذهنك؟ لنتحدث.',
      'contact.form.title': 'أرسل لنا رسالة',
      'contact.field.name':    'اسمك',
      'contact.field.email':   'البريد الإلكتروني',
      'contact.field.phone':   'الهاتف (اختياري)',
      'contact.field.service': 'الخدمة التي تحتاجها',
      'contact.field.message': 'أخبرنا عن مشروعك',
      'contact.field.submit':  'إرسال الرسالة',
      'contact.service.web':       'تطوير مواقع',
      'contact.service.mobile':    'تطوير تطبيقات جوال',
      'contact.service.uiux':      'تصميم واجهة مستخدم',
      'contact.service.api':       'API / باك إند',
      'contact.service.ecommerce': 'تجارة إلكترونية',
      'contact.service.desktop':   'تطبيق سطح مكتب',
      'contact.service.other':     'أخرى',
      'contact.info.email':    'البريد الإلكتروني',
      'contact.info.phone':    'الهاتف',
      'contact.info.whatsapp': 'واتساب',
      'contact.social.github':   'جيت هاب',
      'contact.social.linkedin': 'لينكد إن',
      'contact.social.whatsapp': 'واتساب',
      'contact.success': 'شكرًا! تم استلام رسالتك. سنرد عليك خلال يوم عمل واحد.',
      'contact.error':   'حدث خطأ ما. يرجى التحقق من بياناتك والمحاولة مجددًا.',
      'contact.error.required': 'يرجى ملء جميع الحقول المطلوبة.',
      'contact.error.email':    'يرجى إدخال بريد إلكتروني صحيح.',
      'contact.error.rate':     'عدد كبير من الطلبات. يرجى الانتظار قبل المحاولة مجددًا.',

      /* ── Privacy ──────────────────────────────────────── */
      'privacy.page_title': 'سياسة الخصوصية',
      'privacy.page_desc':  'كيف تجمع elbanby.com معلوماتك وتستخدمها وتحميها.',

      /* ── Terms ────────────────────────────────────────── */
      'terms.page_title': 'شروط الخدمة',
      'terms.page_desc':  'يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.',

      /* ── 404 ──────────────────────────────────────────── */
      '404.code':    '404',
      '404.title':   'الصفحة غير موجودة',
      '404.desc':    'عذرًا — الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
      '404.go_home': 'العودة للرئيسية',
      '404.contact': 'تواصل معنا',

      /* ── Footer ───────────────────────────────────────── */
      'footer.tagline':        'نبرمج أحلامك',
      'footer.desc':           'نبني تطبيقات ويب وتطبيقات جوال وحلول رقمية تعمل.',
      'footer.col.company':    'الشركة',
      'footer.col.services':   'الخدمات',
      'footer.col.legal':      'قانوني',
      'footer.copyright':      '© 2024 elbanby.com. جميع الحقوق محفوظة.',

      /* ── WhatsApp Float ───────────────────────────────── */
      'whatsapp.label': 'تحدث معنا على واتساب',
      'whatsapp.aria':  'تواصل معنا على واتساب',

      /* ── Generic ──────────────────────────────────────── */
      'common.learn_more':   'اعرف أكثر',
      'common.view_all':     'عرض الكل',
      'common.get_in_touch': 'تواصل معنا',
      'common.back':         'رجوع',
      'common.loading':      'جاري التحميل…',
      'common.get_quote':    'احصل على عرض سعر',

      /* ── About — values & timeline (about.html) ──────── */
      'about.value1': 'صادق وشفاف دائمًا',
      'about.value2': 'الجودة فوق الكمية',
      'about.value3': 'شراكات طويلة الأمد',
      'about.value4': 'تحسين مستمر',
      'about.tl1.title': 'تأسيس الشركة',
      'about.tl1.desc':  'أطلقنا elbanby.com بتركيز واضح على تطوير الويب والتزام بتسليم برمجيات عالية الجودة. أُطلقت أولى 3 مشاريع.',
      'about.tl2.title': 'أول 10 عملاء',
      'about.tl2.desc':  'جلب التوصيات أول 10 عملاء راضين. توسّعنا في تطوير تطبيقات الجوال باستخدام Flutter وReact Native.',
      'about.tl3.title': 'نمو الفريق والخدمات',
      'about.tl3.desc':  'أضفنا أدوارًا متخصصة في تصميم UI/UX والهندسة الخلفية. وسّعنا الخدمات لتشمل تطبيقات سطح المكتب والتطوير القائم على API.',
      'about.tl4.title': 'إنجاز 50+ مشروع',
      'about.tl4.desc':  'تخطّينا 50 مشروعًا مسلَّمًا و30 عميلًا راضيًا. نخدم شركات في المنطقة بفريق متنامٍ وقدرات موسَّعة.',
      'about.tech.devops': 'الأدوات والـ DevOps',

      /* ── Services — detail paragraphs & process ──────── */
      'services.detail.intro':     'كل خدمة نقدمها مبنية حول هدف واحد: برمجيات تحل مشكلات حقيقية وتحقق قيمة فعلية.',
      'services.web.detail':       'نبني تطبيقات ويب حديثة وسريعة ومتجاوبة بأحدث الأطر والأدوات. سواء كان موقعًا تسويقيًا أو منصة SaaS أو بوابة ويب معقدة — نسلّم كودًا يعمل.',
      'services.mobile.detail':    'نبني تطبيقات جوال متعددة المنصات وأصلية لـ iOS وAndroid. من تطبيقات المستهلكين إلى أدوات الشركات — مع Flutter وReact Native نسلّم قاعدة كود واحدة تبدو أصلية على كل جهاز.',
      'services.uiux.detail':      'تجربة المستخدم ليست ميزة — إنها الأساس. نبحث ونصمم نماذج أولية وتجارب رقمية سهلة الاستخدام وقابلة للوصول ومحسَّنة للتحويل. نسلّم ملفات Figma جاهزة للتسليم أو ننفّذ واجهة المستخدم بأنفسنا.',
      'services.api.detail':       'بنية خوادم متينة وواجهات API RESTful وخدمات مصغّرة تتوسع مع عملك. نصمم مع مراعاة الأداء والأمان والصيانة — لن يكون الباك إند لديك أبدًا عقبة.',
      'services.ecommerce.detail': 'نبني متاجر إلكترونية متكاملة من الصفر أو على منصات راسخة — مع دمج دفع آمن وإدارة مخزون وتتبع طلبات ولوحات إدارية. مخصصة أو مبنية على WooCommerce، لدينا ما يناسبك.',
      'services.desktop.detail':   'برامج سطح مكتب متعددة المنصات لـ Windows وmacOS وLinux. نستخدم Electron لبناء تطبيقات سطح مكتب بتقنيات الويب، مما يمنحك قاعدة كود واحدة تعمل في كل مكان — من أنظمة POS إلى الأدوات المؤسسية.',
      'services.process.desc':     'نتبع منهجية واضحة وتعاونية حتى تعرف دائمًا أين يقف مشروعك.',
      'services.process.s1.title': 'الاستكشاف',
      'services.process.s1.desc':  'نبدأ بمحادثة. نتعرف على عملك وأهدافك ومستخدميك ومتطلباتك قبل كتابة سطر كود واحد.',
      'services.process.s2.title': 'التصميم والتخطيط',
      'services.process.s2.desc':  'نصمم واجهة المستخدم، ونحدد البنية، ونتفق على نطاق وجدول زمني مفصَّل قبل بدء التطوير.',
      'services.process.s3.title': 'البناء',
      'services.process.s3.desc':  'تطوير في سبرنتات مركّزة مع عروض منتظمة. ترى تقدمًا حقيقيًا كل أسبوع ويمكنك تقديم آراءك أثناء العمل.',
      'services.process.s4.title': 'الإطلاق والدعم',
      'services.process.s4.desc':  'ننشر المنتج ونراقبه ونقدم الدعم بعد الإطلاق. نبقى في الصورة لإصلاح المشكلات وإضافة تحسينات.',

      /* ── Team — members & join CTA ───────────────────── */
      'team.m1.name': 'أحمد البنبي',
      'team.m1.role': 'المؤسس ومطوّر متكامل',
      'team.m1.bio':  'بناء برمجيات تدوم هو ما يدفعني كل صباح. شغوف بالبنية النظيفة والأنظمة القابلة للتوسع وتحويل المشكلات المعقدة إلى حلول أنيقة.',
      'team.m2.name': 'سارة محمد',
      'team.m2.role': 'مصممة UI/UX رئيسية',
      'team.m2.bio':  'التصميم الجيد ليس مجرد مظهر — إنه طريقة عمل. أصمم تجارب تبدو طبيعية وتحل مشكلات حقيقية وتجعل الناس يرغبون في العودة.',
      'team.m3.name': 'عمر حسان',
      'team.m3.role': 'مهندس باك إند',
      'team.m3.bio':  'الأداء والأمان ليسا آخر الأولويات — إنهما الأساس. أصمم باك إند يتوسع بهدوء ويتعامل مع أي شيء تضعه أمامه.',
      'team.join.cta': 'تواصل معنا',

      /* ── Contact — info column & form labels ─────────── */
      'contact.info.title':      'لنبني شيئًا معًا',
      'contact.info.desc':       'سواء كان لديك تفاصيل دقيقة أو مجرد فكرة أولية — نحن هنا لمساعدتك. أخبرنا بما تفكر فيه وسنتولى الأمر.',
      'contact.email.label':     'راسلنا',
      'contact.whatsapp.label':  'واتساب',
      'contact.response.label':  'وقت الرد',
      'contact.response.value':  'خلال 24 ساعة',
      'contact.social.label':    'ابحث عنا على',
      'contact.form.name':       'الاسم الكامل',
      'contact.form.name_ph':    'اسمك الكامل',
      'contact.form.email':      'البريد الإلكتروني',
      'contact.form.email_ph':   'you@example.com',
      'contact.form.phone':      'الهاتف (اختياري)',
      'contact.form.phone_ph':   '0555 000 000',
      'contact.form.service':    'الخدمة المطلوبة',
      'contact.form.service_ph': 'اختر خدمة…',
      'contact.form.other':      'أخرى / غير متأكد',
      'contact.form.message':    'رسالتك',
      'contact.form.message_ph': 'أخبرنا عن مشروعك — ما الذي تبنيه، جدولك الزمني، وأي متطلبات خاصة.',
      'contact.form.submit':     'إرسال الرسالة',
      'contact.form.privacy':    'معلوماتك محفوظة وخاصة. لن نشارك بياناتك أو نبيعها. اطلع على',
      'contact.faq.nudge':       'لديك سؤال سريع؟ تحقق من الأسئلة الشائعة أولاً.',

      /* ── FAQ — category titles & CTA ─────────────────── */
      'faq.cat.general':  'عام',
      'faq.cat.services': 'الخدمات',
      'faq.cat.process':  'المنهجية',
      'faq.cat.pricing':  'التسعير',
      'faq.cta.title':    'هل لا تزال لديك أسئلة؟',
      'faq.cta.desc':     'لا تجد الإجابة هنا؟ أرسل لنا رسالة — نرد خلال 24 ساعة.',

      /* ── 404 — action buttons ─────────────────────────── */
      '404.btn_home':    'العودة للرئيسية',
      '404.btn_contact': 'تواصل معنا',
    },
  };

  /* ── State ─────────────────────────────────────────────── */
  const STORAGE_KEY = 'elbanby_lang';
  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  /* ── Global helper __(key) ─────────────────────────────── */
  window.__ = function (key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
           (translations[DEFAULT_LANG] && translations[DEFAULT_LANG][key]) ||
           key;
  };

  /* ── Apply language to DOM ─────────────────────────────── */
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = __(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.setAttribute('placeholder', __(el.dataset.i18nPlaceholder));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      el.setAttribute('aria-label', __(el.dataset.i18nAriaLabel));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      el.setAttribute('title', __(el.dataset.i18nTitle));
    });
  }

  /* ── Load Arabic font dynamically ─────────────────────── */
  let cairoLoaded = false;
  function loadCairoFont() {
    if (cairoLoaded) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = '[lang="ar"], [lang="ar"] body { font-family: "Cairo", sans-serif; }';
    document.head.appendChild(style);

    cairoLoaded = true;
  }

  /* ── Set Language ──────────────────────────────────────── */
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    if (lang === 'ar') loadCairoFont();

    applyTranslations();

    // Update language toggle buttons
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    // Attach lang toggle button listeners
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Apply on load
    setLanguage(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
