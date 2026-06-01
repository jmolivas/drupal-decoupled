import { CardGroup, Hero } from "~/components/blocks";
import type { ViewReferenceData } from "~/integration/resolvers/ParagraphViewReferenceResolver";

type Card = ViewReferenceData["cards"][number];
type Action = ViewReferenceData["action"];

export type ViewReferenceProps = ViewReferenceData;

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
              href: featured.details.href,
              text: featured.details.text,
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
            cards={remainingCards as Card[]}
            action={action as Action}
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
        cards={cards as Card[]}
        action={action as Action}
      />
    );
  }

  return null;
};
