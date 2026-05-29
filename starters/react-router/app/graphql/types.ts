import type { ResultOf } from "gql.tada";
import type {
  NodeArticleFragment,
  NodePageFragment,
} from "~/graphql/fragments/node";
import type { ParagraphUnionFragment } from "~/graphql/fragments/paragraph";

export type NodeResultOf =
  | ResultOf<typeof NodePageFragment>
  | ResultOf<typeof NodeArticleFragment>;

export type ParagraphResultOf = ResultOf<typeof ParagraphUnionFragment>;
