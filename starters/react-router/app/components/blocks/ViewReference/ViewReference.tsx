import { CardGroup, Hero } from "~/components/blocks";
import type { ImageProps } from "~/components/primitives";

interface CardDetails {
  href: string | null;
  text: string;
  internal: boolean;
}

interface Card {
  heading: string;
  summary?: string | null;
  type: string;
  details: CardDetails;
  image?: ImageProps;
}

interface Action {
  url?: string | null;
  title?: string | null;
  internal?: boolean | null;
}

export interface ViewReferenceProps {
  id: string;
  view?: string | null;
  display?: string | null;
  cards: Card[];
  headingOptional?: string | null;
  subheadingOptional?: string | null;
  descriptionOptional?: string | null;
  action?: Action;
}

export const ViewReference = ({
  id,
  view,
  display,
  cards,
  headingOptional,
  subheadingOptional,
  descriptionOptional,
  action,
}: ViewReferenceProps) => {
  if (view === "blog" && display === "teaser_featured") {
    const featured = cards[0];
    const remainingCards = cards.slice(1);

    return (
      <div id={id}>
        <Hero
          heading={featured.heading}
          image={featured.image}
          description={featured.summary ?? ""}
          actions={[
            {
              href: featured.details.href || "",
              text: featured.details.text || "",
              internal: true,
            },
          ]}
        />
        {remainingCards.length > 0 && (
          <CardGroup
            key={id}
            heading={headingOptional || ""}
            subheading={subheadingOptional || ""}
            description={descriptionOptional || ""}
            // @ts-expect-error - fix typings.
            cards={remainingCards}
            // @ts-expect-error - fix typings.
            action={action}
          />
        )}
      </div>
    );
  }

  if (view === "blog" && display === "teaser") {
    return (
      <CardGroup
        id={id}
        key={id}
        heading={headingOptional || ""}
        subheading={subheadingOptional || ""}
        description={descriptionOptional || ""}
        // @ts-expect-error - fix typings.
        cards={cards}
        // @ts-expect-error - fix typings.
        action={action}
      />
    );
  }

  return null;
};
