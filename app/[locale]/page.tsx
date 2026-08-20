import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoriesSection } from "@/components/sections/categories-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import { getCategories } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
  };
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const { home } = dictionary;
  const categories = getCategories(locale).map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description,
    image: category.image,
  }));

  return (
    <>
      <HeroSection locale={locale} content={home.hero} />
      <CategoriesSection
        locale={locale}
        title={home.categories.title}
        subtitle={home.categories.subtitle}
        viewProducts={home.categories.viewProducts}
        items={categories}
      />
      <HowItWorksSection title={home.howItWorks.title} steps={home.howItWorks.steps} />
      <WhyUsSection title={home.whyUs.title} items={home.whyUs.items} />
      <GallerySection title={home.gallery.title} items={home.gallery.items} />
      <FaqSection title={home.faq.title} items={home.faq.items} />
      <ContactSection
        locale={locale}
        homeContact={home.contact}
        contact={dictionary.contact}
        contactLabels={dictionary.contactLabels}
        form={dictionary.form}
      />
    </>
  );
}
