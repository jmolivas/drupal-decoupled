import { readFragment } from "gql.tada";
import type { Spec } from "@json-render/core";
import { ParagraphUnionFragment } from "@/graphql/fragments/paragraph";
import type { NodeResultOf, ParagraphResultOf } from "@/graphql/types";
import { nodeArticleResolver } from "@/integration/resolvers/NodeArticleResolver";
import {
  ParagraphCardGroupFragment,
  paragraphCardGroupResolver,
} from "@/integration/resolvers/ParagraphCardGroupResolver";
import {
  ParagraphCtaFragment,
  paragraphCtaResolver,
} from "@/integration/resolvers/ParagraphCtaResolver";
import {
  ParagraphFaqFragment,
  paragraphFaqResolver,
} from "@/integration/resolvers/ParagraphFaqResolver";
import {
  ParagraphHeroFragment,
  paragraphHeroResolver,
} from "@/integration/resolvers/ParagraphHeroResolver";
import {
  ParagraphLogoGroupFragment,
  paragraphLogoGroupResolver,
} from "@/integration/resolvers/ParagraphLogoGroupResolver";
import {
  ParagraphTestimonialFragment,
  paragraphTestimonialResolver,
} from "@/integration/resolvers/ParagraphTestimonialResolver";
import {
  ParagraphViewReferenceFragment,
  paragraphViewReferenceResolver,
} from "@/integration/resolvers/ParagraphViewReferenceResolver";
import {
  ParagraphWebformFragment,
  paragraphWebformResolver,
} from "@/integration/resolvers/ParagraphWebformResolver";
const resolverMap: Record<
  string,
  (item: ParagraphResultOf) => Record<string, unknown>
> = {
  ParagraphHero: (item) =>
    paragraphHeroResolver({
      paragraph: readFragment(
        ParagraphHeroFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphHero" }>,
      ),
    }),
  ParagraphCardGroup: (item) =>
    paragraphCardGroupResolver({
      paragraph: readFragment(
        ParagraphCardGroupFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphCardGroup" }>,
      ),
    }),
  ParagraphCta: (item) =>
    paragraphCtaResolver({
      paragraph: readFragment(
        ParagraphCtaFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphCta" }>,
      ),
    }),
  ParagraphFaq: (item) =>
    paragraphFaqResolver({
      paragraph: readFragment(
        ParagraphFaqFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphFaq" }>,
      ),
    }),
  ParagraphLogoGroup: (item) =>
    paragraphLogoGroupResolver({
      paragraph: readFragment(
        ParagraphLogoGroupFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphLogoGroup" }>,
      ),
    }),
  ParagraphTestimonial: (item) =>
    paragraphTestimonialResolver({
      paragraph: readFragment(
        ParagraphTestimonialFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphTestimonial" }>,
      ),
    }),
  ParagraphViewReference: (item) =>
    paragraphViewReferenceResolver({
      paragraph: readFragment(
        ParagraphViewReferenceFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphViewReference" }>,
      ),
    }),
  ParagraphWebform: (item) =>
    paragraphWebformResolver({
      paragraph: readFragment(
        ParagraphWebformFragment,
        item as Extract<ParagraphResultOf, { __typename: "ParagraphWebform" }>,
      ),
    }),
};

interface ResolveProps {
  header: Record<string, unknown>;
  footer: Record<string, unknown>;
  entity: NodeResultOf;
}

export function resolve({ header, footer, entity }: ResolveProps): Spec {
  const typename = entity.__typename;
  const rootChildren: string[] = [];
  const spec: Spec = {
    root: typename,
    elements: {
      [typename]: {
        type: typename,
        props: {
          __typename: typename,
        },
        children: rootChildren,
      },
    },
  };

  if (header) {
    const headerId = `${entity.id}-Header`;
    rootChildren.push(headerId);
    spec.elements[headerId] = {
      type: "Header",
      props: header,
    };
  }

  if (entity.__typename === "NodeArticle") {
    const props = nodeArticleResolver({ node: entity });
    const articleId = `${entity.id}-Article`;
    rootChildren.push(articleId);
    spec.elements[articleId] = {
      type: "Article",
      props,
    };
  }

  if (entity.__typename === "NodePage") {
    if (entity.showTitle) {
      const headingId = `${entity.id}-Heading`;
      rootChildren.push(headingId);
      spec.elements[headingId] = {
        type: "Heading",
        props: { title: entity.title },
      };
    }
    for (const component of entity.components ?? []) {
      const item = readFragment(ParagraphUnionFragment, component);
      rootChildren.push(item.id);
      const resolver = resolverMap[item.__typename];
      if (resolver) {
        spec.elements[item.id] = {
          type: item.__typename,
          props: resolver(item),
        };
      }
    }
  }

  if (footer) {
    const footerId = `${entity.id}-Footer`;
    rootChildren.push(footerId);
    spec.elements[footerId] = {
      type: "Footer",
      props: footer,
    };
  }

  // console.log( JSON.stringify(spec, null, 2) )

  return spec;
}
