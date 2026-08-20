export type HomeStat = {
  value: string;
  label: string;
};

export type HomeCategory = {
  slug: string;
  name: string;
  description: string;
  image?: string;
};

export type HomeStep = {
  title: string;
  description: string;
};

export type HomeValueProp = {
  title: string;
  description: string;
};

export type HomeGalleryItem = {
  title: string;
};

export type HomeFaqItem = {
  question: string;
  answer: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  brand: string;
  languageGate: {
    title: string;
    subtitle: string;
  };
  nav: {
    equipment: string;
    howItWorks: string;
    gallery: string;
    whyUs: string;
    faq: string;
    contact: string;
    getQuote: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    privacy: string;
    terms: string;
    impressum: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    impressumTitle: string;
    placeholder: string;
  };
  home: {
    hero: {
      headline: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
      stats: HomeStat[];
    };
    categories: {
      title: string;
      subtitle: string;
      viewProducts: string;
      items: HomeCategory[];
    };
    howItWorks: {
      title: string;
      steps: HomeStep[];
    };
    whyUs: {
      title: string;
      items: HomeValueProp[];
    };
    gallery: {
      title: string;
      items: HomeGalleryItem[];
    };
    faq: {
      title: string;
      items: HomeFaqItem[];
    };
    contact: {
      title: string;
      subtitle: string;
    };
  };
  form: {
    name: string;
    email: string;
    phone: string;
    eventDate: string;
    country: string;
    countryPlaceholder: string;
    countries: {
      CH: string;
      DE: string;
      FR: string;
    };
    message: string;
    submit: string;
    sending: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      phoneRequired: string;
      eventDateRequired: string;
      countryRequired: string;
      messageRequired: string;
      submitFailed: string;
    };
  };
  thankYou: {
    title: string;
    message: string;
    backHome: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  contactLabels: {
    phone: string;
    email: string;
    address: string;
  };
  catalog: {
    home: string;
    equipment: string;
    subcategories: string;
    products: string;
    specs: string;
    backToHome: string;
    backToCategory: string;
    backToSubcategory: string;
    emptySubcategories: string;
    emptyProducts: string;
    getQuote: string;
  };
};
