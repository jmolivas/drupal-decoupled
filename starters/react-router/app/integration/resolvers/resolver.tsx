import type { ReactNode } from "react";
import type { ResultOf } from "gql.tada";
import type { Spec } from "@json-render/core";

import { JSONUIProvider, Renderer } from "@json-render/react";
import type { ParagraphUnionFragment } from "~/graphql/fragments/paragraph";
import type { NodeResultOf } from "~/graphql/types";
import { nodeArticleResolver } from "~/integration/resolvers/NodeArticleResolver";
import {
  type ParagraphCardGroupFragment,
  paragraphCardGroupResolver,
} from "~/integration/resolvers/ParagraphCardGroupResolver";
import {
  type ParagraphCtaFragment,
  paragraphCtaResolver,
} from "~/integration/resolvers/ParagraphCtaResolver";
import {
  type ParagraphFaqFragment,
  paragraphFaqResolver,
} from "~/integration/resolvers/ParagraphFaqResolver";
import {
  type ParagraphHeroFragment,
  paragraphHeroResolver,
} from "~/integration/resolvers/ParagraphHeroResolver";
import {
  type ParagraphLogoGroupFragment,
  paragraphLogoGroupResolver,
} from "~/integration/resolvers/ParagraphLogoGroupResolver";
import {
  type ParagraphTestimonialFragment,
  paragraphTestimonialResolver,
} from "~/integration/resolvers/ParagraphTestimonialResolver";
import {
  type ParagraphViewReferenceFragment,
  paragraphViewReferenceResolver,
} from "~/integration/resolvers/ParagraphViewReferenceResolver";
import {
  type ParagraphWebformFragment,
  paragraphWebformResolver,
} from "~/integration/resolvers/ParagraphWebformResolver";
import { registry } from "~/integration/resolvers/registry";

const resolverMap: Record<
  string,
  (item: ResultOf<typeof ParagraphUnionFragment>) => Record<string, unknown>
> = {
  ParagraphHero: (item) =>
    paragraphHeroResolver({
      paragraph: item as unknown as ResultOf<typeof ParagraphHeroFragment>,
    }),
  ParagraphCardGroup: (item) =>
    paragraphCardGroupResolver({
      paragraph: item as unknown as ResultOf<typeof ParagraphCardGroupFragment>,
    }),
  ParagraphCta: (item) =>
    paragraphCtaResolver({
      paragraph: item as unknown as ResultOf<typeof ParagraphCtaFragment>,
    }),
  ParagraphFaq: (item) =>
    paragraphFaqResolver({
      paragraph: item as unknown as ResultOf<typeof ParagraphFaqFragment>,
    }),
  ParagraphLogoGroup: (item) =>
    paragraphLogoGroupResolver({
      paragraph: item as unknown as ResultOf<typeof ParagraphLogoGroupFragment>,
    }),
  ParagraphTestimonial: (item) =>
    paragraphTestimonialResolver({
      paragraph: item as unknown as ResultOf<
        typeof ParagraphTestimonialFragment
      >,
    }),
  ParagraphViewReference: (item) =>
    paragraphViewReferenceResolver({
      paragraph: item as unknown as ResultOf<
        typeof ParagraphViewReferenceFragment
      >,
    }),
  ParagraphWebform: (item) =>
    paragraphWebformResolver({
      paragraph: item as unknown as ResultOf<typeof ParagraphWebformFragment>,
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
      const item = component as unknown as ResultOf<
        typeof ParagraphUnionFragment
      >;
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

interface SpecRendererProps {
  spec: Spec;
}

export function SpecRenderer({ spec }: SpecRendererProps): ReactNode {
  return (
    <JSONUIProvider registry={registry}>
      <Renderer spec={spec} registry={registry} />
    </JSONUIProvider>
  );
}
