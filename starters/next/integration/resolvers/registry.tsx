"use client";
import { defineRegistry } from "@json-render/react";

import { Article } from "@/components/blocks/Article/Article";
import { CardGroup } from "@/components/blocks/CardGroup/CardGroup";
import { Footer } from "@/components/blocks/Footer/Footer";
import { Header } from "@/components/blocks/Header/Header";
import { Heading } from "@/components/blocks/Heading/Heading";
import { CTA } from "@/components/blocks/CTA/CTA";
import { FAQ } from "@/components/blocks/FAQ/FAQ";
import { Hero } from "@/components/blocks/Hero/Hero";
import { LogoGroup } from "@/components/blocks/LogoGroup/LogoGroup";
import { Testimonial } from "@/components/blocks/Testimonial/Testimonial";
import { ViewReference } from "@/components/blocks/ViewReference/ViewReference";
import { Webform } from "@/components/blocks/Webform/Webform";
import { catalog } from "@/integration/resolvers/catalog";

export const { registry } = defineRegistry(catalog, {
  components: {
    NodePage: ({ children }) => <>{children}</>,
    NodeArticle: ({ children }) => <>{children}</>,
    Article: ({ props }) => <Article {...props} />,
    Header: ({ props }) => <Header {...props} />,
    Footer: ({ props }) => <Footer {...props} />,
    Heading: ({ props }) => <Heading {...props} />,
    ParagraphHero: ({ props }) => <Hero {...props} />,
    ParagraphCta: ({ props }) => <CTA {...props} />,
    ParagraphCardGroup: ({ props }) => <CardGroup {...props} />,
    ParagraphFaq: ({ props }) => <FAQ {...props} />,
    ParagraphLogoGroup: ({ props }) => <LogoGroup {...props} />,
    ParagraphTestimonial: ({ props }) => <Testimonial {...props} />,
    ParagraphViewReference: ({ props }) => <ViewReference {...props} />,
    ParagraphWebform: ({ props }) => (<Webform {...props}  />),
  },
});
